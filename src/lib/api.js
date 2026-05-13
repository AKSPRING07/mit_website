import staticCmsData from "../data/staticCmsData";
import { allCourses } from "../data/courseCatalog";
import { collegeInfo } from "../data/collegeInfo";
import { fallbackAssociations } from "../data/associations";
import { culturalAnnualDayImages } from "../data/culturalImages";
import {
  departmentRecords,
  normalizeCourseRecord,
  normalizeDepartmentRecord,
} from "../data/mitPrograms";

let lastApiError = null;

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const collectionResponse = (data) => ({ data: deepClone(data) });
const singleResponse = (data) => (data ? { data: deepClone(data) } : null);

const courseCatalogBySlug = new Map(allCourses.map((course) => [course.slug, course]));

const staticAssociations = fallbackAssociations.map((association) => ({
  id: association.id,
  documentId: association.slug,
  slug: association.slug,
  title: association.title,
  description: association.excerpt,
  content: association.content,
  imageUrl: association.image,
}));

const staticCulturalPhotos = culturalAnnualDayImages.map((image, index) => ({
  id: `cultural-photo-${index + 1}`,
  image: {
    url: image,
  },
}));

const staticCollections = {
  blogs: staticCmsData.blogs,
  courses: staticCmsData.courses.map((course) => {
    const localCourse = courseCatalogBySlug.get(course.slug);
    return normalizeCourseRecord({
      ...course,
      image: course.image || localCourse?.src || null,
      detailLink: `/course-details/${course.slug}`,
    });
  }),
  departments: (staticCmsData.departments.length > 0
    ? staticCmsData.departments
    : departmentRecords
  ).map((department) => normalizeDepartmentRecord(department)),
  galleries: staticCmsData.galleries,
  events: staticCmsData.events,
  teamMembers: staticCmsData.teamMembers,
  testimonials: staticCmsData.testimonials,
  alumnis: staticCmsData.alumnis,
  culturalPhotos: staticCmsData.culturalPhotos.length > 0 ? staticCmsData.culturalPhotos : staticCulturalPhotos,
  committees: staticCmsData.committees,
  associations: staticCmsData.associations.length > 0 ? staticCmsData.associations : staticAssociations,
  pageBanners: staticCmsData.pageBanners,
};

const sortItems = (items, sort) => {
  if (!sort) return items;

  const sortRules = Array.isArray(sort) ? sort : [sort];
  const output = [...items];

  output.sort((left, right) => {
    for (const rule of sortRules) {
      const [field, direction = "asc"] = rule.split(":");
      const leftValue = left?.[field];
      const rightValue = right?.[field];

      if (leftValue === rightValue) {
        continue;
      }

      const order = direction.toLowerCase() === "desc" ? -1 : 1;
      return leftValue > rightValue ? order : -order;
    }

    return 0;
  });

  return output;
};

const matchesCondition = (itemValue, condition) => {
  if (condition && typeof condition === "object" && !Array.isArray(condition)) {
    if (Object.prototype.hasOwnProperty.call(condition, "$eq")) {
      return itemValue === condition.$eq;
    }
  }

  return itemValue === condition;
};

const filterItems = (items, filters = {}) => {
  const entries = Object.entries(filters);
  if (entries.length === 0) return items;

  return items.filter((item) =>
    entries.every(([field, condition]) => matchesCondition(item?.[field], condition))
  );
};

const paginateItems = (items, pagination) => {
  if (!pagination?.pageSize) {
    return items;
  }

  const page = Math.max(1, Number(pagination.page) || 1);
  const pageSize = Math.max(1, Number(pagination.pageSize) || items.length);
  const start = (page - 1) * pageSize;

  return items.slice(start, start + pageSize);
};

const queryCollection = (items, params = {}) => {
  let output = deepClone(items);
  output = filterItems(output, params.filters);
  output = sortItems(output, params.sort);
  output = paginateItems(output, params.pagination);
  return output;
};

const findByIdentifier = (items, identifier, slugField = "slug") =>
  items.find(
    (item) =>
      String(item.id) === String(identifier) ||
      item.documentId === identifier ||
      item?.[slugField] === identifier
  ) || null;

