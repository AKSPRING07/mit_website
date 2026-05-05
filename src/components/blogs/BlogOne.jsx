import React from "react";
import { BlogOneItem } from "./BlogOneItem";

import post1 from "../../assets/img/home_1/post_1.jpg";
import post2 from "../../assets/img/home_1/post_2.jpg";
import post3 from "../../assets/img/home_1/post_3.jpg";

export const BlogOne = () => {
  const blogPosts = [
    {
      src: post1,
      date: "Feb 15, 2025",
      author: "Rajesh Kumar",
      title: "MIT Polytechnic College & ITI College Admission Process 2025 - Complete Guide",
      description:
        "Everything you need to know about admission requirements, entrance exams, and diploma courses at MIT Polytechnic College and ITI courses at MIT ITI College.",
      delay: "0.2s",
    },
    {
      src: post2,
      date: "Feb 10, 2025",
      author: "Priya Lakshmi",
      title: "Top Diploma & ITI Courses at MIT Polytechnic College & MIT ITI College for 2025",
      description:
        "Explore MIT's current programmes including DIPLOMA IN AI & ML, DIPLOMA IN MECHANICAL ENGINEERING, WIREMAN, SURVEYOR, and COPA along with their career prospects.",
      delay: "0.3s",
    },
    {
      src: post3,
      date: "Feb 05, 2025",
      author: "Suresh M",
      title: "Campus Life at MIT - Student Experience",
      description:
        "Discover the vibrant campus life, cultural activities, sports facilities, and student clubs at MIT Polytechnic College & MIT ITI College, Mettur Dam.",
      delay: "0.4s",
    },
  ];

  return (
    <section>
      <div className="td_height_112 td_height_lg_75" />
      <div className="container">
        <div
          className="td_section_heading td_style_1 text-center wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.2s"
        >
          <p className="td_section_subtitle_up td_fs_18 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
            NEWS & UPDATES
          </p>
          <h2 className="td_section_title td_fs_48 mb-0">
            Latest News From <br />
            MIT Polytechnic College & MIT ITI College
          </h2>
        </div>

        <div className="td_height_50 td_height_lg_50" />

        <div className="row td_gap_y_30">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="col-lg-4 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={post.delay}
            >
              <BlogOneItem {...post} />
            </div>
          ))}
        </div>
      </div>

      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
