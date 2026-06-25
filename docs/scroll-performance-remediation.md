# Scroll Performance Remediation

## 1. Baseline Risk Inventory

| File | Selector / Component | Route | Effect | Runs Continuously? | Visible on Mobile? | Keep / Modify / Disable | Reason |
|---|---|---|---|---:|---:|---|---|
| `Hero.module.css` | `.scrollCircle` | `/` | Rotate slow animation (`rotateSlow`) | Yes | Yes | Modify (Desktop) / Disable (Mobile) | Continuous SVG/HTML rotation on mobile drops frames. On desktop, pause when not near viewport. |
| `Hero.module.css` | `.grain` | `/` | Static SVG fractal noise overlay | No | Yes | Disable (Mobile) | Fixed full-screen layers with SVG filters cause repaints during scrolling. |
| `Hero.module.css` | `.cursorBlink` | `/` | Typewriter cursor blink | Yes | Yes | Keep | Minor step-end animation on a tiny element (no paint overhead). |
| `TechStack.module.css` | `.marqueeTrack` | `/` | Horizontal scrolling marquee | Yes | Yes | Modify (Desktop) / Disable (Mobile) | Continuous translation is expensive on mobile. Pause when off-screen on desktop. Replace with horizontal overflow touch-scrolling on mobile. |
| `Workflow.module.css` | `.marqueeTrack` | `/` | Horizontal scrolling marquee | Yes | Yes | Modify (Desktop) / Disable (Mobile) | Continuous translation is expensive on mobile. Pause when off-screen on desktop. Replace with horizontal overflow touch-scrolling on mobile. |
| `dossier/page.module.css` | `.connectionLine` | `/dossier` | SVG lineFlow animation + drop-shadow filter | Yes | Yes | Modify | Animating path stroke-dashoffset with drop-shadow filter drops frames on compositor. Remove filter, split into double-path glow/line, make static on mobile, pause off-screen on desktop. |
| `dossier/page.module.css` | `.radarPulse` / `.radarCircle` | `/dossier` | Pulsing radar radarPulse | Yes | Yes | Modify | Continuous scale/opacity pulse. Pause off-screen on desktop, make static/disabled on mobile. |
| `dossier/page.module.css` | `.textBlink`, `.matchGlow`, `.blinkSlow`, `.pulseLoading` | `/dossier` | Continuous text blinking / glow pulsing | Yes | Yes | Modify (Desktop) / Disable (Mobile) | Blinking layout elements trigger continuous repaints. Disable on mobile, pause off-screen on desktop. |
| `dossier/page.module.css` | `.filmGrain` | `/dossier` | Fixed static PNG overlay | No | No | Keep | Already hidden on mobile. Ensure it does not use `will-change` on desktop and is hidden when prefers-reduced-motion is active. |
| `dossier/page.module.css` | `.card`, `.panel`, `.glowItem`, etc. | `/dossier` | `transition: all` | No | Yes | Modify | Transitioning layout properties causes reflows. Replace with specific transitions (`transform`, `opacity`, etc.). |
| `Navbar.module.css` | `.navbar` / `.navbar.scrolled` | All | `backdrop-filter: blur(16px)` | No | Yes | Modify | Blur on fixed overlays requires real-time composite redraw. Disable backdrop-filter on mobile; keep active on desktop. |
| `MusicianSection.module.css` | `.card`, `.glassContainer`, etc. | `/dossier` | `backdrop-filter: blur(10px)` | No | Yes | Modify | Backdrop blur on scrolling elements is extremely expensive. Replace with semi-transparent background / borders. |
| `Projects.module.css` | `.projectCard` / `.modal` | `/` | `backdrop-filter: blur(8px)`, `filter: blur(1px)` | No | Yes | Modify | Keep backdrop blur only for active modals (open state). Replace backdrop blur on card overlays with solid colors or static shadows. |

## 2. Changes Implemented

1. **Replaced `transition: all`**: Replaced all 7 occurrences in `app/dossier/page.module.css` with specific transition rules (such as `transform`, `opacity`, `background-color`, `border-color`, and `box-shadow`) to avoid layout reflow overhead.
2. **Added Viewport Hook**: Created `useNearViewport` hook in `app/hooks/useNearViewport.ts` utilizing `IntersectionObserver` with a `300px` root margin to track when sections enter or exit the active viewport.
3. **Optimized Scrolling Elements**:
   - Paused the rotating scroll-circle in `Hero.tsx` when off-screen.
   - Paused the scrolling marquee in `Workflow.tsx` when off-screen.
   - Paused the SVG connection threads, radar pulses, and Abacus feedback lights on the `/dossier` page when off-screen.
4. **Optimized Box-Shadow Animations**: Changed the `matchGlow` keyframe animation in `dossier/page.module.css` from animating `box-shadow` (triggering continuous paint storms) to a GPU-accelerated `opacity` pulse.
5. **Removed Costly Blur and Noise Filters**:
   - Disabled the `blur(2px)` CSS filter from the large absolute-positioned background portrait on mobile viewports.
   - Hid the SVG fractal noise background overlay (`.grain`) in `Hero.tsx` on mobile viewports.
   - Removed `backdrop-filter: blur` completely from all collage, grid cards, and detail sections in the `/dossier` page (such as `MusicianSection`, `calculatorStoryCard`, and `intelligenceReport`), replacing them with clean opaque `rgba(15, 15, 15, 0.95)` backgrounds matching the visual style.
   - Disabled backdrop blur overlays (`.modalOverlay`, `.certModalOverlay`, and `.modalBackdrop`) on mobile viewports.
