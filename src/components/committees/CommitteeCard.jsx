import React from "react";
import { Link } from "react-router-dom";

export const CommitteeCard = ({
  title,
  link,
  excerpt,
}) => {
  const getCommitteeIcon = (committeeTitle = "") => {
    const normalizedTitle = committeeTitle.toLowerCase();

    if (normalizedTitle.includes("ragging")) return "fa-shield-halved";
    if (normalizedTitle.includes("grievance")) return "fa-scale-balanced";
    if (normalizedTitle.includes("complaint")) return "fa-user-shield";
    if (normalizedTitle.includes("disclosure")) return "fa-file-lines";
    if (normalizedTitle.includes("approval")) return "fa-circle-check";
    if (normalizedTitle.includes("sc/st")) return "fa-people-group";
    if (normalizedTitle.includes("vishaka") || normalizedTitle.includes("harassment")) {
      return "fa-hand-holding-heart";
    }

    return "fa-building-shield";
  };

  const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const summary = stripHtml(excerpt);
  const shortSummary = summary.length > 120 ? `${summary.slice(0, 117)}...` : summary;

  return (
    <article className="td_post td_style_1 td_committee_card">
      <div className="td_post_info td_committee_card_info">
        <div className="td_committee_card_top">
          <span className="td_committee_card_badge">Committee</span>
          <div className="td_committee_card_icon" aria-hidden="true">
            <i className={`fa-solid ${getCommitteeIcon(title)}`}></i>
          </div>
        </div>

        <h2 className="td_post_title td_fs_24 td_medium td_mb_16 td_committee_card_title">
          <Link to={link}>{title}</Link>
        </h2>

        <p className="td_committee_card_text">
          {shortSummary || "View committee details, responsibilities, members, and official information."}
        </p>

        <Link
          to={link}
          className="td_btn td_style_1 td_type_3 td_radius_30 td_medium td_committee_card_btn"
        >
          <span className="td_btn_in">
            <span>Read More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </Link>
      </div>
    </article>
  );
};
