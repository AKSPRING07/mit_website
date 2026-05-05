import React from "react";
import { Layout } from "../../layouts/Layout";
import { VishakaCommitteeSection } from "../../components/committees/VishakaCommitteeSection";
import DESSF from "../../assets/img/DESSF.jpeg";

export const VishakaCommittee = () => {
  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="Sexual Harassment Redressal Committee"
      breadcrumbSubtitle="Committee Details & Support"
      breadcrumbImage={DESSF}
    >
      <VishakaCommitteeSection />
    </Layout>
  );
};

export default VishakaCommittee;
