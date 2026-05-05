import React from "react";
import { Layout } from "../../layouts/Layout";
import { AlumniList } from "../../components/alumni/AlumniList";
import DESSF from "../../assets/img/DESSF.jpeg";
import { usePageBanner } from "../../lib/hooks/usePageBanner";

export const Alumni = () => {
  const { banner, loading } = usePageBanner('alumni');

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={banner?.title || "Alumni"}
      breadcrumbSubtitle={banner?.subtitle || "Alumni"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <AlumniList />
    </Layout>
  );
};
