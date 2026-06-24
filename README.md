# 🏢 BluePeak Properties

**Find Your Perfect Place.**

A modern, fully responsive real estate website built as a portfolio project to demonstrate front-end development skills across interactive UI, JavaScript-driven features, and clean, professional design — built entirely with HTML5, CSS3, and vanilla JavaScript (no frameworks, no backend required).

🔗 **Live Demo:** [https://bluepeak-properties.vercel.app](https://bluepeak-properties.vercel.app) <!-- replace with your actual deployed URL -->
💻 **Repository:** [github.com/tebogomapetla/bluepeak-properties](https://github.com/tebogomapetla/bluepeak-properties) <!-- replace with your actual repo URL -->

---

## 📸 Screenshots

| Home Page | Properties (Filtering) | Mortgage Calculator |
|---|---|---|
| ![Home](assets/images/screenshot-home.jpg) | ![Properties](assets/images/screenshot-properties.jpg) | ![Calculator](assets/images/screenshot-calculator.jpg) |

| Property Details | Dark Mode | Mobile View |
|---|---|---|
| ![Details](assets/images/screenshot-details.jpg) | ![Dark Mode](assets/images/screenshot-darkmode.jpg) | ![Mobile](assets/images/screenshot-mobile.jpg) |

> *Add real screenshots to `assets/images/` and update the file names above before publishing.*

---

## ✨ Features

### Core Pages (9 total)
- **Home** — full-width hero, live property search panel, featured listings, categories, agents, testimonials, mortgage calculator preview, latest listings slider, blog preview, newsletter
- **Properties** — full listing grid with sidebar filters, sorting, and pagination
- **Property Details** — image gallery with linked thumbnail slider, amenities, floor plan, similar properties, agent contact card, enquiry form
- **Agents** — filterable team directory by specialization
- **About** — company story, mission/vision/values, animated statistics, timeline, partners
- **Services** — buying, selling, renting, valuation, investment advice, property management, FAQ
- **Mortgage Calculator** — full interactive calculator with live chart
- **Blog** — articles with category filtering and search
- **Contact** — embedded map, contact form, office locations, WhatsApp CTA

### Interactive JavaScript Features
- 🔍 **Live property filtering** — by location, type, status, price, bedrooms, bathrooms, and garage, with results carried over from the homepage search via URL parameters
- 🧮 **Mortgage Calculator** — real bond repayment calculations with two-way synced number inputs/sliders and a live Chart.js doughnut breakdown of principal vs. interest
- ❤️ **Save/Favourite Properties** — persisted with `localStorage`, synced across every page
- ⚖️ **Compare Properties** — select up to 3 listings and view a side-by-side comparison table
- 🌙 **Dark Mode** — theme preference saved with `localStorage`
- 🖼️ **Linked Gallery Sliders** — main image slider synced with a clickable thumbnail strip
- 📊 **Animated Statistics** — counters that animate into view on scroll
- ❓ **FAQ Accordions** — on the Services and Mortgage Calculator pages
- 📝 **Working Front-End Forms** — appointment/enquiry and contact forms with client-side validation and confirmation states
- 📱 **Fully Responsive** — mobile menu, responsive grids, and a mobile filter drawer
- 💬 **Floating WhatsApp Button** + **Back to Top** button on every page

---

## 🛠️ Built With

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties (CSS variables) for theming, Flexbox & Grid layouts
- **JavaScript (ES6)** — vanilla JS, no frameworks
- **[AOS](https://michalsnik.github.io/aos/)** — scroll animations
- **[Swiper.js](https://swiperjs.com/)** — testimonial, latest listings, and gallery sliders
- **[Chart.js](https://www.chartjs.org/)** — mortgage calculator doughnut chart
- **[Font Awesome](https://fontawesome.com/)** — icon set
- **Google Fonts** — Poppins (headings), Inter (body)

---

## 📁 Project Structure

```
bluepeak-properties/
├── index.html
├── properties.html
├── property-details.html
├── agents.html
├── about.html
├── services.html
├── mortgage-calculator.html
├── blog.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   └── icons/
└── README.md
```

---

## 🚀 Getting Started

This is a static front-end site — no build step, no dependencies to install.

### Option 1: Open directly
Clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/tebogomapetla/bluepeak-properties.git
cd bluepeak-properties
```

### Option 2: Run with a local server (recommended)
Some features (like the iframe map) behave better when served over `http://` rather than opened as a local `file://` path. If you have VS Code, the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) works well, or use Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Deploying
This project deploys cleanly to any static host:
- **Vercel** — connect the GitHub repo and deploy with zero configuration
- **Netlify** — drag and drop the project folder, or connect via Git
- **GitHub Pages** — enable Pages on the repo's `main` branch

---

## ⚠️ Known Limitations

- This is a **front-end only** project — the appointment, enquiry, and contact forms simulate submission with a confirmation screen but do not actually send data anywhere. To make them functional, connect a form service (e.g. [Web3Forms](https://web3forms.com/)) or a small backend.
- The Google Maps embeds use a generic location search query rather than a precise pinned address — update the `src` URL in each `<iframe>` with an exact address or coordinates for production use.
- Several images throughout the project are placeholders — search the codebase for `<!-- photo needed -->` comments for exactly what's required at each spot (subject, orientation, and recommended size).

---

## 👤 Author

**Tebogo Mapetla**
Built as a portfolio project under **Gratitude Tech Solutions** / **Gratitech**

- Freelancer: [your Freelancer.com profile link]
- GitHub: [github.com/tebogomapetla](https://github.com/tebogomapetla)

---

## 📄 License

This project is open for personal portfolio and learning use. If reused commercially, please credit the original author.
