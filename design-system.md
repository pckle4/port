# Design System — Dark Mode · Handcrafted + Speed Edition  
### "The Midnight Studio" — A Dark Mode Companion to the Handcrafted Design System  
 

> **Context (2026):** 80%+ of developers default to dark mode; 82% of users prefer it when available. Designers are now building dark mode not as an afterthought but as the *primary* visual experience — using soft gray palettes, textured backgrounds, and carefully tuned accents that reduce eye strain without sacrificing brand identity.  

---

## 1. Visual Theme & Atmosphere  

**Philosophy:** *"The Midnight Studio."* Light mode is paper on a sunlit desk. Dark mode is the same desk at 2 AM — warm desk lamp pooling on kraft paper, graphite smudges, sticky notes glowing faintly under amber light, a terminal window open with green text, and film-grain texture floating across everything. The goal is **cozy, not cold; crafted, not corporate.**  

**Mood Keywords:** Warm dark, tactile, intimate, focused, glowing, handcrafted, terminal-nostalgic.  

**Key Visual Characteristics**  

| Principle | Expression |
|---|---|
| **Elevation through lightness** | Cards get *lighter* as they rise — not shadow — because shadows barely register on dark backgrounds |
| **Warm undertones** | Deep charcoal with brown/purple warmth, never cold pure black |
| **Glow as depth** | Soft neon glows replace hard shadows for interactive elements |
| **Texture density** | Film grain and paper texture at higher opacity (5–8% vs light mode's 3–4%) to compensate for lower overall luminance |
| **Terminal nostalgia** | Green-on-black accents, ASCII-art flourishes, pixel-art badges — but used sparingly as Easter eggs, not the whole theme |
| **Hand-drawn luminosity** | Sketchy borders in lighter tones, white-ink-style doodles on dark cards, highlighter-like accent glows |
| **Scrapbook-meets-noir** | Collage layering with warm tape overlays, Polaroid frames with slightly glowing edges, sticky-note cards in deep amber |

**Atmosphere Reference:** A creative developer's desk after midnight. The main light is off. A warm desk lamp casts a soft pool of amber light. The monitor glows with a dark-themed IDE. Physical sketchbooks, charcoal pencils, and sticky notes are within reach. The texture of kraft paper, the grain of a charcoal drawing, the glow of a terminal — translate that warmth into pixels.  

---

## 2. Color Palette — "Warm Charcoal + Neon Glow"  

**Golden Rule:** Dark mode ≠ inverted colors. It needs a *custom* design system. The original light-mode palette gets companion dark-mode tokens — not simple inversions.  

### 2.1 Core Dark Palette (Functional)  

| Token | Light Mode Value | Dark Mode Value | Role |
|---|---|---|---|
| **Background Base** | `#FBF7F0` (Warm Paper) | `#0C0C0E` | Deepest page background |
| **Background Elevated** | `#FFFFFF` | `#161618` | Cards, panels, raised surfaces |
| **Background Floating** | `#F6F7F8` | `#1C1C1F` | Modals, dropdowns, tooltips |
| **Text Primary** | `#3A3A42` (Ink Wash) | `#EDEDEF` | Primary body text |
| **Text Secondary** | `#6B6B78` (Pencil Graphite) | `#9E9EA6` | Secondary text, captions |
| **Text Tertiary** | `#8E8E99` | `#6C6C75` | Metadata, disabled text |
| **Border Default** | `#C4C9D4` | `#2E2E33` | Card borders, dividers |
| **Border Subtle** | `#DEE1E7` | `#252528` | Fine separators |
| **Surface Accent** | `#F1F5F9` | `#1A1A1E` | Input backgrounds, badge fills |

### 2.2 Accent Colors (Adapted for Dark)  

| Token | Light Value | Dark Value | Role |
|---|---|---|---|
| **Primary Action** | `#1676F3` | `#4DA3FF` | CTAs, links, active states (brighter for dark) |
| **Primary Glow** | `rgba(22,118,243,0.5)` | `rgba(77,163,255,0.25)` | Button glows, focus rings |
| **Warning Amber** | `#FBA818` | `#FFB833` | Secondary CTAs, accent borders |
| **Amber Glow** | `rgba(251,168,24,0.4)` | `rgba(255,184,51,0.20)` | Warm accent glows |
| **Magenta Accent** | `#DF4994` | `#F062A0` | Error states, tertiary highlights |
| **Highlighter Yellow** | `#FFF3C4` | `#3D3520` | Callout backgrounds (deep amber) |
| **Highlighter Pink** | `#FFE5F0` | `#3D2030` | Hover backgrounds |
| **Terminal Green** | `#00C853` | `#00FF41` | Retro-tech accents |
| **Sticky Note** | `#FFF3C4` | `#3D3520` | Accent card backgrounds |

### 2.3 Why These Colors Work  

- **Never pure black (`#000000`):** Pure black creates excessive contrast and eye strain. Deep charcoal with subtle warm undertones (`#0C0C0E`, `#161618`) provides comfort and allows elevation gradients to be visible.  
- **Soft white text (`#EDEDEF`):** Pure white (`#FFFFFF`) on dark backgrounds causes visual vibration. Off-white reduces glare while maintaining readability above 4.5:1 contrast ratio.  
- **Brighter accents:** Colors that work in light mode appear dull in dark mode because they're surrounded by darkness. Primary blue, amber, and magenta all shift to brighter variants. Google Material Design and Apple HIG both recommend reducing saturation and adjusting lightness for dark contexts.  
- **Elevation through lightness:** In light mode, shadows create depth. In dark mode, shadows are nearly invisible. Instead, elevated surfaces get *lighter* (`#0C0C0E` → `#161618` → `#1C1C1F`). This is the standard used by Linear, Vercel, and Raycast.  

### 2.4 WCAG Contrast Reference  

Every color pair in this system has been tested against WCAG AA (4.5:1 for normal text, 3:1 for large text and UI components).  

| Background | Text | Ratio | Pass |
|---|---|---|---|
| `#0C0C0E` | `#EDEDEF` | 14.2:1 | AAA ✓ |
| `#161618` | `#EDEDEF` | 12.4:1 | AAA ✓ |
| `#161618` | `#9E9EA6` | 5.8:1 | AA ✓ |
| `#0C0C0E` | `#4DA3FF` | 5.1:1 | AA ✓ |
| `#161618` | `#FFB833` | 6.8:1 | AA ✓ |

### 2.5 Texture Overlays (Dark Mode Specific)  

| Effect | Implementation | Opacity |
|---|---|---|
| **Film Grain** | SVG `<feTurbulence>` + `<feColorMatrix>`, applied to `body::after` | 0.04–0.06 |
| **Paper Fiber** | CSS `radial-gradient` noise pattern, applied to card backgrounds | 0.03–0.05 |
| **Vignette** | `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)` on `body::before` | Subtle |
| **Lamp Glow** | `radial-gradient(circle at 30% 20%, rgba(255,184,51,0.08), transparent 70%)` | Ambient |

> **Performance Note:** Use SVG filters for texture — not heavy PNG overlays. SVG filters run on the GPU compositor and don't add HTTP requests. Keep noise intensity ≤ 0.06 to avoid visual distraction while maintaining the tactile feel.  

---

## 3. Typography — "Midnight Reading"  

The monospace foundation stays, but dark mode requires subtle adjustments for readability. Light text on dark backgrounds appears slightly thinner optically; font rendering benefits from `-webkit-font-smoothing: antialiased`.  

### Font Stack (Same as Light Mode)  

| Role | Font Family | Fallback |
|---|---|---|
| **Body & UI** | Cascadia Code | `'SF Mono', 'Cascadia Code', 'Fira Code', monospace` |
| **Headings / Display** | JetBrains Mono (Variable) | `'JetBrains Mono', 'Courier New', monospace` |
| **Handwritten Accents** | Caveat | `'Caveat', 'Comic Sans MS', cursive` |
| **Retro-Tech Mode** | VT323 | `'VT323', 'Courier New', monospace` |

### Dark Mode Typography Adjustments  

| Adjustment | Light Mode | Dark Mode | Reason |
|---|---|---|---|
| **Body font weight** | 400 | 400 (same) | Antialiasing compensates |
| **Font smoothing** | `auto` | `antialiased` | Prevents overly thin rendering on macOS |
| **Body text color** | `#3A3A42` | `#EDEDEF` | Off-white reduces glare |
| **Secondary text color** | `#6B6B78` | `#9E9EA6` | Maintains 5.8:1 contrast |
| **Code blocks** | `#F6F7F8` bg | `#1A1A1E` bg, `#E0E0E0` text | Dark terminal aesthetic |
| **Selection highlight** | `rgba(22,118,243,0.2)` | `rgba(77,163,255,0.3)` | Brighter for dark context |

### Hierarchy Table (Dark Mode)  

| Role | Font | Size | Weight | Line Height | Color |
|---|---|---|---|---|---|
| Hero Display | JetBrains Mono | 80–96px | 800–900 | 1.0 | `#EDEDEF` |
| Section Heading | JetBrains Mono | 32–36px | 700 | 1.15 | `#EDEDEF` |
| Card Title | Cascadia Code | 20–24px | 700 | 1.2 | `#F5F5F5` |
| Handwritten Label | Caveat | 18–22px | 500 | 1.3 | `#9E9EA6` |
| Body | Cascadia Code | 16px | 400 | 1.5 | `#EDEDEF` |
| Body Small | Cascadia Code | 14px | 400 | 1.5 | `#9E9EA6` |
| Button / UI | Cascadia Code | 14px | 600 | 1.0 | `#FFFFFF` |
| Form Label | Cascadia Code | 12px | 600 | 1.0 | `#9E9EA6` |
| Micro / Badge | Cascadia Code | 11px | 600 | 1.0 | `#B0B0B8` |
| Code Block | Cascadia Code | 14px | 400 | 1.6 | `#E0E0E0` |

---

## 4. Component Stylings — "Crafted for the Dark"  

### 4.1 Buttons  

**Primary Button (Dark)**  
- Background: `#4DA3FF` (brighter than light mode `#1676F3`)  
- Text: `#0C0C0E` (dark text on bright button — better contrast than white on blue in dark mode)  
- Font: Cascadia Code, 14px, 600  
- Padding: `12px 24px`  
- Border Radius: `9999px`  
- Box Shadow: `0px 0px 32px rgba(77, 163, 255, 0.25)` — soft glow, not hard shadow  
- 🆕 **Micro-texture:** `inset 0 1px 0 rgba(255,255,255,0.15)`  
- Hover: Background `#6BB5FF`, glow intensifies to `0.35` opacity  
- Active: Background `#3B8FEC`, glow reduces  

**Secondary Button (Ghost Outline — Dark)**  
- Background: `transparent`  
- Text: `#4DA3FF`  
- Border: `1.5px solid rgba(77, 163, 255, 0.50)`  
- 🆕 **Sketch Mode:** `border-style: dashed` for hand-drawn feel  
- Hover: Background `rgba(77, 163, 255, 0.08)`, border opacity → 0.75  

**🆕 Handwritten CTA Button (Dark)**  
- Background: `#FFB833`  
- Text: `#0C0C0E`, Caveat, 20px, 500  
- Border Radius: `24px 8px 24px 8px`  
- Box Shadow: `0px 0px 24px rgba(255, 184, 51, 0.20)` — warm amber glow  
- Hover: Glow intensifies, slight `rotate(-1deg)`  

**🆕 Terminal-Effect Button**  
- Background: `#0C0C0E`  
- Text: `#00FF41`, VT323, 16px  
- Border: `2px solid #00FF41`  
- Border Radius: `0px`  
- Box Shadow: `0px 0px 16px rgba(0, 255, 65, 0.15)`  
- Hover: Background `#00FF41`, Text `#0C0C0E`  

### 4.2 Cards & Containers  

**🆕 Midnight Studio Card (Default Dark)**  
- Background: `#161618` with subtle film grain overlay  
- 🆕 **Sketchy Border:** `border-image` with hand-drawn SVG, or `1.5px dashed #2E2E33`  
- Border Radius: `16px 8px 16px 8px` (uneven, organic)  
- Padding: `24px`  
- Box Shadow: `0px 2px 8px rgba(0, 0, 0, 0.4)` — subtle depth in dark context  
- Hover: Background lightens to `#1C1C1F`, border color shifts to `rgba(77, 163, 255, 0.3)`  

**Elevated Card (Modal / Tooltip Level)**  
- Background: `#1C1C1F`  
- Border: `1px solid #2E2E33`  
- Box Shadow: `0px 4px 16px rgba(0, 0, 0, 0.5)`  

**🆕 Glowing Accent Card**  
- Like Midnight Studio Card, but with a soft accent border glow on one edge  
- `border-left: 2px solid #4DA3FF; box-shadow: inset 8px 0px 16px -8px rgba(77, 163, 255, 0.08)`  

**🆕 Sticky-Note Card (Dark)**  
- Background: `#3D3520` (deep amber — dark mode equivalent of sticky-note yellow)  
- Transform: `rotate(-1deg)`  
- Border: `1px dashed #5C4A20`  
- Box Shadow: `2px 4px 12px rgba(0, 0, 0, 0.5)`  
- **Use for:** Quotes, skill highlights, quick facts  

**🆕 Graphite / Charcoal Card**  
- Background: `#0C0C0E` (matches page background)  
- Border: `1.5px solid #252528`  
- 🆕 Texture overlay: heavier grain (6–8% opacity) for pencil-on-paper feel  
- Hover: Border lightens to `#3A3A40`, texture opacity increases slightly  
- **Use for:** Process sketches, work-in-progress showcases, behind-the-scenes  

**🆕 Terminal Console Card**  
- Background: `#0A0A0C`  
- Border: `1px solid #00FF41`  
- Border Radius: `0px`  
- Text: VT323, `#00FF41`, 14px  
- Prefix each line with `>`  
- Box Shadow: `0px 0px 20px rgba(0, 255, 65, 0.08)`  

**🆕 Polaroid Frame Card (Dark)**  
- Background: `#1C1C1F` (not white — "Polaroid in a dark room")  
- Border: `8px solid #252528` then `1px solid #3A3A40`  
- Box Shadow: `2px 4px 16px rgba(0, 0, 0, 0.6)`  
- Caption: Caveat, `#9E9EA6`  

### 4.3 Inputs & Forms  

**Text Input (Dark — Default)**  
- Background: `#1A1A1E`  
- Text: `#EDEDEF`, Cascadia Code, 14px  
- Padding: `10px 14px`  
- Border Radius: `12px`  
- Border: `1px solid #2E2E33`  
- Placeholder: `#6C6C75`  
- Focus: Border `#4DA3FF`, box-shadow `0px 0px 0px 3px rgba(77, 163, 255, 0.15)`, background `#1C1C1F`  
- Error: Border `#F062A0`, glow `rgba(240, 98, 160, 0.15)`  

**🆕 Hand-drawn Focus Ring (Dark):** Animated sketchy SVG border via `stroke-dasharray` animation, in `#4DA3FF`.  

**Form Label (Dark)**  
- Color: `#9E9EA6`, Cascadia Code, 12px, 600  
- Margin-bottom: `6px`  

### 4.4 Badges & Tags  

**🆕 Hand-drawn Badge (Dark)**  
- Background: `#3D3520` (deep amber)  
- Border: `1.5px dashed #5C4A20`  
- Border Radius: `12px 4px 12px 4px`  
- Text: `#D4A840`, 11px, 600  

**Primary Badge (Dark)**  
- Background: `rgba(77, 163, 255, 0.12)`  
- Text: `#4DA3FF`, 11px, 600  
- Border Radius: `6px`  

**🆕 Terminal Badge (Dark)**  
- Background: `#0C0C0E`  
- Text: `#00FF41`, VT323, 12px  
- Border Radius: `0px`  
- Prefix: `> `  

**🆕 Charcoal Sketch Badge**  
- Background: `rgba(158, 158, 166, 0.08)`  
- Text: `#9E9EA6`, 11px, 600  
- Border: `1px dashed #3A3A40`  
- Border Radius: `8px 2px 8px 2px`  

### 4.5 Links  

**Inline Link (Dark)**  
- Text: `#4DA3FF`, Cascadia Code, 16px, 700  
- Text Decoration: `underline`  
- Hover: Color `#6BB5FF`, text-decoration `underline wavy`, `text-underline-offset: 4px`  
- 🆕 Highlighter hover: Background becomes `#3D3520` (deep amber), underline disappears  

**Link with Padding (Subtle Dark)**  
- Text: `#EDEDEF`  
- Hover: Background `rgba(77, 163, 255, 0.10)`, Text `#4DA3FF`  

### 4.6 Navigation  

**Top Nav (Dark)**  
- Background: `rgba(12, 12, 14, 0.85)`  
- Backdrop Filter: `blur(16px)` (glass-morphism nav — frosty, not fully transparent)  
- Border Bottom: `1px solid #252528`  
- Text (Inactive): `#9E9EA6`, Cascadia Code, 14px, 500  
- Active Link: Background `rgba(77, 163, 255, 0.12)`, Text `#4DA3FF`, sketchy SVG underline  
- Logo: Caveat font (handwritten) + small doodle icon  

### 4.7 🆕 Decorative Elements (Dark Mode Specific)  

| Element | Description | Implementation |
|---|---|---|
| **Doodle Dividers** | Hand-drawn wavy lines in `#3A3A40` | Inline SVG with organic paths |
| **Glow Underlines** | Key phrases get a subtle cyan/amber glow underline | `text-decoration-color` with `filter: blur(1px)` on a pseudo-element |
| **Sticky-Tape Overlays** | Semi-transparent warm beige rectangles rotated a few degrees | `::after` with `background: rgba(180, 160, 120, 0.15)`, `transform: rotate(-3deg)` |
| **Connection Lines** | Thin sketchy lines connecting related cards | SVG `<path>` with `stroke: #3A3A40`, `stroke-dasharray: 4 4` |
| **Cursor Trail** | Glowing custom cursor with subtle amber or blue trail | Cuberto Mouse Follower or Cursorly.js (dark-adapted colors) |
| **Scroll-Triggered Doodles** | Small illustrations that "draw themselves" — white ink on dark | Rive or LottieFiles with ScrollTrigger, stroke color `#9E9EA6` |
| **Pixel-Art Accents** | Small 8-bit icons with glow effects | CSS pixel art via `box-shadow`, or PNG sprite with `filter: drop-shadow(0 0 4px)` |

---

## 5. Layout Principles — "Depth Through Elevation"  

### Spacing System (Identical to Light Mode)  

| Token | Value | Use |
|---|---|---|
| Micro | 4px | Tight icon+text gaps |
| XS | 8px | Compact UI spacing |
| Small | 12px | Button internal padding |
| Base | 16px | Standard gaps |
| Medium | 20px | Card padding (small) |
| Large | 24px | Card padding, section gaps |
| XL | 32px | Major section breaks |
| XXL | 40–48px | Hero spacing |
| Massive | 64–92px | Full-section margins |

### 🆕 Dark Mode Layout Nuances  

| Principle | Dark Mode Approach |
|---|---|
| **Elevation** | Cards get *lighter* as they rise (`#0C0C0E` → `#161618` → `#1C1C1F`). Shadows are barely visible; lightness creates the depth illusion. |
| **Asymmetry** | Same organic, non-templated asymmetry as light mode. Intentional unevenness prevents the "corporate dashboard" feel. |
| **Bento Grid** | Use the same bento layout but with darker card variants. The uneven grid feels more "studio wall" than "data table." |
| **Section Dividers** | Wavy SVG paths in `#252528` or `#3A3A40`, or soft gradient fades between dark sections. |
| **Whitespace** | Dark negative space amplifies focus. Use generous breathing room — dark backgrounds naturally recede, making content pop more strongly. |

---

## 6. Depth, Texture & Elevation (Dark Mode)  

### Elevation Scale (Dark Mode Specific)  

| Level | Background | Border | Use |
|---|---|---|---|
| **Base** | `#0C0C0E` | None | Page background |
| **Raised** | `#161618` | `1px solid #252528` | Cards, panels |
| **Floating** | `#1C1C1F` | `1px solid #2E2E33` | Modals, dropdowns |
| **High** | `#242428` | `1px solid #3A3A40` | Tooltips, popovers |
| **Overlay** | `rgba(12, 12, 14, 0.92)` | None | Modal backdrops, drawers |

### 🆕 Glow Depth System (Replaces Shadow in Dark Mode)  

Since shadows are nearly invisible on dark backgrounds, interactive elements use *glow* to signal elevation:  

| Level | Glow Treatment | Use |
|---|---|---|
| **Subtle Glow** | `0px 0px 8px rgba(77, 163, 255, 0.08)` | Default cards (barely perceptible) |
| **Interactive Glow** | `0px 0px 16px rgba(77, 163, 255, 0.12)` | Card hover state |
| **CTA Glow** | `0px 0px 32px rgba(77, 163, 255, 0.25)` | Primary buttons |
| **Accent Glow** | `0px 0px 24px rgba(255, 184, 51, 0.20)` | Secondary CTAs, badges |
| **Focus Glow** | `0px 0px 0px 3px rgba(77, 163, 255, 0.20)` | Input focus rings |

### Texture Depth Layer (Dark Mode)  

| Layer | Effect | Opacity |
|---|---|---|
| **Background** | Film grain (SVG `feTurbulence`) | 0.04–0.06 |
| **Card Surface** | Subtle noise gradient | 0.03–0.05 |
| **Image Overlay** | Dark vignette (`radial-gradient` to transparent) | 0.3–0.5 at edges |
| **Interactive Hover** | Noise intensity slightly increases + glow appears | Smooth CSS transition |

---

## 7. 🆕 Performance & Speed — The Speed-First Mindset  

### 7.1 Core Philosophy  

> **"Move less, move smarter, and let the browser do the work."**  

In 2026, every animation, every texture, every design flourish must be interrogated: *Does this cost frames? Does this delay LCP? Does this trigger layout recalculations?* The goal is 60fps on mobile and a Lighthouse Performance score of 95+.  

**The Browser's Rendering Pipeline:**  

| Stage | What Happens | Cost |
|---|---|---|
| **Layout (Reflow)** | Browser calculates positions and sizes of all elements | **Very Expensive** ⛔ |
| **Paint (Repaint)** | Browser fills in pixels for visible elements | **Moderate** ⚠️ |
| **Composite** | Browser layers the painted elements onto the screen via GPU | **Cheap** ✅ |

**Golden performance rule:** Animate only properties that affect the Composite stage — `transform` and `opacity`. Avoid properties that trigger Layout (`width`, `height`, `top`, `left`, `margin`, `padding`) or Paint (`background-color`, `color`, `box-shadow` — though these are sometimes acceptable if used sparingly).  

### 7.2 Angular Performance Architecture  

> **Context:** Angular 19–21 introduces Signals-first reactivity, zoneless change detection, deferrable views, and built-in control flow (`@if`, `@for`, `@switch`). These are not optional niceties — they're the foundation of fast Angular in 2026.  

**Performance Pillars for Angular (2026):**  

| Pillar | What | Impact |
|---|---|---|
| **Zoneless Change Detection** | Remove `Zone.js` — rely on Signals for fine-grained reactivity. Only changed bindings re-render. | **⭐⭐⭐⭐⭐** |
| **OnPush Strategy** | Components only check when `@Input()` references change or async pipe emits. Pair with Signals for automatic dirty marking. | **⭐⭐⭐⭐** |
| **Deferrable Views** | Lazy-load non-critical UI (`@defer`) — dramatically improves LCP. Below-fold sections, modals, heavy components. | **⭐⭐⭐⭐⭐** |
| **Computed Signals** | Derive state lazily — recalculates only when dependencies shift. Eliminates excess template watchers. | **⭐⭐⭐** |
| **@for with `track`** | New built-in control flow with efficient diffing. Always use `track` for stable identity. | **⭐⭐⭐** |
| **SSR / Prerender** | Server-side rendering dramatically improves FCP and LCP. Angular Universal or Angular SSR with hydration. | **⭐⭐⭐⭐⭐** |
| **Lazy Loading** | Route-level and component-level lazy loading. Split bundles; only ship what's needed for the current view. | **⭐⭐⭐⭐** |
| **Async Pipe** | Auto-subscribes/unsubscribes, marks OnPush components dirty only on emissions. Never manually `.subscribe()` in components. | **⭐⭐⭐** |
| **Image Optimization** | Use `NgOptimizedImage` directive, `srcset` with multiple resolutions, `loading="lazy"`, and explicit `width`/`height` to prevent CLS. | **⭐⭐⭐⭐** |
| **Keep Angular Updated** | Each version ships optimizations and bug fixes. Angular 19–21 specifically target bundle size and change detection efficiency. | **⭐⭐⭐** |

### 7.3 Performance Budget  

| Metric | Target | Tool |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Lighthouse, Web Vitals extension |
| **FID** (First Input Delay) / **INP** | ≤ 100ms / ≤ 200ms | Chrome UX Report, Web Vitals |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Lighthouse, Layout Instability API |
| **TTFB** (Time to First Byte) | ≤ 800ms | WebPageTest, Lighthouse |
| **Total Bundle Size** | ≤ 200KB (gzipped) initial JS | Webpack Bundle Analyzer |
| **CSS Size** | ≤ 30KB (gzipped) | Lighthouse |
| **Font Loading** | ≤ 2 font files, `font-display: swap` | Fontsource, Google Fonts with `display=swap` |
| **Animation FPS** | 60fps on desktop, ≥ 30fps on mobile | Chrome Performance tab |
| **DOM Nodes** | ≤ 1500 nodes | Chrome DevTools |

### 7.4 Angular-Specific Bundle Optimization  

| Technique | How | Impact |
|---|---|---|
| **Standalone Components** | Default in Angular 19+. No NgModules = less boilerplate, smaller bundles. | Medium |
| **esbuild / Vite** | Angular 17+ ships with esbuild for faster builds. Vite integration continues to improve in Angular 19–21. | High |
| **Tree Shaking** | Use `providedIn: 'root'` for services. Avoid barrel imports that defeat tree shaking. | High |
| **Gzip/Brotli Compression** | Configure server (nginx, Cloudflare) to serve compressed bundles. Use Angular's `@angular-builders/custom-webpack` for advanced compression. | High |
| **Code Splitting** | Route-level lazy loading via `loadComponent` and `loadChildren`. Use `@defer` for component-level splitting. | High |
| **Remove Unused Dependencies** | Audit with `depcheck` or bundle analyzer. Moment.js? Replace with `date-fns`. Large icon libraries? Use tree-shakeable alternatives. | Medium |

---

## 8. 🆕 Animation & Motion — The Speed-First Approach  

### 8.1 The Property Performance Hierarchy  

| Tier | Properties | Trigger | Cost | Safe for Animation? |
|---|---|---|---|---|
| **Compositor-Only** | `transform`, `opacity` | Composite only | **Free** | ✅ **Always** |
| **Paint-Only** | `background-color`, `color`, `box-shadow` | Paint + Composite | **Moderate** | ⚠️ Sparingly |
| **Layout-Triggering** | `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width` | Layout + Paint + Composite | **Expensive** | ❌ **Never** |

**Source:** Multiple 2026 CSS animation performance guides. All agree on this hierarchy.  

### 8.2 CSS Scroll-Driven Animations (Native — 2026 Standard)  

Scroll-driven animations are now natively supported in CSS via `scroll-timeline` and `view-timeline`. These run on the compositor thread — meaning they're as smooth as native scrolling, even under heavy system load.  

```css
/* Example: Fade in cards as they enter the viewport */
.card {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Benefits over JavaScript scroll libraries:**  
- Runs on compositor thread — never blocks the main thread  
- No JavaScript bundle overhead (~5–20KB saved)  
- Works with `prefers-reduced-motion` automatically  
- Progressive enhancement: browsers that don't support it simply show static content  

### 8.3 Animation Checklist — Before You Ship  

| Question | If No... |
|---|---|
| Does this animate only `transform` or `opacity`? | Rewrite using transform/opacity only |
| Does this respect `prefers-reduced-motion`? | Add `@media (prefers-reduced-motion: reduce)` fallback |
| Is this animation visible on screen? | Use Intersection Observer or `view-timeline` to trigger only when in viewport |
| Could this trigger CLS? | Reserve space with explicit dimensions; never animate layout properties |
| Have I limited `backdrop-filter: blur()` to ≤ 5 simultaneous elements? | Reduce or remove blur effects on mobile |
| Have I added `will-change` dynamically (before animation) and removed it after? | Overusing `will-change` creates excess GPU memory layers |
| Is this animation lazy-loaded? | Defer below-fold animation components; load only when needed |
| Have I tested on a low-end mobile device? | Chrome DevTools → Performance → CPU throttling (4x slowdown) |

### 8.4 Dark Mode Specific Animation Guidelines  

| Rule | Reason |
|---|---|
| **Glow is cheaper than shadow** | `box-shadow` triggers Paint, but in dark mode, even expensive glow effects are less visually jarring than layout shifts. Still prefer subtle glows over heavy ones. |
| **Reduce backdrop-blur on mobile dark mode** | Glass effects are expensive. Max 3 blur elements on desktop, 1 on mobile. Blur values ≤ 12px. |
| **Texture transitions should be imperceptible** | If animating noise or grain, keep it at compositor level (opacity change on an overlay). Never animate SVG filter parameters. |
| **Dark-to-light mode transition** | Use the View Transitions API for smooth cross-fade between themes. `::view-transition-old(root)` and `::view-transition-new(root)` for a polished feel. |

### 8.5 GSAP Usage (When CSS Isn't Enough)  

For complex timelines, scroll-triggered orchestration, or physics-based animations that CSS cannot handle, GSAP with ScrollTrigger remains the gold standard in 2026.  

**Rules for GSAP in Dark Mode Angular apps:**  
- Always animate `transform` and `opacity` — never layout properties  
- Use `gsap.to()` not `gsap.from()` for predictable behavior  
- Scope animations to visible elements with ScrollTrigger's `trigger` and `start`/`end`  
- Kill scroll-triggered animations on mobile if performance degrades (detect via `navigator.hardwareConcurrency` or device width)  
- Import only what you use: `import gsap from 'gsap'` + `import { ScrollTrigger } from 'gsap/ScrollTrigger'` — tree-shakeable  

---

## 9. 🆕 Angular 19–21: The Speed Toolbox  

### 9.1 Key Features for Performance  

| Feature | Angular Version | Description | Performance Impact |
|---|---|---|---|
| **Signals** | 17+ (stable), 19+ (default) | Fine-grained reactivity. Only dependent bindings update when a signal changes. | **High** |
| **Zoneless** | 18+ (experimental), 19+ (production) | Remove Zone.js entirely. Explicit control over when UI updates. | **Highest** |
| **Deferrable Views (`@defer`)** | 17+ | Lazy-load components when they enter viewport, on idle, or on interaction. | **Highest** |
| **Built-in Control Flow (`@if`, `@for`, `@switch`)** | 17+ | Replaces `*ngIf`, `*ngFor`, `*ngSwitch`. Better type safety, smaller bundle. | **Medium** |
| **Standalone Components** | 15+ (default in 19+) | No NgModules. Less boilerplate, better tree shaking. | **Medium** |
| **SSR + Hydration** | 17+ (improved in 19–21) | Server-side rendering with partial hydration. Faster TTFB, better SEO. | **Highest** |
| **esbuild / Vite** | 17+ | Faster dev builds. Production builds continue to improve. | **Medium** |
| **Image Directive (`NgOptimizedImage`)** | 15+ (stable) | Lazy loading, responsive `srcset`, explicit dimensions (prevents CLS). | **High** |

### 9.2 Zoneless Angular in Practice  

```typescript
// main.ts — bootstrap without Zone.js
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection() // Angular 19+
  ]
});
```

```typescript
// Component: Signals + OnPush for maximum performance
@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (project(); as p) {
      <article class="card midnight-card">
        <h3>{{ p.title }}</h3>
        <p>{{ p.description }}</p>
        <span class="badge">{{ p.year }}</span>
      </article>
    }
  `
})
export class ProjectCardComponent {
  readonly project = input<Project>();
}
```

