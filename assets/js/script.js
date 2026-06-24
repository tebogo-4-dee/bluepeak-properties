// ============================
// INIT ON LOAD
// ============================
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    once: true,
    offset: 60
  });

  initLoader();
  initDarkMode();
  initMobileMenu();
  initBackToTop();
  initSearchPanel();
  initFavorites();
  initMiniMortgageCalc();
  initTestimonialSwiper();
  initLatestSwiper();
  initNewsletterForms();
  initPropertyFilters();
  initMobileFilterDrawer();
  initCompareFeature();
  initGallerySliders();
  initShareButton();
  initInquiryForm();
  initAgentFilter();
  initCounters();
  initFAQ();
  initMortgageCalculator();
  initBlogFilters();
  initContactForm();

});

// ============================
// LOADING SCREEN
// ============================
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 300);
  });

  // Fallback in case 'load' already fired before listener attached
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('hidden'), 300);
  }
}

// ============================
// DARK MODE (persisted via localStorage)
// ============================
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('i');
  const isDark = localStorage.getItem('bluepeak-dark-mode') === 'true';

  if (isDark) {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggle.addEventListener('click', () => {
    const nowDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('bluepeak-dark-mode', nowDark);

    if (nowDark) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  });
}

// ============================
// MOBILE MENU TOGGLE
// ============================
function initMobileMenu() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
    const icon = menuToggle.querySelector('i');
    if (navbar.classList.contains('menu-open')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      const icon = menuToggle.querySelector('i');
      icon.classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

// ============================
// BACK TO TOP
// ============================
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// SEARCH PANEL -> redirects to properties.html with filters as URL params
// ============================
function initSearchPanel() {
  const searchPanel = document.getElementById('searchPanel');
  if (!searchPanel) return;

  searchPanel.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = document.getElementById('searchLocation').value;
    const type = document.getElementById('searchType').value;
    const price = document.getElementById('searchPrice').value;
    const bedrooms = document.getElementById('searchBedrooms').value;

    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    if (bedrooms) params.set('bedrooms', bedrooms);

    window.location.href = `properties.html?${params.toString()}`;
  });
}

// ============================
// SAVE / FAVOURITE PROPERTIES (localStorage)
// ============================
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('bluepeak-favorites')) || [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem('bluepeak-favorites', JSON.stringify(favorites));
}

function initFavorites() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  if (!favoriteBtns.length) return;

  const favorites = getFavorites();

  favoriteBtns.forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (favorites.includes(id)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentFavorites = getFavorites();
      const index = currentFavorites.indexOf(id);

      if (index === -1) {
        currentFavorites.push(id);
        btn.classList.add('active');
      } else {
        currentFavorites.splice(index, 1);
        btn.classList.remove('active');
      }

      saveFavorites(currentFavorites);
    });
  });
}

// ============================
// MINI MORTGAGE CALCULATOR (homepage preview)
// ============================
function calculateMonthlyPayment(loanAmount, annualInterestRate, years) {
  const monthlyRate = (annualInterestRate / 100) / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    return loanAmount / numPayments;
  }

  const payment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return payment;
}

function initMiniMortgageCalc() {
  const form = document.getElementById('miniMortgageForm');
  if (!form) return;

  const resultBox = document.getElementById('miniCalcResult');
  const resultAmount = document.getElementById('miniCalcAmount');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const loanAmount = parseFloat(document.getElementById('miniLoanAmount').value);
    const interestRate = parseFloat(document.getElementById('miniInterestRate').value);
    const years = parseFloat(document.getElementById('miniLoanYears').value);

    if (!loanAmount || !interestRate || !years) return;

    const monthly = calculateMonthlyPayment(loanAmount, interestRate, years);

    resultAmount.textContent = 'R ' + monthly.toLocaleString('en-ZA', {
      maximumFractionDigits: 0
    });
    resultBox.hidden = false;
  });
}

// ============================
// SWIPER: TESTIMONIALS
// ============================
function initTestimonialSwiper() {
  const el = document.querySelector('.testimonial-swiper');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.testimonial-swiper .swiper-pagination',
      clickable: true
    },
    spaceBetween: 30
  });
}

// ============================
// SWIPER: LATEST PROPERTIES
// ============================
function initLatestSwiper() {
  const el = document.querySelector('.latest-swiper');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper('.latest-swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 26,
    navigation: {
      nextEl: '.latest-swiper .swiper-button-next',
      prevEl: '.latest-swiper .swiper-button-prev'
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      700: { slidesPerView: 2 },
      1100: { slidesPerView: 3 }
    }
  });
}

// ============================
// NEWSLETTER FORMS (front-end only feedback)
// ============================
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form-inline, .newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button');
      const originalText = button.textContent;

      button.textContent = 'Subscribed!';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        if (input) input.value = '';
      }, 2500);
    });
  });
}

