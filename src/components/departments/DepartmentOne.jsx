import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { departmentRecords } from "../../data/mitPrograms";

export const DepartmentOne = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.getDepartments();
        if (response?.data) {
          setDepartments(response.data);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const defaultDepartments = departmentRecords.map((department, index) => ({
    ...department,
    delay: `${0.2 + index * 0.1}s`,
  }));

  const displayDepartments = departments.length > 0 
    ? departments.map((dept, index) => ({
        slug: dept.attributes?.slug || dept.slug || `department-${index + 1}`,
        name: dept.attributes?.name || dept.name || `Department ${index + 1}`,
        description: dept.attributes?.description || dept.description || "",
        delay: `${0.2 + (index * 0.1)}s`
      }))
    : defaultDepartments;

  return (
    <section>
      <div className="td_height_112 td_height_lg_75" />
      <div className="container">
        <div
          className="td_section_heading td_style_1 text-center wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
            Departments
          </p>
          <h2 className="td_section_title td_fs_48 mb-0">
            Our Departments
          </h2>
          <p className="td_section_subtitle td_fs_18 mb-0">
            Explore our diverse range of engineering and technical departments <br />
            offering quality education and hands-on training for future professionals
          </p>
        </div>
        <div className="td_height_60 td_height_lg_40" />
        <div className="row td_gap_y_30">
          {displayDepartments.map((dept, index) => (
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={dept.delay}
              key={index}
            >
              <Link
                to={`/course-details/${dept.slug}`}
                className="td_iconbox td_style_1 text-center d-flex flex-column justify-content-center align-items-center td_radius_10 td_white_bg td_p_40 h-100 shadow-sm border"
              >
                <div className="td_iconbox_icon td_accent_color td_mb_10">
                   <i className="fa-solid fa-graduation-cap td_fs_64" style={{color: '#890C25'}}></i>
                </div>
                <h3
                  className="td_iconbox_title mb-0 td_medium td_fs_24"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {dept.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
