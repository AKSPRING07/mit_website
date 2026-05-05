import React from "react";
import { Layout } from "../../layouts/Layout";
import DESSF from "../../assets/img/DESSF.jpeg";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import "../../assets/css/pledge-page.css";

export const Pledge = () => {
  const { banner } = usePageBanner("pledge");
  const pledgePoints = [
    "I will not indulge in any behavior or act that may come under the definition of ragging.",
    "I will not participate in, support, or encourage ragging in any form.",
    "I will not hurt anyone physically, mentally, emotionally, or in any other manner.",
    "I understand that any act of ragging is a punishable offense under the applicable UGC Regulations and the law in force.",
    "I will cooperate with the college authorities in maintaining a safe, respectful, and ragging-free campus.",
  ];

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={banner?.title || "Anti-Ragging Pledge"}
      breadcrumbSubtitle={banner?.subtitle || "Pledge"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <div className="td_pledge_page">
        <div className="container td_mt_80 td_mb_80">
          <div className="td_section_heading td_style_1 text-center td_mb_50">
            <span className="td_pledge_eyebrow">Student Commitment</span>
            <h2 className="td_section_title td_fs_48">Anti-Ragging Pledge</h2>
            <p className="td_section_subtitle td_fs_18">
              A respectful campus begins with a clear promise from every student.
            </p>
          </div>

          <div className="td_pledge_shell">
            <div className="td_pledge_intro">
              <div className="td_pledge_intro_badge">Ragging-Free Campus</div>
              <h3 className="td_pledge_intro_title">Pledge Declaration</h3>
              <p className="td_pledge_intro_text">
                Every student is expected to uphold dignity, kindness, and discipline. Read the
                pledge carefully and affirm your responsibility to create a safe and welcoming
                environment for all.
              </p>
            </div>

            <div className="td_pledge_card">
              <div className="td_pledge_statement">
                <span className="td_pledge_label">Declaration</span>
                <h3>I, [Student Name], hereby solemnly pledge that:</h3>
              </div>

              <ol className="td_pledge_list">
                {pledgePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>

              <div className="td_pledge_footer">
                <div className="td_pledge_meta">
                  <div className="td_pledge_meta_item">
                    <span>Place</span>
                    <strong>Mettur Dam</strong>
                  </div>
                  <div className="td_pledge_meta_item">
                    <span>Date</span>
                    <strong>{new Date().toLocaleDateString()}</strong>
                  </div>
                </div>

                <div className="td_pledge_signature">
                  <div className="td_pledge_signature_line" />
                  <p>Signature of the Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pledge;
