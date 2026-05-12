import React, { useState } from "react";
import { applyLanguage, setSavedLanguage, getSavedLanguage } from "../../lib/translate";

import WorldIcon from "../../assets/img/icons/world.svg";

export const HeaderLanguage = () => {
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      return getSavedLanguage();
    } catch (error) {
      console.warn("Unable to read saved language:", error);
      return "English";
    }
  });

  const handleLangChange = (newLang) => {
    setLang(newLang);
    try {
      setSavedLanguage(newLang);
    } catch (error) {
      console.warn("Unable to save selected language:", error);
    }
    setShowLang(false);
    applyLanguage(newLang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: newLang } }));
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
