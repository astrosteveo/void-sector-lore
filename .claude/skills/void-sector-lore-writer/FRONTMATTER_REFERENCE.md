# Frontmatter Reference

Every document in the Void Sector archive uses YAML frontmatter to provide metadata. This guide explains each field and how to use it correctly.

---

## Frontmatter Structure

All documents begin with YAML enclosed in `---` markers:

```yaml
---
title: "Document Title"
description: "One-line description"
tags: [tag1, tag2, tag3]
---

# Document content starts here
```

**Important:** The frontmatter must be at the very beginning of the file, before any markdown content. There are no blank lines before the opening `---`.

---

## Required Fields

### `title`

**What it is:** The official name of the document, character, location, or concept.

**Required:** Yes

**Format:** String in quotes

**Examples:**
```yaml
title: "Maven Cheung"
title: "Incident Report #7743"
title: "Substrate"
title: "Personal Log: Maven Cheung"
```

**Guidelines:**
- Should be descriptive and complete
- For people, use full name or official designation
- For reports, include the number
- For logs, include subject name

### `description`

**What it is:** A one-line summary. This appears in search results and archive listings.

**Required:** Yes

**Format:** String in quotes (max ~160 characters for readability)

**Examples:**
```yaml
description: "Independent substrate miner who vanished during extraction operation in Sector 19-Kappa. Her recovered logs document psychological deterioration."

description: "Corporate directive detailing incident classification and suppression. Reveals Guild's priorities regarding operational losses."

description: "The material miners extract from Void Sectors—and possibly what may be extracting them."
```

**Guidelines:**
- Answer: What is this? Why does it matter?
- One sentence
- Include emotional resonance (missing, suppressed, mysterious)
- Avoid spoilers but indicate stakes

### `tags`

**What it is:** Keywords that categorize the document. Quartz uses tags to create linking and discovery paths.

**Required:** Yes

**Format:** YAML list (square brackets or bullet points)

**Examples:**
```yaml
# Inline format
tags: [character, missing, sector-19-kappa, maven-cheung]

# List format
tags:
  - character
  - miner
  - missing
  - incident
```

**Standard tag categories:**

#### Document Type Tags
- `character` — Character profile
- `location` — Location or facility
- `concept` — Idea, phenomenon, entity
- `incident` — Incident report
- `personal-log` — First-person account
- `corporate` — Official Guild document
- `leaked` — Whistleblower/unauthorized disclosure
- `classified` — Restricted/confidential material

#### Character Type Tags (for character documents)
- `miner` — Independent or employed miner
- `official` — Guild leadership or employee
- `researcher` — Scientist or investigator
- `whistleblower` — Information leaker
- `missing` — Disappeared in an incident
- `deceased` — Confirmed dead

#### Status Tags
- `missing` — Person disappeared
- `deceased` — Person confirmed dead
- `active` — Still living and involved
- `unknown` — Status unclear

#### Location Tags
- `void-sector` — Deep space regions
- `sector-[number]-[greek-letter]` — Specific sector (e.g., `sector-19-kappa`)
- `asteroid` — Asteroid or mining site
- `station` — Space station or facility
- `vessel` — Spacecraft

#### Theme Tags
- `substrate` — Involves the extracted material
- `umg` — United Mining Guild related
- `cover-up` — Evidence of suppression
- `anomaly` — Unexplained phenomena
- `pattern` — Part of the 19-incident pattern
- `deep-space-isolation-syndrome` — DSIS mentioned
- `03:47` — Involves the mysterious timestamp

#### Relationship Tags
Include the character name or location for easy cross-referencing:
- `maven-cheung` — Related to Maven Cheung
- `dr-helena-sarr` — Related to Dr. Helena Sarr
- `sector-19-kappa` — Takes place in Sector 19-Kappa

**Guidelines:**
- Use 4-8 tags per document (not too few, not overwhelming)
- Always include document type and category
- Include specific names/locations for cross-linking
- Use lowercase, hyphens for multi-word tags
- Tags should enable readers to find related content

---

## Optional Fields

### `aliases`

**What it is:** Alternative names, abbreviations, or designations for this document or entity.

**Required:** No

**Format:** YAML list or inline

**Examples:**
```yaml
aliases: ["Cheung", "MC-4477", "Operator Cheung"]

aliases:
  - Avatar
  - The Thing in the Asteroid
  - Entity-Unknown
```

**Use for:**
- Character nicknames
- Permit/identification numbers
- Alternative names or designations
- Common abbreviations

**Guidelines:**
- Include official designations (permit numbers, call signs)
- Include informal nicknames
- Quartz uses these for link resolution—helps when someone links to a variant name

### `date`

**What it is:** The date this document was created, published, or when the incident occurred. Helps with timeline organization.

**Required:** No (but recommended for incidents and logs)

**Format:** `YYYY-MM-DD` (ISO format)

**Examples:**
```yaml
date: 2406-08-14  # Maven's disappearance date

date: 2407-01-15  # Board meeting date

date: 2406-06-01  # Dr. Sarr's appointment date
```

**Guidelines:**
- Use the Void Sector universe's date system (24XX format)
- For incidents, use the date the incident occurred
- For logs, use the start date
- For corporate documents, use the meeting/publication date
- For undated recovered documents, use the recovery date

### `modified`

**What it is:** Last modification date. Quartz automatically tracks this, but you can override it.

**Required:** No (Quartz handles automatically)

**Format:** `YYYY-MM-DD`

**Use when:**
- You want to force a specific modification date
- You're documenting when a document was recovered

