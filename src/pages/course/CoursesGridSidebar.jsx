import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesOneCMS } from "../../components/courses/CoursesOneCMS";

export const CoursesGridSidebar = () => {
  return (
    <Layout
      breadcrumbTitle={"Courses Grid With Sidebar"}
      breadcrumbSubtitle={"Courses Grid With Sidebar"}
    >
      <CoursesOneCMS defaultTab="tab_1" />
    </Layout>
  );
};
