import React from "react";
import { useTabs } from "../../lib/hooks/useTabs";
import { CoursesOneItem } from "./CoursesOneItem";
import { diplomaCourses, itiCourses } from "../../data/courseCatalog";

export const CoursesOne = () => {
  useTabs();

  return (
    <section className="td_gray_bg_3">
      <div className="td_height_112 td_height_lg_75" />

      <div className="container">
        {/* header */}
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

        {/* tabs */}
        <div className="td_tabs">
          <ul
            className="td_tab_links td_style_1 td_mp_0 td_fs_20 td_medium td_heading_color wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay="0.2s"
          >
            <li className="active">
              <a href="#tab_1">Diploma</a>
            </li>
            <li>
              <a href="#tab_2">ITI</a>
            </li>
          </ul>
          <div className="td_height_50 td_height_lg_50" />

          <div className="td_tab_body">
            <div className="td_tab active" id="tab_1">
              <div className="row td_gap_y_24">
                {coursesDiploma.map((course, idx) => (
                  <div
                    key={idx}
                    className="col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="0.2s"
                  >
                    <CoursesOneItem {...course} />
                  </div>
                ))}
              </div>
            </div>

            <div className="td_tab" id="tab_2">
              <div className="row td_gap_y_24">
                {coursesITI.map((course, idx) => (
                  <div key={idx} className="col-lg-4 col-md-6">
                    <CoursesOneItem {...course} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};

const coursesDiploma = diplomaCourses.map((course) => ({
  ...course,
  subtitle: course.shortTitle || "DIPLOMA",
}));

const coursesITI = itiCourses.map((course) => ({
  ...course,
  subtitle: course.shortTitle || "ITI",
}));
