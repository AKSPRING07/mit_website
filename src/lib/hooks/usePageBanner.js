import { useState, useEffect } from 'react';
import { api } from '../api';
import { getImageUrl } from '../config';
import DESSF from "../../assets/img/DESSF.jpeg";

const fallbackBanners = {
  about: {
    title: "About Us",
    subtitle: "About",
    imageUrl: DESSF,
  },
  alumni: {
    title: "Alumni",
    subtitle: "Alumni",
    imageUrl: DESSF,
  },
  placements: {
    title: "Placements",
    subtitle: "Placements",
    imageUrl: DESSF,
  },
  gallery: {
    title: "Gallery",
    subtitle: "Gallery",
    imageUrl: DESSF,
  },
  departments: {
    title: "Our Departments",
    subtitle: "Departments",
    imageUrl: DESSF,
  },
  iti: {
    title: "ITI Programs",
    subtitle: "ITI",
    imageUrl: DESSF,
  },
  committees: {
    title: "Committees",
    subtitle: "Committees",
    imageUrl: DESSF,
  },
  "course-details": {
    title: "Course Details",
    subtitle: "Course Details",
    imageUrl: DESSF,
  },
  contact: {
    title: "Contact",
    subtitle: "Contact",
    imageUrl: DESSF,
  },
  pledge: {
    title: "Pledge",
    subtitle: "Pledge",
    imageUrl: DESSF,
  },
  error: {
    title: "Page Not Found",
    subtitle: "Error",
    imageUrl: DESSF,
  },
  "students-registrations": {
    title: "Student Registration",
    subtitle: "Admissions",
    imageUrl: DESSF,
  },
  associations: {
    title: "Associations",
    subtitle: "Associations",
    imageUrl: DESSF,
  },
};

/**
 * Custom hook to fetch page banner data from local site content
 * @param {string} pageName - The unique page name identifier (e.g., 'about', 'placements', 'gallery')
 * @returns {Object} - { banner, loading, error }
 */
export const usePageBanner = (pageName) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      if (!pageName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getPageBanner(pageName);
        
        if (response?.data && response.data.length > 0) {
          const bannerData = response.data[0];
          setBanner({
            title: bannerData.pageTitle,
            subtitle: bannerData.breadcrumbSubtitle || bannerData.pageTitle,
            imageUrl: getImageUrl(bannerData.bannerImage),
          });
        } else {
          setBanner(fallbackBanners[pageName] || null);
        }
        setError(null);
      } catch (err) {
        console.error(`Error fetching banner for ${pageName}:`, err);
        setError(err);
        setBanner(fallbackBanners[pageName] || null);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [pageName]);

  return { banner, loading, error };
};
