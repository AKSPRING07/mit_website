import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesOneCMS } from "../../components/courses/CoursesOneCMS";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import DESSF from "../../assets/img/DESSF.jpeg";

export const ITI = () => {
  const { banner, loading } = usePageBanner('iti');

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "ITI Programs"} 
      breadcrumbSubtitle={banner?.subtitle || "ITI"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <CoursesOneCMS defaultTab="tab_2" />
    </Layout>
  );
};
