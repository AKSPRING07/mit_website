import React, { useState } from "react";
import { Layout } from "../../layouts/Layout";
import { api } from "../../lib/api";
import DESSF from "../../assets/img/DESSF.jpeg";
import { usePageBanner } from "../../lib/hooks/usePageBanner";
import { collegeInfo } from "../../data/collegeInfo";
import { itiCourseOptions, polytechnicCourseOptions } from "../../data/mitPrograms";

export const StudentRegistrations = () => {
  const { banner, loading: bannerLoading } = usePageBanner("students-registrations");
  const [courseType, setCourseType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    aadharNumber: "",
    mobileNumber: "",
    emailAddress: "",
    permanentAddress: "",
    city: "",
    district: "",
    pincode: "",
    courseType: "",
    preferredCourse: "",
    lastQualification: "",
    percentage: "",
    schoolName: "",
    community: "",
    annualFamilyIncome: "",
    referralSource: "",
  });

  const handleCourseTypeChange = (e) => {
    const value = e.target.value;
    setCourseType(value);
    setFormData({ ...formData, courseType: value, preferredCourse: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.submitStudentRegistration(formData);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        fatherName: "",
        dateOfBirth: "",
        gender: "",
        aadharNumber: "",
        mobileNumber: "",
        emailAddress: "",
        permanentAddress: "",
        city: "",
        district: "",
        pincode: "",
        courseType: "",
        preferredCourse: "",
        lastQualification: "",
        percentage: "",
        schoolName: "",
        community: "",
        annualFamilyIncome: "",
        referralSource: "",
      });
      setCourseType("");
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      header={1}
      footer={1}
      breadcrumbTitle={"Student Admission Application"}
      breadcrumbSubtitle={"Apply for Admission to MIT Polytechnic & ITI College"}
      breadcrumbImage={banner?.imageUrl || DESSF}
    >
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              {success && (
                <div className="alert alert-success td_mb_30" style={{ padding: '20px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '10px', marginBottom: '30px' }}>
                  <h4>Application Submitted Successfully!</h4>
                  <p>Thank you for applying to MIT Polytechnic & ITI College. Our admissions team will review your application and contact you shortly.</p>
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger td_mb_30" style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '10px', marginBottom: '30px' }}>
                  <h4>Error</h4>
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="td_mb_30 td_radius_10 td_gray_bg_5" style={{ padding: "24px" }}>
                  <div className="row td_gap_y_24">
                    <div className="col-lg-8">
                      <h3 className="td_fs_28 td_semibold td_mb_10">Admission snapshot</h3>
                      <p className="td_mb_10">{collegeInfo.admissionHighlights[0]}</p>
                      <p className="td_mb_0">
                        {collegeInfo.admissionHighlights[1]} {collegeInfo.admissionHighlights[2]}
                      </p>
                    </div>
                    <div className="col-lg-4">
                      <div className="td_accent_bg td_white_color td_radius_10" style={{ padding: "18px 20px" }}>
                        <h4 className="td_fs_18 td_semibold td_mb_10">Contact for admission</h4>
                        <p className="td_mb_6">{collegeInfo.admissionContacts[0]}</p>
                        <p className="td_mb_0">{collegeInfo.admissionContacts[1]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="td_mb_30 td_radius_10 td_gray_bg_5" style={{ padding: "24px" }}>
                  <h3 className="td_fs_28 td_semibold td_mb_20">Courses and durations</h3>
                  <div className="row td_gap_y_16">
                    <div className="col-lg-7">
                      <h4 className="td_fs_20 td_semibold td_mb_12">Polytechnic</h4>
                      <ul className="td_mp_0 td_list td_style_5">
                        {collegeInfo.courseDurations.map((course) => (
                          <li key={course.name}>
                            {course.name} - {course.duration}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-5">
                      <h4 className="td_fs_20 td_semibold td_mb_12">ITI Trades</h4>
                      <ul className="td_mp_0 td_list td_style_5">
                        {collegeInfo.itiTrades.map((trade) => (
                          <li key={trade.name}>
                            {trade.name} - {trade.duration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="td_form_card td_style_1 td_radius_10 td_gray_bg_5">
                  <div className="td_form_card_in">
                    <h2 className="td_fs_36 td_mb_20 text-uppercase td_mb_16">
                      Student Admission Application
                    </h2>
                    <h3 className="td_fs_24 td_medium td_opacity_9 td_mb_32">
                      Fields with * are required
                    </h3>
                    <p className="td_fs_18 td_heading_color td_opacity_7 td_mb_40">
                      Welcome to MIT Polytechnic & ITI College admission application. Please fill in all the required information accurately. Our admissions team will review your application and contact you shortly.
                    </p>
                    
                    <h3 className="td_fs_32 td_medium td_mb_30">Personal Information</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="td_medium td_heading_color td_mb_12">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="td_form_field td_mb_30 td_medium td_white_bg"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="td_medium td_heading_color td_mb_12">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="td_form_field td_mb_30 td_medium td_white_bg"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Father's Name *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter father's name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Gender *
                      </label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Aadhar Number *
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter 12-digit Aadhar number"
                        maxLength="12"
                        required
                      />
                    </div>
                  </div>

                  <h3 className="td_fs_32 td_medium td_mb_30 td_mt_40">Contact Information</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter 10-digit mobile number"
                        maxLength="10"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <label className="td_medium td_heading_color td_mb_12">
                    Permanent Address *
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    className="td_form_field td_mb_30 td_medium td_white_bg"
                    rows="3"
                    placeholder="Enter your permanent address"
                    required
                  ></textarea>

                  <div className="row">
                    <div className="col-md-4">
                      <label className="td_medium td_heading_color td_mb_12">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="td_medium td_heading_color td_mb_12">
                        District *
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter district"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="td_medium td_heading_color td_mb_12">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter pincode"
                        maxLength="6"
                        required
                      />
                    </div>
                  </div>

                  <h3 className="td_fs_32 td_medium td_mb_30 td_mt_40">Educational Details</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Course Type *
                      </label>
                      <select 
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        value={courseType}
                        onChange={handleCourseTypeChange}
                      >
                        <option value="">Select Course Type</option>
                        <option value="polytechnic">Polytechnic Diploma</option>
                        <option value="iti">ITI Course</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Preferred Course/Department *
                      </label>
                      <select 
                        name="preferredCourse"
                        value={formData.preferredCourse}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        disabled={!courseType}
                        required
                      >
                        <option value="">
                          {!courseType 
                            ? "First select course type" 
                            : "Select Department"}
                        </option>
                        {courseType === "polytechnic" && polytechnicCourseOptions.map((course) => (
                          <option key={course.value} value={course.value}>
                            {course.label}
                          </option>
                        ))}
                        {courseType === "iti" && itiCourseOptions.map((course) => (
                          <option key={course.value} value={course.value}>
                            {course.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Last Qualification *
                      </label>
                      <select 
                        name="lastQualification"
                        value={formData.lastQualification}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="class_10">10th Standard</option>
                        <option value="class_12">12th Standard</option>
                        <option value="diploma">Diploma</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Percentage/CGPA *
                      </label>
                      <input
                        type="text"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter percentage or CGPA"
                        required
                      />
                    </div>
                  </div>

                  <label className="td_medium td_heading_color td_mb_12">
                    School/College Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    className="td_form_field td_mb_30 td_medium td_white_bg"
                    placeholder="Enter your previous institution name"
                    required
                  />

                  <h3 className="td_fs_32 td_medium td_mb_30 td_mt_40">Additional Information</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Community *
                      </label>
                      <select 
                        name="community"
                        value={formData.community}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        required
                      >
                        <option value="">Select Community</option>
                        <option value="oc">OC</option>
                        <option value="bc">BC</option>
                        <option value="mbc">MBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="td_medium td_heading_color td_mb_12">
                        Annual Family Income
                      </label>
                      <input
                        type="text"
                        name="annualFamilyIncome"
                        value={formData.annualFamilyIncome}
                        onChange={handleInputChange}
                        className="td_form_field td_mb_30 td_medium td_white_bg"
                        placeholder="Enter annual family income"
                      />
                    </div>
                  </div>

                  <label className="td_medium td_heading_color td_mb_12">
                    How did you hear about us?
                  </label>
                  <select 
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="td_form_field td_mb_30 td_medium td_white_bg"
                  >
                    <option value="">Select an option</option>
                    <option value="website">Website</option>
                    <option value="social">Social Media</option>
                    <option value="friends">Friends/Relatives</option>
                    <option value="newspaper">Newspaper/Advertisement</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="td_mb_30">
                    <label className="td_medium td_heading_color">
                      <input type="checkbox" className="td_mr_10" required />
                      I hereby declare that all the information provided above is true and correct to the best of my knowledge.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="td_btn td_style_1 td_radius_10 td_medium w-100 td_fs_20"
                    disabled={loading}
                  >
                    <span className="td_btn_in td_white_color td_accent_bg">
                      <span>{loading ? "Submitting..." : "Submit Application"}</span>
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="M15.1575 4.34302L3.84375 15.6567"
                          stroke="currentColor"
                        />
                        <path
                          d="M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314"
                          stroke="currentColor"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    </Layout>
  );
};
