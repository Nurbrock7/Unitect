# Unitec

Next.js (App Router) starter for a B2B/B2C cable accessories e-commerce platform.

## Stack
- Next.js 14 (App Router)
- MongoDB with Mongoose
- Tailwind CSS

## Included pages
- `/` Home
- `/category/[slug]` Category listing
- `/product/[slug]` Product details
- `/cart` Cart
- `/checkout` Checkout

## Included API routes
- `GET /api/products`
- `GET /api/products/[slug]`
- `GET /api/categories`
- `GET/POST /api/cart`
- `POST /api/checkout`

## Models
- `Category`
- `Product`
- `Order`

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Set `MONGODB_URI` in `.env.local`.
4. Start development server:
   ```bash
   npm run dev
   ```
