import React from "react";
import { Layout } from "../../layouts/Layout";
import { ScStCommitteeSection } from "../../components/committees/ScStCommitteeSection";
import DESSF from "../../assets/img/DESSF.jpeg";

export const ScStCommittee = () => {
  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="SC/ST Committee"
      breadcrumbSubtitle="Committee Details & Support"
      breadcrumbImage={DESSF}
    >
      <ScStCommitteeSection />
    </Layout>
  );
};

export default ScStCommittee;