export const api = {
  getLastError() {
    return lastApiError;
  },

  async get(endpoint, params = {}) {
    lastApiError = null;

    switch (endpoint) {
      case "/blogs":
        return collectionResponse(queryCollection(staticCollections.blogs, params));
      case "/courses":
        return collectionResponse(queryCollection(staticCollections.courses, params));
      case "/departments":
        return staticCollections.departments.length
          ? collectionResponse(queryCollection(staticCollections.departments, params))
          : null;
      case "/galleries":
        return collectionResponse(queryCollection(staticCollections.galleries, params));
      case "/events":
        return staticCollections.events.length
          ? collectionResponse(queryCollection(staticCollections.events, params))
          : null;
      case "/team-members":
        return staticCollections.teamMembers.length
          ? collectionResponse(queryCollection(staticCollections.teamMembers, params))
          : null;
      case "/testimonials":
        return staticCollections.testimonials.length
          ? collectionResponse(queryCollection(staticCollections.testimonials, params))
          : null;
      case "/alumnis":
        return collectionResponse(queryCollection(staticCollections.alumnis, params));
      case "/cultural-photos":
        return collectionResponse(queryCollection(staticCollections.culturalPhotos, params));
      case "/committees":
        return collectionResponse(queryCollection(staticCollections.committees, params));
      case "/associations":
        return collectionResponse(queryCollection(staticCollections.associations, params));
      case "/page-banners":
        return staticCollections.pageBanners.length
          ? collectionResponse(queryCollection(staticCollections.pageBanners, params))
          : { data: [] };
      case "/hero-section":
        return null;
      case "/contact-info":
        return {
          data: {
            attributes: {
              phone: collegeInfo.phone,
              email: collegeInfo.email,
              address: collegeInfo.address,
              socialMedia: collegeInfo.socialLinks,
            },
          },
        };
      default:
        lastApiError = {
          endpoint,
          status: null,
          message: `No static dataset mapped for ${endpoint}`,
        };
        return null;
    }
  },

  async post(endpoint, data) {
    lastApiError = null;
    void data;
    throw new Error(
      `POST ${endpoint} is not available in this frontend-only build. Use phone, email, or an external form service for submissions.`
    );
  },

  async getDetail(endpoint, identifier, options = {}) {
    const { slugField = "slug" } = options;

    const collectionMap = {
      "/blogs": staticCollections.blogs,
      "/courses": staticCollections.courses,
      "/alumnis": staticCollections.alumnis,
      "/committees": staticCollections.committees,
      "/associations": staticCollections.associations,
    };

    const collection = collectionMap[endpoint];
    if (!collection) {
      return null;
    }

    return singleResponse(findByIdentifier(collection, identifier, slugField));
  },

  getHeroSection: () => api.get("/hero-section", { populate: "*" }),
  getContactInfo: () => api.get("/contact-info", { populate: "*" }),

  getBlogs: (params) => api.get("/blogs", { populate: "*", ...params }),
  getBlog: (id) => api.getDetail("/blogs", id),
  getCourses: (params) => api.get("/courses", { populate: "*", ...params }),
  getCourse: (id) => api.getDetail("/courses", id),
  getDepartments: (params) => api.get("/departments", { populate: "*", ...params }),
  getDepartment: (id) => api.getDetail("/departments", id),
  getGallery: (params) => api.get("/galleries", { populate: ["image"], sort: "createdAt:desc", ...params }),
  getEvents: (params) => api.get("/events", { populate: "*", ...params }),
  getEvent: (id) => api.getDetail("/events", id),
  getTeamMembers: (params) => api.get("/team-members", { populate: "*", ...params }),
  getTeamMember: (id) => api.getDetail("/team-members", id),
  getTestimonials: (params) => api.get("/testimonials", { populate: "*", ...params }),
  getAlumnis: (params) => api.get("/alumnis", { populate: "*", sort: "displayOrder:asc", ...params }),
  getAlumni: (id) => api.getDetail("/alumnis", id),
  getCulturalPhotos: (params) => api.get("/cultural-photos", { populate: "*", sort: "order:asc", ...params }),
  getCulturalPhoto: (id) => api.getDetail("/cultural-photos", id),
  getCommittees: (params) => api.get("/committees", { populate: "*", sort: "order:asc", ...params }),
  getCommittee: (id) => api.getDetail("/committees", id),
  getAssociations: (params) => api.get("/associations", { populate: "*", sort: "order:asc", ...params }),
  getAssociation: (id) => api.getDetail("/associations", id),
  getAssociationBySlug: (slug) =>
    api.get("/associations", {
      populate: "*",
      filters: { slug: { $eq: slug } },
    }),

  getPageBanners: (params) => api.get("/page-banners", { populate: "*", ...params }),
  getPageBanner: (pageName) =>
    api.get("/page-banners", {
      populate: "*",
      filters: { pageName: { $eq: pageName } },
    }),

  submitStudentRegistration: async (data) => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycby-TLqbpILRY9b8CLQRcRApJ6zhpr0zrmMrZwaScTBgDMhTUS5_DsSLFQ4wULlAonR5/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Since it's no-cors, we can't easily read the JSON response, but if fetch doesn't throw, we assume success.
      return { status: "success" };
    } catch (error) {
      console.error("Error submitting registration to Google Sheets:", error);
      throw new Error("Failed to submit registration. Please check your connection and try again.");
    }
  },
};
