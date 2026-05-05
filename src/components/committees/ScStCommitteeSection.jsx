import React from "react";
import { api } from "../../lib/api";

export const ScStCommitteeSection = () => {
  const [committeeData, setCommitteeData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const response = await api.getCommittees({ 
          filters: { slug: { $eq: 'scst' } } 
        });
        if (response && response.data && response.data.length > 0) {
          setCommitteeData(response.data[0].attributes || response.data[0]);
        }
      } catch (err) {
        console.error("Failed to load SC/ST committee data:", err);
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
  const keyPoints = (committeeData.keyPoints || []).map(kp => kp.point);
  const responsibilities = (committeeData.responsibilities || []).map(r => r.point);
  const supportFocusItems = (committeeData.supportFocus || []).map(sf => sf.point);
  return (
    <section className="td_anti_ragging_page" id="scst">
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="td_anti_ragging_hero">
          <div className="td_anti_ragging_badge">SC/ST Committee</div>
          <h2 className="td_fs_48 td_mb_20">
            Committee formation for Scheduled Caste and Scheduled Tribe student support
          </h2>
          <p className="td_fs_18 td_mb_0">
            This page presents the SC/ST committee formation order in a fuller
            and more readable way. The original intent is preserved, but the
            content is expanded so the section feels complete and informative.
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
                  <li>Principal-led formation</li>
                  <li>AICTE-guideline based committee</li>
                  <li>Reserved-category student support</li>
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
                <h3 className="td_fs_30 td_mb_0">SC/ST Committee Members</h3>
              </div>
              <div className="table-responsive">
                <table className="td_anti_ragging_table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Staff Name</th>
                      <th>Designation</th>
                      <th>Committee Role</th>
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
                <span>Scope</span>
                <h3 className="td_fs_30 td_mb_0">What the committee is meant to do</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <div className="td_anti_ragging_copyto td_aim_support">
                <ul>
                  {keyPoints.map((item) => (
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
                  <h3 className="td_fs_30 td_mb_0">Why this formation matters</h3>
                </div>
                <div className="td_height_25 td_height_lg_20" />
                <p className="td_mb_20">
                  The order is not just a formality. It gives the college a clear
                committee structure for SC/ST student support, names the people
                responsible for carrying it forward, and sets out a clear
                internal arrangement for guidance and representation.
                </p>
                <p className="td_mb_0">
                  In practical terms, this means the institution has a visible,
                  documented, and accountable mechanism for addressing concerns,
                  maintaining representation, and supporting the special
                interests of students in the reserved category.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="td_anti_ragging_panel td_anti_ragging_sidepanel">
              <div className="td_anti_ragging_section_head">
                <span>Support Focus</span>
                <h3 className="td_fs_30 td_mb_0">What the committee provides</h3>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <div className="td_anti_ragging_copyto td_aim_support">
                <ul>
                  {supportFocusItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="td_height_25 td_height_lg_20" />
              <p className="td_mb_0">
                This side panel now highlights the practical value of the SC/ST
                committee instead of repeating distribution details.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};

export default ScStCommitteeSection;
