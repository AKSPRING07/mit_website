import React from "react";
import { Layout } from "../../layouts/Layout";
import { BlogAllCMS } from "../../components/blogs/BlogAllCMS";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import DESSF from "../../assets/img/DESSF.jpeg";
import { collegeInfo } from "../../data/collegeInfo";

export const Placements = () => {
  const { banner, loading } = usePageBanner('placements');

  return (
    <Layout 
      header={1} 
      footer={1} 
      breadcrumbTitle={banner?.title || "Placements"} 
      breadcrumbSubtitle={banner?.subtitle || "Placements"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <section>
        <div className="td_height_80 td_height_lg_60" />
        <div className="container">
          <div className="row td_gap_y_24">
            <div className="col-lg-5">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_28 td_semibold td_mb_15">Placement highlight</h3>
                <p className="td_fs_18 td_mb_10">
                  Paid monthly salary of {collegeInfo.placementInfo.salaryRange}.
                </p>
                <p className="td_mb_0">Leading placement companies:</p>
                <ul className="td_mp_0 td_list td_style_5 td_mt_15">
                  {collegeInfo.placementInfo.companies.map((company) => (
                    <li key={company}>{company}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="td_contact_box td_style_2 td_radius_10 td_accent_bg td_white_color h-100">
                <h3 className="td_fs_28 td_semibold td_mb_15">Industry readiness</h3>
                <ul className="td_mp_0 td_list td_style_5">
                  <li>Free bus and uniform support for students.</li>
                  <li>Hands-on technical training for diploma and ITI learners.</li>
                  <li>Dedicated support for career guidance and placement follow-up.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="td_height_60 td_height_lg_40" />
      </section>
      <BlogAllCMS category="placement" />
    </Layout>
  );
};