// ============================
// PROPERTY FILTERS (properties.html)
// ============================
function initPropertyFilters() {
  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.property-card'));
  const filtersForm = document.getElementById('filtersForm');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const noResultsResetBtn = document.getElementById('noResultsReset');
  const sortSelect = document.getElementById('sortSelect');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');
  const pagination = document.querySelector('.pagination');

  const fields = {
    location: document.getElementById('filterLocation'),
    type: document.getElementById('filterType'),
    status: document.getElementById('filterStatus'),
    price: document.getElementById('filterPrice'),
    bedrooms: document.getElementById('filterBedrooms'),
    bathrooms: document.getElementById('filterBathrooms'),
    garage: document.getElementById('filterGarage')
  };

  // Pre-fill from URL params (coming from the homepage search panel)
  const params = new URLSearchParams(window.location.search);
  ['location', 'type', 'price', 'bedrooms'].forEach(key => {
    if (params.has(key) && fields[key]) {
      fields[key].value = params.get(key);
    }
  });

  function matchesFilters(card) {
    if (fields.location.value && card.dataset.location !== fields.location.value) return false;
    if (fields.type.value && card.dataset.type !== fields.type.value) return false;
    if (fields.status.value && card.dataset.status !== fields.status.value) return false;

    if (fields.price.value) {
      const [min, max] = fields.price.value.split('-').map(Number);
      const price = Number(card.dataset.price);
      if (price < min || price > max) return false;
    }

    if (fields.bedrooms.value && Number(card.dataset.bedrooms) < Number(fields.bedrooms.value)) return false;
    if (fields.bathrooms.value && Number(card.dataset.bathrooms) < Number(fields.bathrooms.value)) return false;
    if (fields.garage.value && Number(card.dataset.garage) < Number(fields.garage.value)) return false;

    return true;
  }

  function applySort(visibleCards) {
    const sortValue = sortSelect ? sortSelect.value : 'newest';

    visibleCards.sort((a, b) => {
      if (sortValue === 'price-low') return Number(a.dataset.price) - Number(b.dataset.price);
      if (sortValue === 'price-high') return Number(b.dataset.price) - Number(a.dataset.price);
      if (sortValue === 'bedrooms') return Number(b.dataset.bedrooms) - Number(a.dataset.bedrooms);
      return 0; // 'newest' keeps original order
    });

    visibleCards.forEach(card => grid.appendChild(card));
  }

  function applyFilters() {
    let visibleCount = 0;
    const visibleCards = [];

    cards.forEach(card => {
      if (matchesFilters(card)) {
        card.classList.remove('hidden-by-filter');
        visibleCards.push(card);
        visibleCount++;
      } else {
        card.classList.add('hidden-by-filter');
      }
    });

    applySort(visibleCards);

    if (resultsCount) {
      resultsCount.innerHTML = `Showing <strong>${visibleCount}</strong> propert${visibleCount === 1 ? 'y' : 'ies'}`;
    }
    if (noResults) noResults.hidden = visibleCount !== 0;
    if (pagination) pagination.style.display = visibleCount === 0 ? 'none' : 'flex';
  }

  function resetFilters() {
    Object.values(fields).forEach(field => { if (field) field.value = ''; });
    if (sortSelect) sortSelect.value = 'newest';
    applyFilters();
  }

  if (filtersForm) {
    filtersForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyFilters();
      filtersForm.classList.remove('open');
    });
  }

  if (resetBtn) resetBtn.addEventListener('click', resetFilters);
  if (noResultsResetBtn) noResultsResetBtn.addEventListener('click', resetFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  applyFilters(); // run once on load in case URL params pre-filled fields
}

// ============================
// MOBILE FILTER DRAWER
// ============================
function initMobileFilterDrawer() {
  const toggleBtn = document.getElementById('filterToggleBtn');
  const filtersForm = document.getElementById('filtersForm');
  if (!toggleBtn || !filtersForm) return;

  toggleBtn.addEventListener('click', () => {
    filtersForm.classList.toggle('open');
  });
}

