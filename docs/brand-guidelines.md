# Brand Guidelines v1.0 — Gannon Forum

> Last updated: 2026-04-30
> Status: Active

## Quick Reference

| Element | Value |
|---------|-------|
| Product Name | Gannon Forum |
| Primary Color | #1E3A5F (Navy Blue) |
| Secondary Color | #4A90D9 (Sky Blue) |
| Accent Color | #F59E0B (Amber) |
| Primary Font | Inter |
| Secondary Font | JetBrains Mono |
| Voice | Structured, Clear, Functional |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Navy Blue** | #1E3A5F | rgb(30,58,95) | Primary brand, headers, nav |
| **Navy Dark** | #152B47 | rgb(21,43,71) | Hover states, sidebar |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Sky Blue** | #4A90D9 | rgb(74,144,217) | Links, CTAs, accents |
| **Sky Light** | #7AB8E8 | rgb(122,184,232) | Light accents, hover |

### Accent Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Amber** | #F59E0B | rgb(245,158,11) | Highlights, vote counts, tags |
| **Amber Dark** | #D97706 | rgb(217,119,6) | Hover states for amber |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background Dark | #0F1923 | rgb(15,25,35) | Page background (dark mode) |
| Surface Dark | #1A2635 | rgb(26,38,53) | Cards, posts, panels |
| Surface Mid | #243142 | rgb(36,49,66) | Borders, dividers |
| Text Primary | #E8EDF2 | rgb(232,237,242) | Main text (dark mode) |
| Text Secondary | #8FA3B3 | rgb(143,163,179) | Muted text, metadata |
| Border | #2D3F52 | rgb(45,63,82) | Dividers, card borders |
| Background Light | #F4F6F8 | rgb(244,246,248) | Page background (light mode) |
| Surface Light | #FFFFFF | rgb(255,255,255) | Cards (light mode) |
| Text Dark | #1A2635 | rgb(26,38,53) | Main text (light mode) |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success | #22C55E | Verification, join success |
| Warning | #F59E0B | Cautions, moderation |
| Error | #EF4444 | Errors, @gannon.edu validation |
| Info | #4A90D9 | Informational messages |

### Accessibility

- Text on dark background: 9.1:1 contrast ratio (AAA)
- Secondary text on dark: 4.7:1 contrast ratio (AA)
- All interactive elements meet WCAG 2.1 AA standards

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Inter', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 32px | 24px | 700 | 1.2 |
| H2 | 24px | 20px | 600 | 1.25 |
| H3 | 20px | 18px | 600 | 1.3 |
| H4 | 16px | 16px | 600 | 1.35 |
| Body | 15px | 15px | 400 | 1.6 |
| Small | 13px | 13px | 400 | 1.5 |
| Caption | 12px | 12px | 400 | 1.4 |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. Logo Usage

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Full Horizontal | logo-full-horizontal.svg | Headers, documents |
| Icon Only | logo-icon.svg | Favicons, small spaces |
| Monochrome | logo-mono.svg | Limited color contexts |

### Clear Space

Minimum clear space = height of the logo icon (mark)

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital - Full Logo | 120px |
| Digital - Icon | 24px |

### Don'ts

- Don't rotate or skew the logo
- Don't change colors outside approved palette
- Don't add shadows or effects
- Don't place on busy backgrounds without sufficient contrast

---

## 4. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Structured** | Organized, clear hierarchy, forum-first |
| **Functional** | Utility over decoration, action-oriented |
| **Academic** | Slightly formal but approachable |
| **Direct** | No fluff, get to the point |

### Voice Chart

| Trait | We Are | We Are Not |
|-------|--------|------------|
| Structured | Organized, clear | Bureaucratic, rigid |
| Functional | Useful, practical | Cold, robotic |
| Academic | Informed, intentional | Stuffy, pretentious |
| Direct | Concise, honest | Blunt, dismissive |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| UI Labels | Direct, action-verb | "Create a group", "Join discussions" |
| Error Messages | Calm, solution-focused | "Only @gannon.edu emails are accepted." |
| Success | Brief, clear | "Post published." |
| Empty States | Helpful, encouraging | "No posts yet — start the conversation." |
| Navigation | Minimal, functional | "Home", "Groups", "Messages" |

### Prohibited Terms

| Avoid | Reason |
|-------|--------|
| Revolutionary | Overused |
| Seamless | Overused, meaningless |
| Synergy | Corporate jargon |
| Awesome | Too casual for academic context |
| Leverage | Use "use" instead |
| Community vibes | Too informal |

### Preferred Phrases

| Instead of | Use |
|------------|-----|
| "Connect with peers" | "Talk to students" |
| "Explore content" | "Browse posts" |
| "Engage with discussions" | "Join the thread" |
| "Access your account" | "Sign in" |

---

## 5. Imagery Guidelines

### Photography Style

- **Style:** Clean, academic, functional
- **Subjects:** Campus context, student work, clean UI screenshots
- **Color treatment:** Cool, desaturated, professional

### Illustrations

- Style: Minimal, functional, flat with subtle depth
- Colors: Brand palette only (navy, sky blue, amber accents)
- Line weight: 1.5–2px consistent stroke
- Corners: 4–8px rounded

### Icons

- Style: Outlined, 20px base grid
- Stroke: 1.5px consistent
- Corner radius: 2px
- Fill: None (outline only, or filled for active state)

---

## 6. Design Components

### Buttons

| Type | Background | Text | Border Radius |
|------|------------|------|---------------|
| Primary | #4A90D9 | #FFFFFF | 6px |
| Secondary | Transparent | #4A90D9 | 6px |
| Danger | #EF4444 | #FFFFFF | 6px |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Compact elements |
| md | 16px | Standard spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| 2xl | 48px | Section dividers |

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 6px |
| Cards | 8px |
| Inputs | 6px |
| Modals | 12px |
| Tags/Badges | 4px |
| Avatars | 9999px |

---

## AI Image Generation

### Base Prompt Template

Always prepend to image generation prompts:

```
Dark academic forum interface, navy blue and sky blue palette (#1E3A5F, #4A90D9), clean minimal design, structured layout, professional student community, soft cool lighting
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | Soft, cool, ambient, professional |
| **Mood** | Academic, structured, focused, intentional |
| **Composition** | Clean, grid-based, minimal clutter |
| **Treatment** | Slightly desaturated, cool tones |
| **Aesthetic** | Modern academic, Reddit-inspired, functional |

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Neon colors | Off-brand, too casual |
| Heavy gradients | Distracts from content |
| Stock photo clichés | Generic, inauthentic |
| Party/meme imagery | Wrong tone for academic platform |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-30 | Initial guidelines for Gannon Forum |
