<div align="center">

# ⚡ Vedant Patil — Portfolio

### Next.js 16 · React 19 · TypeScript · CSS Modules · 60 FPS

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Performance](https://img.shields.io/badge/Perf-60_FPS_Locked-00C896?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO-Schema_%2B_OG_%2B_Sitemap-FF6B35?style=for-the-badge)

</div>

---

## 🔥 What This Is

A personal developer portfolio built to be **fast, accessible, and deeply engineered** — not just pretty. The codebase recently went through a full **4-stage performance & architecture overhaul**, eliminating scroll jank, slashing GPU overhead, restructuring the routing, and locking in proper SEO. Every optimization is documented below.

---

## 🏗️ Architecture

```
app/
├── layout.tsx                   # Root shell — fonts, metadata, JSON-LD, Script injection
├── globals.css                  # Design tokens, dark/light mode, base resets
├── (portfolio)/                 # Route group — shared portfolio layout
│   ├── layout.tsx               # Portfolio-scoped layout (Navbar + Footer)
│   ├── page.tsx                 # Homepage (Hero → Projects → TechStack → Workflow → Certs)
│   ├── education/               # Education timeline page
│   └── experience/              # Experience page
├── dossier/                     # Espionage-themed interactive dossier (/dossier)
│   ├── layout.tsx               # Dossier-scoped layout
│   ├── page.tsx                 # State controller (cleaned from 800+ lines → modular)
│   └── page.module.css
├── components/
│   ├── Navbar.tsx / .module.css # Hardware-accelerated fixed navbar w/ passive scroll
│   ├── Hero.tsx                 # Viewport-locked landing screen
│   ├── Projects.tsx             # Project cards + ProjectModal.tsx (native dialog)
│   ├── Footer.tsx               # Conditional footer (excluded from sub-pages)
│   ├── dossier/
│   │   ├── TerminalGate.tsx     # SYS_INIT decryption terminal
│   │   ├── DossierClientWrapper.tsx
│   │   ├── MissionLogBoard.tsx  # Hackathon pinboard (extracted from page.tsx)
│   │   └── ArtistObserver.tsx   # IntersectionObserver isolation
│   └── ...
├── hooks/
│   └── useNearViewport.ts       # Viewport-proximity hook for deferred renders
├── robots.ts                    # Auto-generated robots.txt
└── sitemap.ts                   # Auto-generated sitemap.xml
```

---

## 🚀 The 4-Stage Optimization Sprint

This repo went through a structured, staged overhaul. Here's exactly what changed and why.

---

### Stage 1 — Quick Wins: `use client` Fixes, CSS Cleanup & Metadata
**Commit:** `25df1c3`

| Fix | What Happened |
|---|---|
| `"use client"` directives | Added missing directives to `Certifications.tsx` and `Education.tsx` to stop them being incorrectly treated as Server Components |
| Dossier state cleanup | Removed redundant `useState` initialisations and restructured conditional rendering in `dossier/page.tsx` |
| Metadata baseline | Added `<meta>` viewport, charset, and basic title/description to `app/layout.tsx` |
| Education page SEO | Added per-page `export const metadata` to `education/page.tsx` |

---

### Stage 2 — Fonts, Assets & SEO
**Commit:** `64c09f2`

#### 🔤 Font Loading: CDN → `next/font/google`
Replaced every `@import url('https://fonts.googleapis.com/...')` in CSS with Next.js native font loading — **zero render-blocking font requests**:

```ts
// app/layout.tsx
import { Protest_Guerrilla, Russo_One, Goldman } from 'next/font/google';

const protestGuerrilla = Protest_Guerrilla({
  weight: '400', subsets: ['latin'],
  variable: '--font-protest-guerrilla',
  display: 'swap',   // prevents FOIT
});
```

All three font families (`Protest Guerrilla`, `Russo One`, `Goldman`) are now self-hosted via Next.js font infrastructure with `display: swap`.

#### 🖼️ Image Asset Pipeline
- Converted all portfolio images to **WebP** format (`scripts/compress-images.js`)
- Converted all certification images to WebP (`public/certs/*.webp`)
- Replaced `public/ui/logo.png` (709 KB PNG) with `logo-new.webp` (2.2 KB) — **99.7% size reduction**
- Downloaded all tech stack icons as local SVGs (`scripts/download-icons.js`) — eliminates external CDN calls to `skillicons.dev` at runtime

#### 🤖 SEO Infrastructure
Added auto-generated files:
```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots { ... }

// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap { ... }
```

Added full Open Graph, Twitter card metadata, and **JSON-LD `Person` schema** to root layout:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vedant Patil",
  "url": "https://vedantpatil.dev",
  "jobTitle": "Electronics & Computer Science Engineer"
}
```

---

### Stage 3 — Component Separation & Native Dialogs
**Commit:** `17e2a86`

The biggest structural refactor. `dossier/page.tsx` was a 800+ line God Component. It got dismembered.

#### Route Group Restructuring
Moved education and experience pages into an `(portfolio)` route group with a **shared layout** (`Navbar` + `Footer`) — eliminating redundant layout code copy-pasted into every page:

```
Before:  app/education/page.tsx  (manual Navbar import)
After:   app/(portfolio)/education/page.tsx  (inherits from group layout)
```

#### Dossier Decomposition

| New Component | Extracted From | Responsibility |
|---|---|---|
| `TerminalGate.tsx` | `dossier/page.tsx` | SYS_INIT decryption terminal UI |
| `DossierClientWrapper.tsx` | `dossier/page.tsx` | Client boundary + mount orchestration |
| `MissionLogBoard.tsx` | `dossier/page.tsx` | Hackathon canvas pinboard (139 lines) |
| `ArtistObserver.tsx` | `dossier/page.tsx` | Isolated IntersectionObserver logic |

**`dossier/page.tsx` went from ~800 lines → ~150 lines.**

#### Projects Modal: `div` → Native `<dialog>`
Replaced the custom overlay div in `Projects.tsx` with a native HTML `<dialog>` element extracted to `ProjectModal.tsx`:

```tsx
// ProjectModal.tsx — uses native <dialog> with showModal() / close()
<dialog ref={dialogRef} className={styles.modal}>
  ...
