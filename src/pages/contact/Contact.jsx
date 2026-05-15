import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../layouts/Layout";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import MEW from "../../assets/img/MEW.jpeg";
import DESSF from "../../assets/img/DESSF.jpeg";
import { collegeInfo } from "../../data/collegeInfo";

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJ2HO7E98OMPVuiV9zBVrWYTkWUiNhwVdkSWgT0nJorC26Tw/viewform?embedded=true";

export const Contact = () => {
  const { banner } = usePageBanner("contact");
  const { hash } = useLocation();
  const [formMode, setFormMode] = useState("contact");

  useEffect(() => {
    if (hash === "#feedback") {
      setFormMode("feedback");
    } else if (hash === "#grievance") {
      setFormMode("grievance");
    } else {
      setFormMode("contact");
    }

    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={banner?.title || "Contact"}
      breadcrumbSubtitle={banner?.subtitle || "Contact"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="row">
            <div className="col-xxl-10 offset-xxl-1">
              <div className="row align-items-center td_gap_y_40">
                <div className="col-lg-7">
                  <img src={MEW} alt="Contact" className="w-100" />
                </div>
                <div className="col-xl-4 offset-xl-1 col-lg-5">
                  <div className="td_contact_info">
                    <div className="td_section_heading td_style_2 td_mb_20">
                      <h2 className="td_contact_info_title td_fs_36 mb-0">
                        Our Office Address
                      </h2>
                    </div>
                    <div className="td_mb_40">
                      <h2 className="td_fs_24 td_semibold td_mb_20">
                        Main Campus
                      </h2>
                      <p className="td_fs_18 td_heading_color td_medium td_mb_10">
                        {collegeInfo.address}
                      </p>
                      <p className="td_fs_18 td_heading_color td_medium td_mb_10 td_opacity_7">
                        <a href={`tel:${collegeInfo.phone.replace(/\s/g, "")}`}>
                          {collegeInfo.phone}
                        </a>
                      </p>
                      <p className="td_fs_18 td_heading_color td_medium mb-0 td_opacity_7">
                        <a href={`mailto:${collegeInfo.email}`}>
                          {collegeInfo.email}
                        </a>
                      </p>
                      <p className="td_fs_18 td_heading_color td_medium td_mb_10 td_mt_20">
                        Instagram
                      </p>
                      <a
                        href={collegeInfo.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        mettur_mitpolytechnic
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="td_height_120 td_height_lg_80" />

        <div className="td_map">
          <iframe
            id="map"
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.297368244332!2d77.77718547502076!3d11.744088688469725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9533955cdac59%3A0xfd58a7842df5ee98!2sMIT%20Polytechnic%20College%20%26%20MIT%20ITI!5e0!3m2!1sen!2sin!4v1768196128598!5m2!1sen!2sin"
            allowFullScreen
          />
        </div>

        <div className="td_bg_filed">
          <div className="container-fluid px-0 ">
            <div id="grievance" style={{ scrollMarginTop: "120px" }} />
            <div id="feedback" style={{ scrollMarginTop: "120px" }} />
            <ContactForm formMode={formMode} edge />
          </div>
        </div>

        <div className="td_height_80 td_height_lg_60" />

        <div className="container">
          <div className="row td_gap_y_24">
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">
                  Admission Contact
                </h3>
                <p className="td_mb_10">{collegeInfo.admissionContacts[0]}</p>
                <p className="td_mb_0">{collegeInfo.admissionContacts[1]}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">
                  Quick Highlights
                </h3>
                <ul className="td_mp_0 td_list td_style_5">
                  {collegeInfo.admissionHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">
                  Placement Snapshot
                </h3>
                <p className="td_mb_10">
                  Monthly salary: {collegeInfo.placementInfo.salaryRange}
                </p>
                <p className="td_mb_0">
                  Placement support with leading companies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="td_height_80 td_height_lg_60" />
      </section>
    </Layout>
  );
};

const ContactForm = ({ formMode = "contact", edge }) => {
  const formContent = {
    contact: {
      title: "Get in touch",
      description:
        "Fill out the Google Form below for contact requests. Every response is saved directly to Google Forms and its connected Google Sheet.",
    },
    feedback: {
      title: "Share your feedback",
      description:
        "Fill out the Google Form below to send feedback. Every response is saved directly to Google Forms and its connected Google Sheet.",
    },
    grievance: {
      title: "Submit your grievance",
      description:
        "Fill out the Google Form below to submit your grievance. Every response is saved directly to Google Forms and its connected Google Sheet.",
    },
  }[formMode] || {
    title: "Get in touch",
    description:
      "Fill out the Google Form below. Every response is saved directly to Google Forms and its connected Google Sheet.",
  };

  return (
    <div
      className={`td_contact_box td_style_2 td_accent_bg td_contact_form_wrap ${
        edge ? "td_edge" : "td_radius_10"
      } td_full col-12`}
    >
      <h3 className="td_white_color td_fs_20 td_semibold td_mb_20 td_contact_form_title">
        {formContent.title}
      </h3>
      <p className="td_white_color td_opacity_7 td_mb_20 td_contact_form_inner">
        {formContent.description}
      </p>
      <div className="td_contact_form_inner">
        <iframe
          title={formContent.title}
          src={GOOGLE_FORM_EMBED_URL}
          width="100%"
          height="1100"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="td_google_form_embed"
        >
          Loading...
        </iframe>
      </div>
    </div>
  );
};
