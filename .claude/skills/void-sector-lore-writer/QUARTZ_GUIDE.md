# Quartz Integration Guide

Void Sector is built with **Quartz**, a digital garden framework. This guide explains how to use Quartz features to enhance your lore documents.

---

## What is Quartz?

Quartz is a static site generator that transforms markdown files into a connected, explorable web. Key features for Void Sector:

- **Markdown-based** — Write in markdown, Quartz handles the rest
- **Automatic linking** — Links between documents are discovered automatically
- **Graph visualization** — See connections between documents
- **Full-text search** — Readers can search the archive
- **Obsidian compatibility** — Use Obsidian syntax for links and embeds
- **Dark theme** — Already styled for Void Sector's aesthetic

---

## Internal Links (Wikilinks)

The most important Quartz feature for coherent lore: **Wikilinks** create connections between documents.

### Basic Syntax

Use double square brackets to link:

```markdown
[[document-name]]                    # Link to a document
[[document-name|Display Text]]       # Link with custom text
[[folder/document-name]]             # Link with folder path
[[folder/document-name#section]]     # Link to a section
```

### Examples

```markdown
# Link to character
[[characters/maven-cheung|Maven Cheung]] vanished during substrate extraction.

# Link to concept
[[concepts/substrate|Substrate]] seams defy physical limits.

# Link to location
Sector 19-Kappa shows characteristics similar to [[locations/sector-33-mu|Sector 33-Mu]].

# Link to document
As recorded in [[the-leak-encrypted-message|the whistleblower's message]].

# Link to section
For timeline context, see [[timeline#2406|2406 events]].
```

### Quartz Link Resolution

Quartz is forgiving with link syntax. These all work:

```markdown
[[maven-cheung]]
[[characters/maven-cheung]]
[[Maven Cheung]]  # If aliased
[[MC-4477]]       # If permit is aliased
```

The `aliases` field in frontmatter helps Quartz resolve these variants to the correct document.

### Best Practices

**Always link first mention:**
```markdown
❌ Maven Cheung was a miner. She worked with substrate.

✓ [[characters/maven-cheung|Maven Cheung]] was a miner. She worked with [[concepts/substrate|substrate]].
```

**Vary link text for readability:**
```markdown
❌ [[concepts/deep-space-isolation-syndrome|Deep Space Isolation Syndrome]] was diagnosed
   with [[concepts/deep-space-isolation-syndrome|Deep Space Isolation Syndrome]].

✓ [[concepts/deep-space-isolation-syndrome|Deep Space Isolation Syndrome]] (DSIS) was diagnosed
   as part of the broader [[concepts/deep-space-isolation-syndrome|syndrome pattern]].
```

**Create bidirectional connections:**
- Character file links to incidents they're involved in
- Incident file links back to the character
- Concept file links to all incidents involving that concept
- Incident files link back to the concept

This creates a web where readers can explore in multiple directions.

---

## Folder-Based Organization

Quartz respects your folder structure. Void Sector uses this organization:

```
content/
├── index.md                 # Main archive page
├── timeline.md              # Chronological events
├── characters/              # Character profiles
│   ├── maven-cheung.md
│   └── dr-helena-sarr.md
├── locations/               # Places and sectors
│   ├── void-sectors.md
│   ├── sector-19-kappa.md
│   └── sector-33-mu.md
├── concepts/                # Ideas, entities, phenomena
│   ├── substrate.md
│   ├── united-mining-guild.md
│   └── deep-space-isolation-syndrome.md
├── [root-level documents]   # Incidents, logs, leaks
│   ├── incident-report-7743.md
│   ├── personal-log-maven-cheung.md
│   ├── board-meeting-minutes-2407-01-15.md
│   └── the-leak-encrypted-message.md
```

### How Quartz Uses Folders

- **Navigation** — Readers can browse by folder
- **Link organization** — Links to `characters/maven-cheung` vs. root-level documents work correctly
- **Graph visualization** — Quartz shows connection patterns across folders
- **Backlinks** — Automatically shows "See Also" sections with related documents

### Folder Conventions

When adding new documents, follow existing folder organization:

| Document Type | Folder | Example |
|---|---|---|
| Character | `characters/` | `characters/new-miner.md` |
| Location | `locations/` | `locations/sector-XX-YY.md` |
| Concept | `concepts/` | `concepts/new-phenomenon.md` |
| Incident/Report/Log | Root `content/` | `incident-report-8844.md` |

---

## Markdown Features

