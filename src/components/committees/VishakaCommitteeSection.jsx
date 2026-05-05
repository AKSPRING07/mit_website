import React from "react";
import { api } from "../../lib/api";

export const VishakaCommitteeSection = () => {
  const [committeeData, setCommitteeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'harassment' } } 
        });
        if (response && response.data && response.data.length > 0) {
          setCommitteeData(response.data[0].attributes || response.data[0]);
        }
      } catch (err) {
        console.error("Failed to load Vishaka committee data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" /></div>;
  if (!committeeData) return null;

  const committeeMembers = committeeData.members || [];
  const overviewItems = committeeData.overviewItems || [];
  const responsibilities = (committeeData.responsibilities || []).map(r => r.point);
  const guidanceItems = (committeeData.supportFocus || []).map(sf => sf.point);
  const orderMeta = committeeData.orderMeta || {};
  return (
    <section className="td_anti_ragging_page" id="harassment">
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="td_anti_ragging_hero">
          <div className="td_anti_ragging_badge">Vishaka Committee</div>
          <h2 className="td_fs_48 td_mb_20">
            Sexual harassment prevention and redressal committee for campus support
          </h2>
          <p className="td_fs_18 td_mb_0">
            This section presents the Vishaka Committee order in a fuller and
            more readable format. The original meaning is preserved, while the
            responsibilities and committee role are expanded for clarity.
          </p>
        </div>

        <div className="td_height_50 td_height_lg_40" />

        <div className="td_anti_ragging_panel">
          <div className="row td_gap_y_30">
            <div className="col-lg-12">
              <div className="td_anti_ragging_meta_card">
                <span>Office of the Principal</span>
                <strong>{committeeData.title}</strong>
                <p className="td_mt_10 td_mb_0">
                  {committeeData.description}
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
                  <li>5 committee members</li>
                  <li>Chairperson-led structure</li>
                  <li>Women and girl student grievance support</li>
                  <li>Monthly reporting and recorded minutes</li>
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
                <h3 className="td_fs_30 td_mb_0">Vishaka Committee Members</h3>
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
            <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
              <div className="td_anti_ragging_section_head">
                <span>Support Focus</span>
                <h3 className="td_fs_30 td_mb_0">What the committee provides</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <div className="td_anti_ragging_copyto td_aim_support">
                <ul>
                  {guidanceItems.map((item) => (
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
            <span>Responsibilities</span>
            <h3 className="td_fs_30 td_mb_0">Expanded meaning of the order</h3>
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

        <div className="td_height_50 td_height_lg_40" />

        <div className="row td_gap_y_30">
          <div className="col-lg-8">
            <div className="td_anti_ragging_panel">
              <div className="td_anti_ragging_section_head">
                <span>Understanding</span>
                <h3 className="td_fs_30 td_mb_0">Why this committee matters</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <p className="td_mb_20">
                The order creates a formal institutional pathway for women and
                girl students to raise concerns, have them reviewed, and get a
                structured response. That makes the campus environment more
                accountable and better prepared to handle harassment-related
                issues with seriousness and privacy.
              </p>
              <p className="td_mb_0">
                By defining members, meeting rhythm, inquiry responsibilities,
                and reporting, the institution gives the committee a practical
                role rather than leaving it as a paper-only formation.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
              <div className="td_anti_ragging_section_head">
                <span>Action Path</span>
                <h3 className="td_fs_30 td_mb_0">How concerns move forward</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <div className="td_anti_ragging_copyto td_aim_support">
                <ul>
                  <li>Complaint is received by the committee</li>
                  <li>Inquiry is conducted if required</li>
                  <li>Appropriate action is taken</li>
                  <li>Monthly meeting and reporting continue</li>
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

export default VishakaCommitteeSection;

