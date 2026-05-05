import React from "react";
import { useTabs } from "../../lib/hooks/useTabs";
import { Link } from "react-router-dom";
import videoThumb from "../../assets/img/others/video_thumb.jpg";
import { getImageUrl } from "../../lib/config";
import { collegeInfo } from "../../data/collegeInfo";

export const CourseDetailContent = ({ course }) => {
  useTabs();

  if (!course) {
    return null;
  }

  const courseImage = course.src || getImageUrl(course.image) || videoThumb;
  const courseName = course.name || course.title || "Course Title";
  const courseFee = course.priceLabel || (course.price ? course.price.toLocaleString("en-IN") : null);
  const parseList = (data, defaults) => {
    if (Array.isArray(data) && data.length > 0) return data;
    if (typeof data === "string" && data.trim()) {
      return data
        .split("\n")
        .map((s) => s.replace(/^[-* ]+/, "").trim())
        .filter(Boolean);
    }
    return defaults;
  };

  const highlights = parseList(course.highlights, [
    "Industry-relevant curriculum",
    "Hands-on practical training",
    "Expert faculty guidance",
    "Modern laboratory facilities",
    "Placement assistance",
    "Soft skills development",
  ]);
  const eligibility = parseList(course.eligibility, [
    "10th Pass (for Diploma)",
    "12th Pass (for Lateral Entry)",
    "Interest in Technical Skills",
  ]);
  const curriculum = parseList(course.curriculum, [
    "Core subject overview",
    "Practical laboratory work",
    "Project and workshop training",
  ]);
  const careerPaths = parseList(course.careerPaths, [
    "Technical assistant roles",
    "Industry training support",
    "Further study opportunities",
  ]);

  return (
    <section style={{ paddingTop: "160px", paddingBottom: "120px" }}>
      <div className="container">
        <div className="row td_gap_y_50 align-items-start">
          {/* content */}
          <div className="col-lg-8">
            <div className="td_course_details">
              {/* image or video */}
              <div className="td_radius_10 td_mb_25">
                <img
                  src={courseImage}
                  alt={courseName}
                  style={{
                    width: "100%",
                    height: "360px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    display: "block",
                  }}
                />
              </div>

              {/* info */}
              <span className="td_course_label td_mb_10">{course.category || "Course"}</span>

              <h2 className="td_fs_48 td_mb_20" style={{ overflowWrap: "anywhere" }}>
                {courseName}
              </h2>

              {courseFee && (
                <div className="td_fs_24 td_semibold td_accent_color td_mb_25">
                  Course Fee: {courseFee}
                </div>
              )}

              <div className="td_course_meta td_mb_40">
                <div className="td_course_avatar">
                  <p className="td_heading_color mb-0 td_medium">
                    <span className="td_accent_color">Category:</span>
                    <span> {course.category}</span>
                  </p>
                </div>
                <div className="td_course_published td_medium td_heading_color">
                  <span className="td_accent_color">Duration:</span> {course.duration || "N/A"}
                </div>
              </div>

              {/* tabs */}
              <div className="td_tabs td_style_1 td_mb_50">
                <ul className="td_tab_links td_style_2 td_type_2 td_mp_0 td_medium td_fs_20 td_heading_color">
                  <li className="active">
                    <a href="#td_tab_1">Overview</a>
                  </li>
                  <li>
                    <a href="#td_tab_2">Curriculum</a>
                  </li>
                  <li>
                    <a href="#td_tab_3">Eligibility</a>
                  </li>
                  <li>
                    <a href="#td_tab_4">Career Scope</a>
                  </li>
                </ul>
                <div className="td_tab_body td_fs_18">
                  <div className="td_tab active" id="td_tab_1">
                    <h2 className="td_fs_48 td_mb_20">Course Description</h2>
                    <p className="mb-0">
                      {course.overview || course.description || "No description available."}
                    </p>
                  </div>
                  <div className="td_tab" id="td_tab_2">
                    <h2 className="td_fs_48 td_mb_20">Course Curriculum</h2>
                    <ul className="td_list td_style_2 td_type_2 td_fs_18 td_medium td_heading_color td_mp_0">
                      {curriculum.map((item) => (
                        <li key={item}>
                          <svg
                            className="td_accent_color"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
                            <path
                              d="M7.5 14.1136C7.5 14.1136 8.52273 14.1136 9.88636 16.5C9.88636 16.5 13.6765 10.25 17.0455 9"
                              stroke="white"
                              strokeWidth="0.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="td_tab" id="td_tab_3">
                    <h2 className="td_fs_48 td_mb_20">Eligibility</h2>
                    <ul className="td_list td_style_2 td_type_2 td_fs_18 td_medium td_heading_color td_mp_0">
                      {eligibility.map((item) => (
                        <li key={item}>
                          <svg
                            className="td_accent_color"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
                            <path
                              d="M7.5 14.1136C7.5 14.1136 8.52273 14.1136 9.88636 16.5C9.88636 16.5 13.6765 10.25 17.0455 9"
                              stroke="white"
                              strokeWidth="0.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="td_tab" id="td_tab_4">
                    <h2 className="td_fs_48 td_mb_20">Career Scope</h2>
                    <ul className="td_list td_style_2 td_type_2 td_fs_18 td_medium td_heading_color td_mp_0">
                      {careerPaths.map((item) => (
                        <li key={item}>
                          <svg
                            className="td_accent_color"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
                            <path
                              d="M7.5 14.1136C7.5 14.1136 8.52273 14.1136 9.88636 16.5C9.88636 16.5 13.6765 10.25 17.0455 9"
                              stroke="white"
                              strokeWidth="0.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="td_fs_48 td_mb_30">What You Will Learn</h2>
              <ul className="td_list td_style_2 td_type_2 td_fs_18 td_medium td_heading_color td_mp_0">
                {highlights.map((item) => (
                  <li key={item}>
                    <svg
                      className="td_accent_color"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
                      <path
                        d="M7.5 14.1136C7.5 14.1136 8.52273 14.1136 9.88636 16.5C9.88636 16.5 13.6765 10.25 17.0455 9"
                        stroke="white"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="td_height_60 td_height_lg_40" />
              <h4 className="td_fs_24 td_semibold td_mb_20">Requirements</h4>
              <div className="td_requirements_list td_medium td_fs_18">
                {eligibility.map((item) => (
                  <span className="td_requirement" key={item}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.62323 2.73285C3.62323 2.6749 3.67039 2.62807 3.7283 2.62807H17.0304C17.0884 2.62807 17.1355 2.6749 17.1355 2.73285V11.761C17.1355 11.8189 17.0884 11.8657 17.0304 11.8657H10.2019V13.1891H17.0304C17.8182 13.1891 18.459 12.5484 18.459 11.761V2.73285C18.459 1.94541 17.8182 1.30469 17.0304 1.30469H3.72835C2.94061 1.30469 2.2998 1.94545 2.2998 2.73285V5.63045H3.62323V2.73285Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19.4806 13.7344H10.2017V15.6143H18.6394C19.3908 15.6143 19.9998 15.0054 19.9998 14.2536C19.9998 13.9668 19.7674 13.7344 19.4806 13.7344Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.32878 6.95312H1.54968C0.695162 6.95312 0 7.6482 0 8.50276V17.1393C0 17.9938 0.695162 18.689 1.54968 18.689H7.32878C8.18334 18.689 8.87846 17.9938 8.87846 17.1393V8.50276C8.87846 7.6482 8.18334 6.95312 7.32878 6.95312ZM1.32342 8.50276C1.32342 8.37807 1.42486 8.2765 1.54968 8.2765H7.32878C7.45355 8.2765 7.55504 8.37803 7.55504 8.50276V16.5238H1.32342V8.50276ZM4.43912 18.0976C4.23018 18.0976 4.05435 17.9751 3.96533 17.8013C3.92774 17.728 3.90152 17.6481 3.90152 17.56C3.90152 17.263 4.14216 17.0224 4.43917 17.0224C4.73609 17.0224 4.97673 17.263 4.97673 17.56C4.97673 17.648 4.9506 17.728 4.91292 17.8013C4.82377 17.9751 4.64799 18.0976 4.43912 18.0976Z"
                        fill="currentColor"
                      />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="col-lg-4">
            <div className="td_card td_style_7">
              {/* Video player removed as no video content is available yet */}
              
              <div className="td_height_30 td_height_lg_30" />
              <h3 className="td_fs_20 td_semibold td_mb_15">
                Course Details:
              </h3>
              <ul className="td_card_list td_mp_0 td_fs_18 td_medium">
                <li>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5446 6.01555V1.67875H19.6798C19.8071 1.67875 19.9292 1.62818 20.0193 1.53816C20.1093 1.44814 20.1598 1.32605 20.1598 1.19875C20.1598 1.07145 20.1093 0.949356 20.0193 0.859339C19.9292 0.769321 19.8071 0.71875 19.6798 0.71875H4.31984C4.19254 0.71875 4.07045 0.769321 3.98043 0.859339C3.89042 0.949356 3.83984 1.07145 3.83984 1.19875C3.83984 1.32605 3.89042 1.44814 3.98043 1.53816C4.07045 1.62818 4.19254 1.67875 4.31984 1.67875H5.46464V6.01555C5.46464 8.23075 7.70384 10.4436 9.78464 12.0155C7.70144 13.5899 5.46464 15.8003 5.46464 18.0155V22.3188H4.31984C4.19254 22.3188 4.07045 22.3693 3.98043 22.4593C3.89042 22.5494 3.83984 22.6714 3.83984 22.7987C3.83984 22.9261 3.89042 23.0481 3.98043 23.1382C4.07045 23.2282 4.19254 23.2787 4.31984 23.2787H19.6798C19.8071 23.2787 19.9292 23.2282 20.0193 23.1382C20.1093 23.0481 20.1598 22.9261 20.1598 22.7987C20.1598 22.6714 20.1093 22.5494 20.0193 22.4593C19.9292 22.3693 19.8071 22.3188 19.6798 22.3188H18.5446V18.0299C18.5446 15.8075 16.3054 13.5971 14.2246 12.03C16.3054 10.4436 18.5446 8.23075 18.5446 6.01555ZM13.1326 11.6339C13.0706 11.6781 13.02 11.7364 12.9849 11.804C12.9499 11.8716 12.9314 11.9466 12.931 12.0227C12.931 12.0993 12.9493 12.1748 12.9844 12.2428C13.0194 12.3109 13.0703 12.3695 13.1326 12.4139C15.9622 14.4419 17.5846 16.4939 17.5846 18.0299V22.3188H6.41504V18.0299C6.41504 16.4891 8.03744 14.4419 10.867 12.4139C10.929 12.3695 10.9794 12.311 11.0143 12.2431C11.0491 12.1753 11.0672 12.1002 11.0672 12.0239C11.0672 11.9477 11.0491 11.8726 11.0143 11.8048C10.9794 11.7369 10.929 11.6784 10.867 11.6339C8.03744 9.59875 6.41504 7.55155 6.41504 6.01555V1.67875H17.5846V6.01555C17.5846 7.55155 15.9622 9.59875 13.1326 11.6339Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12.2784 15.4727C12.1969 15.4142 12.0991 15.3828 11.9988 15.3828C11.8985 15.3828 11.8008 15.4142 11.7192 15.4727L11.5656 15.5831C9.16563 17.3039 7.61523 19.1255 7.61523 20.2247V20.6375C7.61523 20.7648 7.66581 20.8868 7.75582 20.9769C7.84584 21.0669 7.96793 21.1175 8.09523 21.1175H15.9048C16.0321 21.1175 16.1542 21.0669 16.2442 20.9769C16.3343 20.8868 16.3848 20.7648 16.3848 20.6375V20.2247C16.3848 19.1255 14.8344 17.3039 12.4344 15.5831L12.2784 15.4727ZM15.42 20.1575H8.58003C8.65683 19.6607 9.54003 18.2375 12 16.4543C14.4624 18.2375 15.3408 19.6607 15.42 20.1575Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.9048 4.57812H8.09523C7.96793 4.57812 7.84584 4.6287 7.75582 4.71871C7.66581 4.80873 7.61523 4.93082 7.61523 5.05812V6.01812C7.61523 7.12932 9.12963 8.89812 11.568 10.6621L11.7192 10.7701C11.801 10.8291 11.8992 10.8608 12 10.8608C12.1008 10.8608 12.1991 10.8291 12.2808 10.7701L12.432 10.6621C14.88 8.90772 16.3848 7.12932 16.3848 6.01812V5.05812C16.3848 4.93082 16.3343 4.80873 16.2442 4.71871C16.1542 4.6287 16.0321 4.57812 15.9048 4.57812ZM15.4248 6.01812C15.4248 6.51732 14.4912 7.97172 12 9.78852C9.50643 7.97172 8.57523 6.51732 8.57523 6.01812V5.53812H15.4248V6.01812Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 12.9301C12.1273 12.9301 12.2494 12.8796 12.3394 12.7895C12.4294 12.6995 12.48 12.5774 12.48 12.4501V12.1909C12.48 12.0636 12.4294 11.9415 12.3394 11.8515C12.2494 11.7615 12.1273 11.7109 12 11.7109C11.8727 11.7109 11.7506 11.7615 11.6606 11.8515C11.5706 11.9415 11.52 12.0636 11.52 12.1909V12.4501C11.52 12.5774 11.5706 12.6995 11.6606 12.7895C11.7506 12.8796 11.8727 12.9301 12 12.9301Z"
                        fill="currentColor"
                      />
                      <path
                        d="M11.52 14.2861C11.52 14.4134 11.5706 14.5355 11.6606 14.6255C11.7506 14.7155 11.8727 14.7661 12 14.7661C12.1273 14.7661 12.2494 14.7155 12.3394 14.6255C12.4294 14.5355 12.48 14.4134 12.48 14.2861V14.0269C12.48 13.8996 12.4294 13.7775 12.3394 13.6875C12.2494 13.5974 12.1273 13.5469 12 13.5469C11.8727 13.5469 11.7506 13.5974 11.6606 13.6875C11.5706 13.7775 11.52 13.8996 11.52 14.0269V14.2861Z"
                        fill="currentColor"
                      />
                    </svg>
                    Duration :
                  </span>
                  <span className="td_semibold td_accent_color">{course.duration || "N/A"}</span>
                </li>
                <li>
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.477 2 2 5.582 2 10V14C2 18.418 6.477 22 12 22C17.523 22 22 18.418 22 14V10C22 5.582 17.523 2 12 2Z" fill="currentColor"/>
                      <path d="M8 10H16V12H8V10ZM8 13H14V15H8V13Z" fill="white"/>
                    </svg>
                    Course Fee :
                  </span>
                  <span className="td_semibold td_accent_color">{courseFee || "N/A"}</span>
                </li>
                <li>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.6926 4.25056C20.2951 4.16806 19.8976 4.11556 19.5001 4.04806V3.64306C19.4999 3.35082 19.4376 3.06195 19.3174 2.79559C19.1971 2.52923 19.0217 2.29147 18.8026 2.09806C18.5791 1.90185 18.3163 1.75554 18.0318 1.6689C17.7472 1.58225 17.4475 1.55725 17.1526 1.59556C15.1899 1.8282 13.3688 2.73478 12.0001 4.16056C10.6314 2.73478 8.81025 1.8282 6.84757 1.59556C6.55263 1.55725 6.25291 1.58225 5.96839 1.6689C5.68387 1.75554 5.42109 1.90185 5.19757 2.09806C4.97849 2.29147 4.80301 2.52923 4.68276 2.79559C4.56251 3.06195 4.50024 3.35082 4.50007 3.64306V4.04806C4.10257 4.11556 3.70507 4.16806 3.30757 4.25056C2.79797 4.35278 2.33948 4.62827 2.00999 5.03022C1.68049 5.43218 1.50032 5.93581 1.50007 6.45556V19.1606C1.49753 19.4801 1.5631 19.7966 1.69243 20.0889C1.82175 20.3811 2.01185 20.6425 2.25007 20.8556C2.49145 21.0656 2.77486 21.2218 3.08137 21.3136C3.38789 21.4054 3.71046 21.4308 4.02757 21.3881C6.62806 21.0375 9.27492 21.4005 11.6851 22.4381C11.7776 22.4773 11.8771 22.4974 11.9776 22.4974C12.0781 22.4974 12.1775 22.4773 12.2701 22.4381C14.6802 21.4005 17.3271 21.0375 19.9276 21.3881C20.2472 21.4311 20.5724 21.4049 20.881 21.3112C21.1896 21.2176 21.4745 21.0587 21.7163 20.8453C21.9581 20.6319 22.1513 20.369 22.2826 20.0745C22.414 19.7799 22.4805 19.4606 22.4776 19.1381V6.45556C22.4784 5.93896 22.3014 5.43782 21.9764 5.03629C21.6513 4.63477 21.198 4.35732 20.6926 4.25056ZM17.3476 3.08056C17.4308 3.06957 17.5153 3.07661 17.5956 3.1012C17.6758 3.12579 17.7498 3.16735 17.8126 3.22306C17.8717 3.27591 17.9189 3.34064 17.9512 3.41302C17.9835 3.4854 18.0002 3.56379 18.0001 3.64306V16.6256C18.0043 16.7989 17.9483 16.9684 17.8417 17.1052C17.735 17.2419 17.5843 17.3375 17.4151 17.3756C15.6621 17.6746 14.038 18.4893 12.7501 19.7156V5.54806C13.9206 4.18024 15.5607 3.30001 17.3476 3.08056ZM6.00007 3.64306C6.00201 3.49249 6.06269 3.34864 6.16917 3.24216C6.27565 3.13568 6.4195 3.075 6.57007 3.07306H6.65257C8.44054 3.29446 10.0808 4.17745 11.2501 5.54806V19.7156C9.96406 18.4838 8.33977 17.6639 6.58507 17.3606C6.41588 17.3225 6.26513 17.2269 6.15847 17.0902C6.05181 16.9534 5.99583 16.7839 6.00007 16.6106V3.64306ZM3.84757 19.9031C3.74122 19.917 3.63311 19.908 3.53054 19.8766C3.42797 19.8452 3.33333 19.7922 3.25301 19.7211C3.17268 19.65 3.10853 19.5625 3.0649 19.4645C3.02127 19.3665 2.99916 19.2603 3.00007 19.1531V6.45556C2.99653 6.2801 3.05464 6.10896 3.16427 5.97192C3.2739 5.83488 3.42811 5.74062 3.60007 5.70556C3.90007 5.64556 4.20007 5.60056 4.50007 5.55556V16.6256C4.49992 17.1508 4.68357 17.6596 5.01917 18.0637C5.35478 18.4678 5.82119 18.7418 6.33757 18.8381C7.44079 19.0318 8.48499 19.4757 9.39007 20.1356C7.57088 19.7308 5.69428 19.652 3.84757 19.9031ZM21.0001 19.1531C21.001 19.2603 20.9789 19.3665 20.9352 19.4645C20.8916 19.5625 20.8275 19.65 20.7471 19.7211C20.6668 19.7922 20.5722 19.8452 20.4696 19.8766C20.367 19.908 20.2589 19.917 20.1526 19.9031C18.3059 19.652 16.4293 19.7308 14.6101 20.1356C15.5152 19.4757 16.5593 19.0318 17.6626 18.8381C18.179 18.7418 18.6454 18.4678 18.981 18.0637C19.3166 17.6596 19.5002 17.1508 19.5001 16.6256V5.57056C19.8001 5.61556 20.1001 5.66056 20.4076 5.72056C20.5781 5.75715 20.7306 5.85206 20.8388 5.98895C20.9469 6.12584 21.004 6.29615 21.0001 6.47056V19.1531Z"
                        fill="currentColor"
                      />
                    </svg>
                    Semesters :
                  </span>
                  <span className="td_semibold td_accent_color">{course.semesters || "N/A"}</span>
                </li>
                <li>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3462 15.852V13.3536L18.2918 13.7638L18.2887 13.7569L18.2636 13.7112C17.8596 13.0822 17.2062 12.6445 16.4704 12.5111L13.9333 12.0495V11.8492C14.8821 11.2983 15.5769 10.3583 15.7934 9.24716C16.4963 9.10178 17.0264 8.47814 17.0264 7.73271V3.91391C17.0264 2.83481 16.3196 1.89374 15.2943 1.58752L15.1009 1.39421C14.2016 0.494893 13.0061 0 11.7345 0C9.10963 0 6.97386 2.13539 6.97386 4.76064V7.73271C6.97386 8.47814 7.50394 9.10178 8.20684 9.24716C8.42374 10.3583 9.11814 11.2986 10.0669 11.8492V12.0495L7.53023 12.5107C6.79523 12.6441 6.14221 13.081 5.73779 13.7097L5.71459 13.7661L4.65405 13.3536V15.852C4.01455 15.852 3.49414 16.3725 3.49414 17.012V18.5585C3.49414 19.198 4.01455 19.7184 4.65405 19.7184V21.1428L12.0001 24L19.3462 21.1428V19.7184C19.9857 19.7184 20.5061 19.198 20.5061 18.5585V17.012C20.5061 16.3725 19.9857 15.852 19.3462 15.852ZM14.6578 12.9674L16.332 13.2716C16.8249 13.3613 17.2615 13.6459 17.5526 14.0511L13.8119 15.5056L14.6578 12.9674ZM10.8731 12.2038C11.2299 12.3128 11.6081 12.3723 12.0001 12.3723C12.3922 12.3723 12.7703 12.3128 13.1272 12.2038L12.0001 13.0489L10.8731 12.2038ZM11.4117 13.574L10.6225 14.3627L10.1106 12.8274L10.3569 12.7829L11.4117 13.574ZM13.6433 12.7833L13.8896 12.8278L13.3777 14.3631L12.5886 13.5744L13.6433 12.7833ZM15.8665 8.39849V7.06692C16.0965 7.20108 16.2531 7.44776 16.2531 7.73271C16.2531 8.01766 16.0965 8.26433 15.8665 8.39849ZM8.13376 8.39849C7.90372 8.26433 7.74713 8.01766 7.74713 7.73271C7.74713 7.44776 7.90372 7.20108 8.13376 7.06692V8.39849ZM8.13376 5.79953V6.24107C7.99612 6.27702 7.86699 6.33115 7.74713 6.40113V4.76064C7.74713 2.56223 9.5357 0.773271 11.7345 0.773271C12.7993 0.773271 13.8011 1.18813 14.5542 1.9413L14.8952 2.28269L14.9992 2.30821C15.7377 2.49264 16.2531 3.15301 16.2531 3.91391V6.40113C16.1332 6.33115 16.0041 6.27664 15.8665 6.24107V5.79953H14.6405C13.5927 5.79953 12.5913 5.29922 11.963 4.46138L11.6556 4.05078L10.8874 4.81941C10.2548 5.45156 9.4143 5.79953 8.5204 5.79953H8.13376ZM8.90704 8.50598V6.55502C9.86164 6.46648 10.7474 6.05239 11.4341 5.36611L11.5845 5.21571C12.3597 6.07133 13.4763 6.5728 14.6405 6.5728H15.0932V8.50598C15.0932 10.2114 13.7056 11.5991 12.0001 11.5991C10.2947 11.5991 8.90704 10.2114 8.90704 8.50598ZM7.66826 13.2716L9.34239 12.9674L10.1883 15.5056L6.44687 14.0507C6.73801 13.6451 7.1753 13.3613 7.66826 13.2716ZM4.26741 18.5585V17.012C4.26741 16.7985 4.44101 16.6253 4.65405 16.6253C5.29354 16.6253 5.81395 17.1457 5.81395 17.7852C5.81395 18.4247 5.29354 18.9451 4.65405 18.9451C4.44101 18.9451 4.26741 18.7719 4.26741 18.5585ZM11.6135 23.0195L5.42732 20.6142V19.5545C6.10896 19.2552 6.58722 18.5759 6.58722 17.7852C6.58722 16.9946 6.10896 16.3152 5.42732 16.016V14.4841L11.6135 16.8898V23.0195ZM10.4656 15.6139L12.0001 14.0789L13.5347 15.6135L12.0001 16.2105L10.4656 15.6139ZM18.5729 20.6138L12.3868 23.0191V16.8898L18.5729 14.4841V16.016C17.8913 16.3152 17.413 16.9946 17.413 17.7852C17.413 18.5759 17.8913 19.2552 18.5729 19.5545V20.6138ZM19.7328 18.5585C19.7328 18.7719 19.5592 18.9451 19.3462 18.9451C18.7067 18.9451 18.1863 18.4247 18.1863 17.7852C18.1863 17.1457 18.7067 16.6253 19.3462 16.6253C19.5592 16.6253 19.7328 16.7985 19.7328 17.012V18.5585Z"
                        fill="currentColor"
                      />
                    </svg>
                    Available Seats :
                  </span>
                  <span className="td_semibold td_accent_color">{course.seats || "N/A"}</span>
                </li>
                <li>
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16Z" fill="currentColor"/>
                    </svg>
                    Category :
                  </span>
                  <span className="td_semibold td_accent_color">{course.category || "N/A"}</span>
                </li>
              </ul>
              <div className="td_height_30 td_height_lg_30" />
              <Link
                to="/students-registrations"
                className="td_btn td_style_1 td_radius_10 td_medium w-100"
              >
                <span className="td_btn_in td_white_color td_accent_bg">
                  <span>Apply Now</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailContent;
