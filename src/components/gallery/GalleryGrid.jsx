import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import "../../assets/css/gallery-showcase.css";

const sections = ["All", "Event", "Campus"];

const normalizeSection = (value = "") => {
  const section = value.toString().trim().toLowerCase();

  if (section.includes("event")) return "Event";
  if (section.includes("campus")) return "Campus";

  return "Other";
};

const createSummary = (items) => {
  const campusCount = items.filter((item) => item.section === "Campus").length;
  const eventCount = items.filter((item) => item.section === "Event").length;

  return [
    { label: "Campus Moments", value: campusCount },
    { label: "Event Highlights", value: eventCount },
    { label: "Photo Stories", value: items.length },
  ];
};

export const GalleryGrid = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);

      try {
        const response = await api.getGallery({
          pagination: {
            page: 1,
            pageSize: 100,
          },
        });

        if (response?.data) {
          const formatted = response.data
            .map((item) => {
              const attrs = item.attributes || item;
              const normalizedSection = normalizeSection(attrs.section || attrs.category || "");

              return {
                id: item.id,
                image: getImageUrl(attrs.image),
                title: attrs.title || "MIT Gallery",
                description: attrs.caption || "A glimpse from campus life and events.",
                section: normalizedSection,
                rawSection: attrs.section || attrs.category || "Other",
              };
            })
            .filter((item) => !!item.image && (item.section === "Campus" || item.section === "Event"));

          setGalleries(formatted);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredGalleries = useMemo(() => {
    if (activeSection === "All") return galleries;
    return galleries.filter((item) => item.section === activeSection);
  }, [activeSection, galleries]);

  const marqueeItems = useMemo(() => {
    const baseItems = filteredGalleries.length > 0 ? filteredGalleries : galleries;
    return [...baseItems, ...baseItems];
  }, [filteredGalleries, galleries]);

  const summaryItems = useMemo(() => createSummary(galleries), [galleries]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const handlePrevImage = () => {
    const currentIndex = filteredGalleries.findIndex((g) => g.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(filteredGalleries[currentIndex - 1]);
    }
  };

  const handleNextImage = () => {
    const currentIndex = filteredGalleries.findIndex((g) => g.id === selectedImage.id);
    if (currentIndex < filteredGalleries.length - 1) {
      setSelectedImage(filteredGalleries[currentIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredGalleries]);

  return (
    <section className="td_gallery_showcase_section">
      <div className="td_height_70 td_height_lg_50" />
      <div className="container">
        <div className="td_gallery_showcase_intro">
          <div>
            <p className="td_gallery_showcase_kicker">Photo Gallery</p>
            <h2 className="td_gallery_showcase_heading">Campus and event moments arranged in a cleaner visual experience.</h2>
          </div>

          <div className="td_gallery_showcase_stats">
            {summaryItems.map((item) => (
              <div className="td_gallery_showcase_stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="td_gallery_filter_bar">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              className={`td_gallery_filter_chip ${activeSection === section ? "active" : ""}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="td_height_30 td_height_lg_20" />

        {loading ? (
          <div className="text-center py-5">
            <p>Loading gallery items...</p>
          </div>
        ) : filteredGalleries.length === 0 ? (
          <div className="text-center py-5">
            <p>No gallery items found in "{activeSection}".</p>
          </div>
        ) : (
          <>
            <div className="td_gallery_marquee">
              <div className="td_gallery_marquee_track">
                {marqueeItems.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    type="button"
                    className="td_gallery_marquee_card"
                    onClick={() => openLightbox(item)}
                  >
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="td_height_50 td_height_lg_30" />

            <div className="row td_gallery_grid_row">
              {filteredGalleries.map((item) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                  <button
                    type="button"
                    className="td_gallery_grid_card"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="td_gallery_grid_thumb">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="td_gallery_grid_overlay">
                      <span className="td_gallery_grid_tag">{item.section}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedImage && (
        <div className="td_gallery_lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="td_gallery_lightbox_close"
            onClick={closeLightbox}
          >
            x
          </button>

          <button
            type="button"
            className="td_gallery_lightbox_nav td_gallery_lightbox_prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="td_gallery_lightbox_body" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.title} />
            <div className="td_gallery_lightbox_caption">
              <span>{selectedImage.section}</span>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>

          <button
            type="button"
            className="td_gallery_lightbox_nav td_gallery_lightbox_next"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}

      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
