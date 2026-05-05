import React, { useState, useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { BlogContainer } from "../../components/blogs/BlogContainer";
import avatar1 from "../../assets/img/home_1/avatar/avatar_1.jpg";

export const AssociationDetails = () => {
  const { id } = useParams();
  const [association, setAssociation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssociation = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        console.log('Fetching association with documentId:', id);
        const response = await api.getAssociation(id);
        console.log('Association response:', response);
        if (response?.data) {
          setAssociation(response.data);
        }
      } catch (error) {
        console.error('Error fetching association:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociation();
  }, [id]);

  if (loading) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Association Details" breadcrumbSubtitle="Loading...">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <p>Loading association details...</p>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  if (!association && id) {
    return (
      <Layout header={1} footer={1} breadcrumbTitle="Association Not Found" breadcrumbSubtitle="Error">
        <BlogContainer>
          <div className="text-center" style={{ padding: '100px 0' }}>
            <h3>Association not found</h3>
            <Link to="/associations" className="td_btn td_style_1 td_radius_10 td_medium">
              <span className="td_btn_in td_white_color td_accent_bg">
                <span>Back to Associations</span>
              </span>
            </Link>
          </div>
        </BlogContainer>
      </Layout>
    );
  }

  // Handle both Strapi v4 (attributes) and v5 (flat) structures
  const attrs = association?.attributes || association;
  const title = attrs?.title || "Association Details";
  const content = attrs?.content || "No description available.";
  const image = getImageUrl(attrs?.image) || attrs?.imageUrl || '/placeholder.jpg';
  const date = attrs?.date ? new Date(attrs.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "";

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={title}
      breadcrumbSubtitle="Association Details"
    >
      <BlogContainer>
        <div className="td_blog_details_head td_mb_40">
          <img src={image} alt={title} className="w-100 mb-4" style={{ maxHeight: '500px', objectFit: 'cover' }} />

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
      </BlogContainer>
    </Layout>
  );
};