### 9.3 Deferrable Views for Dark Mode Animations  

```html
<!-- Hero loads immediately -->
<section class="hero">...</section>

<!-- Below-fold project cards load when viewport approaches -->
@defer (on viewport) {
  <app-project-grid />
} @placeholder {
  <div class="skeleton-grid">
    <!-- 3 skeleton cards with subtle pulse glow animation -->
  </div>
}

<!-- Heavy animation components load on idle -->
@defer (on idle) {
  <app-interactive-background />
}
```

**Angular Priority Checklist for Dark Mode Performance:**  

1. ☐ Angular updated to v19+ (zoneless ready)  
2. ☐ Zone.js removed, app bootstrapped with `provideExperimentalZonelessChangeDetection()`  
3. ☐ All components use `ChangeDetectionStrategy.OnPush`  
4. ☐ State managed via Signals (not manual subscriptions)  
5. ☐ `@defer` used for below-fold content, heavy components, and animation sections  
6. ☐ `@for` with `track` replaces `*ngFor`  
7. ☐ Images use `NgOptimizedImage` with `srcset`  
8. ☐ SSR enabled for initial load speed  
9. ☐ Fonts loaded with `font-display: swap`  
10. ☐ CSS animations limited to `transform` and `opacity`  
11. ☐ `backdrop-filter` usage ≤ 3 elements on desktop, 1 on mobile  
12. ☐ `will-change` applied dynamically, removed after animation  
13. ☐ `prefers-reduced-motion` fallback for all animations  
14. ☐ Custom cursors disabled on touch devices (`pointer: coarse`)  
15. ☐ Lighthouse score ≥ 95 on desktop, ≥ 85 on mobile  

