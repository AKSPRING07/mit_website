import React, { useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import { useLocation } from "react-router-dom";
import { CommitteesList } from "../../components/committees/CommitteesList";
import { MandatoryDisclosureSection } from "../../components/committees/MandatoryDisclosureSection";
import { ScStCommitteeSection } from "../../components/committees/ScStCommitteeSection";
import { VishakaCommitteeSection } from "../../components/committees/VishakaCommitteeSection";
import DESSF from "../../assets/img/DESSF.jpeg";

export const Committees = () => {
  const { banner } = usePageBanner('committees');
  const location = useLocation();
  
  // Extract hash from URL (e.g., #antiragging)
  const hash = location.hash.replace('#', '');

  useEffect(() => {
    if (!hash) return;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "Committees"} 
      breadcrumbSubtitle={banner?.subtitle || "Our Committees"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      {hash === "disclosure" ? (
        <MandatoryDisclosureSection />
      ) : hash === "scst" ? (
        <ScStCommitteeSection />
      ) : hash === "harassment" ? (
        <VishakaCommitteeSection />
      ) : (
        <CommitteesList filterSlug={hash} />
      )}
    </Layout>
  );
};
