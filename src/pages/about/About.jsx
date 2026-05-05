import React from "react";
import { Layout } from "../../layouts/Layout";
import { AboutOne } from "../../components/about/AboutOne";
import { CampusOne } from "../../components/campus/CampusOne";
import { DepartmentOne } from "../../components/departments/DepartmentOne";
import { VideoOne } from "../../components/videos/VideoOne";
import { BlogOne } from "../../components/blogs/BlogOne";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import DESSF from "../../assets/img/DESSF.jpeg";

export const About = () => {
  const { banner, loading } = usePageBanner('about');

  return (
    <Layout 
      header={1} 
      footer={1}
      breadcrumbTitle={banner?.title || "About Us"} 
      breadcrumbSubtitle={banner?.subtitle || "About Us"} 
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      {/* about */}
      <AboutOne />

      {/* campus */}
      <CampusOne />

      {/* departments */}
      <DepartmentOne />

      {/* video */}
      <VideoOne />

      {/* blog */}
      <BlogOne />
    </Layout>
  );
};
