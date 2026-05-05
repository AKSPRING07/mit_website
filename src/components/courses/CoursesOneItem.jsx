import React from "react";
import { Link } from "react-router-dom";

import userIcon from "../../assets/img/icons/user_3.svg";
import bookIcon from "../../assets/img/icons/book.svg";

export const CoursesOneItem = ({
  id,
  seats,
  semesters,
  subtitle,
  title,
  description,
  priceLabel,
  detailLink,
  duration,
}) => {
  const courseLink = detailLink || "/online-payment";

  return (
    <div className="td_course_program_card td_card td_style_3 d-block td_radius_10">
      <div className="td_card_info td_white_bg">
        <div className="td_card_info_in">
          <div className="td_course_program_top">
            <Link
              to={courseLink}
              className="td_card_category td_fs_14 td_bold td_heading_color td_mb_14"
            >
              <span>{subtitle}</span>
            </Link>

            <div className="td_course_program_icon" aria-hidden="true">
              {subtitle?.slice(0, 2) || "C"}
            </div>
          </div>

          <h2
            className="td_card_title td_fs_24 td_mb_16"
            style={{ overflowWrap: "anywhere" }}
          >
            <Link to={courseLink}>{title}</Link>
          </h2>

          <p className="td_card_subtitle td_heading_color td_opacity_7 td_mb_20">
            {description}
          </p>

          <div className="td_course_program_meta_wrap">
            <div className="td_course_program_stats">
              <div className="td_course_program_stat">
                <div className="td_course_program_stat_icon">
                  <img src={userIcon} alt="Seats icon" />
                </div>
                <div className="td_course_program_stat_text">
                  <strong>{seats}</strong>
                  <span>Seats</span>
                </div>
              </div>

              <div className="td_course_program_stat">
                <div className="td_course_program_stat_icon">
                  <img src={bookIcon} alt="Duration icon" />
                </div>
                <div className="td_course_program_stat_text">
                  <strong>{duration?.split(' ')[0] || semesters}</strong>
                  <span>{duration?.split(' ')[1] || 'Semesters'}</span>
                </div>
              </div>
            </div>
          </div>

          {priceLabel && (
            <div className="td_fs_18 td_medium td_accent_color td_mb_18">
              Course Fee: {priceLabel}
            </div>
          )}

          <div className="td_card_btn">
            <Link
              to={courseLink}
              className="td_btn td_style_1 td_radius_10 td_medium"
            >
              <span className="td_btn_in td_white_color td_accent_bg">
                <span>View Details</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
