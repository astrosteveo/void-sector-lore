# Void Sector Lore Writer Skill

A comprehensive Claude Code Skill for creating and maintaining lore for **Void Sector**, an atmospheric sci-fi narrative about substrate miners disappearing in deep space.

## What This Skill Does

The Void Sector Lore Writer helps you create:

- **Characters** — Miners, Guild officials, researchers, whistleblowers
- **Locations** — Void Sectors, asteroids, mining stations, vessels
- **Incidents** — Disappearances, anomalies, pattern documentation
- **Concepts** — Substrate, syndromes, corporate entities, phenomena
- **Documents** — Personal logs, incident reports, leaked communications

The skill guides you through:
1. Understanding Void Sector's tone and atmosphere
2. Writing in character with authentic voice
3. Building internal links and cross-references
4. Maintaining narrative consistency
5. Leveraging Quartz features for connected lore

## When to Use This Skill

Ask Claude to use this skill when you want to:

- "Create a new character for Void Sector"
- "Write an incident report about a substrate miner disappearance"
- "Develop a new location in the Void Sectors"
- "Expand on the substrate concept"
- "Write a personal log documenting mining operations"
- "Create a leaked corporate memo"
- "Add a new disappeared miner to the 19-incident pattern"

## Skill Files

### Main Instruction File

- **[SKILL.md](SKILL.md)** — Core skill instructions, quick start, core narrative elements, writing guidelines, workflow

### Supporting Documentation

1. **[STYLE_GUIDE.md](STYLE_GUIDE.md)**
   - Documentary immersion voice
   - Tone by document type
   - Atmospheric writing techniques
   - Sensory specificity
   - Language choices and examples

2. **[DOCUMENT_TYPES.md](DOCUMENT_TYPES.md)**
   - Templates for each document type
   - Character files, location files, concepts
   - Incident reports, personal logs
   - Leaked communications, corporate documents
   - File naming conventions
   - Cross-linking best practices

3. **[FRONTMATTER_REFERENCE.md](FRONTMATTER_REFERENCE.md)**
   - YAML metadata requirements
   - Required fields (title, description, tags)
   - Optional fields (aliases, date, modified)
   - Examples by document type
   - Tag strategy and standard tags
   - Validation checklist

4. **[QUARTZ_GUIDE.md](QUARTZ_GUIDE.md)**
   - Internal linking (Wikilinks) syntax
   - Folder-based organization
   - Markdown features and extensions
   - Callout blocks and special syntax
   - Automatic features (backlinks, TOC, graph)
   - Search and discoverability

## Quick Start

When you use this skill, Claude will:

1. **Understand the context** — What type of document you're creating
2. **Match the tone** — Professional, documentary, increasingly unsettling
3. **Structure properly** — Correct folders, YAML frontmatter, frontmatter validation
4. **Build connections** — Internal links to existing lore
5. **Maintain consistency** — No contradictions with established documents

### Example Workflow

```
You: "Create a new character—a Guild supervisor who suspects the pattern but is pressured to stay silent"

Claude:
1. Reads this skill and supporting documentation
2. Examines existing character files (Maven Cheung, Dr. Helena Sarr)
3. Asks clarifying questions about this character's:
   - Position and authority level
   - What they've discovered
   - What pressures they face
   - Their internal conflict
4. Creates a character file with:
   - Proper YAML frontmatter
   - Personal details that make them human
   - Links to existing incidents they know about
   - Their unique perspective on the cover-up
```

## Void Sector Lore Overview

### The Core Conflict

- **19 miners** have vanished in 18 months
- **All disappeared during substrate extraction** in isolated Void Sectors
- **The United Mining Guild votes not to investigate**, deeming it "acceptable loss"
- **The substrate itself may be the threat**—but remains unconfirmed

### Key Elements

**The Substrate**
- Unknown material extracted from asteroids
- Defies physical limits (seams contain more than estimated)
- Induces sensory anomalies in miners
- Leaves cargo missing despite extraction logs
- Connection to disappearances is suggested but unproven

**The Void Sectors**
- Deep space regions where substrate is found
- Extreme isolation, no rescue possible
- Equipment anomalies and sensor glitches
- Multiple confirmed incidents (Sector 19-Kappa: 6 incidents, highest risk)

**The Pattern**
- All incidents occur during solo extraction operations
- All feature psychological deterioration before disappearance
- All involve the mysterious timestamp **03:47** in ship logs
- All result in missing cargo despite extraction records
- Guild suppresses all investigation

