# Color Revamp Documentation

## Design Philosophy

**Old theme:** Warm earthy — beige/sandy backgrounds, Sea Teal primary, Soft Coral accent.  
**New theme: "Carbon Electric"** — Cool navy/steel backgrounds, Electric Blue primary, Vivid Amber Gold accent, with 9 distinct bold colors spanning the full spectrum.

---

## New Color Palette (9 Colors)

| Role | Name | Light HSL | Dark HSL | Hex (Light) |
|------|------|-----------|----------|-------------|
| Primary | **Electric Blue** | `214 90% 52%` | `214 88% 62%` | `#1676F3` |
| Accent | **Vivid Amber Gold** | `38 97% 54%` | `38 95% 60%` | `#FCA818` |
| Pop 1 | **Crimson** (`--rosewood`) | `348 82% 56%` | `348 80% 62%` | `#EB3357` |
| Pop 2 | **Indigo** (`--dusty-lavender`) | `241 68% 62%` | `241 65% 70%` | `#5F5CE0` |
| Pop 3 | **Sky Cyan** (`--light-bronze`) | `194 84% 47%` | `194 82% 56%` | `#13AEDD` |
| Pop 4 | **Rose** (`--light-coral`) | `330 70% 58%` | `330 68% 65%` | `#DF4994` |
| Pop 5 | **Electric Blue Alt** (`--dusk-blue`) | `214 90% 52%` | `214 88% 62%` | `#1676F3` |
| Background Light | **Pearl White** | `220 14% 97%` | — | `#F4F5F8` |
| Background Dark | **Deep Navy** | — | `222 30% 8%` | `#0B0E19` |

---

## Section-by-Section Color Map

### 1. Header / Navbar
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Navbar bg (light) | `bg-white/72` | `bg-white/72` (unchanged) |
| Navbar bg (dark) | `slate-950/78` | `#060A16/78` (deep navy) |
| Active nav pill bg | `bg-primary/15` teal | `bg-primary/15` electric blue |
| Active nav border | `border-primary/20` teal | `border-primary/20` electric blue |
| Logo cursor `_` | `text-primary` teal | `text-primary` electric blue |

### 2. Hero Section
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Background | Fog `hsl(39,50%,96%)` | Pearl `hsl(220,14%,97%)` |
| Rotating badge ring | Conic: teal→slate→apricot | Conic: blue→deepblue→indigo→crimson→amber→sky |
| Badge inner bg (dark) | `#1f1915` brownish | `#0C1120` deep navy |
| Name gradient animation | Teal + coral cycle | Electric blue + indigo + crimson cycle |
| "digital masterpieces" | `text-primary` teal | `text-primary` electric blue |
| Underline 1 | `from-primary via-accent to-light-coral` | `from-primary via-accent to-sky-cyan` |
| Underline 2 | `from-light-coral via-accent to-dusty-lavender` | `from-rose via-accent to-indigo` |
| View Work button | Primary teal | Primary electric blue |
| Resume button | Outline teal | Outline electric blue |
| Social icons (hover) | Teal/Coral | Electric blue/Amber |
| Mail icon | `light-coral` apricot | `rose` hot rose |

### 3. About Section
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Background | Fog white | Pearl white |
| Section heading gradient | `from-primary to-primary/80` teal | `from-primary to-primary/80` electric blue |
| Gradient underline | `from-primary to-accent/80` | `from-primary to-accent/80` |
| Top-right glow | `from-primary/30` teal | `from-primary/30` electric blue |
| Bottom-left glow | `from-accent/30` coral | `from-accent/30` amber |
| Student card border | `border-primary/30` teal | `border-primary/30` electric blue |
| Learner card border | `border-accent/30` coral | `border-accent/30` amber |
| Core Value "Curiosity" | `text-primary` teal | `text-primary` electric blue |
| Core Value "Clean Code" | `text-dusty-lavender` slate-blue | `text-dusty-lavender` indigo |
| Core Value "Passion" | `text-accent` coral | `text-accent` amber gold |
| Core Value "Growth" | `text-light-coral` apricot | `text-light-coral` rose |

### 4. Skills Section
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Heading gradient | `from-foreground to-primary dark:to-light-coral` | `from-foreground to-primary dark:to-light-coral` (now rose) |
| Cloud frame conic ring | `#3F9D97→#2F7F7A→#5D7486→#E8AE7A→#D98C73` (teal-coral) | `#1676F3→#5F5CE0→#EB3357→#FCA818→#13AEDD` (blue-indigo-crimson-amber-sky) |
| Cloud inner bg (dark) | `#1f1915` brownish | `#0C1120` deep navy |

