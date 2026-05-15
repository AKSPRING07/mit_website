import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderSidebar } from "./HeaderSidebar";
import { useMobilemenu } from "../../lib/hooks/useMobilemenu";
import { useStickyHeader } from "../../lib/hooks/useStickyHeader";
import { collegeInfo } from "../../data/collegeInfo";

import Logo from "../../assets/img/mit-logo.png";

export const HeaderOne = () => {
  useMobilemenu();
  useStickyHeader();

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((v) => !v);

  return (
    <>
      <header className="td_site_header td_style_1 td_type_3 td_sticky_header td_medium td_heading_color">
        <div className="td_main_header">
          <div className="container-fluid">
            <div className="td_main_header_in">
              <div className="td_main_header_left">
                <Link className="td_site_branding" to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
                <div className="td_header_social_btns">
                  <a
                    href={collegeInfo.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="td_center"
                    aria-label="Visit official website"
                    title="Official Website"
                  >
                    <i className="fa-solid fa-globe"></i>
                  </a>
                  <a
                    href={collegeInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="td_center"
                    aria-label="Visit Instagram page"
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>

              <div className="td_main_header_center">
                <nav className="td_nav">
                  <div className="td_nav_list_wrap">
                    <div className="td_nav_list_wrap_in">
                      {/* first three */}
                      <ul className="td_nav_list">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="/associations">Associations</Link>
                          <ul>
                            <li>
                              <Link to="/associations/cultural">Cultural</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/placements">Placements</Link>
                        </li>
                        <li>
                          <Link to="/gallery">Gallery</Link>
                        </li>
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                      </ul>

                      <Link className="td_site_branding" to="/">
                        <img src={Logo} alt="Logo" />
                      </Link>

                      {/* last three */}
                      <ul className="td_nav_list">
                        <li>
                          <Link to="/departments">Departments</Link>
                        </li>
                        <li>
                          <Link to="/students-registrations">Admission</Link>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="/committees">Committees</Link>
                          <ul>
                            <li>
                              <Link to="/anti-ragging-committee">Antiragging Committee</Link>
                            </li>
                            <li>
                              <Link to="/grievance-redressal-cell">Grievances Redressal Committee</Link>
                            </li>
                            <li>
                              <Link to="/sc-st-committee">SC/ST Committee</Link>
                            </li>
                            <li>
                              <Link to="/internal-complaints-committee">Internal Complaints Committee</Link>
                            </li>
                            <li>
                              <Link to="/sexual-harassment-redressal-committee">Sexual Harassment Redressal Committee</Link>
                            </li>
                            <li>
                              <Link to="/mandatory-disclosure">Mandatory Disclosure</Link>
                            </li>
                            <li>
                              <Link to="/aicte-approvals">AICTE Approvals</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>

              {/* right */}
              <div className="td_main_header_right">
                <div className="position-relative">
                  <HeaderSearch />
                </div>
                <button className="td_hamburger_btn" onClick={toggleSidebar} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <HeaderSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </>
  );
};
