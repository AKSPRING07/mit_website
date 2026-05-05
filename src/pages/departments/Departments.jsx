import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesOneCMS } from "../../components/courses/CoursesOneCMS";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import DESSF from "../../assets/img/DESSF.jpeg";

export const Departments = () => {
  const { banner, loading } = usePageBanner('departments');

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "Our Departments"} 
      breadcrumbSubtitle={banner?.subtitle || "Departments"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <CoursesOneCMS />
    </Layout>
  );
};
