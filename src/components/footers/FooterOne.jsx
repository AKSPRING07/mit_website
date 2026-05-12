import React from "react";
import { Link } from "react-router-dom";
import { collegeInfo } from "../../data/collegeInfo";
import { diplomaPrograms, itiPrograms } from "../../data/mitPrograms";

import footerLogo from "../../assets/img/mit-logo.png";

export const FooterOne = () => {
  const phone = collegeInfo.phone;
  const email = collegeInfo.email;
  const address = collegeInfo.address;
  const socialMedia = collegeInfo.socialLinks;

  return (
    <footer className="td_footer td_style_1">
      <div className="container">
        <div className="td_footer_row">
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <div className="td_footer_text_widget td_fs_18">
                <img src={footerLogo} alt="Logo" />
                <p>
                  MIT Polytechnic & ITI College comprises MIT Polytechnic College and MIT ITI College, located at Cauvery Cross, Mettur Dam, offering quality diploma and industrial training courses with bus, hostel, and placement support.
                </p>
              </div>
              <ul className="td_footer_address_widget td_medium td_mp_0">
                <li>
                  <i className="fa-solid fa-phone-volume"></i>
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
                <li>
                  <i className="fa-solid fa-location-dot"></i>{address}
                </li>
              </ul>
            </div>
          </div>
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Navigate
              </h2>
              <ul className="td_footer_widget_menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/refund">Refund</Link>
                </li>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Courses
              </h2>
              <ul className="td_footer_widget_menu">
                {diplomaPrograms.map((program) => (
                  <li key={program.slug}>
                    <Link to={`/course-details/${program.slug}`}>{program.title}</Link>
                  </li>
                ))}
                {itiPrograms.map((program) => (
                  <li key={program.slug}>
                    <Link to={`/course-details/${program.slug}`}>{program.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="td_footer_col">
            <div className="td_footer_widget">
              <h2 className="td_footer_widget_title td_fs_32 td_white_color td_medium td_mb_30">
                Subscribe Now
              </h2>
              <div className="td_newsletter td_style_1">
                <p className="td_mb_20 td_opacity_7">
                  Far far away, behind the word mountains, far from the
                  Consonantia.
                </p>
                <form action="#" className="td_newsletter_form">
                  <input
                    type="email"
                    className="td_newsletter_input"
                    placeholder="Email address"
                  />
                  <button
                    type="submit"
                    className="td_btn td_style_1 td_radius_30 td_medium"
                  >
                    <span className="td_btn_in td_white_color td_accent_bg">
                      <span>Subscribe</span>
                    </span>
                  </button>
                </form>
              </div>
              <div className="td_footer_social_btns td_fs_20">
                {socialMedia.facebook && (
                  <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="td_center">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                )}
                {socialMedia.twitter && (
                  <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="td_center">
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                )}
                {socialMedia.instagram && (
                  <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="td_center">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                )}
                {socialMedia.website && (
                  <a href={socialMedia.website} target="_blank" rel="noopener noreferrer" className="td_center">
                    <i className="fa-solid fa-globe"></i>
                  </a>
                )}
                {socialMedia.youtube && (
                  <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="td_center">
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="td_footer_bottom td_fs_18">
        <div className="container">
          <div className="td_footer_bottom_in">
            <p className="td_copyright mb-0">
              Copyright ©{new Date().getFullYear()} MIT Polytechnic College & MIT ITI College | All Right Reserved | Developed by <a href="https://springreen.in" target="_blank" rel="noopener noreferrer">Springreen</a>
            </p>
            <ul className="td_footer_widget_menu">
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy & Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
