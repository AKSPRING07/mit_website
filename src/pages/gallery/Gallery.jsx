import React from "react";
import { Layout } from "../../layouts/Layout";
import { GalleryGrid } from "../../components/gallery/GalleryGrid";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import DESSF from "../../assets/img/DESSF.jpeg";

export const Gallery = () => {
  const { banner, loading } = usePageBanner('gallery');

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "Gallery"} 
      breadcrumbSubtitle={banner?.subtitle || "Gallery"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <GalleryGrid />
    </Layout>
  );
};
