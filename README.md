# Chronos

A private temporal travel atelier — luxury landing page set in 2087.

Single-file HTML prototype. Cinematic dark-mode marketing site for a fictional time-travel agency, with a live concierge chatbot.

## Preview

Open `Chronos.html` in any modern browser. No build step, no server required.

```bash
open Chronos.html
```

## What's inside

- **Hero** — full-viewport `<canvas>` starfield with parallax drift, occasional shooting stars, layered nebula and vignette gradients. Staggered text rise animation.
- **Three destinations** — Paris 1889 · Mars 2131 · Giza 2570 BCE. Glassmorphism cards with hover lift, scaling image plates, gold-accent arrow reveal.
- **Four-phase voyage grid** — Consult → Prepare → Depart → Return. Hairline-bordered grid with roman numeral medallions.
- **Testimonial + footer** — editorial blockquote, four-column sitemap.
- **Lumen, the AI concierge** — floating bottom-right launcher, glass chat window. React component with offline canned replies covering anchor, Mars, Paris, Giza, membership, pricing.

## Stack

| Concern | Choice |
|---|---|
| Markup | Vanilla HTML |
| Styles | Pure CSS, `oklch()` color space, CSS custom properties |
| Chatbot | React 18 + Babel Standalone (CDN, in-browser JSX) |
| Animation | CSS keyframes + `IntersectionObserver` for scroll reveal |
| Background | `<canvas>` 2D, ~one star per 4500 px² |
| Fonts | Cormorant Garamond (serif display) · Space Grotesk (sans body) · JetBrains Mono (technical labels) |

## Design tokens

```css
--void:        #05060a              /* base background */
--void-2:      #0a0c12              /* surface elevation */
--ink:         #e9e6df              /* foreground */
--gold:        oklch(0.82 0.09 80)  /* champagne accent */
--ice:         oklch(0.86 0.07 220) /* cool accent */
--ember:       oklch(0.68 0.14 35)  /* warm accent */
--serif:       'Cormorant Garamond'
--sans:        'Space Grotesk'
--mono:        'JetBrains Mono'
```

## Aesthetic direction

Apple × Interstellar — refined dark luxury. Champagne gold as singular accent against deep void black. Editorial italic serif paired with technical mono. Film grain overlay (SVG turbulence), backdrop-blur glass surfaces, hairline borders at low opacity. Slow ease-out motion curves, breathing glow micro-animations.

## Browser support

Modern evergreen browsers. Uses `oklch()`, `backdrop-filter`, `aspect-ratio`, `IntersectionObserver`, ES2020.

## Origin

Designed in [Claude Design](https://claude.ai/design) — prototype handoff bundle extracted from a design export. Brief: *"Luxury time travel agency landing page in dark mode with cinematic video hero, premium futuristic UI, elegant animations, 3 immersive destination cards, floating AI chatbot, glassmorphism effects, and ultra-luxury Apple × Interstellar aesthetic."*

## Notes

- The tweaks panel from the original prototype (accent color, mood, headline variants, grain toggle, star density) is omitted — it was a design-tool helper, not part of the shipped landing experience.
- Chatbot uses an offline reply engine since `window.claude.complete` is only available inside the Claude Design tool. Drop in any LLM API to make replies live.
- Destination image areas are gradient placeholders — swap in real cinematic stills or video loops when ready.
