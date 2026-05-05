import React from "react";
import { Layout } from "../../layouts/Layout";
import { BlogAllCMS } from "../../components/blogs/BlogAllCMS";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import { useLocation } from "react-router-dom";
import { AssociationsList } from "../../components/associations/AssociationsList";
import DESSF from "../../assets/img/DESSF.jpeg";

export const Associations = () => {
  const { banner, loading } = usePageBanner('associations');
  const location = useLocation();
  
  // Extract hash from URL (e.g., #cultural)
  const hash = location.hash.replace('#', '');

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "Associations"} 
      breadcrumbSubtitle={banner?.subtitle || "Our Associations & Affiliations"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <AssociationsList filterSlug={hash} />
    </Layout>
  );
};
