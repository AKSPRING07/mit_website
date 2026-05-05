import React, { useState } from "react";

import WorldIcon from "../../assets/img/icons/world.svg";

export const HeaderLanguage = () => {
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("lang") || "English";
      }
    } catch (error) {
      console.warn("Unable to read saved language:", error);
    }

    return "English";
  });

  const handleLangChange = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch (error) {
      console.warn("Unable to save selected language:", error);
    }
    setShowLang(false);
    // Note: In a real app, this would trigger i18n translations
    if (newLang === 'Tamil') {
      alert('Tamil language support is being mapped for the entire website.');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowLang((v) => !v)}
        className={`td_header_dropdown_btn td_medium td_heading_color ${
          showLang && "active"
        }`}
      >
        <span>{lang}</span>
        <img src={WorldIcon} alt="" className="td_header_dropdown_btn_icon" />
      </button>
      <ul className={`td_header_dropdown_list td_mp_0 ${showLang ? 'active' : ''}`} style={{ display: showLang ? 'block' : 'none' }}>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('English'); }}>English</a>
        </li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLangChange('Tamil'); }}>Tamil</a>
        </li>
      </ul>
    </>
  );
};
