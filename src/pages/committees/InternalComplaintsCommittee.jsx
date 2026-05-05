import React, { useState, useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { api } from "../../lib/api";
import DESSF from "../../assets/img/DESSF.jpeg";
import { collegeInfo } from "../../data/collegeInfo";

export const InternalComplaintsCommittee = () => {
  const [committeeData, setCommitteeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'complaints' } } 
        });
        
        if (response && response.data && response.data.length > 0) {
          const committee = response.data[0].attributes || response.data[0];
          setCommitteeData(committee);
        }
      } catch (err) {
        console.error("Failed to load committee data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return (
    <Layout header={1} footer={1} breadcrumbTitle="Internal Complaints Committee" breadcrumbSubtitle="Loading..." breadcrumbImage={DESSF}>
      <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
    </Layout>
  );

  if (!committeeData) return null;

  const committeeMembers = committeeData.members || [];
  const overviewItems = committeeData.overviewItems || [];
  const associatedActivities = (committeeData.responsibilities || []).map(r => r.point);
  const objectiveSupportPoints = (committeeData.supportFocus || []).map(s => s.point);
  const orderMeta = committeeData.orderMeta || {
    office: "MIT Polytechnic College",
  };

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="Internal Complaints Committee"
      breadcrumbSubtitle="Committee Details & Mandate"
      breadcrumbImage={DESSF}
    >
      <section className="td_anti_ragging_page">
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="td_anti_ragging_hero">
            <div className="td_anti_ragging_badge">Official Committee Information</div>
            <h2 className="td_fs_48 td_mb_20">Internal Complaints Committee for a safer and more respectful campus</h2>
            <p className="td_fs_18 td_mb_0">
              This page presents the Internal Complaints Committee details from
              the institutional document in a more accessible layout, without
              changing the original intent, member structure, or regulatory
              basis.
            </p>
          </div>

          <div className="td_height_50 td_height_lg_40" />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading Committee Members...</p>
            </div>
          ) : (
            <>
              <div className="td_anti_ragging_panel">
                <div className="row td_gap_y_30">
                  <div className="col-lg-12">
                    <div className="td_anti_ragging_meta_card">
                      <span>Institution</span>
                      <strong>{orderMeta.office}</strong>
                      <p className="td_mt_10 td_mb_0">
                        {collegeInfo.address}<br />
                        Approved by AICTE, New Delhi and affiliated to DOTE, Chennai<br />
                        College Code: 788<br />
                        College Contact No: {collegeInfo.phone}<br />
                        {collegeInfo.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="td_height_40 td_height_lg_30" />

                <div className="row td_gap_y_30">
                  <div className="col-lg-8">
                    <div className="td_anti_ragging_notice">
                      <h3 className="td_fs_28">Committee Overview</h3>
                      <div className="td_anti_ragging_general_grid">
                        {overviewItems.map((item) => (
                          <div className="td_anti_ragging_general_item" key={item.title}>
                            <h4 className="td_fs_22">{item.title}</h4>
                            <p className="td_mb_0">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="td_anti_ragging_highlight">
                      <h4 className="td_fs_24">Quick View</h4>
                      <ul>
                        <li>{committeeMembers.length} committee members</li>
                        <li>Faculty and student representation</li>
                        <li>AICTE-based constitution</li>
                        <li>Focus on prevention and redressal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="td_height_50 td_height_lg_40" />

              <div className="row td_gap_y_30">
                <div className="col-lg-5">
                  <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
                    <div className="td_anti_ragging_section_head">
                      <span>Aim</span>
                      <h3 className="td_fs_30 td_mb_0">Core Objective</h3>
                    </div>
                    <div className="td_height_25 td_height_lg_20" />
                    <p>
                      Prevention, prohibition and redressal of sexual harassment of
                      women employees and students in technical education
                      institutions.
                    </p>
                    <div className="td_anti_ragging_copyto td_aim_support">
                      <h4 className="td_fs_22">Why This Committee Matters</h4>
                      <ul>
                        {objectiveSupportPoints.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="td_anti_ragging_table_wrap">
                    <div className="td_anti_ragging_section_head">
                      <span>Committee</span>
                      <h3 className="td_fs_30 td_mb_0">Internal Complaints Committee Members</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="td_anti_ragging_table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Designation / Category</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {committeeMembers.map((member, index) => (
                            <tr key={`${member.sno || index}-${member.name}`}>
                              <td>{member.sno}</td>
                              <td>{member.name}</td>
                              <td>{member.designation}</td>
                              <td>{member.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="td_height_50 td_height_lg_40" />

              <div className="td_anti_ragging_panel">
                <div className="td_anti_ragging_section_head">
                  <span>Activities</span>
                  <h3 className="td_fs_30 td_mb_0">Associated Activities</h3>
                </div>
                <div className="td_height_30 td_height_lg_20" />
                <div className="td_anti_ragging_responsibilities">
                  {associatedActivities.map((item, index) => (
                    <div className="td_anti_ragging_responsibility" key={item}>
                      <div className="td_anti_ragging_count">0{index + 1}</div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    </Layout>
  );
};

export default InternalComplaintsCommittee;