// ============================
// COMPARE PROPERTIES
// ============================
function initCompareFeature() {
  const checkboxes = document.querySelectorAll('.compare-checkbox');
  if (!checkboxes.length) return;

  const MAX_COMPARE = 3;
  let selected = [];

  const compareBar = document.getElementById('compareBar');
  const compareCount = document.getElementById('compareCount');
  const compareClearBtn = document.getElementById('compareClearBtn');
  const compareViewBtn = document.getElementById('compareViewBtn');
  const compareModal = document.getElementById('compareModal');
  const compareModalOverlay = document.getElementById('compareModalOverlay');
  const compareModalClose = document.getElementById('compareModalClose');
  const compareTable = document.getElementById('compareTable');

  function updateBar() {
    compareBar.hidden = selected.length === 0;
    if (compareCount) compareCount.textContent = selected.length;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const id = checkbox.getAttribute('data-id');

      if (checkbox.checked) {
        if (selected.length >= MAX_COMPARE) {
          checkbox.checked = false;
          alert(`You can compare up to ${MAX_COMPARE} properties at a time.`);
          return;
        }
        selected.push(id);
      } else {
        selected = selected.filter(item => item !== id);
      }

      updateBar();
    });
  });

  function clearCompare() {
    selected = [];
    checkboxes.forEach(checkbox => { checkbox.checked = false; });
    updateBar();
  }

  function getCardData(id) {
    const card = document.querySelector(`.property-card[data-id="${id}"]`);
    if (!card) return null;

    return {
      id,
      image: card.querySelector('.property-image img').getAttribute('src'),
      title: card.querySelector('h3').textContent,
      price: card.querySelector('.property-price').textContent.trim(),
      address: card.querySelector('.property-address').textContent.trim(),
      bedrooms: card.dataset.bedrooms,
      bathrooms: card.dataset.bathrooms,
      garage: card.dataset.garage
    };
  }

  function renderCompareTable() {
    const properties = selected.map(getCardData).filter(Boolean);

    if (!properties.length) {
      compareTable.innerHTML = '<tr><td>No properties selected.</td></tr>';
      return;
    }

    const rows = [
      { label: 'Photo', render: p => `<img src="${p.image}" alt="${p.title}">` },
      { label: 'Property', render: p => p.title },
      { label: 'Price', render: p => `<span class="compare-price">${p.price}</span>` },
      { label: 'Address', render: p => p.address },
      { label: 'Bedrooms', render: p => p.bedrooms },
      { label: 'Bathrooms', render: p => p.bathrooms },
      { label: 'Garage', render: p => p.garage },
      { label: '', render: p => `<button class="compare-remove" data-id="${p.id}">Remove</button>` }
    ];

    let html = '';
    rows.forEach(row => {
      html += `<tr><th>${row.label}</th>`;
      properties.forEach(p => { html += `<td>${row.render(p)}</td>`; });
      html += '</tr>';
    });

    compareTable.innerHTML = html;

    compareTable.querySelectorAll('.compare-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        selected = selected.filter(item => item !== id);
        const checkbox = document.querySelector(`.compare-checkbox[data-id="${id}"]`);
        if (checkbox) checkbox.checked = false;
        updateBar();
        renderCompareTable();
        if (!selected.length) closeModal();
      });
    });
  }

  function openModal() {
    if (!selected.length) return;
    renderCompareTable();
    compareModal.hidden = false;
  }

  function closeModal() {
    compareModal.hidden = true;
  }

  if (compareClearBtn) compareClearBtn.addEventListener('click', clearCompare);
  if (compareViewBtn) compareViewBtn.addEventListener('click', openModal);
  if (compareModalClose) compareModalClose.addEventListener('click', closeModal);
  if (compareModalOverlay) compareModalOverlay.addEventListener('click', closeModal);
}

// ============================
// LINKED GALLERY SLIDERS (property-details.html)
// ============================
function initGallerySliders() {
  const mainEl = document.querySelector('.gallery-main-swiper');
  const thumbsEl = document.querySelector('.gallery-thumbs-swiper');
  if (!mainEl || !thumbsEl || typeof Swiper === 'undefined') return;

  const thumbsSwiper = new Swiper('.gallery-thumbs-swiper', {
    slidesPerView: 5,
    spaceBetween: 12,
    watchSlidesProgress: true,
    breakpoints: {
      0: { slidesPerView: 3 },
      600: { slidesPerView: 5 }
    }
  });

  new Swiper('.gallery-main-swiper', {
    loop: true,
    spaceBetween: 0,
    navigation: {
      nextEl: '.gallery-main-swiper .swiper-button-next',
      prevEl: '.gallery-main-swiper .swiper-button-prev'
    },
    thumbs: {
      swiper: thumbsSwiper
    }
  });
}

// ============================
// SHARE BUTTON
// ============================
function initShareButton() {
  const shareBtn = document.getElementById('shareBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: document.title,
      text: 'Check out this property on BluePeak Properties',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the share sheet — no action needed
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        const icon = shareBtn.querySelector('i');
        icon.classList.replace('fa-share-nodes', 'fa-check');
        setTimeout(() => icon.classList.replace('fa-check', 'fa-share-nodes'), 2000);
      } catch {
        alert('Could not copy link. Please copy the URL manually.');
      }
    }
  });
}

