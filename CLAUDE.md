# Void Sector Lore Wiki - Development Guide

This is a Quartz 4.5.2 wiki for Void Sector game lore. The wiki features extensive custom theming and an immersive terminal corruption system.

## Project Structure

```
/content/           # Markdown lore files (Obsidian-compatible)
/quartz/            # Quartz framework and customizations
  /components/      # Custom React components
    /scripts/       # Inline TypeScript for client-side behavior
    /styles/        # SCSS stylesheets for components
    /pages/         # Special page components (404, etc.)
  /static/          # Static assets (SVGs, logos)
  /styles/          # Global styles (custom.scss)
/quartz.config.ts   # Site configuration
/quartz.layout.ts   # Layout component configuration
```

## Terminal Immersion System

The wiki tracks user exposure and progressively corrupts the interface. This is the core immersive feature.

### Key Files

- `quartz/components/TerminalStatus.tsx` - Terminal status bar component
- `quartz/components/TrulliBeacon.tsx` - Corruption cleanse button
- `quartz/components/scripts/terminal.inline.ts` - Core exposure tracking (~1000 lines)
- `quartz/components/scripts/beacon.inline.ts` - Beacon degradation logic
- `quartz/components/styles/terminal.scss` - All terminal/horror styles
- `quartz/components/styles/beacon.scss` - Beacon button styles

### Exposure Sources

Exposure is tracked from multiple sources:
- Page visits (each page adds exposure)
- Time on site (accumulates over time)
- Dark mode toggle clicks (massive exposure boost)
- Idle time (corruption creeps in during inactivity)
- The 03:47 event (checks real local time)

### Theme States

Progressive corruption themes (in order):
1. `TRULLI_LOCKED` - Safe, green indicators, stable
2. `SIGNAL_DRIFT` - Mild corruption, cyan with hints of purple
3. `ISOLATION` - Moderate, purple tones emerge
4. `SUBSTRATE` - High corruption, deep purple dominates
5. `COORDINATES_UNKNOWN` - Critical, glitches and distortion
6. `UNRECOVERABLE` - Lost, full corruption effects

### Secret Themes

Hidden states triggered by specific conditions:
- `MAVEN_ECHO` - Triggered by visiting Maven Cheung's log multiple times
- `SARR_CLEARANCE` - Triggered by visiting Dr. Sarr's documents
- `WHISTLEBLOWER` - Triggered by visiting the leak document

### Horror Effects

Effects activate at different exposure thresholds:
- **Whispers** - Faint text appears in page margins
- **Ghost Table Entries** - Phantom rows in data tables
- **Link Misdirection** - Links briefly glitch to wrong destinations
- **Other Terminal Flashes** - "TERMINAL VS-XXXX: [status]" messages
- **Title Corruption** - Browser tab title gets corrupted
- **Audio Hum** - Low-frequency ambient sound (Web Audio API)

### Trulli Beacon System

The beacon provides corruption cleansing but degrades with use:
- States: STRONG → STABLE → WEAK → FAILING → LOST
- Cleanse power decreases at high corruption
- Failure chance increases with corruption level
- Visual degradation matches beacon state

### The Purge System

Located at `/purge` - a hidden page that allows full reset:
- Maximum 5 resets allowed (tracked in localStorage)
- Resets all exposure and corruption
- Cannot be undone once limit reached

## Color Palette

CSS custom properties defined in `custom.scss`:
```scss
--vs-primary: #4a9eff;    // Cyan blue
--vs-secondary: #44ff88;  // Green (safe/beacon)
--vs-accent: #ff6644;     // Orange (warnings)
--vs-danger: #ff6644;     // Red/orange (danger)
--vs-muted: #6688aa;      // Muted text
--vs-bg: #0a0e14;         // Deep background
--vs-surface: #1a1f2e;    // Surface/card background
```

Corruption introduces purple tones:
```scss
--vs-corruption: #9966ff;  // Purple (corruption indicator)
```

## Typography

- Primary font: JetBrains Mono (monospace, terminal aesthetic)
- Headers use letter-spacing for terminal feel
- `//` prefix on h2 elements for code-comment aesthetic

## SVG Assets

Located in `/quartz/static/`:
- `void-sector-logo.svg` - Full logo with animation
- `void-sector-logo-compact.svg` - Header logo (40px height)
- `void-icon.svg` - Void symbol icon
- `divider-circuit.svg` - Circuit-style section divider
- `divider-substrate.svg` - Substrate-themed divider
- `badge-classified.svg` - Classification badges
- `badge-leaked.svg` - Leaked document badge
- `badge-recovered.svg` - Recovered data badge

## Building & Deployment

```bash
# Local development with hot reload
npx quartz build --serve

# Production build
npx quartz build

# Sync and push (auto-deploys via GitHub Actions)
npx quartz sync
```

## Component Registration

New components must be:
1. Created in `/quartz/components/`
2. Exported from `/quartz/components/index.ts`
3. Added to layout in `/quartz.layout.ts`

For components with client-side behavior:
- Create `.inline.ts` file in `/quartz/components/scripts/`
- Reference script in component's `afterDOMLoaded` property

## Lore Writing

Use the `/void-sector-lore-writer` skill for creating new lore content. This skill understands the narrative voice and can generate:
- Characters
- Locations
- Incidents
- Concepts
- Documents

## Important Notes

- The horror effects are designed to be subtle and build gradually
- The 03:47 timestamp is significant in the lore - it's when things go wrong
- The Trulli Beacon is the reader's lifeline - it should feel like hope
- Corruption should feel inevitable but not frustrating
- Purple = corruption, Green = safety, Cyan = normal operation
