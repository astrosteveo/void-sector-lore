# Void Sector Document Types

Each type of document in the Void Sector archive has specific conventions, structures, and tones. This guide helps you create authentic documents that fit the world.

---

## 1. Character Files

**Location:** `content/characters/[name].md`

### Purpose
Character profiles document miners, Guild officials, researchers, and other key figures. They establish motivation, history, and connection to the central mystery.

### Frontmatter Template

```yaml
---
title: "[Character Name]"
aliases: ["Nickname", "Permit ID", "Other names"]
description: "[One-line summary: occupation/role and current status]"
tags: [character, role/category, location-if-relevant, status]
date: [date of document creation or incident in YYYY-MM-DD format]
---
```

### Structure

1. **Opening Quote** — If relevant, a significant line they said or wrote
2. **Information Box** — Key details (name, occupation, permit, experience, status, location, vessel)
3. **Overview** — Who they are and why they matter
4. **Body Sections** — History, key incidents, relationships, legacy
5. **Official vs. Unofficial Narrative** — What the Guild says vs. what evidence shows
6. **Related Documents** — Links to incidents they're involved in
7. **See Also** — Links to connected lore

### Character Types & Examples

#### Miners (Protagonist Type)
Focus on:
- Their experience level and why they mine
- What they left behind
- Specific incident details
- Psychological deterioration if relevant
- The mystery surrounding their disappearance

**Example:** Maven Cheung (MC-4477) — Independent miner whose logs document deterioration

#### Guild Officials (Antagonist Type)
Focus on:
- Their corporate position and authority
- Their role in cover-ups or suppression
- What they know and what they hide
- Their justification for decisions
- Their relationship to the pattern

**Example:** Marcus Veld — Board member who votes for "acceptable loss"

#### Researchers & Investigators
Focus on:
- What they discovered
- How they're blocked by the Guild
- What they suspect vs. what they can prove
- Their personal stake in the mystery

**Example:** Dr. Helena Sarr — Director of Safety fighting for investigation

#### Whistleblowers & Dissenters
Focus on:
- Why they're breaking silence
- What they've learned
- The personal cost of their leak
- Their connection to victims

---

## 2. Location Files

**Location:** `content/locations/[location-name].md`

### Purpose
Location documents describe Void Sectors, asteroids, stations, and vessels. They establish the physical world and connect incidents to places.

### Frontmatter Template

```yaml
---
title: "[Location Name]"
aliases: ["Alternative names", "Coordinates", "Sector designation"]
description: "[What this place is and why it matters]"
tags: [location, void-sector, classification-if-relevant]
date: [date of document/discovery]
---
```

### Structure

1. **Opening Description** — Sensory detail, atmosphere, danger level
2. **Specification Box** — Coordinates, designation, type (asteroid/station/sector)
3. **Overview** — What makes this location significant?
4. **Incident History** — All documented incidents here (with links)
5. **Environmental Hazards** — Why solo mining is dangerous here
6. **Structural Details** — Geology, resource deposits, anomalies
7. **Related Locations** — Nearby sectors, adjacent areas
8. **Connection to Pattern** — How does this fit the larger mystery?

### Location Types

#### Void Sectors
Large deep-space regions where substrate is found.

Key elements:
- Sector designation (19-Kappa, 33-Mu)
- Number of documented incidents
- Risk classification
- Unique hazards or anomalies
- Distance from help/rescue

**Example:** Sector 19-Kappa — 6 incidents, highest risk zone

#### Asteroids & Mining Sites
Specific extraction locations within sectors.

Key elements:
- Asteroid designation and coordinates
- Substrate seam specifications
- Incident documentation
- Environmental readings
- Recovery difficulty

**Example:** Asteroid 47B in Sector 19-Kappa

#### Vessels & Ships
Mining vessels where incidents occur.

Key elements:
- Ship designation and registry number
- Operator/owner
- Operational specifications
- Recovery history
- Anomalies found upon recovery

**Example:** *Claim Jumper* (CJ-7749) — Maven Cheung's vessel

#### Corporate Facilities
Guild stations, research centers, command posts.

Key elements:
- Location and access level
- Personnel and leadership
- Incident response capability
- What data is stored here
- Evidence of cover-up

---

## 3. Concept Files

**Location:** `content/concepts/[concept-name].md`

### Purpose
Concept documents explore ideas, phenomena, entities, and systems that drive the narrative: substrate, the syndrome, the Guild, anomalies.

### Frontmatter Template

```yaml
---
title: "[Concept Name]"
aliases: ["Alternative terminology", "Abbreviations"]
description: "[What this concept is and its significance to the mystery]"
tags: [concept, category, related-themes]
date: [date of document/discovery]
---
```

### Structure

