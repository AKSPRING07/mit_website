import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { CoursesOneItem } from "./CoursesOneItem";

export const CoursesGridCMS = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      const response = await api.getGallery();
      
      if (response && response.data) {
        const formatted = response.data.map((item) => {
          // Support both nested and flat local data shapes.
          const attrs = item.attributes || item;
          return {
            id: item.id,
            src: getImageUrl(attrs.image) || '/placeholder.jpg',
            subtitle: attrs.category || 'Gallery',
            title: attrs.title,
            description: attrs.description,
            seats: attrs.seats || 0,
            semesters: attrs.semesters || 0,
            totalRatings: attrs.rating || 5,
          };
        });
        setGalleries(formatted);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container text-center">
          <p>Loading gallery...</p>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    );
  }

  return (
    <section>
      <div className="td_height_112 td_height_lg_75" />
      <div className="container">
        <div className="row td_gap_y_30">
          {galleries.length > 0 ? (
            galleries.map((item) => (
              <div className="col-xl-4 col-lg-6" key={item.id}>
                <CoursesOneItem {...item} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No gallery items found.</p>
            </div>
          )}
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