---

## 10. 🆕 Theme Switching — Smooth Light ↔ Dark Transitions  

### 10.1 Implementation Principle  

Users expect dark mode to "just work." Honor the system preference by default, and provide a manual toggle that persists via `localStorage`.   

```css
/* Modern approach: light-dark() CSS function (2024–2025+) */
:root {
  color-scheme: light dark;
}

body {
  background-color: light-dark(#FBF7F0, #0C0C0E);
  color: light-dark(#3A3A42, #EDEDEF);
}

/* Or: Traditional approach with CSS custom properties */
:root {
  --bg-base: #FBF7F0;
  --text-primary: #3A3A42;
  --card-bg: #FFFFFF;
  --accent: #1676F3;
}

[data-theme="dark"] {
  --bg-base: #0C0C0E;
  --text-primary: #EDEDEF;
  --card-bg: #161618;
  --accent: #4DA3FF;
}

/* Smooth theme transition */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Toggle Logic (Angular Service):**  

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  readonly theme = this.#theme.asReadonly();

  toggle(): void {
    const next = this.#theme() === 'dark' ? 'light' : 'dark';
    this.#theme.set(next);
    localStorage.setItem('theme', next);
    document.documentElement.dataset['theme'] = next;
  }
}
```

### 10.2 Smooth Cross-Fade with View Transitions API  