1. **Definition** — What is this?
2. **Evidence** — Documents, incidents, scientific observations
3. **Unknowns** — What remains mysterious?
4. **Guild Position** — Official explanation vs. likely truth
5. **Theories** — What miners, researchers, whistleblowers suspect
6. **Related Concepts** — How does this connect to other phenomena?
7. **Incidents Involving This** — Links to specific cases

### Key Concepts for Void Sector

#### The Substrate
The material being extracted. Core unknowns:
- What it actually is
- Why it's valuable
- Why it causes phenomena
- Whether it has agency
- Its connection to disappearances

**Don't explain.** Let evidence accumulate. Let readers theorize.

#### Deep Space Isolation Syndrome (DSIS)
The Guild's official explanation for psychological deterioration. In reality:
- An umbrella diagnosis covering too many cases
- Suspiciously consistent across 19 incidents
- Has specific markers (03:47 timestamp, perceptual anomalies, time distortion)
- May not be psychological at all

#### The United Mining Guild
A corporate entity that:
- Operates substrate extraction
- Controls incident reporting
- Suppresses investigation
- Has structural incentives to hide the pattern

#### Anomalies
Recurring phenomena in incident documentation:
- **The 03:47 timestamp** — Appears frozen in multiple ship logs
- **Impossible extraction yields** — Seams contain more than physics allows
- **Perceptual glitches** — Movement in empty space, reflections moving independently
- **Time distortion** — Days pass differently for different observers
- **Missing cargo** — Extracted material vanishes

---

## 4. Incident Report Files

**Location:** `content/` (root level, or in a subdirectory if expanded)

### Purpose
Incident reports are formal Guild documentation of disappearances, accidents, and anomalies. They're written in corporate language that obscures truth.

### Frontmatter Template

```yaml
---
title: "Incident Report [Number]"
aliases: ["Report #XXXX", "Classification level"]
description: "[One-line summary of what happened, Guild version]"
tags: [incident, report, character-involved, location-involved, classified]
date: [date incident occurred]
---
```

### Structure

1. **Classification Header** — Restricted/Classified/Confidential
2. **Report Metadata** — Report number, date, investigating officer, approval
3. **Summary** — Official Guild version (euphemistic language)
4. **Timeline** — Documented events (with gaps)
5. **Findings** — Official conclusions
6. **Recommendations** — What the Guild suggests (usually nothing)
7. **Appendix** — Ship logs, sensor data, contradictions

### Tone & Voice

- Formal, bureaucratic language
- Use of classification and permit numbers
- Euphemism instead of direct language
- Missing information is suspicious (redactions, absent data)
- Conclusions don't match evidence

### Example Structure

```
INCIDENT REPORT #7743
Classification: RESTRICTED
[...]
SUBJECT: Loss of personnel during routine extraction operation, Sector 19-Kappa

FINDINGS: Based on available evidence and vessel recovery, incident is classified as
Class-C Occupational Loss. Primary cause attributed to Deep Space Isolation Syndrome
(DSIS) triggered by extended solo operation beyond recommended duration guidelines.

Personnel psychological deterioration resulted in loss of operational capability
and consequent disappearance. Vessel integrity confirmed upon recovery. Cargo
discrepancy attributed to incomplete extraction logs.
```

---

## 5. Personal Log Files

**Location:** `content/` (root, often named with character initials or title)

### Purpose
Personal logs are first-person accounts—often recovered from ship computers. They're raw, intimate, and show psychological deterioration in real-time.

### Frontmatter Template

```yaml
---
title: "Personal Log: [Character Name]"
aliases: ["Log entries", "Ship record"]
description: "[Summary of what this log documents]"
tags: [personal-log, character-name, location, mining]
date: [date log begins or date recovered]
---
```

### Structure

1. **Opening Context** — Who is writing? When? Why?
2. **Log Entries** — Timestamped entries showing progression
3. **Deterioration Arc** — From normal operations to psychological crisis
4. **Terminal Entries** — Final communications
5. **Editor's Note** — When/how this was recovered, gaps, redactions

### Formatting Convention

Log entries are typically formatted with timestamps and environment info:

```
**Day 1, 14:22**
Initial approach to asteroid 47B confirmed. Spectral scans show substrate deposits
concentrated in the northern face. Estimated yield: 47kg. Extraction equipment nominal...

**Day 8, 09:14**
Extraction proceeding beyond initial estimates. Current yield: 41kg. Seam continues
deeper than expected. Sensor anomaly noted at 13:33—brief duplicate icon on nav display...
```

### Deterioration Pattern

Personal logs typically follow this arc:

1. **Operational** (Days 1-7) — Standard mining procedures, normal observations
2. **Anomalies** (Days 8-14) — Glitches, unusual readings, small oddities
3. **Deterioration** (Days 15-21) — Psychological stress, contradictory observations
4. **Crisis** (Days 22+) — Logic breaking down, impossible observations, entity awareness
5. **Silence** — Log ends, character disappears

---

## 6. Leaked Communications

