const UI = {
  langToggle: document.getElementById("langToggle"),
  inputText: document.getElementById("inputText"),
  outputText: document.getElementById("outputText"),
  submitBtn: document.getElementById("submitBtn"),
  sampleBtn: document.getElementById("sampleBtn"),
  copyBtn: document.getElementById("copyBtn"),
  clearBtn: document.getElementById("clearBtn"),
  status: document.getElementById("status"),
  loading: document.getElementById("loading"),
  charCount: document.getElementById("charCount"),
  apiBase: document.getElementById("apiBase"),
  findErrors: document.getElementById("findErrors"),
  findMissing: document.getElementById("findMissing"),
  allowedError: document.getElementById("allowedError"),
  minMatch: document.getElementById("minMatch"),
};

const I18N = {
  ar: {
    langLabel: "العربية",
    title: "كاشف الاقتباسات القرآنية",
    subtitle: "وسم النص بمراجع الآيات",
    h1: "وسم النص",
    hint: "الصق النص هنا، ثم اضغط «وسم».",
    inputLabel: "النص",
    inputPlaceholder: "اكتب أو الصق نصًا عربيًا (حتى 5000 حرف)...",
    outputLabel: "النتيجة",
    sample: "نص تجريبي",
    copy: "نسخ",
    clear: "مسح",
    adv: "إعدادات متقدمة",
    apiBase: "رابط الخدمة",
    apiNote: "اتركه كما هو ما لم تكن تستخدم خادمًا مختلفًا.",
    findErrors: "تصحيح الأخطاء الإملائية",
    findMissing: "اكتشاف الكلمات الناقصة",
    allowedError: "نسبة الخطأ المسموحة",
    minMatch: "الحد الأدنى للتطابق",
    submit: "وسم",
    privacy: "يتم إرسال النص مباشرة من المتصفح إلى الخدمة.",
    waitTitle: "لحظات…",
    waitBody: "نقوم بوسم النص الآن.",
    about: "عن الأداة",
    aboutBody:
      "تعتمد الخوارزمية على QDetect لاكتشاف مقاطع الآيات داخل النصوص العربية ثم إرجاع النص مع مرجع السورة والآية.",
    linkLib: "المكتبة",
    linkService: "الخدمة",
    linkPaper: "الورقة العلمية",
    statusReady: "جاهز.",
    statusDone: "تم وسم النص بنجاح.",
    statusCopied: "تم النسخ إلى الحافظة.",
    statusCleared: "تم المسح.",
    statusEmpty: "أضف نصًا أولًا.",
    statusTooLong: "النص طويل جدًا (الحد الأقصى 5000 حرف).",
    statusError: "حدث خطأ أثناء تنفيذ الطلب.",
  },
  en: {
    langLabel: "English",
    title: "Quranic Citation Detector",
    subtitle: "Annotate text with verse references",
    h1: "Annotate Text",
    hint: "Paste your text, then press “Annotate”.",
    inputLabel: "Input Text",
    inputPlaceholder: "Type or paste text (up to 5000 chars)...",
    outputLabel: "Output",
    sample: "Sample",
    copy: "Copy",
    clear: "Clear",
    adv: "Advanced settings",
    apiBase: "Service URL",
    apiNote: "Leave it as-is unless you use a different server.",
    findErrors: "Spelling correction",
    findMissing: "Missing-word detection",
    allowedError: "Allowed error ratio",
    minMatch: "Minimum match",
    submit: "Annotate",
    privacy: "Text is sent directly from your browser to the service.",
    waitTitle: "Just a moment…",
    waitBody: "Annotating your text.",
    about: "About",
    aboutBody:
      "Based on QDetect to detect Quranic verse fragments in Arabic text and return the text annotated with surah/ayah references.",
    linkLib: "Library",
    linkService: "Service",
    linkPaper: "Paper",
    statusReady: "Ready.",
    statusDone: "Annotated successfully.",
    statusCopied: "Copied to clipboard.",
    statusCleared: "Cleared.",
    statusEmpty: "Please enter some text first.",
    statusTooLong: "Text is too long (max 5000 chars).",
    statusError: "Request failed. Please try again or check the service URL.",
  },
};

const DEFAULT_SAMPLE_AR =
  "قال تعالى: وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ وَلَا تَحْزَنْ عَلَيْهِمْ.\n\n" +
  "ومن الأدعية: ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.";

const DEFAULT_SAMPLE_EN = "Paste Arabic text here. English UI is supported, but detection targets Arabic content.";

function setStatus(message, kind = "") {
  UI.status.className = `status ${kind}`.trim();
  UI.status.textContent = message || "";
}

function setLoading(isOpen) {
  UI.loading.dataset.open = isOpen ? "true" : "false";
  UI.loading.setAttribute("aria-hidden", isOpen ? "false" : "true");
  UI.submitBtn.disabled = isOpen;
}

function getLang() {
  return localStorage.getItem("qd_lang") || "ar";
}

