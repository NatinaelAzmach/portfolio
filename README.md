# Portfolio — React 19 + Three.js

A modern, animated developer portfolio built with React 19, Vite, Tailwind CSS 4, Framer Motion, and Three.js.

## Stack

- **React 19** + **Vite 8** — fast dev/build
- **TypeScript** — full type safety
- **Tailwind CSS 4** — utility-first styling with custom theme tokens
- **Framer Motion** — page/section animations, layout transitions
- **@react-three/fiber + drei** — 3D hero background (lazy-loaded)
- **React Router 7** — client-side routing
- **Recharts** — radar chart in Skills section
- **React Helmet Async** — SEO meta tags
- **Radix UI** — accessible primitives
- **Lucide React** — icons

## Features

- Loading screen with animated progress bar
- Custom cursor with magnetic spring effect (desktop only)
- Scroll progress indicator in navbar
- Dark theme (default) with light mode toggle + system preference detection
- 3D floating shapes + particle system in hero (lazy-loaded, code-split)
- Filterable project grid with glassmorphism cards + case study modal
- Animated radar chart + categorized skill bars with tooltips
- Expandable experience timeline
- Contact form with floating labels (Formspree-ready)
- Retro gaming 404 page
- Konami code easter egg → interactive terminal
- Error boundary with recovery UI
- Code-split chunks: three.js, framer-motion, react-router

## Getting Started

```bash
npm install
npm run dev
```

## Configuration

1. Update `src/lib/data.ts` with your real projects, skills, and experience
2. Replace `hello@example.com` in `Contact.tsx` with your email
3. Set your Formspree form ID in `Contact.tsx` (`https://formspree.io/f/YOUR_FORM_ID`)
4. Add your `public/resume.pdf`
5. Update meta tags in `src/pages/Home.tsx`

## Deployment (Vercel)

```bash
npm run build
# Push to GitHub, connect repo in Vercel dashboard
# Set build command: npm run build
# Set output directory: dist
```

Add `vercel.json` for SPA routing:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Easter Egg

Type the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
