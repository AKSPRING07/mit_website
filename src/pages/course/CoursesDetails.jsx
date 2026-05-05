import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../layouts/Layout";
import { CourseDetailContent } from "../../components/courses/CourseDetailContent";
import { api } from "../../lib/api";
import { getCourseBySlug } from "../../data/courseCatalog";

export const CoursesDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await api.getCourse(id);
        if (response?.data) {
          const raw = response.data;
          const formatted = {
            id: raw.id,
            ...(raw.attributes || raw),
          };
          setCourse(formatted);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout
        header={1}
        footer={1}
        breadcrumbTitle={"Course Details"}
        breadcrumbSubtitle={"Loading..."}
      >
        <div className="container">
          <div className="td_height_120 td_height_lg_80" />
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <p>Loading course details...</p>
          </div>
          <div className="td_height_120 td_height_lg_80" />
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout
        header={1}
        footer={1}
        breadcrumbTitle={"Course Details"}
        breadcrumbSubtitle={"Not Found"}
      >
        <div className="container">
          <div className="td_height_120 td_height_lg_80" />
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <p>Course not found</p>
          </div>
          <div className="td_height_120 td_height_lg_80" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      header={1}
      footer={1}
      showBreadcrumb={false}
    >
      <CourseDetailContent course={course} />
    </Layout>
  );
};