Quartz supports standard markdown plus extensions. Key features for Void Sector:

### Headings & Structure

Use heading hierarchy to organize within documents:

```markdown
# Main Title (H1)
Used once per document (in the frontmatter title)

## Major Sections (H2)
Overview, character details, incident analysis

### Subsections (H3)
Fine-grained organization within sections

#### Deep Subsections (H4)
Use sparingly; keep structure clear
```

### Lists & Tables

**Bullet lists** for unordered information:
```markdown
- First item
- Second item
  - Nested item
  - Another nested
- Back to top level
```

**Numbered lists** for sequences or timelines:
```markdown
1. First event
2. Second event
3. Third event
```

**Tables** for structured data (characters, incidents, locations):
```markdown
| Field | Value |
|-------|-------|
| **Name** | Maven Cheung |
| **Permit** | MC-4477 |
| **Status** | Missing |
```

Quartz renders tables beautifully. Use them for:
- Character information boxes
- Incident comparison tables
- Timeline overviews
- Data summaries

### Code Blocks

For logs and technical data:

````markdown
```
Ship's log entry:
Day 1, 14:22 - Extraction begins
Day 8, 09:14 - Anomaly detected
```

```yaml
# Configuration or data
timestamp: 03:47
sensor_reading: 147.32
cargo_mass: 74kg
```
````

Quartz supports syntax highlighting for many languages.

### Blockquotes

For significant statements, recovered dialogue, or quoted documents:

```markdown
> *"I'm going home. I've always been going home. I just didn't remember where home was."*
> — Maven Cheung, final log entry

> [!warning] Classification Notice
> Some documents in this archive were obtained through unauthorized disclosure.
```

Callout syntax (`[!warning]`, `[!danger]`, `[!info]`) creates highlighted blocks.

### Emphasis

```markdown
*italic* for subtle emphasis
**bold** for strong emphasis
~~strikethrough~~ for removed/incorrect content
```

Void Sector uses these carefully:
- **Bold** for key terms and permit numbers
- *Italic* for quoted thoughts or recovered dialogue
- Strikethrough sparingly (maybe for redacted/censored text)

---

## Special Syntax & Extensions

### Callout Blocks

Quartz supports callout blocks (borrowed from Obsidian):

```markdown
> [!warning] Classification Notice
> This is a warning-level callout

> [!danger] Critical Information
> Dangerous or high-stakes content

> [!info] Background
> Informational callout

> [!success] Confirmed
> Positive or resolved information

> [!failure] Failed
> Failure or contradiction
```

Use for:
- Guild classification warnings
- Contradictions between official narratives
- Critical discoveries
- Emphasized patterns

### Embeds & Transclusion

Quartz can embed content from other files:

```markdown
![[document-name]]              # Embed full document
![[document-name#section]]      # Embed a specific section
```

Use this sparingly in Void Sector (most documents should stand alone), but it's useful for:
- Including timeline events in summary pages
- Showing incident statistics in overview files
- Referencing shared patterns

---

## Automatic Features (Don't Edit Manually)

### Backlinks

Quartz automatically generates "backlinks" — a list of documents that link to the current document. This appears in the site as "See Also" or similar.

**You don't create these manually.** Just link to other documents, and Quartz builds the network.

### Table of Contents

Quartz automatically generates a table of contents from your heading structure.

**Keep heading hierarchy clear:**
- One H1 per document (usually just the title)
- Use H2 for major sections
- Use H3 for subsections
- Avoid deep nesting

### Graph Visualization

The Quartz graph shows visual connections between documents. It's automatic based on your links.

**To show up in the graph effectively:**
- Link to other documents (creates connections)
- Use folder organization (visual grouping)
- Include plenty of cross-references

---

## Search & Discovery

Quartz provides full-text search. Readers can search:

- Document titles
- Content text
- Tags
- Aliases

**To improve searchability:**

1. **Use descriptive titles** — Readers search for "Maven Cheung," not vague titles
2. **Include tags** — Tags are searchable and help categorization
3. **Use aliases** — Permit numbers like "MC-4477" should be aliases for discoverability
4. **Link abundantly** — Related documents help readers find everything connected
5. **Repeat key terms naturally** — If discussing the 03:47 timestamp, mention it multiple times

---

## Dark Theme Integration

Void Sector's theme is already configured for dark mode. Configuration includes:

- **Void black background** — `#0a0a0f`
- **Cyan accents** — `#4a9eff` for links and interactive elements
- **Green highlights** — `#44ff88` for active/success states
- **Cool gray text** — `#aabbcc` for readability in darkness

