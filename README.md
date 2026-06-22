# 🛍️ Product Store — Angular 18 + Signals

A modern, responsive product listing page built with **Angular 18** leveraging the new **Signals API** for reactive state management.

## ✨ Features

- **Angular Signals** — reactive state with `signal()`, `computed()`, and `effect()`
- **Product Grid** — responsive card layout from the [Fake Store API](https://fakestoreapi.com/products)
- **Search** — filter products by title in real-time
- **Category Filter** — pill-based category switcher
- **Pagination** — 8 products per page
- **Product Detail Modal** — full description, rating, and "Add to Cart" button
- **Loading Skeletons** — animated shimmer placeholders while fetching
- **Error State** — retry mechanism on network failure
- **Responsive** — works on mobile, tablet, and desktop

## 🚀 Setup

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/product-store.git
cd product-store

# Install dependencies
npm install

# Start dev server
npm start
# → http://localhost:4200
```

### Build for Production

```bash
npm run build
# Output in /dist/product-store/
```

## 🏗️ Project Structure

```
src/app/
├── services/
│   └── product.service.ts          # HTTP service + Product interface
├── components/
│   ├── product-card/               # Standalone card component (input/output signals)
│   └── product-modal/              # Detail modal component
└── pages/
    └── product-listing/            # Main page — all Signals logic lives here
```

## ⚡ Angular Signals Used

| Signal | Purpose |
|--------|---------|
| `signal<Product[]>([])` | Raw product list from API |
| `signal(true)` | Loading state |
| `signal<string\|null>(null)` | Error state |
| `signal('')` | Search query |
| `signal('all')` | Active category |
| `signal(1)` | Current page |
| `computed()` | Filtered, paginated products, total pages |
| `effect()` | Reset page on filter change |
| `input.required<T>()` | Typed component inputs |
| `output<T>()` | Typed component outputs |

## 🛠️ Tech Stack

- **Angular 18** (standalone components, new control flow `@if` / `@for`)
- **Angular Signals** (no NgRx, no BehaviorSubject)
- **SCSS** with custom design tokens
- **Fake Store API** — `https://fakestoreapi.com/products`