**Location:** `content/` (usually named thematically, e.g., "the-leak-encrypted-message")

### Purpose
Whistleblower documents that expose the pattern, contradict official narratives, or provide evidence of cover-up.

### Frontmatter Template

```yaml
---
title: "[Title indicating leak/disclosure]"
aliases: ["Whistleblower message", "Anonymous communication"]
description: "[What this leak reveals]"
tags: [leaked, whistleblower, classified, cover-up, confidential]
date: [date leaked or date originally written]
---
```

### Structure

1. **Source Context** — Who leaked this? How was it obtained?
2. **Primary Content** — The leaked material itself
3. **Analysis** — What the leak reveals that was hidden
4. **Evidence** — Documentation of the pattern
5. **Whistleblower Testimony** — Why this person is breaking silence
6. **Calls to Action** — What the whistleblower wants to happen
7. **Contact Protocol** — How to reach the whistleblower (if applicable)

### Tone & Voice

- Urgent, revelatory
- Personal justification for the leak
- Pattern recognition across incidents
- Coded language when discussing dangerous topics
- Mix of formal data (statistics) and personal emotion

### Example Elements

```
From: [REDACTED]
Subject: PATTERN RECOGNITION - 19 INCIDENTS, 0 INVESTIGATIONS

[Opening justification for leak]

DOCUMENTED INCIDENTS:
- 19 miners in 18 months
- 100% during substrate extraction
- 100% in Void Sectors
- 100% solo operations
- 100% psychological deterioration precedes disappearance
- 100% cargo missing despite extraction logs
- 73% timestamp anomalies (03:47)
- 0% investigations authorized

[Evidence and analysis]

[Personal testimony]

[Contact protocol]
```

---

## 7. Board Meeting Minutes / Corporate Documents

**Location:** `content/` (usually marked as leaked/confidential)

### Purpose
Corporate records revealing the Guild's priorities, suppressions, and decisions.

### Frontmatter Template

```yaml
---
title: "Board Meeting Minutes [Date]"
aliases: ["Corporate minutes", "Executive decision log"]
description: "[What decision was made that hid the pattern]"
tags: [corporate, umg, leaked, decision, cover-up]
date: [meeting date]
---
```

### Structure

1. **Meeting Header** — Date, attendees, called to order time
2. **Agenda Items** — Formal topics (most real information is hidden)
3. **Discussion** — Euphemistic language disguising callousness
4. **Decisions & Votes** — What the Guild chose to do (or not do)
5. **Action Items** — Follow-ups and implementation
6. **Minutes End** — Sign-off

### Tone & Voice

- Corporate formality
- Careful language that hides intent
- Hidden meaning in innocuous phrasing
- What's *not* discussed is more revealing than what is

### Example Structure

```
UNITED MINING GUILD - EXECUTIVE BOARD MEETING
[Restricted]

DATE: 2407-01-15
CALLED TO ORDER: 09:00
ATTENDEES: [Names/positions]

AGENDA ITEM 3: INCIDENT PATTERN REVIEW

DISCUSSION:
Mr. Veld raised the matter of recent operational losses in Void Sectors.
Statistical analysis indicates recent incidents within acceptable loss ratios
for deep-space operations. No extraordinary circumstances noted that would
warrant deviation from standard investigation protocols.

VOTE: Proposal for enhanced incident investigation protocols — DENIED (5-0)

DECISION: Operations will continue under current safety guidelines.
No additional investigations authorized.
```

---

## File Naming Conventions

- **Characters:** `content/characters/first-last-or-nickname.md`
- **Locations:** `content/locations/location-name.md`
- **Concepts:** `content/concepts/concept-name.md`
- **Documents:** `content/document-title-kebab-case.md`

Use kebab-case (lowercase, hyphens) for all file names.

---

## Cross-Linking Best Practices

Every document should reference existing lore:

- First mention of a character: `[[characters/maven-cheung|Maven Cheung]]`
- First mention of a location: `[[locations/sector-19-kappa|Sector 19-Kappa]]`
- First mention of a concept: `[[concepts/substrate|substrate]]`
- First mention of another document: `[[document-title|Display Name]]`

This creates the web of interconnected lore that makes the archive coherent and explorable.

---

## Validation Checklist

Before finalizing any document:

- [ ] **Frontmatter complete** — All required fields filled
- [ ] **Tags accurate** — Help readers discover related content
- [ ] **Tone consistent** — Matches document type and Void Sector voice
- [ ] **Internal links built** — References use [[WikiLink]] syntax
- [ ] **Narrative consistent** — No contradictions with existing lore
- [ ] **File location correct** — Proper subdirectory
- [ ] **File name kebab-case** — Lowercase, hyphens only
- [ ] **Links working** — All [[references]] point to real files
- [ ] **Deepens mystery** — Document adds to the central conflict
- [ ] **Reader questions remain** — Mystery preserved, not over-explained
