# BluePeak Properties

**Find Your Perfect Place.**

A modern, fully responsive real estate website built as a portfolio project to demonstrate front-end development skills across interactive UI, JavaScript-driven features, and clean, professional design — built entirely with HTML5, CSS3, and vanilla JavaScript (no frameworks, no backend required).

🔗 **Live Demo:** [https://bluepeak-properties.vercel.app](https://bluepeak-properties.vercel.app) <!-- replace with your actual deployed URL -->
💻 **Repository:** [github.com/tebogomapetla/bluepeak-properties](https://github.com/tebogomapetla/bluepeak-properties) <!-- replace with your actual repo URL -->

---

## Features

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
- **Live property filtering** — by location, type, status, price, bedrooms, bathrooms, and garage, with results carried over from the homepage search via URL parameters
- **Mortgage Calculator** — real bond repayment calculations with two-way synced number inputs/sliders and a live Chart.js doughnut breakdown of principal vs. interest
- **Save/Favourite Properties** — persisted with `localStorage`, synced across every page
- **Compare Properties** — select up to 3 listings and view a side-by-side comparison table
- **Dark Mode** — theme preference saved with `localStorage`
- **Linked Gallery Sliders** — main image slider synced with a clickable thumbnail strip
- **Animated Statistics** — counters that animate into view on scroll
- **FAQ Accordions** — on the Services and Mortgage Calculator pages
- **Working Front-End Forms** — appointment/enquiry and contact forms with client-side validation and confirmation states
- **Fully Responsive** — mobile menu, responsive grids, and a mobile filter drawer
- **Floating WhatsApp Button** + **Back to Top** button on every page

---

## Built With

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties (CSS variables) for theming, Flexbox & Grid layouts
- **JavaScript (ES6)** — vanilla JS, no frameworks
- **[AOS](https://michalsnik.github.io/aos/)** — scroll animations
- **[Swiper.js](https://swiperjs.com/)** — testimonial, latest listings, and gallery sliders
- **[Chart.js](https://www.chartjs.org/)** — mortgage calculator doughnut chart
- **[Font Awesome](https://fontawesome.com/)** — icon set
- **Google Fonts** — Poppins (headings), Inter (body)

---

## Project Structure

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

### Deploying
This project deploys cleanly to any static host:
- **Vercel** — connect the GitHub repo and deploy with zero configuration
- **Netlify** — drag and drop the project folder, or connect via Git
- **GitHub Pages** — enable Pages on the repo's `main` branch

---

## 👤 Author

**Tebogo Mapetla**
Built as a portfolio project 

---

## 📄 License

This project is open for personal portfolio and learning use. If reused commercially, please credit the author.
