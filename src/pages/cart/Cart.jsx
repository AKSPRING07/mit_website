import React from "react";
import { Layout } from "../../layouts/Layout";
import { Link } from "react-router-dom";

import courseThumb1 from "../../assets/img/home_1/course_thumb_1.jpg";

export const Cart = () => {
  return (
    <Layout breadcrumbTitle={"Application Summary"} breadcrumbSubtitle={"Application Summary"}>
      <div className="td_height_120 td_height_lg_80" />

      <div className="container">
        <div className="td_table_1">
          <div className="table-responsive">
            <table>
              <thead>
                <tr className="td_accent_bg">
                  <th className="td_white_color td_bold">Item</th>
                  <th className="td_white_color td_bold">Details</th>
                  <th className="td_white_color td_bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="td_table_meta">
                      <span className="td_fs_18 td_semibold td_heading_color">
                        Admission Application Fee
                      </span>
                    </div>
                  </td>
                  <td>Prospectus & Registration</td>
                  <td>₹ 500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="td_height_60 td_height_lg_40" />
        <div className="row td_gap_y_30 td_row_gap_30 justify-content-end">
          <div className="col-xl-4">
            <div className="td_total_card">
              <h3 className="td_fs_16 td_mb_2">Payment Summary</h3>
              <div className="td_mb_14">
                <ul className="td_total_card_list td_mp_0 td_heading_color">
                  <li>
                    <span>Registration Fee</span>
                    <span className="td_bold">₹ 500.00</span>
                  </li>
                  <li>
                    <span>Total Payable</span>
                    <span className="td_bold td_fs_20">₹ 500.00</span>
                  </li>
                </ul>
              </div>
              <Link to="/online-payment" className="td_btn td_style_1 td_radius_10 td_medium w-100">
                <span className="td_btn_in td_white_color td_accent_bg">
                  <span>Pay Online</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="td_btns_group">
              <Link
                to="/admission"
                className="td_btn td_style_1 td_type_3 td_radius_10 td_medium"
              >
                <span className="td_btn_in td_accent_color">
                  <span>Back to Admission </span>
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M0.529297 5.35156H10.5293M10.5293 5.35156L6.0293 0.851562M10.5293 5.35156L6.0293 9.85156"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />
    </Layout>
  );
};
