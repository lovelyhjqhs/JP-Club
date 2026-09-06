(function () {
  var root = document.documentElement;
  var themeKey = "jp-site-theme";
  var langKey = "jp-site-lang";

  function read(name) {
    try {
      return localStorage.getItem(name) || "";
    } catch (e) {
      return "";
    }
  }

  function save(name, value) {
    try {
      localStorage.setItem(name, value);
    } catch (e) {}
  }

  var lang = read(langKey) === "en" ? "en" : "zh";
  var dark = read(themeKey) === "dark";

  var dict = {
    "nav.home": ["学校主页", "Home"],
    "nav.club": ["社团风采", "Clubs"],
    "index.badge": ["上海市建平中学", "Shanghai Jianping High School"],
    "index.school": ["建平中学", "JP"],
    "index.schoolSub": ["社团巡礼 · JIANPING", "Club Festival · JIANPING"],
    "index.hint": ["悬停圆圈 · 查看社团宣传图（可点击直达介绍）", "Hover the circles to preview clubs. Click to open their intro."],
    "index.mobileHint": ["← 左右滑动 · 查看社团宣传图 →", "← Swipe to preview clubs →"],
    "index.fit": ["原比例", "Fit"],
    "index.square": ["正方形", "Square"],
    "index.desc": ["上海市建平中学始建于 1944 年，是上海市首批实验性示范性高中。契承“合格+特长、规范+选择”的办学理念，拥有数十个特色学生社团，涵盖科技、人文、艺术、体育等领域。", "Founded in 1944, Shanghai Jianping High School is one of the city's first experimental and exemplary high schools. Guided by balanced development with special strengths, it hosts dozens of student clubs across technology, humanities, arts, and sports."],
    "index.cta": ["探索全部社团", "Explore All Clubs"],
    "index.orbJeek": ["信息社", "IT Club"],
    "index.orbCompany": ["学生公司", "Student Company"],
    "index.orbCompanySub": ["实践经营", "Practice & Business"],
    "index.orbBasket": ["篮球社", "Basketball Club"],
    "index.orbBasketSub": ["球场风云", "Court Highlights"],
    "index.orbSociety": ["社会学社", "Sociology Club"],
    "index.orbSocietySub": ["洞察社会", "Observe Society"],
    "index.orbChem": ["魔幻化学", "Magic Chemistry"],
    "index.orbChemSub": ["魔化实验室", "Magic Lab"],
    "index.mcJeek": ["JEEK信息社", "JEEK Information Club"],
    "index.mcCompany": ["学生公司", "Student Company"],
    "index.mcBasket": ["篮球社", "Basketball Club"],
    "index.mcSociety": ["社会学社", "Sociology Club"],
    "index.mcChem": ["魔幻化学社", "Magic Chemistry Club"],
    "club.search": ["搜索社团名称、标签、关键词...", "Search club name, tags or keywords..."],
    "club.none": ["暂无符合条件的社团", "No clubs match your search"],
    "club.status": ["2026年秋季招新", "Fall 2026 Recruiting"],
    "club.prep": ["资料整理中", "Details coming soon"],
    "club.more": ["展开更多社团", "Show More Clubs"],
    "club.collapse": ["收起", "Collapse"],
    "club.modalTitle": ["社团名称", "Club Name"],
    "club.about": ["社团介绍", "About"],
    "club.keywords": ["关键词", "Keywords"],
    "club.poster": ["社团海报", "Gallery"],
    "club.contact": ["联系方式", "Contact"],
    "club.contactNote": ["联系备注", "Contact Notes"],
    "club.close": ["关闭", "Close"],
    "jpti.badge": ["上海市建平中学 · 趣味测试", "Shanghai Jianping · Fun Personality Test"],
    "jpti.desc": ["一款专为建平人打造的人格类型测试。从 4 个维度、35 道程度题里，测出你的专属 JPTI 人格——看看你是「漏洞」还是「好孩子」。", "A personality type test made for Jianping students. Answer 35 questions across 4 dimensions and discover your own JPTI type."],
    "jpti.dimEI": ["外向 E · 内向 I", "Extravert E · Introvert I"],
    "jpti.dimNS": ["直觉 N · 感觉 S", "Intuitive N · Sensing S"],
    "jpti.dimTF": ["理性 T · 感性 F", "Thinking T · Feeling F"],
    "jpti.dimJP": ["计划 J · 随性 P", "Judging J · Perceiving P"],
    "jpti.start": ["开始测试", "Start Test"],
    "jpti.meta": ["共 35 题 · 约 3 分钟 · 没有标准答案，凭第一感觉选就行", "35 questions · about 3 minutes · No right answers, go with your first instinct"],
    "jpti.prev": ["上一题", "Previous"],
    "jpti.next": ["下一题", "Next"],
    "jpti.finish": ["查看结果", "View Result"],
    "jpti.resultBadge": ["你的 JPTI 类型", "Your JPTI Type"],
    "jpti.retake": ["重新测试", "Retake"],
    "jpti.back": ["返回首页", "Back to Home"],
    "jpti.qLabel": ["第 1 / 35 题", "Question 1 / 35"],
    "jpti.opt0": ["非常符合", "Very true"],
    "jpti.opt1": ["比较符合", "Somewhat true"],
    "jpti.opt2": ["不确定", "Not sure"],
    "jpti.opt3": ["不太符合", "Not really"],
    "jpti.opt4": ["非常不符合", "Not true at all"],
    "jpti.dimFirstNameE": ["外向", "Extravert"],
    "jpti.dimSecondNameI": ["内向", "Introvert"],
    "jpti.dimFirstNameN": ["直觉", "Intuitive"],
    "jpti.dimSecondNameS": ["感觉", "Sensing"],
    "jpti.dimFirstNameT": ["理性", "Thinking"],
    "jpti.dimSecondNameF": ["感性", "Feeling"],
    "jpti.dimFirstNameJ": ["计划", "Judging"],
    "jpti.dimSecondNameP": ["随性", "Perceiving"],
    "jpti.dimTendency": ["你的倾向：", "Your tendency: "],
    "jpti.portrait": ["画像", "Portrait"],
    "jpti.live": ["实时画面", "Live Camera"]
  };

  function applyLang() {
    root.lang = lang === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value) {
        if (el.tagName === "INPUT") el.setAttribute("placeholder", value[lang === "en" ? 1 : 0]);
        else el.textContent = value[lang === "en" ? 1 : 0];
      }
    });
    var langBtn = document.getElementById("siteLangBtn");
    if (langBtn) langBtn.textContent = lang === "zh" ? "EN" : "中文";
    var themeBtn = document.getElementById("siteThemeBtn");
    if (themeBtn) {
      themeBtn.textContent = dark ? "☀" : "☾";
      themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    document.dispatchEvent(new CustomEvent("site:langchange", { detail: { lang: lang } }));
    if (typeof window.siteAfterLang === "function") window.siteAfterLang();
  }

  function applyTheme() {
    root.classList.toggle("dark", dark);
    var themeBtn = document.getElementById("siteThemeBtn");
    if (themeBtn) {
      themeBtn.textContent = dark ? "☀" : "☾";
      themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function toggleTheme() {
    dark = !dark;
    save(themeKey, dark ? "dark" : "light");
    applyTheme();
  }

  function toggleLang() {
    lang = lang === "zh" ? "en" : "zh";
    save(langKey, lang);
    applyLang();
  }

  function t(key) {
    var value = dict[key];
    return value ? value[lang === "en" ? 1 : 0] : key;
  }

  window.siteT = t;
  window.siteLang = function () { return lang; };
  window.siteAfterLang = null;

  root.classList.toggle("dark", dark);
  applyLang();

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    applyLang();
    var themeBtn = document.getElementById("siteThemeBtn");
    var langBtn = document.getElementById("siteLangBtn");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
    if (langBtn) langBtn.addEventListener("click", toggleLang);
  });
})();
