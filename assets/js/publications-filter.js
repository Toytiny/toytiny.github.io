/**
 * Filters publication list on /publications/ by year and category (data on .bib-entry-item).
 */
(function () {
  const root = document.getElementById("publications-index");
  if (!root) return;

  const yearSelect = root.querySelector("[data-pub-filter-year]");
  const catSelect = root.querySelector("[data-pub-filter-category]");
  const countEl = root.querySelector("[data-pub-filter-count]");
  if (!yearSelect || !catSelect) return;

  const categoryLabels = {
    conference: "Conference",
    journal: "Journal",
    preprint: "Preprint",
    thesis: "Thesis",
    other: "Other",
  };

  function getSections() {
    const sections = [];
    root.querySelectorAll("h2.bibliography").forEach((h2) => {
      const next = h2.nextElementSibling;
      if (next && next.matches("ol.bibliography")) {
        sections.push({ h2, ol: next });
      }
    });
    return sections;
  }

  function collectMeta() {
    const years = new Set();
    const cats = new Set();
    root.querySelectorAll(".bib-entry-item").forEach((el) => {
      const y = (el.getAttribute("data-pub-year") || "").trim();
      const c = (el.getAttribute("data-pub-category") || "other").trim();
      if (y) years.add(y);
      cats.add(c || "other");
    });
    return { years, cats };
  }

  function fillYearOptions() {
    const { years } = collectMeta();
    const sorted = Array.from(years).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
    sorted.forEach((y) => {
      const opt = document.createElement("option");
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    });
  }

  function fillCategoryOptions() {
    const { cats } = collectMeta();
    const order = ["conference", "journal", "preprint", "thesis", "other"];
    order.forEach((key) => {
      if (!cats.has(key)) return;
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = categoryLabels[key] || key;
      catSelect.appendChild(opt);
    });
    Array.from(cats)
      .filter((c) => !order.includes(c))
      .sort()
      .forEach((key) => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        catSelect.appendChild(opt);
      });
  }

  function applyFilter() {
    const yVal = yearSelect.value;
    const cVal = catSelect.value;
    let visible = 0;

    const sections = getSections();
    sections.forEach(({ h2, ol }) => {
      let any = false;
      ol.querySelectorAll(":scope > li").forEach((li) => {
        const item = li.querySelector(".bib-entry-item");
        if (!item) {
          li.hidden = false;
          return;
        }
        const py = (item.getAttribute("data-pub-year") || "").trim();
        const pc = (item.getAttribute("data-pub-category") || "other").trim() || "other";
        const yearOk = yVal === "" || py === yVal;
        const catOk = cVal === "" || pc === cVal;
        const show = yearOk && catOk;
        li.hidden = !show;
        if (show) {
          any = true;
          visible += 1;
        }
      });
      const hideSection = !any;
      h2.hidden = hideSection;
      ol.hidden = hideSection;
    });

    if (countEl) {
      countEl.textContent =
        visible === 0
          ? "No publications match these filters."
          : visible + (visible === 1 ? " publication shown." : " publications shown.");
    }
  }

  fillYearOptions();
  fillCategoryOptions();
  yearSelect.addEventListener("change", applyFilter);
  catSelect.addEventListener("change", applyFilter);
  applyFilter();
})();
