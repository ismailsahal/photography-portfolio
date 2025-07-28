# Photography Portfolio

A responsive photography portfolio website showcasing landscape and street photography.

## Features

- Responsive design that works on all devices
- Photo gallery with category filtering (Landscape/Street)
- Lightbox for full-size photo viewing
- Contact form integration
- E-commerce ready (purchase buttons for prints)

## Tech Stack

- HTML5/CSS3/JavaScript (Vanilla)
- No framework dependencies
- Static site optimized for fast loading

## Local Development

1. Open `index.html` in your browser
2. Use the local admin tools for photo management:
   - `admin.html` - Web-based photo data editor
   - `edit-photo-data.ps1` - PowerShell script for batch editing

## Deployment

This site is ready for deployment on:
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

## Photo Management

When adding new photos:
1. Resize images to 1200px width using the provided scripts
2. Organize into `assets/images/landscape/` or `assets/images/street/`
3. Use `admin.html` locally to update photo data
4. Copy the generated JavaScript code to `assets/js/script.js`
5. Deploy the updated files

## Contact

Contact form submissions are handled by Formspree. Update the form action in `index.html` with your Formspree endpoint.