When writing lore:
- Don't try to override styles
- Trust Quartz's rendering
- Focus on content structure (headings, emphasis, links)
- Use callout blocks for visual distinction

---

## Performance & Best Practices

### File Size

Quartz handles large documents well, but keep individual files focused:

- **Under 10,000 words** per document (for readability)
- **One main topic** per document
- **Break very long content** into multiple linked documents

### Link Density

Link generously but sensibly:

- **First mention of named entities** should be linked
- **Repeated mentions** can skip linking after the first time
- **Over-linking** makes text hard to read

✓ Good: "[[characters/maven-cheung|Maven Cheung]]'s [[personal-log-maven-cheung|logs]] document her experience in [[locations/sector-19-kappa|Sector 19-Kappa]]."

❌ Bad: "[[characters/maven-cheung|Maven]] [[characters/maven-cheung|Cheung]]'s [[personal-log-maven-cheung|personal]] [[personal-log-maven-cheung|logs]]..."

### Image Usage

Quartz supports images. Void Sector hasn't used visual media heavily, but you can:

```markdown
![Alt text for accessibility](path/to/image.png)
![[image-file|Alt text]]  # Obsidian syntax
```

Store images in `content/attachments/` or similar folder.

---

## Quartz Build & Deployment

When you're ready to publish changes:

```bash
npm run docs  # Build and serve locally
```

Quartz automatically:
- Processes all markdown files
- Generates the static site
- Updates the search index
- Validates links
- Applies the theme

Check locally for:
- Broken links
- Rendering issues
- Missing images
- Tag correctness

---

## Advanced: Customizing Quartz (Optional)

Void Sector's Quartz is already configured in `quartz.config.ts`. You can customize:

1. **Plugins** — Text processing, link handling, table of contents
2. **Theme colors** — Already matched to Void Sector's aesthetic
3. **Layout** — Which features to include (search, backlinks, graph)

Don't modify the config unless you understand the implications. Current setup is optimized for the lore archive.

---

## Example: Well-Integrated Document

Here's a character file using Quartz features effectively:

```yaml
---
title: "Maven Cheung"
aliases: ["Cheung", "MC-4477"]
description: "Independent substrate miner who vanished in Sector 19-Kappa."
tags: [character, miner, missing, sector-19-kappa]
date: 2406-08-14
---

# Maven Cheung

> *"I'm going home. I've always been going home."*

| | |
|---|---|
| **Status** | Missing, presumed deceased |
| **Location** | [[locations/sector-19-kappa\|Sector 19-Kappa]] |
| **Vessel** | *Claim Jumper* (CJ-7749) |

## Overview

[[characters/maven-cheung|Maven Cheung]] was an independent [[concepts/substrate|substrate]] miner...

## [[personal-log-maven-cheung|Her Logs]]

Her recovered logs document...

[More sections with internal links]

## Related

- [[incident-report-7743|Incident Report #7743]]
- [[the-leak-encrypted-message|The Leak]]
- [[concepts/deep-space-isolation-syndrome|DSIS]]
```

Key features:
- ✓ Links to related documents
- ✓ Information table for easy reference
- ✓ Clear heading structure
- ✓ Tagged for discoverability
- ✓ Uses aliases for alternate names

---

## Troubleshooting Quartz Issues

### Links don't work
- Check file path is correct
- Use folder prefix if needed: `[[characters/name]]` not just `[[name]]`
- Verify file exists and has correct name
- Check for typos in the filename

### Images not showing
- Ensure image files are in `content/attachments/` or similar folder
- Use relative paths: `![alt](./image.png)`
- Try Obsidian syntax: `![[image-file]]`

### Search not finding a document
- Verify document isn't marked as draft
- Check file is in `content/` directory
- Ensure title is in frontmatter
- Search index updates after rebuild

### Table of Contents not generating
- Check headings use proper markdown: `## Heading` not `**Heading**`
- Avoid duplicate H1 titles (should only have one per document)
- Rebuild the site: `npm run docs`

---

## Next: Test Your Setup

After creating a document:

1. Add to `.claude/skills/void-sector-lore-writer/` folder
2. Write with internal links
3. Test locally: `npm run docs`
4. Check that:
   - Links resolve
   - Formatting renders correctly
   - Tags show up
   - Document appears in search

The Quartz framework makes your lore interconnected and explorable. Use it to build a rich, navigable archive.
