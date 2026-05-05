import React from "react";
import { Layout } from "../../layouts/Layout";
import { MandatoryDisclosureSection } from "../../components/committees/MandatoryDisclosureSection";
import DESSF from "../../assets/img/DESSF.jpeg";

export const MandatoryDisclosure = () => {
  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="Mandatory Disclosure"
      breadcrumbSubtitle="Committee Order & Disclosure"
      breadcrumbImage={DESSF}
    >
      <MandatoryDisclosureSection />
    </Layout>
  );
};

export default MandatoryDisclosure;
