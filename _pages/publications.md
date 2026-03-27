---
layout: page
permalink: /publications/
title: publications
description:  
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->
<div id="publications-index" class="publications">
  <div class="pub-filters" role="region" aria-label="Filter publications">
    <div class="pub-filters-row">
      <label class="pub-filter-label" for="pub-filter-year">Year</label>
      <select id="pub-filter-year" class="pub-filter-select form-control form-control-sm" data-pub-filter-year>
        <option value="">All years</option>
      </select>
      <label class="pub-filter-label" for="pub-filter-category">Category</label>
      <select id="pub-filter-category" class="pub-filter-select form-control form-control-sm" data-pub-filter-category>
        <option value="">All categories</option>
      </select>
    </div>
    <p class="pub-filter-count text-muted small mb-0" data-pub-filter-count aria-live="polite"></p>
  </div>

{% bibliography %}

</div>

<script src="{{ '/assets/js/publications-filter.js' | relative_url }}" defer></script>