### 5. Projects Section
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Section bg light | `#f9f6f1→#f2e8dc` warm beige | `#F4F5F8→#E8EEF5` cool pearl |
| Section bg dark | `#1b1612→#211a15` warm dark | `#0B0E19→#0F1728` cool navy |
| Project card bg dark | `#1f1915/80` brownish | `#0C1120/80` navy |
| Card titlebar dark | `#18130f` dark brown | `#080E1A` darkest navy |
| Card image bg light | `#f6efe6/60` warm beige | `#ECF0F8/60` cool pearl |
| GitHub button dark | `#2d2a27/90` dark brown | `#172242/90` navy |
| Card hover shadow | `primary/10` teal | `primary/10` electric blue |
| Project title hover | `text-primary` teal | `text-primary` electric blue |
| "Selected Work" badge | `bg-primary/10 text-primary` teal | same in electric blue |

### 6. Contact Section
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Terminal bg | `#171411` dark brown | `#06091A` dark navy |
| Terminal header bg | `#1f1a15` brown | `#0B1225` navy |
| Terminal borders | `#3a332b` warm gray | `#1C2E52` navy blue |
| Terminal text | `#d9d1c6` warm off-white | `#C3D1E8` cool off-white |
| Terminal `~` prompt | `text-light-coral` apricot | `text-light-coral` rose |
| Terminal email text | `text-dusty-lavender` slate | `text-dusty-lavender` indigo |
| Terminal `{` brackets | `text-light-coral` | `text-light-coral` rose |
| Form card bg dark | `#1f1915/70` brownish | `#0C1120/70` navy |
| Input focus ring | `ring-primary/20` teal | `ring-primary/20` electric blue |
| Labels | `text-slate-700` | `text-foreground/80` |
| Help text | `text-slate-500` | `text-muted-foreground` |
| "Open for Collaboration" | border warm | `border-border/70` |

### 7. Footer
| Element | Old Color | New Color |
|---------|-----------|-----------|
| Footer bg | `#0b0d12` near-black | `#060A16` deep navy-black |
| Grid pattern | `#2c313d` dark gray | `#162040` navy-blue |
| Brand underline | `bg-primary` teal | `bg-primary` electric blue |
| Nav icon colors | `text-primary/70` teal | `text-primary/70` electric blue |
| nowhile badge ring | `bg-primary/55` teal | `bg-primary/55` electric blue |
| Tech: Angular | `#D98C73` salmon | `#E83A52` crimson (brand red) |
| Tech: TypeScript | `#5D7486` slate | `#1676F3` electric blue (brand) |
| Tech: Tailwind | `#3F9D97` teal | `#13AEDD` sky cyan (brand) |
| Tech: Vite | `#E8AE7A` peach | `#FCA818` amber gold (brand) |

---

## CSS Variables Reference

### Light Mode (`:root`)
```
--background:        220 14% 97%   /* Pearl White       #F4F5F8 */
--foreground:        222 35% 11%   /* Deep Navy Black   #111827 */
--card:              220 18% 94%   /* Silver Pearl      #EAEEf4 */
--primary:           214 90% 52%   /* Electric Blue     #1676F3 */
--accent:            38  97% 54%   /* Vivid Amber Gold  #FCA818 */
--secondary:         220 16% 89%   /* Light Cool Gray   #DDE3EE */
--muted-foreground:  220 12% 42%   /* Slate Gray        #5E6A7E */
--border:            220 16% 80%   /* Silver Border     #BFC8D9 */
/* Named extras */
--dusk-blue:         214 90% 52%   /* Electric Blue     #1676F3 */
--dusty-lavender:    241 68% 62%   /* Indigo            #5F5CE0 */
--rosewood:          348 82% 56%   /* Crimson           #EB3357 */
--light-coral:       330 70% 58%   /* Rose              #DF4994 */
--light-bronze:      194 84% 47%   /* Sky Cyan          #13AEDD */
```

### Dark Mode (`.dark`)
```
--background:        222 30%  8%   /* Deep Navy         #0B0E19 */
--foreground:        213 20% 92%   /* Cool Off-White    #E2E8F0 */
--card:              222 26% 12%   /* Midnight Card     #111827 */
--primary:           214 88% 62%   /* Bright Elec Blue  #4993F4 */
--accent:            38  95% 60%   /* Bright Amber      #FDBB1F */
--border:            222 18% 22%   /* Navy Border       #2A3A55 */
```

---

## Animation Color Changes

| Animation | Old Colors | New Colors |
|-----------|-----------|------------|
| Hero name gradient | Teal + coral shades | Blue + indigo + crimson cycle |
| Rotating badge ring | Teal → slate → apricot | Blue → deep blue → indigo → crimson → amber → sky |
| Skills cloud ring | Teal → slate → amber → coral | Blue → indigo → crimson → amber → sky |
| Scroll indicator | `text-primary/70` teal | `text-primary/70` electric blue |
| Back-to-top button | `bg-primary` teal | `bg-primary` electric blue |
| Pulse cursor `_` | `text-primary` teal | `text-primary` electric blue |
