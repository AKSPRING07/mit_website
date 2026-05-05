import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";

import shape from "../../assets/img/home_4/team_shape.png";
import teamMember1 from "../../assets/img/home_2/team_member_1.jpg";

export const TeamAll = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackTeamMembers = [
    {
      id: "fallback-principal",
      src: teamMember1,
      title: "Principal",
      designation: "Academic Leadership",
    },
    {
      id: "fallback-faculty-1",
      src: teamMember1,
      title: "Senior Faculty",
      designation: "Engineering Department",
    },
    {
      id: "fallback-faculty-2",
      src: teamMember1,
      title: "Training Coordinator",
      designation: "Student Support and Placement",
    },
    {
      id: "fallback-faculty-3",
      src: teamMember1,
      title: "Lab Instructor",
      designation: "Practical and Technical Training",
    },
  ];

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await api.getTeamMembers();
        if (response?.data) {
          setTeamMembers(response.data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const getTeamImageUrl = (imageData) => {
    return getImageUrl(imageData) || teamMember1;
  };

  const displayTeamMembers = teamMembers.length > 0
    ? teamMembers.map(member => ({
        src: getTeamImageUrl(member.attributes?.photo),
        title: member.attributes?.name || "Team Member",
        designation: member.attributes?.position || "Faculty",
        id: member.id
      }))
    : fallbackTeamMembers;

  if (loading) {
    return (
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container text-center">
          <p>Loading team members...</p>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    );
  }

  return (
    <section>
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="row td_gap_y_30">
          {displayTeamMembers.map((member, index) => (
            <div key={member.id || index} className="col-lg-3 col-md-4 col-sm-6">
              <Item
                src={member.src}
                title={member.title}
                designation={member.designation}
              />
            </div>
          ))}
        </div>

        <div className="td_height_60 td_height_lg_40" />

        {/* pagination */}
        <ul className="td_page_pagination td_mp_0 td_fs_18 td_semibold">
          <li>
            <button className="td_page_pagination_item td_center" type="button">
              <i className="fa-solid fa-angles-left"></i>
            </button>
          </li>
          <li>
            <Link className="td_page_pagination_item td_center active" to="#">
              1
            </Link>
          </li>
          <li>
            <Link className="td_page_pagination_item td_center" to="#">
              2
            </Link>
          </li>
          <li>
            <Link className="td_page_pagination_item td_center" to="#">
              3
            </Link>
          </li>
          <li>
            <Link className="td_page_pagination_item td_center" to="#">
              4
            </Link>
          </li>
          <li>
            <button className="td_page_pagination_item td_center" type="button">
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </li>
        </ul>
      </div>

      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};

const Item = ({ src, title, designation }) => {
  return (
    <div className="td_team td_style_3 text-center position-relative">
      <div className="td_team_thumb_wrap td_mb_20">
        <div className="td_team_thumb">
          <img src={src} alt="" className="w-100 td_radius_10" />
        </div>
        <img src={shape} className="td_team_thumb_shape" alt="" />
      </div>

      <div className="td_team_info td_white_bg">
        <h3 className="td_team_member_title td_fs_24 td_semibold mb-0">
          {title}
        </h3>
        <p className="td_team_member_designation mb-0 td_fs_18 td_opacity_7 td_heading_color">
          {designation}
        </p>
      </div>
    </div>
  );
};
