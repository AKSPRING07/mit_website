import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesOneCMS } from "../../components/courses/CoursesOneCMS";

export const CoursesListView = () => {
  return (
    <Layout
      breadcrumbTitle={"Courses List View"}
      breadcrumbSubtitle={"Courses List View"}
    >
      <CoursesOneCMS defaultTab="tab_1" />
    </Layout>
  );
};