**The Guild**
- United Mining Guild operates substrate mining
- Controls incident reporting and classification
- Votes against investigating patterns
- Uses euphemism to disguise horror (Class-C Occupational Loss, DSIS)

## Writing in Void Sector

### Core Principles

1. **Documentary Immersion** — Write as recovered records, not invented fiction
2. **Preserve Mystery** — Ambiguity is power; don't over-explain
3. **Make Human Cost Visible** — Behind statistics are real deaths and grief
4. **Build the Web** — Every document links to others, creating a navigable archive
5. **Trust the Details** — Specific numbers, timestamps, and permit IDs create authenticity

### Tone Characteristics

- Professional but haunted
- Fragmented and precise simultaneously
- Unreliable narrators (characters may be experiencing phenomena, not sanity)
- Gaps in information are meaningful (redactions, missing data, silence)

### Anti-Patterns (What NOT to Do)

- Don't explain the mystery too much
- Don't make characters purely victims
- Don't ignore the 03:47 timestamp
- Don't treat the Guild as simple villains
- Don't write outside the established narrative
- Don't break tone mid-document

## Using the Skill in Practice

### Create a New Character

This skill guides you through:
1. Defining the character's relationship to the pattern
2. Writing specific details that make them human
3. Proper frontmatter with permit numbers and designations
4. Building their entry in the archive
5. Linking to incidents and concepts they're involved with

### Develop a New Location

The skill helps with:
1. Establishing physical specifications (sector, coordinates, asteroid)
2. Documenting incident history at that location
3. Describing environmental hazards and sensory experience
4. Connecting to the larger pattern
5. Proper folder organization and cross-references

### Write an Incident

The skill guides:
1. Official report format with classification levels
2. Documenting contradictions between logs and official narrative
3. Showing how the Guild frames and suppresses this
4. Connecting to the 19-incident pattern
5. Preserving mystery while providing evidence

## File Organization

The skill expects documents organized as:

```
content/
├── characters/          # Character profiles
│   ├── maven-cheung.md
│   └── dr-helena-sarr.md
├── locations/           # Locations and sectors
│   ├── void-sectors.md
│   ├── sector-19-kappa.md
│   └── sector-33-mu.md
├── concepts/            # Ideas and phenomena
│   ├── substrate.md
│   ├── united-mining-guild.md
│   └── deep-space-isolation-syndrome.md
└── [root-level]         # Incidents, logs, leaks
    ├── incident-report-7743.md
    ├── personal-log-maven-cheung.md
    └── the-leak-encrypted-message.md
```

## Tags Strategy

Standard tags help readers discover content:

- **Type tags**: character, location, concept, incident, personal-log, corporate, leaked
- **Status tags**: missing, deceased, active
- **Category tags**: miner, official, researcher, whistleblower
- **Theme tags**: substrate, umg, cover-up, anomaly, pattern
- **Location tags**: sector-19-kappa, void-sector, asteroid
- **Character/Location tags**: maven-cheung, dr-helena-sarr (for cross-referencing)

## Quartz Features Used

This skill leverages Quartz's capabilities:

- **Wikilinks** — Internal cross-references using [[syntax]]
- **Folder organization** — Automatic navigation and grouping
- **Tags** — Full-text search and discovery
- **Backlinks** — Automatic "See Also" sections
- **Table of Contents** — From heading hierarchy
- **Graph visualization** — Document connection network
- **Dark theme** — Already styled for Void Sector's aesthetic

## Testing the Skill

To verify the skill works:

1. Save a new document in `content/` following the skill's guidance
2. Build the Quartz site: `npm run docs`
3. Check that:
   - Internal links resolve correctly
   - Frontmatter is valid (no YAML errors)
   - Tags display properly
   - Document appears in search
   - Graph shows connections to other documents

## Next Steps

Once you understand this skill:

1. **Create a character** — Use the skill to write a new miner or Guild official
2. **Write an incident** — Document a disappearance in Void Sector
3. **Expand a location** — Detail a new Void Sector with unique hazards
4. **Develop a concept** — Explore the substrate, the syndrome, or corporate structure
5. **Build the pattern** — Add evidence that connects the 19 incidents

---

> *"In every Void Sector, you find something else. In the dark, something finds you."*

This skill transforms you into a lore keeper for Void Sector. Use it to deepen the mystery, build the archive, and create a world that readers will want to explore.
