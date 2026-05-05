import $ from "jquery";
import { useEffect } from "react";

export const useTabs = (defaultTab = "tab_1") => {
  useEffect(() => {
    try {
      // Set default active tab
      if (defaultTab && defaultTab !== "tab_1") {
        $(".td_tabs .td_tab_links li").removeClass("active");
        $(".td_tabs .td_tab_links a[href='#" + defaultTab + "']")
          .parents("li")
          .addClass("active");
        $(".td_tabs .td_tab").hide();
        $(".td_tabs #" + defaultTab).show();
      }

      $(".td_tabs .td_tab_links a").on("click", function (e) {
        var currentAttrValue = $(this).attr("href");
        $(".td_tabs " + currentAttrValue)
          .fadeIn(400)
          .siblings()
          .hide();
        $(this)
          .parents("li")
          .addClass("active")
          .siblings()
          .removeClass("active");
        e.preventDefault();
      });
    } catch (error) {
      //
    }
  }, [defaultTab]);
};
