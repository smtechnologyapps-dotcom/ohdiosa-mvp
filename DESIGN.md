# Design System: OHDIOSA

## 1. Visual Theme & Atmosphere
A highly restrained, gallery-airy interface for a luxury fashion brand. The aesthetic is heavily asymmetric, utilizing a strict black and gold palette to convey premium exclusivity and tactile richness. Motion is fluid and uses spring-physics, feeling weighty and deliberate. The atmosphere is cinematic and editorial, similar to a high-end fashion magazine spread.

Density: 3 (Gallery-Airy)
Variance: 8 (Artsy Chaotic)
Motion: 7 (Fluid CSS)

## 2. Color Palette & Roles
- **Canvas Black** (#09090B) — Primary background surface (Zinc-950).
- **Pure Surface** (#18181B) — Card and container fill for depth.
- **Champagne Gold** (#D4AF37) — Primary accent for CTAs, active states, and micro-interactions. (Saturation < 80%)
- **Muted Gold** (#B89932) — Hover states for the primary accent.
- **Off-White Ink** (#F9FAFB) — Primary text.
- **Muted Steel** (#A1A1AA) — Secondary text, descriptions, metadata (Zinc-400).
- **Whisper Border** (rgba(212,175,55,0.2)) — Card borders, 1px structural lines in gold.

## 3. Typography Rules
- **Display:** `Editorial New` (or a distinctive modern serif like `Gambarino` / `Instrument Serif` if available; fallback `Playfair Display`) — Track-tight, controlled scale, weight-driven hierarchy. Used exclusively for large headers and artistic focal points.
- **Body:** `Geist` or `Outfit` (fallback `Inter` is BANNED, use `Helvetica Neue` or `Arial` if absolutely no modern sans is loaded, but prefer `Outfit`) — Relaxed leading, 65ch max-width, neutral secondary color.
- **Mono:** `JetBrains Mono` or `Geist Mono` — For code, metadata, timestamps, price numbers.
- **Banned:** Generic system fonts for premium contexts. No Arial/Times New Roman.

## 4. Component Stylings
- **Buttons:** Flat, no outer glow. Tactile -1px translate on active. Gold fill for primary with Off-Black text, thin gold outline for secondary with Off-White text.
- **Cards:** Very subtle rounding (0.25rem) or sharp corners for an editorial feel. Diffused whisper shadow using gold tint. For high-density layouts, replace with border-top dividers.
- **Inputs:** Label above, error below. Focus ring in Champagne Gold. Minimalist underline or faint border instead of full background fills.
- **Loaders:** Skeletal shimmer matching exact layout dimensions. No circular spinners.
- **Empty States:** Composed, artistic compositions using negative space.

## 5. Layout Principles
Grid-first responsive architecture. Asymmetric splits for Hero sections.
Strict single-column collapse below 768px. Max-width containment (1400px centered).
No flexbox percentage math. Generous internal padding (p-12 to p-24 for sections).
No overlapping elements.

## 6. Motion & Interaction
Spring physics for all interactive elements (stiffness: 100, damping: 20).
Staggered cascade reveals on lists and grids.
Perpetual micro-loops on active dashboard components or the 24/7 assistant.
Hardware-accelerated transforms only.

## 7. Anti-Patterns (Banned)
- No emojis anywhere.
- No `Inter` font.
- No pure black (`#000000`), always use Canvas Black (#09090B).
- No neon glows, purple, or blue.
- No 3-column equal grids; favor asymmetric 2-column or varied sizes.
- No AI copywriting clichés (Elevate, Unleash).
- No generic placeholder names.
- No centered Hero sections.
- No overlapping text on images.
