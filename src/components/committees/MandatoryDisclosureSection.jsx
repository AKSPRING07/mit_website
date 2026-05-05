import React from "react";
import { api } from "../../lib/api";

export const MandatoryDisclosureSection = () => {
  const [committeeData, setCommitteeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'disclosure' } } 
        });
        if (response && response.data && response.data.length > 0) {
          const data = response.data[0].attributes || response.data[0];
          setCommitteeData(data);
        }
      } catch (err) {
        console.error("Failed to load disclosure committee data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  if (!committeeData) return null;

  const committeeMembers = committeeData.members || [];
  const squadMembers = committeeData.squad || [];
  const disclosureHighlights = committeeData.overviewItems || [];
  const committeeDuties = (committeeData.responsibilities || []).map(r => r.point);
  const circulationList = (committeeData.circulation || []).map(c => c.point);
  const orderMeta = committeeData.orderMeta || {
    office: "Office of the Principal, MIT Polytechnic College",
    subject: "Anti-ragging committee constitution order",
  };
  return (
    <section className="td_anti_ragging_page" id="disclosure">
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="td_anti_ragging_hero">
          <div className="td_anti_ragging_badge">Mandatory Disclosure</div>
          <h2 className="td_fs_48 td_mb_20">
            Anti-ragging committee disclosure for a safe and secure campus
          </h2>
          <p className="td_fs_18 td_mb_0">
            This section presents the uploaded institutional order in a fuller
            disclosure format. The original meaning is preserved, but the
            details are expanded so the page is easier to read and complete for
            visitors.
          </p>
        </div>

        <div className="td_height_50 td_height_lg_40" />

        <div className="td_anti_ragging_panel">
          <div className="row td_gap_y_30">
            <div className="col-lg-12">
              <div className="td_anti_ragging_meta_card">
                <span>{orderMeta.office}</span>
                <strong>{orderMeta.subject}</strong>
                <p className="td_mt_10 td_mb_0">
                  <strong>Reference:</strong> {orderMeta.reference}
                  <br />
                  <strong>Date:</strong> {orderMeta.date}
                  <br />
                  The order constitutes both an Anti-ragging Committee and an
                  Anti-ragging Squad to support campus discipline, safety, and
                  student welfare.
                </p>
              </div>
            </div>
          </div>

          <div className="td_height_40 td_height_lg_30" />

          <div className="row td_gap_y_30">
            <div className="col-lg-8">
              <div className="td_anti_ragging_notice">
                <h3 className="td_fs_28">Disclosure Overview</h3>
                <div className="td_anti_ragging_general_grid">
                  {disclosureHighlights.map((item) => (
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
                  <li>6 committee members</li>
                  <li>2 squad members</li>
                  <li>Faculty and student representation</li>
                  <li>Awareness, vigilance, and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="td_height_50 td_height_lg_40" />

        <div className="row td_gap_y_30">
          <div className="col-lg-7">
            <div className="td_anti_ragging_table_wrap">
              <div className="td_anti_ragging_section_head">
                <span>Committee</span>
                <h3 className="td_fs_30 td_mb_0">Anti-ragging committee members</h3>
              </div>
              <div className="table-responsive">
                <table className="td_anti_ragging_table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Staff / Student Name</th>
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

          <div className="col-lg-5">
            <div className="td_anti_ragging_table_wrap">
              <div className="td_anti_ragging_section_head">
                <span>Squad</span>
                <h3 className="td_fs_30 td_mb_0">Anti-ragging squad members</h3>
              </div>
              <div className="table-responsive">
                <table className="td_anti_ragging_table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Staff Name</th>
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

        <div className="td_anti_ragging_panel">
          <div className="td_anti_ragging_section_head">
            <span>Duties</span>
            <h3 className="td_fs_30 td_mb_0">Responsibilities from the order</h3>
          </div>
          <div className="td_height_30 td_height_lg_20" />
          <div className="td_anti_ragging_responsibilities">
            {committeeDuties.map((item, index) => (
              <div className="td_anti_ragging_responsibility" key={item}>
                <div className="td_anti_ragging_count">0{index + 1}</div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="td_height_50 td_height_lg_40" />

        <div className="row td_gap_y_30">
          <div className="col-lg-8">
            <div className="td_anti_ragging_panel">
              <div className="td_anti_ragging_section_head">
                <span>Purpose</span>
                <h3 className="td_fs_30 td_mb_0">How the disclosure reads</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <p className="td_mb_20">
                The document does not merely name the committee members. It also
                sets out the working style of the anti-ragging structure, which
                includes awareness, frequent interaction with students,
                approachable committee members, immediate action, monthly
                reporting, and active vigilance across the campus.
              </p>
              <p className="td_mb_0">
                That is why the order has been presented here as a fuller
                disclosure page. The intent stays the same: protect students,
                prevent ragging, and ensure that any concern is handled quickly
                and properly.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
              <div className="td_anti_ragging_section_head">
                <span>Copy To</span>
                <h3 className="td_fs_30 td_mb_0">Distribution list</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <div className="td_anti_ragging_copyto">
                <ul>
                  {circulationList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <p className="td_mb_0">{orderMeta.sourceNote}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};

export default MandatoryDisclosureSection;
