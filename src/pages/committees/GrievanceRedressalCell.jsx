import React from "react";
import { Layout } from "../../layouts/Layout";
import { api } from "../../lib/api";
import DESSF from "../../assets/img/DESSF.jpeg";
import { collegeInfo } from "../../data/collegeInfo";

export const GrievanceRedressalCell = () => {
  const [committeeData, setCommitteeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'grievance' } } 
        });
        if (response && response.data && response.data.length > 0) {
          const data = response.data[0].attributes || response.data[0];
          setCommitteeData(data);
        }
      } catch (err) {
        console.error("Failed to load grievance committee data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return (
    <Layout header={1} footer={1} breadcrumbTitle="Grievance Redressal Cell" breadcrumbSubtitle="Loading..." breadcrumbImage={DESSF}>
      <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
    </Layout>
  );

  if (!committeeData) return null;

  const committeeMembers = committeeData.members || [];
  const overviewItems = committeeData.overviewItems || [];
  const objectives = (committeeData.objectives || []).map(o => o.point);
  const mechanismItems = (committeeData.mechanismItems || []).map(m => m.point);
  const grievanceChannels = (committeeData.grievanceChannels || []).map(g => g.point);
  const mattersHandled = committeeData.mattersHandled || [];
  const studentAssurance = (committeeData.studentAssurance || []).map(s => s.point);
  const orderMeta = committeeData.orderMeta || { office: "MIT Polytechnic College" };
  const redressalFlow = [
    "A grievance is submitted through the available institutional mechanism such as the online portal or the grievance and suggestion box.",
    "The committee receives the complaint or application and examines the merit and nature of the issue.",
    "If required, the committee determines the scope for discussion, inquiry, or mediation between the concerned parties.",
    "Suitable action is taken within a reasonable period, and the matter is reported to the appropriate authority when needed.",
  ];
  const grievanceContextItems = [
    { title: "Who Can Raise a Grievance", text: "The document primarily focuses on complaints lodged by students, and the mechanism also notes consideration of specific grievances raised by students and staff." },
    { title: "Nature of Issues", text: "The institution intends to address both academic and non-academic matters that arise within the campus and affect the learning environment or institutional support." },
    { title: "Institutional Approach", text: "The grievance process is framed as a support mechanism meant to maintain fairness, responsiveness, and a suitable campus atmosphere for teaching and learning." },
    { title: "Communication Access", text: "The grievance system is supported through online access, committee contact details, and institutional display mechanisms so that students know where and how to report concerns." }
  ];
  const supportPrinciples = [
    "Reasonable and timely review of grievances.",
    "Fair internal examination of the concern raised.",
    "Accessible reporting channels for students.",
    "Institutional support aimed at resolution and student confidence.",
  ];
  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle="Grievance Redressal Cell"
      breadcrumbSubtitle="Committee & Grievance Support"
      breadcrumbImage={DESSF}
    >
      <section className="td_anti_ragging_page">
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="td_anti_ragging_hero">
            <div className="td_anti_ragging_badge">Official Grievance Cell Information</div>
            <h2 className="td_fs_48 td_mb_20">Grievance Redressal Cell for student support, fair review, and timely institutional response</h2>
            <p className="td_fs_18 td_mb_0">
              This page presents the Grievance Redressal Cell details from the
              institutional document in a more accessible format, while keeping
              the original meaning, committee structure, and grievance process
              intact.
            </p>
          </div>

          <div className="td_height_50 td_height_lg_40" />

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
                  <h3 className="td_fs_28">Cell Overview</h3>
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
                    <li>5 committee members</li>
                    <li>Separate standalone grievance committee page</li>
                    <li>Academic and non-academic grievance support</li>
                    <li>Online portal and grievance box mechanism</li>
                    <li>Committee review and timely redressal</li>
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
                  <span>Objectives</span>
                  <h3 className="td_fs_30 td_mb_0">Purpose and Scope</h3>
                </div>
                <div className="td_height_25 td_height_lg_20" />
                <div className="td_anti_ragging_copyto td_aim_support" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <ul>
                    {objectives.map((item) => (
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
                  <h3 className="td_fs_30 td_mb_0">Grievance Redressal Committee Members</h3>
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
                      {committeeMembers.map((member) => (
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

          <div className="td_anti_ragging_panel">
            <div className="row td_gap_y_30">
              <div className="col-lg-8">
                <div className="td_anti_ragging_notice">
                  <h3 className="td_fs_30">Matters the Cell Helps Address</h3>
                  <div className="td_anti_ragging_general_grid">
                    {mattersHandled.map((item) => (
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
                  <h4 className="td_fs_24">What This Page Covers</h4>
                  <ul>
                    <li>Committee structure and roles</li>
                    <li>Objectives and redressal mechanism</li>
                    <li>Available grievance submission channels</li>
                    <li>Supportive institutional guidance around the original document</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="td_height_30 td_height_lg_20" />

            <div className="row td_gap_y_30">
              <div className="col-lg-12">
                <div className="td_anti_ragging_notice">
                  <h3 className="td_fs_30">Grievance Guidance</h3>
                  <div className="td_anti_ragging_general_grid">
                    {grievanceContextItems.map((item) => (
                      <div className="td_anti_ragging_general_item" key={item.title}>
                        <h4 className="td_fs_22">{item.title}</h4>
                        <p className="td_mb_0">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="td_height_50 td_height_lg_40" />

          <div className="row td_gap_y_30">
            <div className="col-lg-7">
              <div className="td_anti_ragging_panel">
                <div className="td_anti_ragging_section_head">
                  <span>Process</span>
                  <h3 className="td_fs_30 td_mb_0">Typical Redressal Flow</h3>
                </div>
                <div className="td_height_30 td_height_lg_20" />
                <div className="td_anti_ragging_responsibilities">
                  {redressalFlow.map((item, index) => (
                    <div className="td_anti_ragging_responsibility" key={item}>
                      <div className="td_anti_ragging_count">0{index + 1}</div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
                <div className="td_anti_ragging_section_head">
                  <span>Student Support</span>
                  <h3 className="td_fs_30 td_mb_0">What Students Can Expect</h3>
                </div>
                <div className="td_height_25 td_height_lg_20" />
                <div className="td_anti_ragging_copyto td_aim_support" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <ul>
                    {studentAssurance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="td_height_50 td_height_lg_40" />

          <div className="row td_gap_y_30">
            <div className="col-lg-7">
              <div className="td_anti_ragging_panel">
                <div className="td_anti_ragging_section_head">
                  <span>Mechanism</span>
                  <h3 className="td_fs_30 td_mb_0">How the GRC Functions</h3>
                </div>
                <div className="td_height_30 td_height_lg_20" />
                <div className="td_anti_ragging_responsibilities">
                  {mechanismItems.map((item, index) => (
                    <div className="td_anti_ragging_responsibility" key={item}>
                      <div className="td_anti_ragging_count">0{index + 1}</div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
                <div className="td_anti_ragging_section_head">
                  <span>Grievance Section</span>
                  <h3 className="td_fs_30 td_mb_0">Grievance Support Channels</h3>
                </div>
                <div className="td_height_25 td_height_lg_20" />
                <div className="td_anti_ragging_copyto td_aim_support" style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}>
                  <ul>
                    {grievanceChannels.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="td_height_50 td_height_lg_40" />

          <div className="td_anti_ragging_panel">
            <div className="td_anti_ragging_section_head">
              <span>Support Framework</span>
              <h3 className="td_fs_30 td_mb_0">Guiding Principles of Redressal</h3>
            </div>
            <div className="td_height_30 td_height_lg_20" />
            <div className="td_anti_ragging_responsibilities">
              {supportPrinciples.map((item, index) => (
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

export default GrievanceRedressalCell;
