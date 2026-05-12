# SQLTuner - Freelance MySQL Performance Tuner Portfolio & Dashboard

A premium, database-focused portfolio website and interactive client performance tuning dashboard for a freelance MySQL expert. Designed with state-of-the-art interactive playgrounds, a functional SQL console shell, and high-performance visualizations.

## 🌟 Key Features

1. **Light & Dark Themes**: Sleek light and dark mode support with system preference auto-detection.
2. **Full RTL Direction Support**: Bi-directional right-to-left layout alignment for global accessibility.
3. **Interactive Slow Query Log Analyzer**: Simulate slow query diagnostic file uploads, examine database tuning index recommendations, test index improvements, and see latency drop from `4.8s` to `0.012s` in real-time.
4. **Interactive SQL Recovery Console Shell**: In the custom `404.html` page, type commands like `SHOW TABLES;` or `SELECT * FROM pages;` to dynamically discover nav directions.
5. **Interactive Schema Optimizer Demo**: Slide/button triggers demonstrating execution times of nested subqueries vs efficient normalized INNER JOIN formats.
6. **Robust Client-Side Form Validation**: Real-time error state tooltips and field borders providing immediate guidance during onboarding and contact requests.
7. **Responsive Navigation Layouts**: Full mobile compatibility (including small 360px) featuring sliding hamburger menus, non-scrolling sticky dashboard panels, and isolated layout direction controls.

## 📂 Project Directory Structure

```text
Freelance MySQL Performance Tuner/
├── assets/
│   ├── css/
│   │   ├── style.css         # Core layout variables, resets, and styles
│   │   ├── dark-mode.css     # Premium dark mode color scale overwrites
│   │   └── rtl.css           # Bidirectional layout adjustments
│   └── js/
│       ├── main.js           # Theme toggling, RTL alignment, forms, and mobile menus
│       └── dashboard.js      # Interactive log parsing and index mock operations
├── pages/
│   ├── index.html            # Main home (6 sections + Query Optimizer)
│   ├── index2.html           # Secondary home (6 sections + Schema Optimizer)
│   ├── about.html            # Consultant story & chronological timeline
│   ├── services.html         # Key service deliverables catalog
│   ├── blog.html             # Performance tutoring articles list
│   ├── contact.html          # Dynamic request booking forms
│   ├── login.html            # Brand redirection portal
│   ├── register.html         # User signup form
│   ├── dashboard.html        # Interactive log uploader & workload analyzer
│   ├── 404.html              # Custom page with active SQL console
│   └── coming-soon.html      # Project clock countdown and beta signup
└── README.md                 # Technical documentation & project layout
```

## 🛠️ Technology Integration

- **Markup**: Semantic HTML5 (Header, Aside, Main, Section, Footer)
- **Styling**: Modern CSS variables, modular layout structures, fluid flexbox/grid
- **Fonts**: Outfit (Premium Headings), Inter (Optimized Body), JetBrains Mono (Database Code/SQL statements)
- **Interactivity**: Native ES6+ Javascript with real-time log loading simulations, ticking count timers, and custom terminal CLI interpretation.