</dialog>
```

Benefits: native focus trapping, ESC to close, accessibility semantics, no z-index wars.

#### Deferred Rendering Hook
Added `app/hooks/useNearViewport.ts` — a lightweight `IntersectionObserver` hook that defers rendering of below-fold sections until they approach the viewport:

```ts
export function useNearViewport(ref, rootMargin = '200px') {
  // Returns `isNear: boolean` — components only render when close to viewport
}
```

#### Animation Pause Script
Added `public/scripts/animate-pause.js` — loaded via `<Script strategy="afterInteractive">` — automatically pauses CSS animations on elements outside the viewport to stop wasted GPU cycles on hidden content.

---

### Stage 4 — Final Polish, Accessibility & Dead Code Removal
**Commit:** `ab48fb8`

| Action | File | Detail |
|---|---|---|
| Dead code purge | `About.tsx` | Removed unused state variables and commented-out JSX blocks |
| Navbar cleanup | `Navbar.tsx` | Stripped 20+ lines of redundant inline style overrides, now fully driven by CSS module |
| Accessibility | `Navbar.module.css` | Added `focus-visible` ring styles to all interactive nav elements |
| Terminal fix | `TerminalGate.tsx` | Fixed console log timing bug causing terminal to freeze on slow connections |
| Dossier cleanup | `dossier/page.tsx` | Removed 11 lines of stale event handlers left over from the monolith |
| Layout consolidation | `layout.tsx` | Removed duplicate `<head>` tag remnants |

---

## 🛠️ Scroll Jank Elimination

Before the optimization sprint, users experienced a **300–500ms scroll micro-jump** on `/` and `/dossier`. A full root-cause investigation was conducted — see [`docs/scroll-jank-root-cause-report.md`](docs/scroll-jank-root-cause-report.md).

### Root Causes Found & Fixed

**1. Orphaned `scroll-snap-type` on `<html>` (Mobile)**

`scroll-snap-type: y proximity` was set on the root HTML element with **no child elements defining `scroll-snap-align`**. The browser's snap engine was constantly evaluating snap points on layout boundaries during touch-inertia scroll — causing jitter.

```css
/* REMOVED from globals.css */
html {
  scroll-snap-type: y proximity;  /* caused mobile touch scroll stutter */
  scroll-padding-top: 80px;
}
```

**2. `backdrop-filter: blur(16px)` on Fixed Navbar (Desktop)**

Real-time GPU blur of complex under-scroll layers (film grain SVG overlay, dense grid layouts) was hitting the compositor thread. Fixed by tightening the blur trigger threshold and using solid `rgba` backgrounds on scroll state instead.

**3. Passive Scroll Listener in Navbar**

`Navbar.tsx` was registering a synchronous scroll event listener, blocking the browser's ability to optimise scroll behaviour:

```ts
// BEFORE — blocks scroll thread
window.addEventListener('scroll', handleScroll);

// AFTER — passive + state gating to skip redundant setState
window.addEventListener('scroll', handleScroll, { passive: true });
```

**4. Excessive `will-change: transform` on Dossier**

Multiple elements in `dossier/page.module.css` and `MusicianSection.module.css` were tagged with `will-change: transform` even when static. This forced each element onto its own GPU compositing layer, saturating graphics memory during scroll.

**5. `useNearViewport` Deferred Rendering**

Heavy dossier sections (Abacus, MissionLog, ArtistCollage) now only mount when they're within 200px of the viewport, preventing unnecessary DOM and paint work for content the user hasn't scrolled to.

---

## 🏎️ Next.js Config

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],          // AVIF-first, WebP fallback
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

All images use `<Image />` from `next/image` with explicit `sizes` props and `priority` on LCP assets.

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript 5.x |
| Styling | CSS Modules (zero Tailwind) |
| Fonts | `next/font/google` (self-hosted, no CDN) |
| Images | `next/image` (AVIF/WebP pipeline) |
| Canvas | HTML5 Canvas 2D |
| Audio | Web Audio API |
| SEO | Open Graph + JSON-LD Schema + Sitemap |
| Dialogs | Native HTML `<dialog>` |

---

<div align="center">

*Built by Vedant Patil — Performance isn't optional.*

</div>