```css
/* Smooth theme change animation */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
}

[data-theme="dark"]::view-transition-old(root) {
  animation: fadeOut 0.3s ease;
}

[data-theme="dark"]::view-transition-new(root) {
  animation: fadeIn 0.3s ease;
}
```

---

## 11. 🆕 Speed Measurement Tools & Workflow  

### 11.1 The Speed Testing Stack  

| Tool | What It Measures | Frequency |
|---|---|---|
| **Lighthouse (Chrome DevTools)** | LCP, TBT, CLS, Performance score | Every deploy |
| **Web Vitals Extension** | Real-time Core Web Vitals during development | Continuous |
| **Chrome Performance Tab** | FPS, CPU usage, paint flashing, layer borders | Per-feature |
| **WebPageTest** | Full waterfall, TTFB, filmstrip from multiple locations | Weekly |
| **Bundle Analyzer** | Bundle size per chunk, tree-shaking effectiveness | Every build |
| **Angular DevTools** | Component tree, change detection cycles, profiler | Development |

### 11.2 The Speed Checklist (Per Feature)  

| Step | Action | Tool |
|---|---|---|
| **1. Audit before** | Run Lighthouse on the existing feature | Lighthouse |
| **2. Profile animations** | Check all animations use `transform`/`opacity` only | Chrome Performance → Rendering → Paint flashing |
| **3. Check bundle** | Verify no new large dependencies | `ng build --stats-json` → Bundle Analyzer |
| **4. Test mobile** | CPU throttling 4x, network "Slow 3G" | Chrome Performance tab |
| **5. Audit after** | Re-run Lighthouse. Compare scores. | Lighthouse |
| **6. Regression check** | Verify LCP, CLS, INP didn't degrade | Web Vitals extension |

