# Theme Refresh Guide

## Goal
- Refresh the entire website visual language with a calm modern palette.
- Remove the old green/purple/violet-heavy look.
- Preserve all existing behavior and interactions.
- Strengthen the icon cloud with a clearer 3D globe wire-mesh feel.

## Core Palette (11 Colors)
1. `Sand` `#F6EFE6`
2. `Oat` `#E9DDCC`
3. `Stone` `#D0C2AF`
4. `Clay` `#BCA48B`
5. `Charcoal` `#2D2A27`
6. `Fog` `#F9F6F1`
7. `Deep Teal` `#2F7F7A`
8. `Sea Teal` `#3F9D97`
9. `Soft Coral` `#D98C73`
10. `Apricot` `#E8AE7A`
11. `Slate Blue` `#5D7486`

## Token Mapping
- `--background`: warm fog/sand
- `--foreground`: charcoal
- `--primary`: sea teal
- `--secondary`: oat/clay blend
- `--accent`: soft coral
- `--muted`: sand/oat blend
- `--ring`: deep teal
- `--spotlight-color`: sea teal

## Usage Rules
- Buttons: use `primary` and `accent` gradients with warm contrast.
- Highlights and underlines: use teal + coral + apricot blend.
- Borders and cards: warm neutral tones, subtle alpha.
- Terminal-like blocks: keep dark shell style but use teal/apricot status accents.
- Globe mesh: layered wireframe + linked points + depth fade, no logic changes.

## Non-Functional Requirement
- No routing, state, data, form, or business-logic behavior is changed.
- Only visual styling and rendering aesthetics are updated.
