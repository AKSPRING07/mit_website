import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HeaderLanguage } from "./HeaderLanguage";

export const HeaderSecondaryNav = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return undefined;
    }

    const updateNavHeight = () => {
      document.documentElement.style.setProperty(
        "--td-secondary-nav-height",
        `${navElement.offsetHeight}px`
      );
    };

    updateNavHeight();

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateNavHeight);
      resizeObserver.observe(navElement);
    }

    window.addEventListener("resize", updateNavHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateNavHeight);
      document.documentElement.style.removeProperty("--td-secondary-nav-height");
    };
  }, []);

  return (
    <div ref={navRef} className="td_secondary_nav td_sticky_header td_accent_bg">
      <div className="container-fluid">
        <nav className="td_secondary_nav_menu d-flex justify-content-between align-items-center py-2">
            <ul className="td_secondary_nav_list d-flex align-items-center mb-0 list-unstyled td_white_color">
            <li className="me-4"><Link to="/contact" className="td_white_color">Contact Us</Link></li>
            <li className="me-4"><Link to="/grievance-redressal-cell" className="td_white_color">Grievance</Link></li>
            <li className="me-4"><Link to="/contact#feedback" className="td_white_color">Feedback</Link></li>
            <li className="me-4"><Link to="/pledge" className="td_white_color">Pledge</Link></li>
            <li className="me-4"><Link to="/alumni" className="td_white_color">Alumni</Link></li>
          </ul>
          <div className="td_secondary_nav_right d-flex align-items-center">
            <Link to="/signin" className="td_white_color td_medium td_fs_14">
              Login
            </Link>
            <span className="td_white_color mx-2">/</span>
            <Link to="/signup" className="td_white_color td_medium td_fs_14 me-3">
              Register
            </Link>
            <div className="position-relative td_language_wrap">
              <HeaderLanguage />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
