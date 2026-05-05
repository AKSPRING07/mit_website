import React from "react";
import { Layout } from "../../layouts/Layout";
import DESSF from "../../assets/img/DESSF.jpeg";
import { api } from "../../lib/api";

export const AICTEApprovals = () => {
  const [committeeData, setCommitteeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'aicte' } } 
        });
        if (response && response.data && response.data.length > 0) {
          const data = response.data[0].attributes || response.data[0];
          setCommitteeData(data);
        }
      } catch (err) {
        console.error("Failed to load AICTE committee data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return (
    <Layout header={1} footer={1} breadcrumbTitle="AICTE Approvals" breadcrumbSubtitle="Loading..." breadcrumbImage={DESSF}>
      <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
    </Layout>
  );

  if (!committeeData) return null;

  const approvalInfo = committeeData.orderMeta || {
    institution: "MIT Polytechnic College",
    applicationNo: "1-44639693229",
    permanentId: "1-450923291",
    eoaFileNo: "Southern/1-44639693229/2025/EOA",
    approvalDate: "03-Jan-2025",
    institutionType: "Private-Self Financing",
    region: "Southern",
    yearOfEstablishment: "2009",
    address: "Cauvery Cross, Navapatty Post, Mettur-Bhavani Main Road, Mettur Dam - 636452, Salem, Tamil Nadu",
    approvingBody: "All India Council for Technical Education (AICTE)",
    affiliatingBody: "Directorate of Technical Education, Chennai",
  };
  const approvedCourses = committeeData.approvedCourses || [];
  const overviewItems = committeeData.overviewItems || [];
  const complianceHighlights = (committeeData.complianceHighlights || []).map(c => c.point);
  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="AICTE Approvals"
      breadcrumbSubtitle="Extension of Approval Details"
      breadcrumbImage={DESSF}
    >
      <section className="td_anti_ragging_page">
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="td_anti_ragging_hero">
            <div className="td_anti_ragging_badge">Official Approval Summary</div>
            <h2 className="td_fs_48 td_mb_20">AICTE Extension of Approval for MIT Polytechnic College</h2>
            <p className="td_fs_18 td_mb_0">
              This page presents the meaningful details from the AICTE EoA
              report for the academic year 2025-26 in a cleaner format, keeping
              the approved data intact while removing mail-copy and report
              boilerplate.
            </p>
          </div>

          <div className="td_height_50 td_height_lg_40" />

          <div className="td_anti_ragging_panel">
            <div className="row td_gap_y_30">
              <div className="col-lg-12">
                <div className="td_anti_ragging_meta_card">
                  <span>Institution</span>
                  <strong>{approvalInfo.institution}</strong>
                  <p className="td_mt_10 td_mb_0">
                    {approvalInfo.address}
                    <br />
                    {approvalInfo.approvingBody}
                    <br />
                    {approvalInfo.affiliatingBody}
                  </p>
                </div>
              </div>
            </div>

            <div className="td_height_40 td_height_lg_30" />

            <div className="row td_gap_y_30">
              <div className="col-lg-8">
                <div className="td_anti_ragging_notice">
                  <h3 className="td_fs_28">Approval Overview</h3>
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
                    <li>Application No: {approvalInfo.applicationNo}</li>
                    <li>Permanent ID: {approvalInfo.permanentId}</li>
                    <li>Approval Date: {approvalInfo.approvalDate}</li>
                    <li>{approvedCourses.length} approved diploma programmes</li>
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
                  <span>Approval Facts</span>
                  <h3 className="td_fs_30 td_mb_0">Key Approval Details</h3>
                </div>
                <div className="td_height_25 td_height_lg_20" />
                <div className="td_anti_ragging_responsibilities">
                  {[
                    `EoA File No: ${approvalInfo.eoaFileNo}`,
                    `Institution Type: ${approvalInfo.institutionType}`,
                    `Region: ${approvalInfo.region}`,
                    `Year of Establishment: ${approvalInfo.yearOfEstablishment}`,
                  ].map((item, index) => (
                    <div className="td_anti_ragging_responsibility" key={item}>
                      <div className="td_anti_ragging_count">0{index + 1}</div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="td_anti_ragging_table_wrap">
                <div className="td_anti_ragging_section_head">
                  <span>Courses</span>
                  <h3 className="td_fs_30 td_mb_0">Approved Diploma Programmes & Intake</h3>
                </div>
                <div className="table-responsive">
                  <table className="td_anti_ragging_table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Course</th>
                        <th>2024-25 Intake</th>
                        <th>2025-26 Intake</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedCourses.map((course, index) => (
                        <tr key={course.course}>
                          <td>{index + 1}</td>
                          <td>{course.course}</td>
                          <td>{course.intake2024}</td>
                          <td>{course.intake2025}</td>
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
              <span>Compliance</span>
              <h3 className="td_fs_30 td_mb_0">Important Institutional Requirements</h3>
            </div>
            <div className="td_height_30 td_height_lg_20" />
            <div className="td_anti_ragging_responsibilities">
              {complianceHighlights.map((item, index) => (
                <div className="td_anti_ragging_responsibility" key={item}>
                  <div className="td_anti_ragging_count">0{index + 1}</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    </Layout>
  );
};

export default AICTEApprovals;
