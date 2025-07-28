# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a photography portfolio website designed to showcase and sell photography prints. The project is a static website using vanilla HTML, CSS, and JavaScript with a focus on responsive design and e-commerce functionality.

## Architecture

- **Frontend-only**: Static website with no backend dependencies
- **Gallery System**: JavaScript-driven photo gallery with filtering and lightbox functionality
- **E-commerce Integration**: Client-side purchase flow (will integrate with payment processor)
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox

## Key Components

- `index.html`: Main page with navigation, hero, gallery, about, and contact sections
- `styles.css`: Responsive CSS with mobile-first design
- `script.js`: Gallery functionality, lightbox, filtering, and purchase flow
- `images/`: Photo assets organized by category (landscape, portrait, street)

## Development Commands

Since this is a static website, no build process is required. Simply open `index.html` in a browser for development.

For production deployment:
- All assets should be optimized
- Images should be compressed and sized appropriately
- Consider using a CDN for image delivery

## Gallery Data Structure

Photos are managed in JavaScript with the following structure:
```javascript
{
  id: unique_id,
  src: "path/to/image.jpg",
  title: "Photo Title",
  category: "landscape|portrait|street",
  price: "$XX",
  description: "Photo description"
}
```

## E-commerce Integration

The website includes purchase functionality that will need integration with:
- Payment processor (Stripe, PayPal, etc.)
- Print fulfillment service
- Order management system