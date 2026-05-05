import { useState, useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { BlogContainer } from "../../components/blogs/BlogContainer";
import avatar1 from "../../assets/img/home_1/avatar/avatar_1.jpg";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import { findFallbackAssociationBySlug } from "../../data/associations";
import { culturalAnnualDayImages, culturalAnnualDayPrimaryImage } from "../../data/culturalImages";
import "../../assets/css/cultural-page.css";

const buildCulturalImageEntries = (images = []) =>
  images
    .map((image) => {
      if (!image) {
        return null;
      }

      if (typeof image === "object" && image.full) {
        return {
          full: image.full,
          thumbnail: image.thumbnail || image.full,
        };
      }

      const fileName = image.split("/").pop();
      const thumbnail = fileName ? `/annual-day-2025/thumbs/${fileName}` : image;

      return {
        full: image,
        thumbnail,
      };
    })
    .filter(Boolean);

export const ClubDetails = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams();
  const slug = propSlug || paramSlug;
  
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [culturalImages, setCulturalImages] = useState(
    slug === "cultural" ? buildCulturalImageEntries(culturalAnnualDayImages) : []
  );
  const { banner } = usePageBanner(slug); // Try to get a specific banner for this club if it exists

  useEffect(() => {
    const fetchClub = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Fetch all associations and filter on client side due to Strapi v5 filter issues
        const response = await api.getAssociations();
        console.log('Associations response:', response);
        console.log('Looking for slug:', slug);
        
        if (response?.data && response.data.length > 0) {
          // Filter by slug on the client side
          const foundClub = response.data.find(item => {
            const itemSlug = item.attributes?.slug || item.slug;
            console.log('Checking item:', itemSlug, 'against', slug);
            return itemSlug === slug;
          });
          
          console.log('Found club:', foundClub);
          
          if (foundClub) {
            setClub(foundClub);
          }
        }

        if (!response?.data || !(response.data || []).some(item => (item.attributes?.slug || item.slug) === slug)) {
          const fallbackClub = findFallbackAssociationBySlug(slug);
          if (fallbackClub) {
            setClub(fallbackClub);
          }
        }
      } catch (error) {
        console.error('Error fetching club:', error);
        const fallbackClub = findFallbackAssociationBySlug(slug);
        if (fallbackClub) {
          setClub(fallbackClub);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [slug]);

  useEffect(() => {
    if (slug !== "cultural") {
      setCulturalImages([]);
      return;
    }

    let isMounted = true;

    const loadCulturalImages = async () => {
      try {
        const response = await fetch("/annual-day-2025/manifest.json");

        if (!response.ok) {
          throw new Error(`Unable to load image manifest: ${response.status}`);
        }

        const manifest = await response.json();
        if (isMounted && Array.isArray(manifest?.images) && manifest.images.length > 0) {
          setCulturalImages(buildCulturalImageEntries(manifest.images));
          return;
        }
      } catch (error) {
        console.error("Error loading cultural image manifest:", error);
      }

      if (isMounted) {
        setCulturalImages(buildCulturalImageEntries(culturalAnnualDayImages));
      }
    };

    loadCulturalImages();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Loading..." breadcrumbSubtitle="Please wait">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <p>Loading details...</p>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  if (!club && slug) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Not Found" breadcrumbSubtitle="Error">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <h3>Content not found</h3>
            <p>We couldn't find the page you're looking for.</p>
            <Link to="/" className="td_btn td_style_1 td_radius_10 td_medium">
              <span className="td_btn_in td_white_color td_accent_bg">
                <span>Back to Home</span>
              </span>
            </Link>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  // Handle both Strapi v4 (attributes) and v5 (flat) structures
  const attrs = club?.attributes || club;
  const title = attrs?.title || "Club Details";
  const content = attrs?.content || attrs?.description || "No description available.";
  const image =
    (slug === "cultural"
      ? culturalImages[0]?.thumbnail || culturalImages[0]?.full || culturalAnnualDayPrimaryImage
      : null) ||
    getImageUrl(attrs?.image) ||
    attrs?.imageUrl ||
    attrs?.image ||
    '/placeholder.jpg';
  const date = attrs?.date ? new Date(attrs.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "";

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={title}
      breadcrumbSubtitle={banner?.subtitle || "Associations"}
      breadcrumbImage={banner?.imageUrl}
    >
      {slug === "cultural" ? (
        <section className="td_cultural_page">
          <div className="td_height_120 td_height_lg_80" />
          <div className="container">
            <div className="td_cultural_hero">
              <div className="td_cultural_hero_content">
                <p className="td_cultural_kicker">Association Highlight</p>
                <h2 className="td_cultural_heading">{title}</h2>
                <div
                  className="td_cultural_intro"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="td_cultural_stats">
                  <div className="td_cultural_stat">
                    <strong>{culturalImages.length}</strong>
                    <span>Photos</span>
                  </div>
                  <div className="td_cultural_stat">
                    <strong>2025</strong>
                    <span>Annual Day</span>
                  </div>
                  <div className="td_cultural_stat">
                    <strong>MIT</strong>
                    <span>Cultural Moments</span>
                  </div>
                </div>
              </div>

                <div className="td_cultural_hero_visual">
                  {image && image !== "/placeholder.jpg" ? (
                  <img src={image} alt={title} />
                ) : null}
                <div className="td_cultural_visual_caption">
                  <h3>Annual Day 2025</h3>
                  <p>Snapshots from the Cultural Association celebrations.</p>
                </div>
              </div>
            </div>

            {culturalImages.length > 0 ? (
              <>
                <div className="td_height_60 td_height_lg_40" />
                <div className="row td_cultural_grid">
                  {culturalImages.map((item, index) => (
                    <div className="col-lg-4 col-md-6" key={item.full}>
                      <button type="button" className="td_cultural_card">
                        <img
                          src={item.thumbnail}
                          alt={`Annual Day 2025 ${index + 1}`}
                          onError={(event) => {
                            event.currentTarget.src = item.full;
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div className="td_height_120 td_height_lg_80" />
        </section>
      ) : (
      <BlogContainer>
        <div className="td_blog_details_head td_mb_40">
          {image && image !== '/placeholder.jpg' && (
            <img src={image} alt={title} className="w-100 mb-4" style={{ maxHeight: '500px', objectFit: 'cover' }} />
          )}

          <div className="td_blog_details_head_meta">
            <div className="td_blog_details_avatar">
              <img src={avatar1} alt="Avatar" />
              <p className="mb-0 td_heading_color td_bold">
                <span className="td_normal td_opacity_5">By</span> MIT Polytechnic
              </p>
            </div>
            {date && (
              <ul className="td_blog_details_head_meta_list td_mp_0 td_heading_color">
                <li>{date}</li>
              </ul>
            )}
          </div>
        </div>

        <div className="td_blog_details_content">
          <h2 className="td_mb_20">{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {slug === "cultural" && culturalImages.length > 0 ? (
          <>
            <div className="td_height_60 td_height_lg_40" />
            <div className="td_blog_details_content">
              <h3 className="td_mb_30">Annual Day 2025 Photos</h3>
              <div className="row td_gap_y_30">
                {culturalImages.map((item, index) => (
                  <div className="col-lg-4 col-md-6" key={item.full}>
                    <div className="td_post td_style_1">
                      <div className="td_post_thumb d-block">
                        <img
                          src={item.thumbnail}
                          alt={`Annual Day 2025 ${index + 1}`}
                          onError={(event) => {
                            event.currentTarget.src = item.full;
                          }}
                          style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "18px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </BlogContainer>
      )}
    </Layout>
  );
};
