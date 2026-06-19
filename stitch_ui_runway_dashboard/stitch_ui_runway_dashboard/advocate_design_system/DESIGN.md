---
name: Advocate Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#111516'
  on-tertiary: '#ffffff'
  tertiary-container: '#26292b'
  on-tertiary-container: '#8d9092'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter-sm: 16px
  gutter-md: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1200px
---

## Brand & Style
The design system is engineered for **financial advocacy**, specifically targeting individuals navigating the stress of career transitions and layoffs. The brand personality is **calm, authoritative, and supportive**, bridging the gap between rigorous financial management and empathetic human guidance.

The visual direction follows a **Modern Corporate** style with a focus on **Information Utility**. It prioritizes extreme legibility and a sense of "secure structure" to instill confidence. By combining clean whitespace with sturdy, structured elements, the UI avoids the coldness of traditional banking while maintaining the seriousness required for legal and financial data. The emotional goal is to lower the user's cognitive load and cortisol levels through predictable, clear, and high-contrast layouts.

## Colors
This design system utilizes a palette rooted in psychological safety and professional clarity.

- **Primary (Deep Slate):** Used for core branding, primary navigation, and high-level headings. It provides a grounded, stable foundation.
- **Secondary (Calming Teal):** Applied to primary actions and progress indicators. This hue is chosen to reduce anxiety and suggest "movement forward."
- **Neutral (Slate Grays):** A multi-tiered gray scale used for secondary text and borders to maintain a clean hierarchy.
- **Surface (Soft Whites):** The background uses a slightly off-white (#F8FAFC) to reduce screen glare and eye strain during long reading sessions.
- **Semantic Colors:** Warning and error states use high-contrast reds (#BE123C) for immediate visibility regarding eligibility flags, while success states use a deep forest green to signal security and completion.

## Typography
The design system employs **Public Sans** for all roles. Originally designed for government interfaces, it offers exceptional neutrality and accessibility.

- **Headlines:** Use Bold and Semi-Bold weights with tight letter spacing to create an authoritative presence.
- **Body Text:** Set with generous line height (1.5x) to ensure long-form legal or financial explanations remain digestible.
- **Data Display:** Numerical data should use `body-lg` with medium weight to ensure "the numbers" are never lost in the prose.
- **Accessibility:** Never use a font size smaller than 12px. All labels must maintain a minimum contrast ratio of 4.5:1 against their backgrounds.

## Layout & Spacing
The design system relies on a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile.

- **Rhythm:** A strict 4px/8px incremental scale is used for all internal component spacing to create a sense of mathematical order and reliability.
- **Desktop:** Centralized max-width container (1200px) with 48px outer margins.
- **Mobile:** Full-bleed containers with 16px horizontal safe-area margins.
- **Density:** Provide generous "breathable" margins between content sections (minimum 40px) to prevent the user from feeling overwhelmed by data.

## Elevation & Depth
To convey security without excessive visual noise, this design system uses **Tonal Layers** combined with **Low-Contrast Outlines**.

- **Level 0 (Background):** #F8FAFC (Primary Background).
- **Level 1 (Cards/Containers):** Pure white (#FFFFFF) with a 1px solid border (#E2E8F0). No shadow.
- **Level 2 (Active/Hover States):** Pure white with a soft, ambient shadow (0px 4px 12px rgba(30, 41, 59, 0.05)).
- **Level 3 (Modals/Overlays):** White with a more defined, protective shadow (0px 12px 24px rgba(30, 41, 59, 0.1)).

Shadows must be "tinted" with the primary color (#1E293B) at very low opacities to ensure they feel like part of the environment rather than a generic gray drop-shadow.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a subtle modern friendliness while maintaining the structural "grid-aligned" feel of a professional institution. 

- **Primary Elements:** Buttons and Input fields use the standard 4px (0.25rem) radius.
- **Containers:** Large data cards use 8px (0.5rem) to differentiate them from interactive elements.
- **Interactive Flags:** Small badges and status indicators may use 12px (0.75rem) to appear distinct and "pill-like" for quick scanning.

## Components
- **Buttons:** Primary buttons use the Secondary Teal (#0D9488) with white text. Secondary buttons use a transparent background with a Slate border. All buttons have a minimum height of 48px for touch accessibility.
- **Status Badges:** Critical for "Eligibility Flags." Use a "Soft Background" pattern: Light Red background with Deep Red text for "Ineligible," and Light Green background with Deep Green text for "Approved."
- **Progress Indicators:** Linear horizontal bars using the Teal color. Use a 4px height for subtle tracking and 8px for major milestones.
- **Data Cards:** Content-heavy containers must include a 16px internal padding. Headers within cards should be separated by a light 1px horizontal divider.
- **Input Fields:** Use a 1px border (#CBD5E1) that thickens and changes to the Primary Deep Blue on focus. Error states must include a 16px icon (exclamation) for color-blind accessibility.
- **Secure Lists:** For document uploads or financial line items, use alternating row tints or clear separators to guide the eye across the row.