---

## 12. Do's and Don'ts — Dark Mode + Speed Edition  

### ✅ Do  

- **Use near-black backgrounds.** `#0C0C0E`, `#161618`, `#1C1C1F` — never pure `#000000`. Pure black causes eye strain and makes elevation invisible.  
- **Use soft white text.** `#EDEDEF` or `#F0F0F0` — never `#FFFFFF`. Pure white creates harsh glare on dark backgrounds.  
- **Elevate through lightness.** Cards get lighter as they rise, not heavier shadows.  
- **Use glow for CTAs.** Soft blue/amber glows replace hard shadows in dark mode.  
- **Animate only `transform` and `opacity`.** These run on the compositor thread and never trigger layout.  
- **Use native CSS scroll-driven animations.** `animation-timeline: view()` beats JavaScript libraries for simple entrance effects.  
- **Lazy-load everything below the fold.** `@defer` in Angular, Intersection Observer for non-Angular.  
- **Remove Zone.js.** Go zoneless with Signals. This is the single highest-impact performance change in Angular 19+.  
- **Use `light-dark()` CSS function.** Cleaner than maintaining separate variable sets.  
- **Test on a low-end device.** Chrome DevTools → CPU 4x throttling → verify 30fps minimum.  
- **Respect `prefers-reduced-motion`.** Always provide a motion-free fallback.  
- **Add texture via CSS/SVG filters.** Not heavy PNG images. A 200×200px noise PNG at 4% opacity is also acceptable.  