### `created`

**What it is:** Original creation date. Quartz tracks this automatically.

**Required:** No (Quartz handles automatically)

**Format:** `YYYY-MM-DD`

---

## Example Frontmatter by Document Type

### Character File

```yaml
---
title: "Maven Cheung"
aliases: ["Cheung", "MC-4477", "Operator Cheung"]
description: "Independent substrate miner who vanished during extraction operation in Sector 19-Kappa. Her recovered logs document psychological deterioration."
tags: [character, miner, missing, sector-19-kappa, maven-cheung, incident, substrate]
date: 2406-08-14
---
```

### Location File

```yaml
---
title: "Sector 19-Kappa"
aliases: ["19-Kappa", "Kappa Sector"]
description: "Void Sector with highest incident rate (6 documented disappearances). Characterized by extreme isolation and substrate seams that defy physical limits."
tags: [location, void-sector, sector-19-kappa, high-risk, anomaly, pattern]
date: 2406-01-01
---
```

### Concept File

```yaml
---
title: "Substrate"
aliases: ["The Material", "Deep-Space Substrate", "Unknown Matter"]
description: "Unknown material extracted from asteroids in Void Sectors. Appears to induce psychological phenomena in proximity. Connection to disappearances remains unconfirmed."
tags: [concept, substrate, anomaly, mystery, unknown]
date: 2405-01-01
---
```

### Incident Report

```yaml
---
title: "Incident Report #7743"
aliases: ["Report #7743", "Cheung Incident"]
description: "Official Guild report classifying Maven Cheung's disappearance as Class-C Occupational Loss attributed to Deep Space Isolation Syndrome. Redactions obscure relevant data."
tags: [incident, report, classified, maven-cheung, sector-19-kappa, cover-up, umg]
date: 2406-09-15
---
```

### Personal Log

```yaml
---
title: "Personal Log: Maven Cheung"
aliases: ["Maven's Logs", "Recovered Ship Record"]
description: "First-person account of Maven Cheung's final 31 days in Sector 19-Kappa. Documents progression from routine operations to psychological crisis to disappearance."
tags: [personal-log, maven-cheung, sector-19-kappa, psychological-deterioration, substrate, deep-space-isolation-syndrome]
date: 2406-08-14
---
```

### Leaked Communication

```yaml
---
title: "The Leak: Encrypted Message"
aliases: ["Whistleblower Message", "Anonymous Communication"]
description: "Leaked whistleblower communication exposing pattern of 19 disappearances and the Guild's deliberate suppression of investigation."
tags: [leaked, whistleblower, classified, cover-up, pattern, umg, confidential]
date: 2407-02-01
---
```

---

## Tag Strategy

### For Discoverability

Think about how readers will find your document:

- Someone searching "Maven Cheung" → Include `maven-cheung` tag
- Someone browsing "missing miners" → Include `missing` and `miner` tags
- Someone looking for "Sector 19-Kappa incidents" → Include `sector-19-kappa` tag
- Someone interested in "the pattern" → Include `pattern` tag

### Tag Hierarchy

Use specific tags for fine-grained discovery:

❌ Too general: `tags: [incident, mystery]`
✓ Better: `tags: [incident, report, maven-cheung, sector-19-kappa, missing, pattern]`

The second version helps readers discover exactly which incident you're describing.

### Consistency

Use consistent tag names across documents:

- If one character file uses `sector-19-kappa`, all should use `sector-19-kappa`
- If one uses `miner`, all should use `miner` (not `mining-worker`)
- If one uses `missing`, all should use `missing` (not `disappeared`)

---

## Quartz-Specific Metadata

### frontMatter (Reserved)

Quartz uses the `frontmatter` field internally to store parsed metadata. Don't edit this manually.

### Hidden Field (Not Recommended)

Quartz recognizes a `draft` field that you can use to mark documents as draft:

```yaml
draft: true  # Won't appear in published site
```

Don't use this for Void Sector—we want all documents published and visible.

---

## Validation

When creating a document, verify:

- [ ] `title` — Clear, descriptive
- [ ] `description` — One sentence, ~160 characters
- [ ] `tags` — 4-8 tags, includes type + category
- [ ] `date` — Correct format YYYY-MM-DD
- [ ] No typos in YAML syntax
- [ ] All `---` markers present (opening and closing)
- [ ] No blank lines before opening `---`
- [ ] Proper indentation (2 spaces in YAML lists)

---

## Common Mistakes

### ❌ Blank line before frontmatter
```yaml
# WRONG - blank line breaks frontmatter
---
title: "Character"
---
```

### ✓ No blank lines before opening
```yaml
---
title: "Character"
---
```

### ❌ Inconsistent tag formatting
```yaml
# WRONG - mixed formats
tags: [character, location, missing, "concept", sector-19-kappa]
```

### ✓ Consistent format
```yaml
# GOOD - all inline
tags: [character, location, missing, sector-19-kappa]

# OR all list format
tags:
  - character
  - location
  - missing
  - sector-19-kappa
```

### ❌ Title without quotes
```yaml
# RISKY - may break YAML parsing
title: The Leak: Encrypted Message
```

### ✓ Title with quotes
```yaml
# SAFE
title: "The Leak: Encrypted Message"
```

---

## SEO & Display

These metadata fields affect how documents appear in:
- Search results
- Archive listings
- Social previews (if site is shared)
- Related content suggestions

Write them with readers in mind. Your description might be the only thing they see before deciding to read the full document.
