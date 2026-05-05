import React from "react";
import { Link } from "react-router-dom";
import aboutImg1 from "../../assets/img/home_1/about_img_1.jpg";
import aboutImg2 from "../../assets/img/home_1/about_img_2.jpg";
import bus_resize from "../../assets/img/bus_resize.jpg";
import CLG_op from "../../assets/img/CLG_op.jpg";
import principalImg from "../../assets/img/princi.png";
import circleText from "../../assets/img/home_1/about_circle_text.svg";
import { VideoPlayer } from "../videos/VideoPlayer";

export const AboutOne = () => {
  return (
    <section>
      <div className="td_height_120 td_height_lg_80" />
      <div className="td_about td_style_1">
        <div className="container">
          <div className="row align-items-center td_gap_y_40">
            <div
              className="col-lg-6 wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay="0.25s"
            >
              <div className="td_about_thumb_wrap">
                <div className="td_about_year text-uppercase td_fs_64 td_bold">
                  EST 2009
                </div>
                <div className="td_about_thumb_1">
                  <img src={aboutImg1} alt="About" />
                </div>
                <div className="td_about_thumb_2">
                  <img src={CLG_op} alt="About" />
                </div>

                <VideoPlayer
                  trigger={
                    <a
                      href="#vid"
                      className="td_circle_text td_center td_video_open"
                    >
                      <svg
                        width="15"
                        height="19"
                        viewBox="0 0 15 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.086 8.63792C14.6603 9.03557 14.6603 9.88459 14.086 10.2822L2.54766 18.2711C1.88444 18.7303 0.978418 18.2557 0.978418 17.449L0.978418 1.47118C0.978418 0.664496 1.88444 0.189811 2.54767 0.649016L14.086 8.63792Z"
                          fill="white"
                        />
                      </svg>
                      <img src={circleText} alt="Circle text" className="" />
                    </a>
                  }
                />

                <div className="td_circle_shape" />
              </div>
            </div>
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <div className="td_section_heading td_style_1 td_mb_30">
                <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
                  About us
                </p>
                <h2 className="td_section_title td_fs_48 mb-0">
                  MIT Polytechnic College & MIT ITI College
                </h2>
                <p className="td_section_subtitle td_fs_18 mb-0">
                  MIT Polytechnic & ITI College comprises MIT Polytechnic College and MIT ITI College, both situated in the heart of nature at Cauvery Cross, Mettur Dam. Our green and eco-friendly campus offers a comfortable and conducive learning environment. With easy access via the main road and bus facility, we're committed to providing quality technical education and a better future for our students.
                </p>
              </div>
              <div className="td_mb_40">
                <ul className="td_list td_style_5 td_mp_0">
                  <li>
                    <h3 className="td_fs_24 td_mb_8">
                      <Link to="/departments#tab_1" className="td_heading_color td_accent_hover">MIT Polytechnic College</Link>
                    </h3>
                    <p className="td_fs_18 mb-0">
                      Offering quality Diploma Courses in various technical disciplines
                    </p>
                  </li>
                  <li>
                    <h3 className="td_fs_24 td_mb_8">
                      <Link to="/departments#tab_2" className="td_heading_color td_accent_hover">MIT ITI College</Link>
                    </h3>
                    <p className="td_fs_18 mb-0">
                      Providing specialized Industrial Training Institute courses
                    </p>
                  </li>
                </ul>
              </div>
              <Link
                to="/about"
                className="td_btn td_style_1 td_radius_10 td_medium"
              >
                <span className="td_btn_in td_white_color td_accent_bg">
                  <span>More About</span>
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.1575 4.34302L3.84375 15.6567"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />

      {/* Correspondent Section - Image Left, Text Right */}
      <div className="container">
        <div className="row align-items-center td_gap_y_40">
          <div
            className="col-lg-6 wow fadeInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.25s"
          >
            <img src={aboutImg2} alt="Correspondent" className="w-100 td_radius_10" />
          </div>
          <div
            className="col-lg-6 wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div className="td_section_heading td_style_1">
              <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
                Our Leadership
              </p>
              <h2 className="td_section_title td_fs_48 mb-0">
                Message from the Correspondent
              </h2>
              <p className="td_section_subtitle td_fs_18 mb-0">
                Welcome to MIT Polytechnic & ITI College, comprising MIT Polytechnic College and MIT ITI College. Our commitment is to provide exceptional education and training that prepares our students for successful careers. We believe in fostering an environment of innovation, dedication, and excellence. Our state-of-the-art facilities and experienced faculty ensure that every student receives quality education that meets industry standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />
      {/* Principal Section - Text Left, Image Right */}
      <div className="container">
        <div className="row align-items-center td_gap_y_40">
          <div
            className="col-lg-6 wow fadeInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.25s"
          >
            <div className="td_section_heading td_style_1">
              <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
                Academic Excellence
              </p>
              <h2 className="td_section_title td_fs_48 mb-0">
                Message from the Principal
              </h2>
              <p className="td_section_subtitle td_fs_18 mb-0">
                As Principal of MIT Polytechnic & ITI College, I am proud to lead an institution dedicated to academic excellence and holistic development. Our faculty members are committed to nurturing talent and preparing students for the challenges of tomorrow. We focus on practical learning, industry collaboration, and character building to ensure our graduates are not just technically proficient, but also responsible citizens ready to contribute to society.
              </p>
            </div>
          </div>
          <div
            className="col-lg-6 wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <img src={principalImg} alt="Principal" className="w-100 td_radius_10 " />
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />

      {/* Pri
      {/* Pricing Section - Image Left, Text Right */}
      <div className="container">
        <div className="row align-items-center td_gap_y_40">
          <div
            className="col-lg-6 wow fadeInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.25s"
          >
            <img src={bus_resize} alt="Pricing" className="w-100 td_radius_10" />
          </div>
          <div
            className="col-lg-6 wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div className="td_section_heading td_style_1">
              <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
                Affordable Education
              </p>
              <h2 className="td_section_title td_fs_48 mb-0">
                Free Bus Facility & Affordable Fee Structure
              </h2>
              <p className="td_section_subtitle td_fs_18 mb-0">
                We believe quality education should be accessible to all. Our fee structure is designed to be affordable while maintaining the highest standards of education. The admission poster also highlights free bus, uniform, and books support, along with placement assistance and company tie-ups. Contact our admissions office for detailed information about course fees and available financial assistance.
              </p>
              <div className="td_mb_30 td_mt_30">
                <Link
                  to="/departments"
                  className="td_btn td_style_1 td_radius_10 td_medium"
                >
                  <span className="td_btn_in td_white_color td_accent_bg mt-2">
                    <span>View Fee Structure</span>
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1575 4.34302L3.84375 15.6567"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
