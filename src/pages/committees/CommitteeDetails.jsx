import React, { useState, useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { BlogContainer } from "../../components/blogs/BlogContainer";
import committeeFallbackImage from "../../assets/img/others/banner_bg/commitee.jpg";

export const CommitteeDetails = () => {
  const { id } = useParams();
  const [committee, setCommittee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittee = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching committee with documentId:', id);
        const response = await api.getCommittee(id);
        console.log('Committee response:', response);
        if (response?.data) {
          setCommittee(response.data);
        }
      } catch (error) {
        console.error('Error fetching committee:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittee();
  }, [id]);

  if (loading) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Committee Details" breadcrumbSubtitle="Loading...">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <p>Loading committee details...</p>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  if (!committee && id) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Committee Not Found" breadcrumbSubtitle="Error">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <h3>Committee not found</h3>
            <Link to="/committees" className="td_btn td_style_1 td_radius_10 td_medium">
              <span className="td_btn_in td_white_color td_accent_bg">
                <span>Back to Committees</span>
              </span>
            </Link>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  // Handle both Strapi v4 (attributes) and v5 (flat) structures
  const attrs = committee?.attributes || committee;
  const title = attrs?.title || "Committee Details";
  const description = attrs?.description || "No description available.";
  const members = attrs?.members;
  const image = getImageUrl(attrs?.image) || attrs?.imageUrl || committeeFallbackImage;
  const date = attrs?.date ? new Date(attrs.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "";

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={title}
      breadcrumbSubtitle="Committee Details"
    >
      <BlogContainer>
        <article className="td_post td_details">
          {image && (
            <div className="td_post_thumb">
              <img src={image} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </div>
          )}
          
          <div className="td_height_40 td_height_lg_40" />
          
          <div className="td_post_meta td_fs_14 td_medium td_mb_20">
            {date && (
              <span>
                <i className="fa-regular fa-calendar"></i> {date}
              </span>
            )}
            <span>
              <i className="fa-regular fa-user"></i> MIT Polytechnic
            </span>
          </div>

          <h2 className="td_post_title td_fs_36 td_mb_30">{title}</h2>

          <div 
            className="td_post_content"
            dangerouslySetInnerHTML={{ __html: description }} 
          />

          {members && (
            <>
              <div className="td_height_40 td_height_lg_40" />
              <h3 className="td_fs_24 td_mb_20">Committee Members</h3>
              <div 
                className="td_committee_members"
                dangerouslySetInnerHTML={{ __html: members }} 
              />
            </>
          )}

          <div className="td_height_40 td_height_lg_40" />
          
          <Link to="/committees" className="td_btn td_style_1 td_radius_10 td_medium">
            <span className="td_btn_in td_white_color td_accent_bg">
              <span>Back to Committees</span>
            </span>
          </Link>
        </article>
      </BlogContainer>
    </Layout>
  );
};