function setLang(lang) {
  localStorage.setItem("qd_lang", lang);
  const t = I18N[lang];

  document.title = t.title;
  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = document.body.dir;

  document.getElementById("t_title").textContent = t.title;
  document.getElementById("t_subtitle").textContent = t.subtitle;
  document.getElementById("t_h1").textContent = t.h1;
  document.getElementById("t_hint").textContent = t.hint;
  document.getElementById("t_inputLabel").textContent = t.inputLabel;
  document.getElementById("t_outputLabel").textContent = t.outputLabel;
  UI.sampleBtn.textContent = t.sample;
  document.getElementById("t_copy").textContent = t.copy;
  document.getElementById("t_clear").textContent = t.clear;
  document.getElementById("t_adv").textContent = t.adv;
  document.getElementById("t_apiBase").textContent = t.apiBase;
  document.getElementById("t_apiNote").textContent = t.apiNote;
  document.getElementById("t_findErrors").textContent = t.findErrors;
  document.getElementById("t_findMissing").textContent = t.findMissing;
  document.getElementById("t_allowedError").textContent = t.allowedError;
  document.getElementById("t_minMatch").textContent = t.minMatch;
  document.getElementById("t_submit").textContent = t.submit;
  document.getElementById("t_privacy").textContent = t.privacy;
  document.getElementById("t_waitTitle").textContent = t.waitTitle;
  document.getElementById("t_waitBody").textContent = t.waitBody;
  document.getElementById("t_about").textContent = t.about;
  document.getElementById("t_aboutBody").textContent = t.aboutBody;
  document.getElementById("t_lang").textContent = t.langLabel;
  document.getElementById("t_linkLib").textContent = t.linkLib;
  document.getElementById("t_linkService").textContent = t.linkService;
  document.getElementById("t_linkPaper").textContent = t.linkPaper;

  UI.inputText.placeholder = t.inputPlaceholder;
}

function getApiEndpoint() {
  const raw = (UI.apiBase.value || "").trim();
  if (!raw) return "/v1/annotate";

  const cleaned = raw.replace(/\/+$/, "");
  if (cleaned.endsWith("/v1/annotate")) return cleaned;
  if (cleaned.endsWith("/annotate")) return cleaned;
  if (cleaned.endsWith("/v1")) return `${cleaned}/annotate`;
  return `${cleaned}/v1/annotate`;
}

function saveApiBase() {
  localStorage.setItem("qd_api_base", (UI.apiBase.value || "").trim());
}

function loadApiBase() {
  const stored = localStorage.getItem("qd_api_base");
  if (stored) {
    UI.apiBase.value = stored;
    return;
  }
  UI.apiBase.value = "https://quran-detector-api.ieasybooks.com";
}

function buildSettings() {
  const allowed_error_pct = Number(UI.allowedError.value);
  const min_match = Number(UI.minMatch.value);
  return {
    find_errors: Boolean(UI.findErrors.checked),
    find_missing: Boolean(UI.findMissing.checked),
    allowed_error_pct: Number.isFinite(allowed_error_pct) ? allowed_error_pct : 0.25,
    min_match: Number.isFinite(min_match) ? min_match : 3,
  };
}

async function annotate() {
  const lang = getLang();
  const t = I18N[lang];
  const text = UI.inputText.value || "";

  if (!text.trim()) {
    setStatus(t.statusEmpty, "err");
    return;
  }
  if (text.length > 5000) {
    setStatus(t.statusTooLong, "err");
    return;
  }

  UI.outputText.value = "";
  UI.copyBtn.disabled = true;
  setStatus("");

  const endpoint = getApiEndpoint();
  setLoading(true);

  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, settings: buildSettings() }),
    });

    if (!resp.ok) {
      let detail = "";
      try {
        const j = await resp.json();
        detail = j?.detail ? ` ${j.detail}` : "";
      } catch {
        // ignore
      }
      throw new Error(`HTTP ${resp.status}.${detail}`);
    }

    const data = await resp.json();
    UI.outputText.value = data.annotated_text || "";
    UI.copyBtn.disabled = !UI.outputText.value;
    setStatus(t.statusDone, "ok");
  } catch (e) {
    setStatus(`${t.statusError} ${String(e?.message || e)}`, "err");
  } finally {
    setLoading(false);
  }
}

function updateCharCount() {
  const len = (UI.inputText.value || "").length;
  UI.charCount.textContent = `${len} / 5000`;
  UI.charCount.className = `status small ${len > 5000 ? "err" : ""}`.trim();
}

async function copyOutput() {
  const lang = getLang();
  const t = I18N[lang];
  const value = UI.outputText.value || "";
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    setStatus(t.statusCopied, "ok");
  } catch {
    // Fallback
    UI.outputText.focus();
    UI.outputText.select();
    document.execCommand("copy");
    setStatus(t.statusCopied, "ok");
  }
}

function clearAll() {
  const lang = getLang();
  const t = I18N[lang];
  UI.inputText.value = "";
  UI.outputText.value = "";
  UI.copyBtn.disabled = true;
  updateCharCount();
  setStatus(t.statusCleared, "ok");
}

function setSample() {
  const lang = getLang();
  UI.inputText.value = lang === "ar" ? DEFAULT_SAMPLE_AR : DEFAULT_SAMPLE_EN;
  updateCharCount();
  UI.inputText.focus();
}

function init() {
  loadApiBase();
  setLang(getLang());
  updateCharCount();
  setStatus(I18N[getLang()].statusReady);

  UI.langToggle.addEventListener("click", () => {
    const next = getLang() === "ar" ? "en" : "ar";
    setLang(next);
  });

  UI.apiBase.addEventListener("change", saveApiBase);
  UI.inputText.addEventListener("input", updateCharCount);

  UI.submitBtn.addEventListener("click", annotate);
  UI.sampleBtn.addEventListener("click", setSample);
  UI.copyBtn.addEventListener("click", copyOutput);
  UI.clearBtn.addEventListener("click", clearAll);

  // Ctrl/Cmd+Enter to submit
  UI.inputText.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") annotate();
  });
}

init();