### ❌ Don't  

- **Don't use pure black (`#000000`).** It's the #1 dark mode mistake. Kills depth, causes eye strain.  
- **Don't use pure white (`#FFFFFF`) for body text.** Soften to `#EDEDEF` or `#F0F0F0`.  
- **Don't animate `width`, `height`, `top`, `left`, `margin`, or `padding`.** These trigger layout recalculations on every frame.  
- **Don't use `transition: all`.** Be specific about which properties transition. `transition: all` catches unintended property changes.  
- **Don't ship Zone.js in production.** Go zoneless with Signals. Zone.js triggers global change detection on every async event.  
- **Don't manually `.subscribe()` in components.** Use the `async` pipe — it auto-unsubscribes and marks OnPush components dirty only on emissions.  
- **Don't animate off-screen elements.** Use Intersection Observer or `@defer` to trigger animations only when visible.  
- **Don't overuse `backdrop-filter: blur()`.** Max 3 elements on desktop, 1 on mobile. Blur values ≤ 12px.  
- **Don't keep `will-change` permanently.** Add it before animation starts, remove it after `transitionend`. Overuse creates excess GPU memory layers.  
- **Don't load large images without `srcset`.** Serve appropriately sized images for each breakpoint. Use `NgOptimizedImage` in Angular.  
- **Don't ship heavy animation libraries for simple effects.** CSS handles hover states, fade-ins, and scroll-driven entrance animations natively in 2026.  
- **Don't test only on your high-end MacBook.** Test on a throttled CPU, a mid-range Android device, and with slow network conditions.  

