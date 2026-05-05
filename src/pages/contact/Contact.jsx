import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../layouts/Layout";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import MEW from "../../assets/img/MEW.jpeg";
import DESSF from "../../assets/img/DESSF.jpeg";
import { api } from "../../lib/api";
import ReCAPTCHA from "react-google-recaptcha";
import { collegeInfo } from "../../data/collegeInfo";

export const Contact = () => {
  const { banner, loading } = usePageBanner("contact");
  const { hash } = useLocation();
  const [initialType, setInitialType] = useState("General Enquiry");

  useEffect(() => {
    if (hash === "#grievance") setInitialType("Grievance");
    if (hash === "#feedback") setInitialType("Feedback");
    
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
        {/* Contact / Feedback / Grievance form */}
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
                        <a href={`tel:${collegeInfo.phone.replace(/\s/g, "")}`}>{collegeInfo.phone}</a>
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
            <div id="grievance" style={{ scrollMarginTop: '120px' }} />
            <div id="feedback" style={{ scrollMarginTop: '120px' }} />
            <ContactForm initialType={initialType} edge />
          </div>
        </div>

        <div className="td_height_80 td_height_lg_60" />

        <div className="container">
          <div className="row td_gap_y_24">
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">Admission Contact</h3>
                <p className="td_mb_10">{collegeInfo.admissionContacts[0]}</p>
                <p className="td_mb_0">{collegeInfo.admissionContacts[1]}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">Quick Highlights</h3>
                <ul className="td_mp_0 td_list td_style_5">
                  {collegeInfo.admissionHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="td_contact_box td_style_2 td_radius_10 td_gray_bg_5 h-100">
                <h3 className="td_fs_24 td_semibold td_mb_15">Placement Snapshot</h3>
                <p className="td_mb_10">Monthly salary: {collegeInfo.placementInfo.salaryRange}</p>
                <p className="td_mb_0">Placement support with leading companies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ContactForm = ({ initialType = "General Enquiry", edge }) => {
  const [type, setType] = useState(initialType);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // For reCAPTCHA v2 (checkbox), capture token from onChange (stored in recaptchaToken)
      if (!recaptchaToken) {
        alert("Please complete the reCAPTCHA verification.");
        setSubmitting(false);
        return;
      }

      const payload = {
        type,
        details,
        number,
        email,
        recaptcha: recaptchaToken,
      };

      // include name only when not grievance (user requested no name for grievance)
      if (type !== "Grievance") payload.name = name;

      // Submission requires an external form service or custom endpoint.
      await api.post("/contact-submissions", payload);

      // simple success UX
      alert("Thanks — your message was submitted.");
      setName("");
      setDetails("");
      setNumber("");
      setEmail("");
      if (
        recaptchaRef.current &&
        typeof recaptchaRef.current.reset === "function"
      ) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("There was an error submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`td_contact_box td_style_2 td_accent_bg ${
        edge ? "td_edge" : "td_radius_10"
      } td_full col-12`}
    >
      <h3 className="td_white_color td_fs_20 td_semibold td_mb_20">
        Get in touch
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="td_form_field_3 td_mb_15 full">
            <select
              aria-label="Contact type"
              className="w-100"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>General Enquiry</option>
              <option>Feedback</option>
              <option>Grievance</option>
            </select>
          </div>

          {type !== "Grievance" && (
            <div className="td_form_field_3 td_mb_15">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          )}

          <div className="td_form_field_3 td_mb_15">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Phone Number"
              required
              maxLength={10}
            />
          </div>

          <div className="td_form_field_3 td_mb_15 full">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details"
              required
              rows={3}
            />
          </div>

          <div className="td_form_field_3 td_mb_20 full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="td_btn td_style_1 td_radius_10 td_medium w-100"
          disabled={submitting}
        >
          <span className="td_accent_color">
            {submitting ? "Submitting..." : "Submit"}
          </span>
        </button>

        <div className="td_mt_15 td_mb_20" style={{ marginTop: "24px" }}>
          {/* ReCAPTCHA: requires `react-google-recaptcha` and a SITE_KEY. */}
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_SITE_KEY"}
            ref={recaptchaRef}
            onChange={(token) => setRecaptchaToken(token)}
          />
        </div>
      </form>
    </div>
  );
};