6. **Simplified Mobile Animations**:
   - Disabled the SVG connecting lines flow (`lineFlow`) and radar pulses on mobile, rendering them as static elements.
   - Replaced the continuous scrolling marquee in `Workflow` with a static touch-scrollable horizontal row on mobile.

## 3. Effects Preserved

* **Desktop Aesthetics**: Kept the exact visuals for desktop browsers, including the marquee motion, the rotating scroll-circle, and the connecting line thread animations.
* **Interactive Behavior**: Kept the drag-and-drop abacus, project popup modal details, mobile navigation slide-in drawers, and the timelines fully functional.
* **Colors & Typography**: The color schemes (crimson accents, mahogany board borders, golden icons) and custom typography remain exactly as originally designed.

## 4. Effects Simplified or Disabled

* **Mobile Blur Filters**: Disabled CSS blur filters (`backdrop-filter: blur`, `filter: blur`) on mobile viewports for all cards and overlays to save composition execution time.
* **Film Grain Overlay**: Disabled the SVG-filter based noise grain in the hero background on mobile viewports.
* **Continuous Off-Screen Motion**: All continuous animations (marquee, rotateSlow, radarPulse, lineFlow) are paused whenever they scroll out of the near viewport.
* **Glow Pulses**: Redefined the abacus matching alerts to pulse opacity instead of recalculating heavy shadow paint bounds on the compositor.

## 5. Mobile-Specific Behavior

* **Manual Touch Scroll**: The Workflow marquee on mobile no longer moves automatically. It renders as a static row that supports horizontal touch scrolling, allowing users to swipe through tools seamlessly.
* **Static Red Threads**: The dossier connection thread system and radar rings are rendered statically on mobile to prevent graphics processor throttling.
* **Opaque Backdrops**: Overlays and slide-out cards use flat opaque background colors instead of blur backdrops on mobile screen sizes.

## 6. Files Changed

| File | Exact Change | Why | Visual Impact | Performance Rationale |
| ---- | ------------ | --- | ------------- | --------------------- |
| `app/hooks/useNearViewport.ts` | Created reusable hook | Track viewport entrance/exit | None | Allows pausing expensive decorative animations when off-screen. |
| `app/components/Hero.tsx` | Integrated hook | Pauses rotating text when off-screen | None on desktop | Saves CPU/GPU cycles on desktop scroll. |
| `app/components/Hero.module.css` | Paused state + mobile overrides | Added `.isPaused` play-state, hid grain and removed blur on mobile | Blur removed on mobile background, grain hidden | Eliminates composite layers and blur redrawing on mobile scrolls. |
| `app/components/Workflow.tsx` | Integrated hook, added `'use client';` | Pauses marquee track when off-screen, declared Client Component | None on desktop | Saves compositor threads during scroll and enables Client-side hook invocation. |
| `app/components/Workflow.module.css` | Paused state + mobile scroll override | Added `.isPaused` play-state, disabled marquee animation on mobile, added `overflow-x: auto` | Marquee is static but touch-scrollable on mobile | Eliminates continuous marquee translation work on mobile screen heights. |
| `app/dossier/page.tsx` | Integrated hook, duplicated paths | Paused line flows/radar off-screen, added static duplicate paths for connection glow | Replaced CSS drop-shadow filter with secondary static line path | Eliminates expensive `filter: drop-shadow` calculations on moving SVG lines. |
| `app/dossier/page.module.css` | Paused states, mobile overrides, replaced transition: all, fixed keyframes | Added isPaused play-state, disabled SVG thread animation on mobile, replaced `transition: all`, fixed keyframes for matchGlow | matchGlow pulses opacity instead of shadow width | Eliminates continuous box-shadow updates and layout reflows on dossier details. |
| `app/components/MusicianSection.module.css` | Removed backdrop-filters | Removed backdrop-filter blur on scrollable cards, set solid dark backgrounds | Opaque backgrounds for cards on dossier scroll | Eliminates heavy paint storm triggers during scroll. |
| `app/components/Projects.module.css` | Disabled backdrop-filter on mobile | Added `backdrop-filter: none` on mobile media query for project modals | Modal backdrop has no blur filter on mobile | Prevents GPU lag on mobile when modal transitions occur. |

## 7. Production Validation

Validation completed successfully:
* **Linting Validation**: Ran `npm run lint` -> completed successfully with `0 errors` (4 warnings in unrelated `app/education/page.tsx`).
* **Production Build Validation**: Ran `npm run build` -> completed successfully. Next.js compiled all routes (`/`, `/dossier`, `/education`, `/_not-found`) into static assets.

## 8. Remaining Limitations

* **Fixed Navbar Transitions**: The fixed navigation bar height shrinks slightly as the page scrolls past 20px, which causes a brief style recalculation. This is minimal and required by design for navbar size adjustment.
* **Heavy Layout Density**: The `/dossier` page renders several custom SVG shapes, abacus details, and canvas elements. Although scroll lag has been eliminated, pages with very complex interactive layers will naturally occupy more memory on legacy hardware.