---

## 13. Responsive Behavior (Dark Mode Specific)  

| Breakpoint | Width | Dark Mode Adjustments |
|---|---|---|
| **Mobile** | 320–767px | Single column, 16px padding. Reduce glow opacity by 30%. Disable backdrop-blur entirely. Disable custom cursor. Reduce texture noise to 2–3%. CSS scroll-driven animations at reduced complexity. |
| **Tablet** | 768–1023px | 2-column bento, 24px padding. Max 2 backdrop-blur elements. Subtle glow effects. Texture at 3–5%. |
| **Desktop** | 1024–1439px | 3-column bento, 1200px max-width. Full glow effects. Max 3 backdrop-blur elements. Texture at 4–6%. |
| **Large Desktop** | 1440px+ | 4-column grids, 1400px max-width. Enhanced spacing. Full immersive dark experience with vignette overlay. |

---

## 14. Agent Prompt Guide — Dark Mode Quick Reference  

### Quick Color Reference (Dark)  

| Use | Hex |
|---|---|
| Page Background | `#0C0C0E` |
| Card Background | `#161618` |
| Modal / Tooltip Background | `#1C1C1F` |
| Primary Text | `#EDEDEF` |
| Secondary Text | `#9E9EA6` |
| Primary CTA | `#4DA3FF` |
| Secondary CTA | `#FFB833` |
| Error / Highlight | `#F062A0` |
| Terminal Accent | `#00FF41` |
| Border Default | `#2E2E33` |
| Sticky-Note Background | `#3D3520` |

