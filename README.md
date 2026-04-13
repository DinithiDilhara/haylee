# Haylee - Vue 3 SPA

A modern e-commerce Single Page Application built with Vue 3, TypeScript, and Tailwind CSS.

## Tech Stack
- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS
- Pinia (State Management)

## Features
- Browse 100+ products from DummyJSON API
- Filter products by category
- Search products by name
- Click any product to view full details
- Add products to cart (persists during session)

## Component Architecture
- `NavBar.vue` — Search input and cart counter
- `FilterBar.vue` — Category filter chips
- `ProductCard.vue` — Individual product display
- `ProductModal.vue` — Product detail view
- `stores/cart.ts` — Pinia cart store

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173