const TRANSLATION_DICTIONARY = {
  "Home": "முகப்பு",
  "Associations": "கூட்டமைப்புகள்",
  "Placements": "பணியிடங்கள்",
  "Gallery": "புகைப்படக்காட்சி",
  "About": "பற்றி",
  "Departments": "துறை",
  "Admission": "வுகுமதிப்பு",
  "Committees": "குழுக்கள்",
  "Contact Us": "எங்களை அணுகவும்",
  "Grievance": "பிரச்னை",
  "Feedback": "மதிப்புரை",
  "Pledge": "உறுதி",
  "Alumni": "முன்னாள் மாணவர்கள்",
  "Apply Now": "இப்போது விண்ணப்பிக்கவும்",
  "Search Here": "இங்கே தேடவும்",
  "Recent Post": "சமீபத்திய பதிவு",
  "Popular Keyword": "பிரபலமான முக்கிய சொற்கள்",
  "Loading...": "ஏற்றுகிறது...",
  "No committees found.": "குழுக்கள் இடம்பெறவில்லை.",
  "Back to Committees": "குழுக்களுக்கு திரும்பவும்",
  "Committee Details": "குழு விவரங்கள்",
  "Committee Not Found": "குழு காணப்படவில்லை",
  "Official Committee Order": "அதிகாரப்பூர்வ குழு கட்டளைகள்",
  "Safe, respectful, and ragging-free campus environment": "பாதுகாப்பான, மரியாதையான மற்றும் ரேகிங் இல்லாத வளாக சூழல்",
  "Committee Overview": "குழு கண்ணோட்டம்",
  "Quick View": "விரைவான காட்சி",
  "Committee Members": "குழு உறுப்பினர்கள்",
  "Grievance Redressal Cell": "பிணைவு நீக்கிய குழு",
  "Committee & Grievance Support": "குழு மற்றும் பிணைவு ஆதரவு",
  "Institute": "நிறுவனம்",
  "Contact": "தொடர்பு",
  "Privacy Policy": "தனியுரிமை கொள்கை",
  "Help Center": "உதவி மையம்",
  "Refund": "மீள்பணம்",
  "Search": "தேடு",
  "Submit": "சமர்ப்பிக்கவும்",
  "Keywords": "முக்கிய சொற்கள்",
  "Tamil": "தமிழ்",
  "English": "ஆங்கிலம்",
  "Home / Committees": "முகப்பு / குழுக்கள்",
  "Home / Committee & Grievance Support": "முகப்பு / குழு மற்றும் பிணைவு ஆதரவு",
  "Knowledge is Power": "அறிவு சக்தி",
  "MIT Polytechnic College & MIT ITI College - The Best Place to Invest in your Knowledge": "MIT பாலிடெக்னிக் கல்லூரியும் MIT ஐ.டி.ஐ. கல்லூரியும் - உங்கள் அறிவில் முதலீடு செய்ய சிறந்த இடம்",
  "MIT Polytechnic College": "MIT பாலிடெக்னிக் கல்லூரி",
  "MIT ITI College": "MIT ஐ.டி.ஐ. கல்லூரி",
  "MIT Polytechnic & ITI College comprises MIT Polytechnic College and MIT ITI College, situated in the heart of nature at Cauvery Cross, Mettur Dam. Our green and eco-friendly campus offers a comfortable and conducive learning environment. With easy access via the main road and bus facility, we're committed to providing quality technical education and a better future for our students.": "MIT பாலிடெக்னிக் மற்றும் ஐ.டி.ஐ. கல்லூரி கௌவேரி குருசில், மேட்டூர் அணையின் இயற்கையின் இடைக்கோட்டில் அமைந்துள்ள MIT பாலிடெக்னிக் கல்லூரியும் MIT ஐ.டி.ஐ. கல்லூரியும் அடங்குகிறது. எமது பசுமையான மற்றும் சுற்றுச்சூழலுக்கு உகந்த வளாகம் வசதியான மற்றும் கற்றலுக்கு உதவும் சூழலை வழங்குகிறது. பிரதான சாலையிலும் பேருந்து வசதியிலும் எளிதான அணுகலுடன், மாணவர்களுக்கு தரமான தொழில்நுட்ப கல்வியையும் சிறந்த எதிர்காலத்தையும் வழங்குவதில் நாங்கள் நம்பிக்கை வைக்கிறோம்.",
  "Mettur Dam": "மேட்டூர் அணை",
  "Cauvery Cross": "காவிரி கழுத்து",
  "Our green and eco-friendly campus offers a comfortable and conducive learning environment. With easy access via the main road and bus facility, we're committed to providing quality technical education and a better future for our students.": "எமது பசுமையான மற்றும் சுற்றுச்சூழலுக்கு உகந்த வளாகம் வசதியான மற்றும் கற்றலுக்கு உதவும் சூழலை வழங்குகிறது. பிரதான சாலையிலும் பேருந்து வசதியிலும் எளிதான அணுகலுடன், மாணவர்களுக்கு தரமான தொழில்நுட்ப கல்வியையும் சிறந்த எதிர்காலத்தையும் வழங்குவதில் நாங்கள் நம்பிக்கை வைக்கிறோம்.",
  "View Our Program": "எமது திட்டத்தை பார்க்கவும்",
  "Apply Now": "இப்போது விண்ணப்பிக்கவும்",
  "Request Info": "தகவல் கோருங்கள்",
  "Chat With Us": "எங்களுடன் பேசுங்கள்",
  "Body text": "உள்ளடக்க உரை",
};

const translationEntries = Object.entries(TRANSLATION_DICTIONARY).sort(
  ([a], [b]) => b.length - a.length
);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const translateText = (text) => {
  if (!text || typeof text !== "string") return text;

  let translated = text;
  translationEntries.forEach(([english, tamil]) => {
    const regex = new RegExp(escapeRegExp(english), "g");
    translated = translated.replace(regex, tamil);
  });

  return translated;
};

const shouldTranslateNode = (node) => {
  if (!node || node.nodeType !== Node.TEXT_NODE) return false;
  const value = node.nodeValue;
  return value && value.trim().length > 0;
};

export const applyLanguage = (lang = "English") => {
  if (typeof document === "undefined") return;

  const root = document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldTranslateNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  let node = walker.nextNode();
  while (node) {
    if (node.__originalText == null) {
      node.__originalText = node.nodeValue;
    }

    if (lang === "Tamil") {
      node.nodeValue = translateText(node.__originalText);
    } else {
      node.nodeValue = node.__originalText;
    }

    node = walker.nextNode();
  }
};

export const getSavedLanguage = () => {
  if (typeof window === "undefined" || !window.localStorage) return "English";
  return localStorage.getItem("lang") || "English";
};

export const setSavedLanguage = (lang) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  localStorage.setItem("lang", lang);
};
