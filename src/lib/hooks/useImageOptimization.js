import { useEffect } from "react";

const PRIORITY_CONTAINER_SELECTOR = [
  ".td_hero",
  ".td_page_heading",
  ".td_site_header",
].join(", ");

const applyImageHints = (img) => {
  if (!(img instanceof HTMLImageElement)) {
    return;
  }

  const isPriorityImage =
    img.dataset.priority === "high" || !!img.closest(PRIORITY_CONTAINER_SELECTOR);

  if (!img.getAttribute("decoding")) {
    img.setAttribute("decoding", "async");
  }

  if (!img.getAttribute("loading")) {
    img.setAttribute("loading", isPriorityImage ? "eager" : "lazy");
  }

  if (isPriorityImage && !img.getAttribute("fetchpriority")) {
    img.setAttribute("fetchpriority", "high");
  }
};

export const useImageOptimization = (dependency) => {
  useEffect(() => {
    const processExistingImages = () => {
      document.querySelectorAll("img").forEach(applyImageHints);
    };

    processExistingImages();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node.tagName === "IMG") {
            applyImageHints(node);
          }

          node.querySelectorAll?.("img").forEach(applyImageHints);
        });
      });
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [dependency]);
};