// ============================
// PROPERTY INQUIRY FORM
// ============================
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const confirmationBox = document.getElementById('inquiryConfirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.hidden = true;
    confirmationBox.hidden = false;
  });
}

// ============================
// AGENT FILTER (agents.html)
// ============================
function initAgentFilter() {
  const filterBtns = document.querySelectorAll('.agent-filter-btn');
  const agentCards = document.querySelectorAll('.agent-detailed-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      agentCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden-by-filter');
        } else {
          card.classList.add('hidden-by-filter');
        }
      });
    });
  });
}

// ============================
// ANIMATED STAT COUNTERS (about.html, and anywhere else .counter is used)
// ============================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ============================
// FAQ ACCORDION (services.html)
// ============================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ============================
// FULL MORTGAGE CALCULATOR (mortgage-calculator.html)
// ============================
function initMortgageCalculator() {
  const form = document.getElementById('mortgageForm');
  if (!form) return;

  // Pair each number input with its matching range slider
  const fieldPairs = [
    { number: document.getElementById('housePrice'), range: document.getElementById('housePriceRange') },
    { number: document.getElementById('deposit'), range: document.getElementById('depositRange') },
    { number: document.getElementById('interestRate'), range: document.getElementById('interestRateRange') },
    { number: document.getElementById('loanYears'), range: document.getElementById('loanYearsRange') }
  ];

  const resultMonthly = document.getElementById('resultMonthly');
  const resultLoanAmount = document.getElementById('resultLoanAmount');
  const resultTotalInterest = document.getElementById('resultTotalInterest');
  const resultTotalCost = document.getElementById('resultTotalCost');

  let mortgageChart = null;

  function formatRand(value) {
    return 'R ' + Math.round(value).toLocaleString('en-ZA');
  }

  function getValues() {
    return {
      housePrice: parseFloat(document.getElementById('housePrice').value) || 0,
      deposit: parseFloat(document.getElementById('deposit').value) || 0,
      interestRate: parseFloat(document.getElementById('interestRate').value) || 0,
      loanYears: parseFloat(document.getElementById('loanYears').value) || 1
    };
  }

  function renderChart(loanAmount, totalInterest) {
    const canvas = document.getElementById('mortgageChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const isDark = document.body.classList.contains('dark-mode');
    const data = {
      labels: ['Loan Amount', 'Total Interest'],
      datasets: [{
        data: [loanAmount, totalInterest],
        backgroundColor: ['#2563EB', '#F59E0B'],
        borderWidth: 0
      }]
    };

    const options = {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatRand(ctx.raw)}`
          }
        }
      }
    };

    if (mortgageChart) {
      mortgageChart.data = data;
      mortgageChart.update();
    } else {
      mortgageChart = new Chart(canvas, { type: 'doughnut', data, options });
    }
  }

  function recalculate() {
    const { housePrice, deposit, interestRate, loanYears } = getValues();

    const loanAmount = Math.max(housePrice - deposit, 0);
    const monthly = calculateMonthlyPayment(loanAmount, interestRate, loanYears);
    const totalCost = monthly * loanYears * 12;
    const totalInterest = Math.max(totalCost - loanAmount, 0);

    resultMonthly.textContent = formatRand(monthly);
    resultLoanAmount.textContent = formatRand(loanAmount);
    resultTotalInterest.textContent = formatRand(totalInterest);
    resultTotalCost.textContent = formatRand(totalCost);

    renderChart(loanAmount, totalInterest);
  }

  // Two-way sync: number input <-> range slider
  fieldPairs.forEach(({ number, range }) => {
    if (!number || !range) return;

    number.addEventListener('input', () => {
      range.value = number.value;
      recalculate();
    });

    range.addEventListener('input', () => {
      number.value = range.value;
      recalculate();
    });
  });

  recalculate(); // initial calculation on page load
}

// ============================
// BLOG CATEGORY FILTER + SEARCH (blog.html)
// ============================
function initBlogFilters() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('#blogGrid .blog-card');
  const searchForm = document.getElementById('blogSearchForm');
  const searchInput = document.getElementById('blogSearchInput');

  if (!blogCards.length) return;

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.getAttribute('data-category') === filter)
            ? '' : 'none';
      });
    });
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = searchInput.value.trim().toLowerCase();

      blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(term) ? '' : 'none';
      });
    });
  }
}

// ============================
// CONTACT FORM (contact.html)
// ============================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const confirmationBox = document.getElementById('contactConfirmation');
  const confirmName = document.getElementById('contactConfirmName');
  const anotherBtn = document.getElementById('contactAnotherBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    confirmName.textContent = document.getElementById('contactName').value;

    form.hidden = true;
    confirmationBox.hidden = false;
    confirmationBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  anotherBtn.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    confirmationBox.hidden = true;
  });
}