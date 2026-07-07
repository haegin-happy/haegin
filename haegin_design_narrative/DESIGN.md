---
name: Haegin Design Narrative
colors:
  surface: '#fbf9fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fbf9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#44474c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f1'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f71'
  primary: '#0a1525'
  on-primary: '#ffffff'
  primary-container: '#1f2a3a'
  on-primary-container: '#8691a5'
  inverse-primary: '#bcc7dc'
  secondary: '#685d4b'
  on-secondary: '#ffffff'
  secondary-container: '#f1e0c9'
  on-secondary-container: '#6f6351'
  tertiary: '#001824'
  on-tertiary: '#ffffff'
  tertiary-container: '#092d3e'
  on-tertiary-container: '#7695aa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3f9'
  primary-fixed-dim: '#bcc7dc'
  on-primary-fixed: '#111c2b'
  on-primary-fixed-variant: '#3c4759'
  secondary-fixed: '#f1e0c9'
  secondary-fixed-dim: '#d4c4ae'
  on-secondary-fixed: '#221a0c'
  on-secondary-fixed-variant: '#504535'
  tertiary-fixed: '#c7e7fd'
  tertiary-fixed-dim: '#abcbe1'
  on-tertiary-fixed: '#001e2d'
  on-tertiary-fixed-variant: '#2b4a5c'
  background: '#fbf9fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e3'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Libre Franklin
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Libre Franklin
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Libre Franklin
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 32px
  margin-mobile: 24px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style
The design system is anchored in the concept of "Timeless Rituals." It targets a mature demographic (ages 40–60) who value stability, clarity, and quiet sophistication. The aesthetic leans into **Minimalism** with a **Premium Editorial** influence, prioritizing high-quality whitespace and a natural light feel over digital-first trends.

The UI should evoke the sensation of reading a high-end physical magazine on a sunlit afternoon. Visual density is intentionally kept low to reduce cognitive load, fostering an atmosphere of "Long-lasting Happiness" and "Everyday Tradition."

## Colors
The palette is rooted in organic, earthy tones to provide a "Quiet Elegance." 
- **Warm Ivory (#F7F2EA):** The foundation of the system, used for all page backgrounds to reduce eye strain and provide a softer contrast than pure white.
- **Deep Charcoal (#222222):** Used for primary body text and headlines to ensure high legibility.
- **Muted Navy (#1F2A3A):** The "Point Color," used for key structural elements, primary borders, and focused states.
- **Soft Beige (#D8C8B2):** A secondary functional color for subtle dividers, disabled states, or secondary backgrounds.
- **Sky Blue (#AFCFE5):** An accent reserved for product callouts, badges, or success indicators, adding a breath of fresh air to the composition.

## Typography
The typographic system utilizes a high-contrast pairing to distinguish between "Story" and "Information."
- **Headlines (Source Serif 4):** A professional, authoritative serif that mimics traditional Myeongjo elegance. It should be used for all titles and narrative hooks.
- **Body & Labels (Libre Franklin):** A clean, highly legible sans-serif. Font sizes are intentionally scaled up (starting at 18px for body text) to accommodate the 40-60 age demographic, ensuring effortless readability.
- **Formatting:** Use generous line heights (1.6x) for body text to maintain a spacious, airy feel.

## Layout & Spacing
This design system employs a **Fixed Grid** philosophy for desktop to maintain a centered, editorial look, transitioning to a flexible fluid grid for mobile.
- **Rhythm:** An 8px base unit drives all spacing. 
- **Vertical Spacing:** Use exaggerated gaps (Section Gap: 128px) between major content blocks to emphasize the "spacious" and "premium" nature of the brand.
- **Alignment:** Large margins (64px on desktop) ensure content feels protected and prioritized. Text should generally be left-aligned or center-aligned for short display blocks to maintain traditional reading patterns.

## Elevation & Depth
To preserve the "Natural Light" feel, this design system avoids heavy shadows. 
- **Tonal Layering:** Depth is created by placing Warm Ivory containers on slightly darker Soft Beige backgrounds.
- **Low-Contrast Outlines:** Instead of shadows, use 1px borders in Soft Beige (#D8C8B2) to define cards and sections.
- **Atmospheric Blurs:** When overlays are necessary, use a subtle backdrop blur (8px) with a Warm Ivory tint at 80% opacity to maintain the sense of a physical, translucent material.

## Shapes
The shape language is "Soft" yet structured. 
- **Corners:** Use a consistent 4px (0.25rem) radius for most elements (Buttons, Inputs). This provides a hint of approachability while maintaining the architectural discipline of a premium brand.
- **Image Treatment:** Images should always be rectangular or have the system-standard soft corner. Avoid circles or overly rounded "pill" shapes for primary content.

## Components
- **Buttons:** Primary buttons feature a transparent background with a 1px Muted Navy border. On hover, the background transitions to Muted Navy with Warm Ivory text. Interaction should be a slow 300ms fade.
- **Cards:** Cards are defined by thin Soft Beige borders and generous internal padding (40px). No shadows are permitted.
- **Inputs:** Simple bottom-border only or 1px Soft Beige outline. Labels must stay above the input at all times in a small, bolded Sans-serif.
- **Chips/Badges:** Use the Sky Blue accent with 50% opacity backgrounds and Deep Charcoal text for subtle categorizations.
- **Lists:** Use wide row heights (min 64px) with thin Soft Beige dividers. 
- **Interactions:** All image entries should use a 5-second "Ken Burns" slow zoom-in effect. Page transitions must use a subtle 40px vertical fade-up to reinforce the "Quiet Elegance."