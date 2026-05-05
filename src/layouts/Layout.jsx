import React, { useLayoutEffect } from "react";
import { ScrollToTop } from "../components/scroll_to_top/ScrollToTop";
import { HeaderOne } from "../components/headers/HeaderOne";
import { FooterOne } from "../components/footers/FooterOne";
import { useLocation } from "react-router-dom";
import { HeaderNine } from "../components/headers/HeaderNine";
import { Breadcrumb } from "../components/breadcrumb/Breadcrumb";
import { HeaderSecondaryNav } from "../components/headers/HeaderSecondaryNav";
import DESSF from "../assets/img/DESSF.jpeg";

export const Layout = ({
  children,
  header = 9,
  footer = 1,
  bodyClass,
  breadcrumbTitle,
  breadcrumbSubtitle,
  breadcrumbImage = DESSF,
  showBreadcrumb = true,
}) => {
  const { pathname } = useLocation();

  // theme
  useLayoutEffect(() => {
    if (!bodyClass) {
      return undefined;
    }

    document.body.classList.add(bodyClass);

    return () => document.body.classList.remove(bodyClass);
  }, [bodyClass, pathname]);

  return (
    <>
      {/* scroll to top */}
      <ScrollToTop />

      {/* secondary navigation */}
      <HeaderSecondaryNav />

      {/* header */}
      {header === 1 && <HeaderOne />}
      {header === 9 && <HeaderNine />}

      {showBreadcrumb && breadcrumbTitle && (
        <Breadcrumb title={breadcrumbTitle} subtitle={breadcrumbSubtitle}  pageHeadingBgurl={breadcrumbImage}/>
      )}

      {children}

      {/* footer */}
      {footer === 1 && <FooterOne />}
    </>
  );
};
