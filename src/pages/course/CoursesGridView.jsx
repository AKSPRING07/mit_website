import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesOneCMS } from "../../components/courses/CoursesOneCMS";

export const CoursesGridView = () => {
  return (
    <Layout
      breadcrumbTitle={"Courses Grid View"}
      breadcrumbSubtitle={"Courses Grid View"}
    >
      <CoursesOneCMS defaultTab="tab_1" />
    </Layout>
  );
};
