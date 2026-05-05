import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { BlogPagination } from "./BlogPagination";
import { BlogItem } from "./BlogItem";

export const BlogAllCMS = ({ category = null }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = category ? { filters: { category: { $eq: category } } } : {};
        const response = await api.getBlogs(params);
        
        if (response && response.data && response.data.length > 0) {
          const formatted = response.data.map((blog) => {
            const attrs = blog.attributes || blog;
            return {
              id: blog.id,
              image: getImageUrl(attrs.image) || attrs.imageUrl || '/placeholder.jpg',
              date: new Date(attrs.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              author: attrs.author || 'Admin',
              title: attrs.title,
              excerpt: attrs.excerpt || attrs.content?.substring(0, 100) + '...',
              link: `/blog-details/${blog.id}`,
            };
          });
          setBlogPosts(formatted);
        } else {
          setBlogPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

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
    <section>
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="row td_gap_y_30">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <div className="col-lg-4" key={post.id}>
                <BlogItem {...post} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>{category === "alumni" ? "No alumni details found." : "No blog posts found."}</p>
            </div>
          )}
        </div>
        {blogPosts.length > 0 && (
          <>
            <div className="td_height_60 td_height_lg_40" />
            <BlogPagination />
          </>
        )}
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
