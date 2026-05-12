export const STATIC_SITE_MODE = import.meta.env.VITE_STATIC_SITE !== "false";

const buildAbsoluteOrRelativeUrl = (url) => {
  if (!url) return null;
  if (typeof url !== 'string') return null;
  if (url.startsWith('http')) return url;

  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  if (baseUrl === '/' || baseUrl === '') {
    return normalizedPath;
  }

  return `${baseUrl.replace(/\/$/, '')}${normalizedPath}`;
};

const extractMediaUrl = (media) => {
  if (!media) return null;

  if (typeof media === 'string') {
    return media;
  }

  if (Array.isArray(media)) {
    for (const item of media) {
      const found = extractMediaUrl(item);
      if (found) return found;
    }
    return null;
  }

  if (typeof media === 'object') {
    if (media.formats) {
      const formatKeys = ['medium', 'small', 'thumbnail', 'large'];
      for (const key of formatKeys) {
        const found = extractMediaUrl(media.formats[key]);
        if (found) return found;
      }
    }

    if (typeof media.url === 'string') {
      return media.url;
    }

    if (typeof media?.attributes?.url === 'string') {
      return media.attributes.url;
    }

    if (media.data) {
      return extractMediaUrl(media.data);
    }
  }

  return null;
};

/**
 * Get a local or absolute URL for an image object/string.
 * @param {string|object} imageData - Image data (string path or object)
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imageData) => {
  if (!imageData) return null;

  const extractedUrl = extractMediaUrl(imageData);
  return buildAbsoluteOrRelativeUrl(extractedUrl);
};
