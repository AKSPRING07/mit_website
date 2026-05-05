import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import calendarIcon from "../../assets/img/icons/calendar.svg";
import userIcon from "../../assets/img/icons/user.svg";
import "../../assets/css/alumni-page.css";

export const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const response = await api.getAlumnis();
        if (response?.data) {
          const formatted = response.data.map((item) => {
            const attrs = item.attributes || item;
            const contentText = (attrs.content || attrs.excerpt || "")
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim();

            return {
              id: item.id,
              image:
                getImageUrl(attrs.image) ||
                getImageUrl(attrs.photo) ||
                getImageUrl(attrs.profileImage) ||
                getImageUrl(attrs.thumbnail) ||
                attrs.imageUrl ||
                "/placeholder.jpg",
              date: attrs.batch || "MIT Alumni",
              author: attrs.company || attrs.designation || "Alumni",
              title: attrs.name,
              excerpt: contentText ? `${contentText.slice(0, 110)}${contentText.length > 110 ? "..." : ""}` : "Alumni profile",
            };
          });
          setAlumni(formatted);
        } else {
          setAlumni([]);
        }
      } catch (error) {
        console.error("Error fetching alumni:", error);
        setAlumni([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container text-center">
          <p>Loading...</p>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    );
  }

  return (
    <section className="td_alumni_section">
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="row td_gap_y_30 td_alumni_grid">
          {alumni.length > 0 ? (
            alumni.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="td_post td_style_1 td_alumni_card">
                  <div className="td_post_thumb d-block">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="td_post_info">
                    <div className="td_post_meta td_fs_14 td_medium td_mb_20">
                      <span>
                        <img src={calendarIcon} alt="calendar icon" />
                        {item.date}
                      </span>

                      <span>
                        <img src={userIcon} alt="user icon" />
                        {item.author}
                      </span>
                    </div>

                    <h2 className="td_post_title td_fs_24 td_medium td_mb_16">
                      {item.title}
                    </h2>

                    <p className="td_post_subtitle td_heading_color td_opacity_7">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No alumni details found in the local site data.</p>
            </div>
          )}
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
