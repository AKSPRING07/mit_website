import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CoursesOneItem } from "./CoursesOneItem";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { allCourses } from "../../data/courseCatalog";
import "../../assets/css/courses-page.css";

const defaultCourses = allCourses.map((course) => ({
  ...course,
  subtitle: course.shortTitle || course.category.toUpperCase(),
}));

export const CoursesOneCMS = ({ defaultTab = "tab_1" }) => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (hash === "#tab_1") setActiveTab("tab_1");
    if (hash === "#tab_2") setActiveTab("tab_2");
  }, [hash]);
  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        const response = await api.getCourses();
        if (response && response.data) {
          // Normalize Strapi data for CoursesOneItem
          const normalized = response.data.map(item => {
            const attr = item.attributes || item; // Support both v4/v5 formats
            const image = getImageUrl(attr.image);
            
            return {
              id: item.id,
              ...attr,
              src: image || '/placeholder.jpg',
              subtitle: attr.shortTitle || attr.category?.toUpperCase(),
              title: attr.title,
              detailLink: `/course-details/${attr.slug}`
            };
          });
          console.log("ALL COURSES FROM API:", normalized);
          setCourses(normalized);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const diplomaCourses = courses.filter(c => c.category?.toLowerCase() === "diploma");
  const itiCourses = courses.filter(c => c.category?.toLowerCase() === "iti");

  console.log("DIPLOMA COUNT:", diplomaCourses.length);
  console.log("ITI COUNT:", itiCourses.length);
  if (courses.length > 0) {
    console.log("FIRST COURSE CATEGORY:", courses[0]?.category);
  }

  if (loading) {
    // Keep rendering fallback content while fresh CMS data loads in the background.
  }

  return (
    <section className="td_gray_bg_3 td_courses_showcase">
      <div className="td_height_112 td_height_lg_75" />
      <div className="container">
        <div
          className="td_section_heading td_style_1 text-center wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.15s"
        >
          <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
            Our Programs
          </p>
          <h2 className="td_section_title td_fs_48 mb-0">Academic Courses</h2>
        </div>
        <div className="td_height_30 td_height_lg_30" />

        <div className="td_tabs">
          <ul
            className="td_tab_links td_style_1 td_mp_0 td_fs_20 td_medium td_heading_color wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
          >
            <li className={activeTab === "tab_1" ? "active" : ""}>
              <a
                href="#tab_1"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("tab_1");
                }}
              >
                Diploma
              </a>
            </li>
            <li className={activeTab === "tab_2" ? "active" : ""}>
              <a
                href="#tab_2"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("tab_2");
                }}
              >
                ITI
              </a>
            </li>
          </ul>

          <div className="td_height_50 td_height_lg_50" />

          <div className="td_tab_body">
            {activeTab === "tab_1" && (
              <div className="td_tab active" id="tab_1">
                <div className="row td_gap_y_24">
                  {diplomaCourses.length > 0 ? (
                    diplomaCourses.map((course, index) => (
                      <div
                        key={course.slug || index}
                        className="col-lg-4 col-md-6 wow fadeInUp"
                        data-wow-duration="1s"
                        data-wow-delay={`${0.15 + index * 0.05}s`}
                      >
                        <CoursesOneItem {...course} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted">
                      No Diploma courses found in the local course data.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "tab_2" && (
              <div className="td_tab active" id="tab_2">
                <div className="row td_gap_y_24">
                  {itiCourses.length > 0 ? (
                    itiCourses.map((course, index) => (
                      <div
                        key={course.slug || index}
                        className="col-lg-4 col-md-6"
                      >
                        <CoursesOneItem {...course} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted">
                      No ITI courses found in the local course data.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
