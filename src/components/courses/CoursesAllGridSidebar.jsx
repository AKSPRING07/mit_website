import React from "react";
import { allCourses } from "../../data/courseCatalog";
import { CoursesOneItem } from "./CoursesOneItem";

export const coursesList = allCourses.map((course) => ({
  ...course,
  subtitle: course.shortTitle || course.category.toUpperCase(),
}));

export const CoursesAllGridSidebar = () => {
  return (
    <div className="row td_gap_y_30 td_row_gap_30">
      {coursesList.map((course) => (
        <div key={course.slug} className="col-md-6">
          <CoursesOneItem {...course} />
        </div>
      ))}
    </div>
  );
};
