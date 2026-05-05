import React from "react";
import { Link } from "react-router-dom";

export const AssociationCard = ({
  image,
  title,
  link,
}) => {
  return (
    <div className="td_post td_style_1">
      <Link to={link} className="td_post_thumb d-block">
        <img src={image} alt={title} />
        <i className="fa-solid fa-link"></i>
      </Link>

      <div className="td_post_info">
        <h2 className="td_post_title td_fs_24 td_medium td_mb_16">
          <Link to={link}>{title}</Link>
        </h2>

        <Link
          to={link}
          className="td_btn td_style_1 td_type_3 td_radius_30 td_medium"
        >
          <span className="td_btn_in td_accent_color">
            <span>Read More</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
