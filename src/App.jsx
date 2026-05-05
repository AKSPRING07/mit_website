import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HomeOne } from "./pages/home/HomeOne";
import { useWow } from "./lib/hooks/useWow";
import { CoursesGridView } from "./pages/course/CoursesGridView";
import { CoursesListView } from "./pages/course/CoursesListView";
import { CoursesGridSidebar } from "./pages/course/CoursesGridSidebar";
import { CoursesDetails } from "./pages/course/CoursesDetails";
import { About } from "./pages/about/About";
import { Error } from "./pages/error/Error";
import { Event } from "./pages/event/Event";
import { EventDetails } from "./pages/event/EventDetails";
import { TeamMembers } from "./pages/team/TeamMembers";
import { TeamMemberDetails } from "./pages/team/TeamMemberDetails";
import { StudentRegistrations } from "./pages/auth/StudentRegistrations";
import { InstructorRegistrations } from "./pages/auth/InstructorRegistrations";
import { Signup } from "./pages/auth/Signup";
import { Signin } from "./pages/auth/Signin";
import { Faq } from "./pages/faq/Faq";
import { Cart } from "./pages/cart/Cart";
import { Checkout } from "./pages/checkout/Checkout";
import { Blog } from "./pages/blogs/Blog";
import { BlogWithSidebar } from "./pages/blogs/BlogWithSidebar";
import { BlogDetails } from "./pages/blogs/BlogDetails";
import { Alumni } from "./pages/alumni/Alumni";
import { Pledge } from "./pages/pledge/Pledge";
import { Contact } from "./pages/contact/Contact";
import { Placements } from "./pages/placements/Placements";
import { Gallery } from "./pages/gallery/Gallery";
import { Departments } from "./pages/departments/Departments";
import { ITI } from "./pages/iti/ITI";
import { Committees } from "./pages/committees/Committees";
import { CommitteeDetails } from "./pages/committees/CommitteeDetails";
import { AntiRaggingCommittee } from "./pages/committees/AntiRaggingCommittee";
import { InternalComplaintsCommittee } from "./pages/committees/InternalComplaintsCommittee";
import { AICTEApprovals } from "./pages/committees/AICTEApprovals";
import { GrievanceRedressalCell } from "./pages/committees/GrievanceRedressalCell";
import { ScStCommittee } from "./pages/committees/ScStCommittee";
import { VishakaCommittee } from "./pages/committees/VishakaCommittee";
import { MandatoryDisclosure } from "./pages/committees/MandatoryDisclosure";
import { Associations } from "./pages/associations/Associations";
import { AssociationDetails } from "./pages/associations/AssociationDetails";
import { ClubDetails } from "./pages/associations/ClubDetails";
import { useImageOptimization } from "./lib/hooks/useImageOptimization";

function App() {
  useWow();

  // on route change to top of the page
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  useImageOptimization(pathname);

  return (
    <Routes>
      <Route path="/" element={<HomeOne />} />
      <Route path="/courses-grid-view" element={<CoursesGridView />} />
      <Route path="/courses-list-view" element={<CoursesListView />} />
      <Route
        path="/courses-grid-with-sidebar"
        element={<CoursesGridSidebar />}
      />
      <Route path="/course-details" element={<Navigate to="/course-details/deee" replace />} />
      <Route path="/course-details/:id" element={<CoursesDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event-details" element={<EventDetails />} />
      <Route path="/team-members" element={<TeamMembers />} />
      <Route path="/team-member-details" element={<TeamMemberDetails />} />
      <Route
        path="/students-registrations"
        element={<StudentRegistrations />}
      />
      <Route
        path="/instructor-registrations"
        element={<InstructorRegistrations />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />
      <Route path="/faqs" element={<Faq />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/pledge" element={<Pledge />} />
      <Route path="/blog-with-sidebar" element={<BlogWithSidebar />} />
      <Route path="/blog-details/:id" element={<BlogDetails />} />
      <Route path="/blog-details" element={<BlogDetails />} />
      <Route path="/alumni" element={<Alumni />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/placements" element={<Placements />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/iti" element={<ITI />} />
      <Route path="/committees" element={<Committees />} />
      <Route path="/committee-details/:id" element={<CommitteeDetails />} />
      <Route path="/anti-ragging-committee" element={<AntiRaggingCommittee />} />
      <Route path="/internal-complaints-committee" element={<InternalComplaintsCommittee />} />
      <Route path="/aicte-approvals" element={<AICTEApprovals />} />
      <Route path="/grievance-redressal-cell" element={<GrievanceRedressalCell />} />
      <Route path="/sc-st-committee" element={<ScStCommittee />} />
      <Route path="/sexual-harassment-redressal-committee" element={<VishakaCommittee />} />
      <Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
      <Route path="/associations" element={<Associations />} />
      <Route path="/association-details/:id" element={<AssociationDetails />} />
      
      {/* Missing Routes */}
      <Route path="/admission" element={<StudentRegistrations />} />
      <Route path="/online-payment" element={<div className="container py-5 text-center"><h2>Online Payment Coming Soon</h2><p>Our online payment gateway is being linked with the bank.</p></div>} />
      
      {/* Club Routes */}
      <Route path="/associations/cultural" element={<ClubDetails slug="cultural" />} />
      <Route path="/associations/reading" element={<ClubDetails slug="reading" />} />
      <Route path="/associations/sports" element={<ClubDetails slug="sports" />} />
      <Route path="/associations/quiz" element={<ClubDetails slug="quiz" />} />
      <Route path="/associations/electoral-literacy" element={<ClubDetails slug="electoral-literacy" />} />
      <Route path="/cultural" element={<ClubDetails slug="cultural" />} />
      <Route path="/reading" element={<ClubDetails slug="reading" />} />
      <Route path="/sports" element={<ClubDetails slug="sports" />} />
      <Route path="/quiz" element={<ClubDetails slug="quiz" />} />
      <Route path="/electoral-literacy" element={<ClubDetails slug="electoral-literacy" />} />
      
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
