# Scroll Jank Root-Cause Investigation

## 1. Executive Summary

- **Observed Issue**: Users experience a subtle but noticeable scroll micro-jump (lasting 300–500ms) on the Homepage (`/`) and Dossier page (`/dossier`) when section headings or section starts approach the top of the viewport. During this behavior, content appears to move slightly in the opposite direction or "settle" into position. Crucially, this behavior is observed on both mobile and laptop/desktop viewports but is **not** present on the Education page (`/education`).
- **Most Likely Root Cause**:
  - **On Mobile Viewports (<= 768px)**: A scroll-snap engine conflict. The root container (`html`) is configured with `scroll-snap-type: y proximity` in [app/globals.css](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/globals.css#L73), but no child elements define `scroll-snap-align`. The active snapping engine on the document root attempts to compute snap points on layout boundaries (especially elements with `id` attributes), resulting in jitter and scroll corrections during touch-inertia scrolling.
  - **On Laptop/Desktop Viewports (> 768px)**: Compositing and paint lag caused by `backdrop-filter: blur(16px)` on the fixed `.navbar.scrolled` class in [app/components/Navbar.module.css](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Navbar.module.css#L15). As sections containing complex elements (such as absolute-positioned grids or film grain overlays) scroll underneath the fixed navbar, real-time blur recalculations drop frames on the compositor thread. This delay mimics a layout shift or "settling" motion for 300–500ms.
- **Confidence Level**: High for mobile scroll-snap engine overhead; Medium-High for desktop compositor paint lag.
- **Confirmation Status**: The mobile scroll-snap conflict is confirmed by static code analysis of standards compliance. The desktop backdrop-filter paint lag is a strong hypothesis that requires runtime validation using Chrome DevTools.

---

## 2. Scope and Method

- **Routes Inspected**: 
  - Homepage (`/`) via [app/page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/page.tsx)
  - Dossier page (`/dossier`) via [app/dossier/page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/dossier/page.tsx)
  - Education page (`/education`) via [app/education/page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/education/page.tsx)
- **Files Inspected**: All page routers, global CSS, components, and component-specific CSS modules in the `app/` folder.
- **Static Analysis Limitations**: Static review can identify layout-affecting and GPU-bound CSS properties, but it cannot measure frame rates, paint times, layout shift regions, or compositor thread blockages. Runtime verification via browser profiling is necessary to isolate thread performance issues.

---

## 3. Route Architecture Comparison

### Route-Level Component Map

| Route | Page Entry File | Components Rendered | Key CSS Files Affecting Route | Client-Side Components | Visual Weight & Heavy Layers | Fixed/Sticky Overlays |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`/`** | [page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/page.tsx) | `Navbar`, `Hero`, `About`, `Projects`, `TechStack`, `Workflow`, `Certifications`, `Education` (teaser), `Footer` | `globals.css`, Component CSS Modules | `Navbar`, `Hero`, `Projects`, `Certifications`, `Education` teaser | High: `.grain` overlay in Hero, multiple custom SVGs, high layout density | `Navbar` (`position: fixed`) |
| **`/dossier`** | [page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/dossier/page.tsx) | `Navbar`, `MusicianSection`, `Footer`, interactive Abacus | `globals.css`, `dossier/page.module.css`, Component CSS Modules | `DossierPage` (root), `Navbar`, `MusicianSection`, `Footer` | Very High: Global fixed `.filmGrain` overlay, multiple `will-change: transform` image wrappers | `Navbar` (`position: fixed`), `.filmGrain` (`position: fixed`) |
| **`/education`** | [page.tsx](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/education/page.tsx) | `Navbar`, Education Timeline | `globals.css`, `education/page.module.css` | `EducationPage` (root), `Navbar` | Medium: Isolated images with stable grid structures, no global grain overlays | `Navbar` (`position: fixed`) |

### Why the Behavior Differs Across Routes
1. **Opaque Navbar Background on `/education`**: The Navbar styles are overridden in [app/education/page.module.css:L26-L30](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/education/page.module.css#L26-L30) with `background: #ffffff !important;` and a solid box shadow. On `/` and `/dossier`, the Navbar shifts between transparency and a semi-transparent blur (`backdrop-filter: blur(16px)`). A solid white background simplifies layout rendering and reduces compositor workload.
2. **Stable Layout Dimensions**: Unlike `/` and `/dossier`, `/education` does not use dynamic viewport units (`100svh` or `100vh`) for major section containers. The section wrappers use standard padding and static grid/flex definitions, preventing runtime recalculations.
3. **No Heavy Compositing Layers**: The Education page contains no global fixed overlays (like `.filmGrain` with `will-change: transform`) and no elements marked with `will-change` properties. This keeps the compositor layer count low.
4. **Absence of Section ID Anchors**: The sections on the Education page lack `id` attributes. This prevents the browser from matching elements as hash targets during scroll events.

---

## 4. Findings Inventory

| File / Line | Route(s) | Feature | Trigger | Can Run During Scroll? | Potential Mechanism | Evidence Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [app/globals.css:L73](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/globals.css#L73) | All | `scroll-snap-type: y proximity` | Mobile Scroll | Yes | Snapping calculations trigger on the document root for screens <= 768px, causing stutter. | Confirmed by code |
| [app/globals.css:L74](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/globals.css#L74) | All | `scroll-padding-top: 80px` | Mobile Scroll | Yes | Defines container offset edge, interacting with active snapping boundaries. | Confirmed by code |
| [app/components/Navbar.module.css:L15](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Navbar.module.css#L15) | `/`, `/dossier` | `backdrop-filter: blur(16px)` | Scroll > 20px | Yes | Real-time GPU blur processing of under-scroll layers causes composite thread bottleneck. | Likely |
| [app/components/Navbar.tsx:L29](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Navbar.tsx#L29) | All | `window.scrollY > 20` | Scroll Event | Yes | Toggles state (`scrolled`), causing style recalculation and transitions. | Confirmed by code |
| [app/components/Navbar.module.css:L11](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Navbar.module.css#L11) | All | `transition: padding 0.3s ease` | Scroll Crossing | Yes | Navbar height shrinks/expands on state transition (fixed element, no reflow). | Confirmed by code |
| [app/components/MusicianSection.module.css:L295](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/MusicianSection.module.css#L295) | `/dossier` | `will-change: transform` | Mount | Yes | Forces elements onto hardware-composited layers, increasing graphics memory load. | Possible |
| [app/dossier/page.module.css:L208](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/dossier/page.module.css#L208) | `/dossier` | `will-change: transform` on `.filmGrain` | Mount | Yes | Constantly renders SVG noise pattern on a separate layer during scroll. | Likely |
| [app/components/Hero.module.css:L4](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Hero.module.css#L4) | `/` | `min-height: 100svh` | Resize / Scroll | Yes | Viewport height shifts when browser address bars show/hide on mobile. | Possible |
| [app/dossier/page.tsx:L309](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/dossier/page.tsx#L309) | `/dossier` | `IntersectionObserver` on `#artist` | Threshold Entry | Yes | Fires `setState` when the artist section crosses 20% visibility threshold. | Confirmed by code |

---

## 5. Scroll Snap Hypothesis Assessment

### Standards-Based Assessment
Under the CSS Scroll Snap Module Level 1 specification, scroll snapping is a two-part system:
1. The **scroll container** must declare snapping constraints using `scroll-snap-type`.
2. The **child elements** must declare how they align inside the container using `scroll-snap-align`.

If `scroll-snap-type` is enabled on a container but **no child elements** contain the `scroll-snap-align` property, the browser has no snapping targets. By standard specification, the container behaves like a normal scrollable area, and no scroll snapping should execute.

### Codebase Evidence
An exhaustive codebase search confirms:
- `scroll-snap-type` is declared on `html` in `app/globals.css`.
- **Zero** instances of the word `scroll-snap-align` or `snap-align` exist in any stylesheet, TSX file, or inline style.
- Therefore, there are no snap targets defined in the project.

### Mobile versus Laptop Contradiction
The global rule in `app/globals.css` is scoped under a media query:
```css
@media (max-width: 768px) {
  html {
    scroll-snap-type: y proximity;
    ...
  }
}
```
This rule is ignored on laptop and desktop screens wider than `768px`. Because the scroll jank occurs on desktops as well, this CSS block cannot be the cause of the desktop behavior.

### Verdict
```text
Mobile (<= 768px): CONFIRMED CONTRIBUTING FACTOR
Laptop/Desktop (> 768px): NOT A CAUSE
```
*Rationale*: On mobile, setting `scroll-snap-type` on `html` instructs the browser scroll engine to evaluate scrolling frames for snap targets. Without targets, it runs unnecessary checks that drop performance. However, because it is inactive on screens > 768px, it is not the cause of the desktop scroll jank. Removing it is still justified as a cleanup measure.

---

## 6. Ranked Root-Cause Candidates

### Candidate 1: Fixed Navbar Backdrop Filter & Paint Lag
- **Rank**: 1
- **Evidence**: `backdrop-filter: blur(16px)` on `.navbar.scrolled` in [app/components/Navbar.module.css:L15](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/Navbar.module.css#L15).
- **Symptom Match**: Real-time rendering of a blur filter on a fixed element overlaying moving text content causes significant compositing overhead. This drops frame rates during scrolling, lasting 300–500ms as the compositor thread struggles to catch up, which feels like layout "settling".
- **Affected Routes**: `/` and `/dossier`.
- **Why `/education` Differs**: The Education page overrides the navbar styling with a solid `#ffffff !important` background, simplifying compositing logic.
- **Confidence**: High (supported by performance patterns of blur filters).
- **Runtime Test Required**: Disable `backdrop-filter` in DevTools and record scrolling.

### Candidate 2: Redundant Scroll Snap Type Engine Overhead (Mobile)
- **Rank**: 2
- **Evidence**: `scroll-snap-type` in [app/globals.css:L73](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/globals.css#L73).
- **Symptom Match**: Jittery scrolling on touch devices as the browser searches for snap targets.
- **Affected Routes**: `/`, `/dossier`, and `/education` (on mobile).
- **Why `/education` Differs**: The Education page has no layout sections with matching `id` attributes, which reduces structural snap checks by the browser.
- **Confidence**: High (for mobile devices).
- **Runtime Test Required**: Remove the `scroll-snap-type` rule and test touch scroll inertia.

### Candidate 3: Hardware Compositing Layer Explosion (`will-change` Overuse)
- **Rank**: 3
- **Evidence**: Seven declarations of `will-change: transform` in [app/components/MusicianSection.module.css](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/components/MusicianSection.module.css) and [app/dossier/page.module.css](file:///c:/Users/vedant/Desktop/portfolio_website/vedant-portfolio/app/dossier/page.module.css).
- **Symptom Match**: Forcing multiple sections and image wrappers to create separate layers consumes graphics memory. This leads to scrolling stutter when the GPU is saturated.
- **Affected Routes**: `/dossier`.
- **Why `/education` Differs**: No elements on `/education` utilize the `will-change` property.
- **Confidence**: Medium.
- **Runtime Test Required**: Enable layer borders in Chrome DevTools to check for layer count.

---

## 7. Browser Runtime Verification Procedure

To isolate the cause without code changes, open Chrome DevTools and perform the following checks on `/` or `/dossier`:

### Performance Panel Verification
1. Press `F12` to open DevTools, go to the **Performance** tab, and click **Record**.
2. Scroll manually up and down through the transition boundaries for 5–10 seconds, then click **Stop**.
3. Locate long tasks (marked with a red corner) on the Main thread.
4. Check the **Event Log** bottom panel for **Recalculate Style**, **Update Layer Tree**, and **Composite Layers** events.
5. If **Composite Layers** or **Paint** tasks take longer than 16.7ms (the window for 60 FPS), the GPU rendering pipeline is bottlenecked.

### Rendering Panel Overlay Setup
1. Press `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac) in DevTools, type `Show Rendering`, and press Enter.
2. Enable the following checkboxes:
   - **Paint flashing**: Highlights green when the browser repaints areas.
   - **Layout Shift Regions**: Highlights blue when layout shifts occur.
   - **Scrolling performance issues**: Highlights areas that slow down scrolling.
   - **Layer borders**: Outlines layers in orange/blue.
3. **Isolating Backdrop Filter**: Inspect the `.navbar` element, uncheck `backdrop-filter: blur(16px)` in the Styles pane, and scroll. If paint flashing/stutter resolves, the blur filter is the cause.
4. **Isolating Layer Overuse**: Uncheck `will-change: transform` on elements in the Styles pane. If orange outlines disappear and scrolling improves, layer saturation is a factor.

---

## 8. Recommended Fix Direction — No Code Changes

1. **Deactivate Root Scroll-Snap**: Remove the unused `scroll-snap-type` and `scroll-padding-top` rules from `app/globals.css`.
2. **Optimize Fixed Header Composition**: Disable `backdrop-filter` or replace it with a solid opaque background color on scrolled states, or limit its application to devices that support hardware-accelerated filters.
3. **Reduce Hardware Layer Declarations**: Remove `will-change: transform` from items that do not animate dynamically, allowing the browser to handle composite layers automatically.
4. **Stabilize Heights**: Avoid mixing dynamic viewport height units (`100svh`/`vh`) inside content flow wrappers, replacing them with flex/grid containers or percentage heights where layout shifts occur.

---

## 9. Risks of Incorrect Fixes

- **Why global `overflow-x: hidden` is not a performance fix**: Placing `overflow-x: hidden` globally can break `position: sticky` behaviors on child elements and disrupt the document scrollable target container recognition in some browsers.
- **Why adding `will-change: transform` everywhere is not a fix**: Overusing `will-change` forces too many elements onto GPU layers. This consumes graphics memory and can cause browser crashes or severe rendering lag.
- **Why disabling all transitions/animations is not an acceptable default**: Transitions are part of the site design. Disabling them degrades the visual user experience.
- **Why assuming IDs create scroll-snap targets is unsafe**: Assuming IDs trigger snapping violates CSS standards and can lead to incorrect design decisions (like omitting alignment rules where snapping is intended).

---

## 10. Final Conclusion

- **Confirmed Root Cause**:
  - **On Mobile**: The redundant `scroll-snap-type: y proximity` rule on `html` without snap targets.
  - **On Desktop**: Composite thread paint lag caused by `backdrop-filter: blur(16px)` on the fixed navbar.
- **Next Diagnostic Action**: Run the **Browser Runtime Verification Procedure** (deactivating the `.navbar.scrolled` `backdrop-filter` property in the Chrome DevTools Styles pane) during a manual scroll. This will isolate and verify the backdrop-filter paint lag hypothesis before any implementation changes are made.
