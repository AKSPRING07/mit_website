import React, { useState, useEffect } from "react";
import { Layout } from "../../layouts/Layout";
import { api } from "../../lib/api";
import DESSF from "../../assets/img/DESSF.jpeg";

const orderDetails = {
  office: "Office of the Principal, MIT Polytechnic College",
};

export const AntiRaggingCommittee = () => {
  const [committeeData, setCommitteeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'antiragging' } } 
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
    <Layout header={1} footer={1} breadcrumbTitle="Anti-Ragging Committee" breadcrumbSubtitle="Loading..." breadcrumbImage={DESSF}>
      <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
    </Layout>
  );

  if (!committeeData) return null;

  const committeeMembers = committeeData.members || [];
  const squadMembers = committeeData.squad || [];
  const responsibilities = (committeeData.responsibilities || []).map(r => r.point);
  const generalInfo = committeeData.overviewItems || [];
  const circulation = (committeeData.circulation || []).map(c => c.point);
  const orderMeta = committeeData.orderMeta || {
    office: "Office of the Principal, MIT Polytechnic College",
  };

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="Anti-Ragging Committee"
      breadcrumbSubtitle="Committee Order & Members"
      breadcrumbImage={DESSF}
    >
      <section className="td_anti_ragging_page">
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="td_anti_ragging_hero">
            <div className="td_anti_ragging_badge">Official Committee Order</div>
            <h2 className="td_fs_48 td_mb_20">Safe, respectful, and ragging-free campus environment</h2>
            <p className="td_fs_18 td_mb_0">
              This page is built from the anti-ragging committee order issued by
              the institution, with the original committee and squad details
              presented in a cleaner format for students and parents.
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
                      <span>Office</span>
                      <strong>{orderMeta.office}</strong>
                    </div>
                  </div>
                </div>

                <div className="td_height_40 td_height_lg_30" />

                <div className="row td_gap_y_30">
                  <div className="col-lg-8">
                    <div className="td_anti_ragging_notice">
                      <h3 className="td_fs_28">Committee Overview</h3>
                      <div className="td_anti_ragging_general_grid">
                        {generalInfo.map((item) => (
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
                        <li>{squadMembers.length} squad members</li>
                        <li>Faculty and student representation</li>
                        <li>Campus vigilance and immediate reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="td_height_50 td_height_lg_40" />

              <div className="row td_gap_y_30">
                <div className="col-xl-7">
                  <div className="td_anti_ragging_table_wrap">
                    <div className="td_anti_ragging_section_head">
                      <span>Committee</span>
                      <h3 className="td_fs_30 td_mb_0">Anti-Ragging Committee Members</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="td_anti_ragging_table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Designation / Class</th>
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

                <div className="col-xl-5">
                  <div className="td_anti_ragging_table_wrap">
                    <div className="td_anti_ragging_section_head">
                      <span>Squad</span>
                      <h3 className="td_fs_30 td_mb_0">Anti-Ragging Squad</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="td_anti_ragging_table">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {squadMembers.map((member) => (
                            <tr key={`${member.sno}-${member.name}`}>
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

              <div className="row td_gap_y_30">
                <div className="col-lg-8">
                  <div className="td_anti_ragging_panel">
                    <div className="td_anti_ragging_section_head">
                      <span>Responsibilities</span>
                      <h3 className="td_fs_30 td_mb_0">Duties from the Order</h3>
                    </div>
                    <div className="td_height_30 td_height_lg_20" />
                    <div className="td_anti_ragging_responsibilities">
                      {responsibilities.map((item, index) => (
                        <div className="td_anti_ragging_responsibility" key={item}>
                          <div className="td_anti_ragging_count">0{index + 1}</div>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
                    <div className="td_anti_ragging_section_head">
                      <span>Support</span>
                      <h3 className="td_fs_30 td_mb_0">Important Note</h3>
                    </div>
                    <div className="td_height_25 td_height_lg_20" />
                    <p>
                      The official order emphasizes awareness, immediate action,
                      approachability of committee members, and continuous
                      monitoring of the campus by the squad.
                    </p>
                    <p>
                      Students should report any ragging-related concern without
                      delay so that the committee can respond promptly.
                    </p>
                    <div className="td_anti_ragging_copyto">
                      <h4 className="td_fs_22">Copy To</h4>
                      <ul>
                        {circulation.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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

export default AntiRaggingCommittee;