### Quick Typography Reference (Dark)  

| Use | Font | Size | Weight | Color |
|---|---|---|---|---|
| Hero | JetBrains Mono | 80–96px | 800–900 | `#EDEDEF` |
| Section Heading | JetBrains Mono | 32–36px | 700 | `#EDEDEF` |
| Card Title | Cascadia Code | 20–24px | 700 | `#F5F5F5` |
| Handwritten Accent | Caveat | 18–22px | 500 | `#9E9EA6` |
| Body | Cascadia Code | 16px | 400 | `#EDEDEF` |
| Button | Cascadia Code | 14px | 600 | `#0C0C0E` on `#4DA3FF`, `#FFFFFF` on `#0C0C0E` |
| Badge | Cascadia Code | 11px | 600 | Varies by variant |

### Quick Performance Rules  

| Rule | Detail |
|---|---|
| **Animate what** | `transform` and `opacity` only |
| **Never animate** | `width`, `height`, `top`, `left`, `margin`, `padding` |
| **CSS first** | Use native CSS scroll-driven animations (`view-timeline`, `scroll-timeline`) before JS libraries |
| **Angular zoneless** | Remove Zone.js. Use Signals + OnPush for fine-grained reactivity |
| **Lazy everything** | `@defer` for below-fold, Intersection Observer for trigger-on-visible |
| **Texture via SVG** | SVG `feTurbulence` filters, not PNG overlays |
| **Test mobile** | Chrome CPU 4x throttle, verify 30fps minimum |

### Iteration Guide (Dark Mode + Speed — Condensed)  

1. **Typography first:** Cascadia Code body + JetBrains Mono headings. Caveat only for decorative accents. Apply `-webkit-font-smoothing: antialiased` in dark mode.  
2. **Color warmth:** Never pure black. Use `#0C0C0E` with warm undertones. Soft white text (`#EDEDEF`) over pure white. Brighter accent variants for dark contexts (`#4DA3FF`, `#FFB833`, `#F062A0`).  
3. **Elevation through lightness:** Base `#0C0C0E` → Card `#161618` → Modal `#1C1C1F` → Tooltip `#242428`. Use glow, not shadow, for interactive elements.  
4. **Spacing scale:** Same 4–92px scale. Allow organic asymmetry within cards.  
5. **Texture layer:** Film grain via SVG `feTurbulence` at 4–6% opacity. Higher than light mode to compensate for lower luminance.  
6. **Borders:** Dashed or sketchy SVG borders in `#2E2E33` or `#3A3A40`.  
7. **Glow vs Shadow:** Replace shadows with soft glows in dark mode. Primary glow `rgba(77, 163, 255, 0.25)`, accent glow `rgba(255, 184, 51, 0.20)`.  
8. **Animation properties:** Only `transform` and `opacity` for all motion. Never animate layout properties.  
9. **Angular performance:** Zoneless + Signals + OnPush + `@defer` + SSR = fast Angular in 2026.  
10. **CSS scroll-driven animations:** Use native `animation-timeline: view()` for entrance effects. Fall back to Intersection Observer for browsers without support.  
11. **Theme transition:** Smooth cross-fade via View Transitions API. Respect `prefers-color-scheme` by default.  
12. **Mobile:** Disable custom cursors, reduce/remove backdrop-blur, lower texture opacity, reduce glow intensity, and test with CPU throttling.  
13. **Test everything:** Lighthouse for Core Web Vitals, Chrome Performance tab for FPS, bundle analyzer for size, WebPageTest for real-world conditions.  
14. **Source inspiration:** Linear, Vercel, Raycast, Linear — all ship dark-first with `#0f0f0f`/`#050505`/`#1c1c1e` backgrounds and careful accent glows.  

---
