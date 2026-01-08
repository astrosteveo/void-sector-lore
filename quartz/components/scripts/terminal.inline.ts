// ═══════════════════════════════════════════════════════════════════════════
// VOID SECTOR TERMINAL IMMERSION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

// Generate or retrieve terminal designation
const getTerminalId = (): string => {
  let id = localStorage.getItem("terminal-id")
  if (!id) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    id = "VS-" + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    localStorage.setItem("terminal-id", id)
  }
  return id
}

// ───────────────────────────────────────────────────────────────────────────
// EXPOSURE SYSTEM
// ───────────────────────────────────────────────────────────────────────────

interface ExposureData {
  level: number
  totalTime: number // seconds on site
  sessionStart: number
  pagesVisited: string[]
  secretsUnlocked: string[]
  resetCount: number
  triggered0347: boolean
  lastVisit: number
  terminalId: string
}

const DEFAULT_EXPOSURE: ExposureData = {
  level: 0,
  totalTime: 0,
  sessionStart: Date.now(),
  pagesVisited: [],
  secretsUnlocked: [],
  resetCount: 0,
  triggered0347: false,
  lastVisit: Date.now(),
  terminalId: getTerminalId()
}

const loadExposure = (): ExposureData => {
  try {
    const stored = localStorage.getItem("void-exposure")
    if (stored) {
      const data = JSON.parse(stored)
      return { ...DEFAULT_EXPOSURE, ...data, sessionStart: Date.now() }
    }
  } catch (e) {
    console.error("Exposure data corrupted. Reinitializing.")
  }
  return { ...DEFAULT_EXPOSURE, sessionStart: Date.now() }
}

const saveExposure = (data: ExposureData) => {
  localStorage.setItem("void-exposure", JSON.stringify(data))
}

let exposure = loadExposure()

// ───────────────────────────────────────────────────────────────────────────
// THEME STATES
// ───────────────────────────────────────────────────────────────────────────

interface ThemeState {
  name: string
  status: string
  colors: {
    primary: string
    secondary: string
    accent: string
    danger: string
    background: string
    panel: string
    text: string
    muted: string
  }
}

const THEME_STATES: Record<string, ThemeState> = {
  TRULLI_LOCKED: {
    name: "TRULLI SIGNAL",
    status: "LOCKED",
    colors: {
      primary: "#4a9eff",
      secondary: "#44ff88",
      accent: "#4a9eff",
      danger: "#ff6644",
      background: "#0a0a0f",
      panel: "#0a0f19",
      text: "#aabbcc",
      muted: "#6688aa"
    }
  },
  SIGNAL_DRIFT: {
    name: "SIGNAL DRIFT",
    status: "DETECTED",
    colors: {
      primary: "#5588ee",
      secondary: "#33ddaa",
      accent: "#6677dd",
      danger: "#ff6644",
      background: "#0a0a10",
      panel: "#0a0e1a",
      text: "#99aacc",
      muted: "#5577aa"
    }
  },
  ISOLATION: {
    name: "ISOLATION PROTOCOL",
    status: "ACTIVE",
    colors: {
      primary: "#7766cc",
      secondary: "#44ccbb",
      accent: "#8866dd",
      danger: "#ff5566",
      background: "#0a0a12",
      panel: "#0c0c1c",
      text: "#9999bb",
      muted: "#6666aa"
    }
  },
  SUBSTRATE: {
    name: "SUBSTRATE RESONANCE",
    status: "DETECTED",
    colors: {
      primary: "#9955dd",
      secondary: "#55aacc",
      accent: "#aa66ee",
      danger: "#ff4477",
      background: "#0a0812",
      panel: "#0e0a1a",
      text: "#9988bb",
      muted: "#7755aa"
    }
  },
  COORDINATES_UNKNOWN: {
    name: "COORDINATES",
    status: "UNKNOWN",
    colors: {
      primary: "#aa44cc",
      secondary: "#4488bb",
      accent: "#bb55dd",
      danger: "#ff3388",
      background: "#080810",
      panel: "#0c0818",
      text: "#8877aa",
      muted: "#665599"
    }
  },
  UNRECOVERABLE: {
    name: "[TERMINAL",
    status: "UNRECOVERABLE]",
    colors: {
      primary: "#8833aa",
      secondary: "#336699",
      accent: "#9944bb",
      danger: "#ff2299",
      background: "#050508",
      panel: "#080610",
      text: "#776699",
      muted: "#554477"
    }
  }
}

// Secret themes
const SECRET_THEMES: Record<string, ThemeState> = {
  MAVEN_ECHO: {
    name: "SIGNAL SOURCE",
    status: "MC-4477",
    colors: {
      primary: "#ffaa44",
      secondary: "#ffcc66",
      accent: "#ff9933",
      danger: "#ff6644",
      background: "#0f0a08",
      panel: "#1a0f0a",
      text: "#ccaa88",
      muted: "#aa8866"
    }
  },
  SARR_CLEARANCE: {
    name: "UMG ADMIN",
    status: "CLEARANCE",
    colors: {
      primary: "#99aabb",
      secondary: "#778899",
      accent: "#aabbcc",
      danger: "#cc6666",
      background: "#0c0c0c",
      panel: "#141414",
      text: "#cccccc",
      muted: "#888888"
    }
  },
  WHISTLEBLOWER: {
    name: "SECURE CHANNEL",
    status: "ACTIVE",
    colors: {
      primary: "#33ff66",
      secondary: "#22cc55",
      accent: "#44ff77",
      danger: "#ffaa33",
      background: "#050a05",
      panel: "#0a140a",
      text: "#88cc88",
      muted: "#55aa55"
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// THEME CALCULATION
// ───────────────────────────────────────────────────────────────────────────

const getThemeState = (): ThemeState => {
  // Check for secret themes first
  if (exposure.secretsUnlocked.includes("MAVEN_ECHO")) {
    return SECRET_THEMES.MAVEN_ECHO
  }
  if (exposure.secretsUnlocked.includes("SARR_CLEARANCE")) {
    return SECRET_THEMES.SARR_CLEARANCE
  }
  if (exposure.secretsUnlocked.includes("WHISTLEBLOWER")) {
    return SECRET_THEMES.WHISTLEBLOWER
  }

  // Progressive themes based on exposure level
  if (exposure.level >= 25) return THEME_STATES.UNRECOVERABLE
  if (exposure.level >= 20) return THEME_STATES.COORDINATES_UNKNOWN
  if (exposure.level >= 15) return THEME_STATES.SUBSTRATE
  if (exposure.level >= 10) return THEME_STATES.ISOLATION
  if (exposure.level >= 5) return THEME_STATES.SIGNAL_DRIFT
  return THEME_STATES.TRULLI_LOCKED
}

const applyTheme = (theme: ThemeState) => {
  const root = document.documentElement
  root.style.setProperty("--vs-primary", theme.colors.primary)
  root.style.setProperty("--vs-secondary", theme.colors.secondary)
  root.style.setProperty("--vs-accent", theme.colors.accent)
  root.style.setProperty("--vs-danger", theme.colors.danger)
  root.style.setProperty("--vs-background", theme.colors.background)
  root.style.setProperty("--vs-panel", theme.colors.panel)
  root.style.setProperty("--vs-text", theme.colors.text)
  root.style.setProperty("--vs-muted", theme.colors.muted)

  // Also update Quartz color variables
  root.style.setProperty("--secondary", theme.colors.primary)
  root.style.setProperty("--tertiary", theme.colors.secondary)
  root.style.setProperty("--light", theme.colors.background)
  root.style.setProperty("--lightgray", theme.colors.panel)
  root.style.setProperty("--darkgray", theme.colors.text)
  root.style.setProperty("--gray", theme.colors.muted)

  // Set exposure level data attribute for CSS effects
  root.dataset.exposureLevel = Math.min(exposure.level, 30).toString()
  root.dataset.themeState = theme.name.replace(/[\[\]\s]/g, "_")
}

// ───────────────────────────────────────────────────────────────────────────
// EXPOSURE TRACKING
// ───────────────────────────────────────────────────────────────────────────

// Page exposure values (some pages are more dangerous)
const PAGE_EXPOSURE: Record<string, number> = {
  "substrate": 3,
  "the-fracture": 2,
  "personal-log-maven-cheung": 2,
  "incident-report": 1,
  "board-meeting": 1,
  "the-leak": 2,
  "sector-19-kappa": 2,
  "void-sectors": 1,
  "deep-space-isolation": 1
}

const getPageExposure = (path: string): number => {
  for (const [key, value] of Object.entries(PAGE_EXPOSURE)) {
    if (path.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }
  return 0.5 // Base exposure for any page
}

const addExposure = (amount: number, source?: string) => {
  const oldLevel = exposure.level
  exposure.level += amount
  saveExposure(exposure)

  // Check for level threshold crossings
  const newTheme = getThemeState()
  applyTheme(newTheme)
  updateStatusDisplay()

  // Trigger effects at thresholds
  if (Math.floor(oldLevel / 5) < Math.floor(exposure.level / 5)) {
    triggerThresholdEffect(exposure.level)
  }
}

// ───────────────────────────────────────────────────────────────────────────
// STATUS DISPLAY
// ───────────────────────────────────────────────────────────────────────────

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

const updateStatusDisplay = () => {
  const theme = getThemeState()
  const terminalId = document.querySelector(".terminal-id")
  const terminalState = document.querySelector(".terminal-state")
  const terminalSession = document.querySelector(".terminal-session")
  const exposureFill = document.querySelector(".terminal-exposure-fill") as HTMLElement

  if (terminalId) {
    let idText = exposure.terminalId
    if (exposure.level >= 20) idText += " [FLAGGED]"
    if (exposure.level >= 25) idText = "[DESIGNATION LOST]"
    terminalId.textContent = idText
  }

  if (terminalState) {
    terminalState.textContent = `${theme.name}: ${theme.status}`

    // Occasional glitch at high exposure
    if (exposure.level >= 15 && Math.random() < 0.1) {
      terminalState.classList.add("glitch-text-micro")
      setTimeout(() => terminalState.classList.remove("glitch-text-micro"), 200)
    }
  }

  if (terminalSession) {
    const sessionTime = Math.floor((Date.now() - exposure.sessionStart) / 1000)
    let timeDisplay = formatTime(sessionTime + exposure.totalTime)

    // At high corruption, occasionally show 03:47:XX
    if (exposure.level >= 15 && Math.random() < 0.05) {
      timeDisplay = "03:47:" + Math.floor(Math.random() * 60).toString().padStart(2, "0")
    }

    terminalSession.textContent = timeDisplay
  }

  if (exposureFill) {
    const percentage = Math.min((exposure.level / 30) * 100, 100)
    exposureFill.style.width = `${percentage}%`

    // Color shifts with exposure
    if (exposure.level >= 20) {
      exposureFill.style.background = "linear-gradient(90deg, #aa44cc, #ff2299)"
    } else if (exposure.level >= 10) {
      exposureFill.style.background = "linear-gradient(90deg, #7766cc, #aa66ee)"
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// SPECIAL EFFECTS
// ───────────────────────────────────────────────────────────────────────────

const triggerThresholdEffect = (level: number) => {
  const root = document.documentElement

  // Screen flash
  root.classList.add("threshold-flash")
  setTimeout(() => root.classList.remove("threshold-flash"), 500)

  // Status message
  const messages: Record<number, string> = {
    5: "SIGNAL DRIFT DETECTED",
    10: "ISOLATION PROTOCOL ACTIVE",
    15: "SUBSTRATE SIGNATURE DETECTED",
    20: "BEACON CONNECTION LOST",
    25: "TERMINAL COMPROMISED"
  }

  const threshold = Math.floor(level / 5) * 5
  const message = messages[threshold]

  if (message) {
    showTerminalMessage(message)
  }
}

const showTerminalMessage = (text: string) => {
  const overlay = document.createElement("div")
  overlay.className = "terminal-message-overlay"
  overlay.innerHTML = `<span class="terminal-message">${text}</span>`
  document.body.appendChild(overlay)

  setTimeout(() => {
    overlay.classList.add("fade-out")
    setTimeout(() => overlay.remove(), 500)
  }, 2000)
}

// ───────────────────────────────────────────────────────────────────────────
// 03:47 EVENT
// ───────────────────────────────────────────────────────────────────────────

const check0347 = () => {
  if (exposure.triggered0347) return

  const now = new Date()
  if (now.getHours() === 3 && now.getMinutes() === 47) {
    exposure.triggered0347 = true
    addExposure(5, "0347_EVENT")

    // Dramatic effect
    const root = document.documentElement
    root.classList.add("event-0347")

    showTerminalMessage("YOU CHECKED AT THE WRONG TIME")

    // Glitch out for a few seconds
    setTimeout(() => {
      root.classList.remove("event-0347")
    }, 5000)

    saveExposure(exposure)
  }
}

// ───────────────────────────────────────────────────────────────────────────
// SECRET THEME DETECTION
// ───────────────────────────────────────────────────────────────────────────

const checkSecretUnlocks = () => {
  const path = window.location.pathname

  // Maven's Echo: Read her log then return to home
  if (path.includes("maven-cheung")) {
    localStorage.setItem("read-maven", "true")
  }
  if (path === "/" || path.includes("index")) {
    if (localStorage.getItem("read-maven") === "true" && !exposure.secretsUnlocked.includes("MAVEN_ECHO")) {
      // Don't auto-unlock, require dark mode click on home after reading
      localStorage.setItem("maven-primed", "true")
    }
  }

  // Sarr Clearance: Visit all incident reports and board minutes
  const sarrPages = ["incident-report-7743", "board-meeting-minutes"]
  const visitedSarr = sarrPages.filter(p => exposure.pagesVisited.some(v => v.includes(p)))
  if (visitedSarr.length >= sarrPages.length && !exposure.secretsUnlocked.includes("SARR_CLEARANCE")) {
    localStorage.setItem("sarr-primed", "true")
  }

  // Whistleblower: Special interaction with The Leak (triple-click on encrypted text)
  if (path.includes("the-leak")) {
    localStorage.setItem("leak-visited", "true")
  }
}

const unlockSecretTheme = (themeId: string) => {
  if (!exposure.secretsUnlocked.includes(themeId)) {
    exposure.secretsUnlocked.push(themeId)
    saveExposure(exposure)

    const theme = SECRET_THEMES[themeId]
    if (theme) {
      showTerminalMessage(`${theme.name}: ${theme.status}`)
      applyTheme(theme)
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// IDLE DETECTION
// ───────────────────────────────────────────────────────────────────────────

let idleTimeout: ReturnType<typeof setTimeout> | null = null
let isIdle = false

const resetIdleTimer = () => {
  if (idleTimeout) clearTimeout(idleTimeout)

  if (isIdle) {
    isIdle = false
    document.body.classList.remove("idle-state")
  }

  // Only trigger idle on high-exposure pages
  const pageExposure = getPageExposure(window.location.pathname)
  if (pageExposure >= 2) {
    idleTimeout = setTimeout(() => {
      isIdle = true
      document.body.classList.add("idle-state")

      if (exposure.level >= 10) {
        showTerminalMessage("ARE YOU STILL THERE")
        addExposure(1, "IDLE")
      }
    }, 180000) // 3 minutes
  }
}

// ───────────────────────────────────────────────────────────────────────────
// TEXT CORRUPTION (HIGH EXPOSURE)
// ───────────────────────────────────────────────────────────────────────────

const corruptionChars = "▓░▒█▄▀■□▪▫"

const applyTextCorruption = () => {
  if (exposure.level < 15) return

  const corruptionChance = (exposure.level - 15) * 0.0001 // Very rare

  const walker = document.createTreeWalker(
    document.querySelector("article") || document.body,
    NodeFilter.SHOW_TEXT,
    null
  )

  let node
  while ((node = walker.nextNode())) {
    if (Math.random() < corruptionChance && node.textContent && node.textContent.length > 10) {
      const text = node.textContent
      const pos = Math.floor(Math.random() * text.length)
      const corruptChar = corruptionChars[Math.floor(Math.random() * corruptionChars.length)]

      // Only corrupt once per page load
      if (!text.includes("▓") && !text.includes("░")) {
        node.textContent = text.slice(0, pos) + corruptChar + text.slice(pos + 1)
      }
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// HIDDEN 03:47 WATERMARKS
// ───────────────────────────────────────────────────────────────────────────

const addHiddenWatermarks = () => {
  if (exposure.level < 15) return

  const watermarkCount = Math.floor((exposure.level - 15) / 3)

  for (let i = 0; i < watermarkCount; i++) {
    if (Math.random() < 0.3) {
      const watermark = document.createElement("div")
      watermark.className = "hidden-watermark"
      watermark.textContent = "03:47"
      watermark.style.top = `${20 + Math.random() * 60}%`
      watermark.style.left = `${10 + Math.random() * 80}%`
      watermark.style.opacity = `${0.02 + (exposure.level - 15) * 0.005}`
      document.body.appendChild(watermark)
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// AMBIENT GLITCHES (HIGH EXPOSURE)
// ───────────────────────────────────────────────────────────────────────────

const scheduleAmbientGlitch = () => {
  if (exposure.level < 20) return

  const delay = 10000 + Math.random() * 30000 // 10-40 seconds

  setTimeout(() => {
    if (exposure.level >= 20) {
      // Mini glitch
      const root = document.documentElement
      root.classList.add("ambient-glitch")

      // Maybe flash 03:47
      if (Math.random() < 0.3) {
        const flash = document.createElement("div")
        flash.className = "glitch-flash-message small"
        flash.textContent = exposure.level >= 25 ? "0,0,0" : "03:47"
        document.body.appendChild(flash)
        setTimeout(() => flash.remove(), 300)
      }

      setTimeout(() => {
        root.classList.remove("ambient-glitch")
        scheduleAmbientGlitch()
      }, 150)
    }
  }, delay)
}

// ───────────────────────────────────────────────────────────────────────────
// WHISPERS IN THE MARGINS
// ───────────────────────────────────────────────────────────────────────────

const WHISPERS = [
  "maven",
  "03:47",
  "it sees you",
  "don't look",
  "substrate",
  "0,0,0",
  "they never left",
  "acceptable loss",
  "still transmitting",
  "coordinates locked",
  "signal origin",
  "trulli went dark",
  "the wound",
  "you were warned",
  "MC-4477",
  "isolation",
  "resonance",
  "extraction complete",
  "cargo missing",
  "black box corrupted"
]

const addWhispers = () => {
  if (exposure.level < 12) return

  // Remove old whispers
  document.querySelectorAll(".margin-whisper").forEach(w => w.remove())

  const whisperCount = Math.floor((exposure.level - 12) / 4) + 1
  const article = document.querySelector("article")
  if (!article) return

  for (let i = 0; i < whisperCount; i++) {
    if (Math.random() < 0.4) {
      const whisper = document.createElement("div")
      whisper.className = "margin-whisper"
      whisper.textContent = WHISPERS[Math.floor(Math.random() * WHISPERS.length)]
      whisper.style.top = `${10 + Math.random() * 80}%`
      whisper.style.animationDelay = `${Math.random() * 5}s`

      // Left or right margin
      if (Math.random() < 0.5) {
        whisper.classList.add("whisper-left")
      } else {
        whisper.classList.add("whisper-right")
      }

      article.appendChild(whisper)
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────
// GHOST TABLE ENTRIES
// ───────────────────────────────────────────────────────────────────────────

const GHOST_MINERS = [
  { name: "Yuki Tanaka", permit: "MC-2891", status: "Missing", sector: "19-Kappa" },
  { name: "Dmitri Volkov", permit: "MC-5523", status: "Missing", sector: "33-Mu" },
  { name: "Sarah Chen", permit: "MC-1147", status: "Signal Lost", sector: "19-Kappa" },
  { name: "Marcus Webb", permit: "MC-8834", status: "Unrecovered", sector: "Unknown" },
  { name: "[REDACTED]", permit: "MC-0347", status: "???", sector: "0,0,0" }
]

const addGhostEntries = () => {
  if (exposure.level < 18) return

  const tables = document.querySelectorAll("article table")
  tables.forEach(table => {
    if (Math.random() < 0.3 && !table.classList.contains("ghost-added")) {
      const tbody = table.querySelector("tbody") || table
      const ghost = GHOST_MINERS[Math.floor(Math.random() * GHOST_MINERS.length)]

      const row = document.createElement("tr")
      row.className = "ghost-row"
      row.innerHTML = `
        <td>${ghost.name}</td>
        <td>${ghost.permit}</td>
        <td><span class="badge badge--missing">${ghost.status}</span></td>
      `

      // Insert at random position
      const rows = tbody.querySelectorAll("tr")
      if (rows.length > 1) {
        const insertIndex = 1 + Math.floor(Math.random() * (rows.length - 1))
        rows[insertIndex].parentNode?.insertBefore(row, rows[insertIndex])
      }

      table.classList.add("ghost-added")

      // Ghost row disappears on scroll
      const removeGhost = () => {
        row.classList.add("ghost-fade")
        setTimeout(() => row.remove(), 500)
        window.removeEventListener("scroll", removeGhost)
      }
      setTimeout(() => {
        window.addEventListener("scroll", removeGhost, { once: true })
      }, 2000)
    }
  })
}

// ───────────────────────────────────────────────────────────────────────────
// LINK MISDIRECTION
// ───────────────────────────────────────────────────────────────────────────

const MISDIRECT_PAGES = [
  "/concepts/substrate",
  "/the-fracture",
  "/personal-log-maven-cheung",
  "/purge"
]

const setupLinkMisdirection = () => {
  if (exposure.level < 16) return

  document.querySelectorAll("a.internal").forEach(link => {
    if (link.classList.contains("misdirect-setup")) return
    link.classList.add("misdirect-setup")

    link.addEventListener("click", (e) => {
      // 1 in 30 chance of misdirection at level 16, increases with level
      const misdirectChance = (exposure.level - 16) * 0.01 + 0.03
      if (Math.random() < misdirectChance) {
        e.preventDefault()
        e.stopPropagation()

        const wrongPage = MISDIRECT_PAGES[Math.floor(Math.random() * MISDIRECT_PAGES.length)]

        // Flash wrong page briefly
        document.documentElement.classList.add("misdirect-glitch")

        // Show a flash of the wrong destination
        const flash = document.createElement("div")
        flash.className = "misdirect-flash"
        flash.textContent = wrongPage.toUpperCase()
        document.body.appendChild(flash)

        setTimeout(() => {
          document.documentElement.classList.remove("misdirect-glitch")
          flash.remove()
          // Actually navigate to correct destination
          const href = (link as HTMLAnchorElement).href
          if (href) window.location.href = href
        }, 400)
      }
    })
  })
}

// ───────────────────────────────────────────────────────────────────────────
// "YOU ARE NOT ALONE" - OTHER TERMINAL FLASHES
// ───────────────────────────────────────────────────────────────────────────

const generateOtherTerminalId = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return "VS-" + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

const showOtherTerminal = () => {
  if (exposure.level < 20) return

  const otherId = generateOtherTerminalId()
  const messages = [
    `${otherId} WAS HERE`,
    `${otherId} [SIGNAL LOST]`,
    `TERMINAL ${otherId} DETECTED`,
    `${otherId} IS WATCHING`,
    `${otherId} [STATUS: UNKNOWN]`
  ]

  const flash = document.createElement("div")
  flash.className = "other-terminal-flash"
  flash.textContent = messages[Math.floor(Math.random() * messages.length)]
  document.body.appendChild(flash)

  setTimeout(() => {
    flash.classList.add("fade-out")
    setTimeout(() => flash.remove(), 500)
  }, 1500)
}

const scheduleOtherTerminalFlash = () => {
  if (exposure.level < 20) return

  const delay = 30000 + Math.random() * 60000 // 30-90 seconds

  setTimeout(() => {
    if (exposure.level >= 20 && Math.random() < 0.4) {
      showOtherTerminal()
    }
    scheduleOtherTerminalFlash()
  }, delay)
}

// ───────────────────────────────────────────────────────────────────────────
// BROWSER TITLE CORRUPTION
// ───────────────────────────────────────────────────────────────────────────

let originalTitle = ""
let titleCorruptionInterval: ReturnType<typeof setInterval> | null = null

const startTitleCorruption = () => {
  if (exposure.level < 14) return
  if (titleCorruptionInterval) return

  originalTitle = document.title

  titleCorruptionInterval = setInterval(() => {
    if (exposure.level < 14) {
      document.title = originalTitle
      return
    }

    // Chance of corruption increases with level
    const corruptChance = (exposure.level - 14) * 0.02

    if (Math.random() < corruptChance) {
      const corruptions = [
        "03:47",
        "0,0,0",
        "SIGNAL LOST",
        "???",
        "COORDINATES UNKNOWN",
        "SUBSTRATE",
        "THEY SEE YOU",
        "[TERMINAL COMPROMISED]",
        originalTitle.replace(/[aeiou]/gi, "░"),
        "█".repeat(originalTitle.length)
      ]

      const corruptedTitle = corruptions[Math.floor(Math.random() * corruptions.length)]
      document.title = corruptedTitle

      // Restore after brief moment
      setTimeout(() => {
        document.title = originalTitle
      }, 200 + Math.random() * 800)
    }
  }, 5000)
}

// ───────────────────────────────────────────────────────────────────────────
// THE HUM - AUDIO SYSTEM (Optional, with permission)
// ───────────────────────────────────────────────────────────────────────────

let audioContext: AudioContext | null = null
let humOscillator: OscillatorNode | null = null
let humGain: GainNode | null = null
let audioEnabled = false

const initAudio = async () => {
  if (exposure.level < 18) return
  if (audioContext) return

  // Check if user has interacted (required for audio)
  const hasInteracted = localStorage.getItem("void-audio-enabled")
  if (!hasInteracted) return

  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    humGain = audioContext.createGain()
    humGain.connect(audioContext.destination)
    humGain.gain.value = 0

    humOscillator = audioContext.createOscillator()
    humOscillator.type = "sine"
    humOscillator.frequency.value = 40 + (exposure.level - 18) * 2 // Low frequency hum
    humOscillator.connect(humGain)
    humOscillator.start()

    audioEnabled = true
    updateHumVolume()
  } catch (e) {
    console.log("Audio not available")
  }
}

const updateHumVolume = () => {
  if (!humGain || !audioEnabled) return

  // Volume scales with exposure
  const baseVolume = Math.min((exposure.level - 18) * 0.01, 0.08)
  humGain.gain.setTargetAtTime(baseVolume, audioContext!.currentTime, 0.5)
}

const pulseHum = () => {
  if (!humGain || !humOscillator || !audioEnabled) return

  const currentVol = humGain.gain.value
  humGain.gain.setTargetAtTime(currentVol * 2, audioContext!.currentTime, 0.1)
  humGain.gain.setTargetAtTime(currentVol, audioContext!.currentTime + 0.2, 0.3)

  // Slight frequency shift
  const baseFreq = 40 + (exposure.level - 18) * 2
  humOscillator.frequency.setTargetAtTime(baseFreq * 1.5, audioContext!.currentTime, 0.1)
  humOscillator.frequency.setTargetAtTime(baseFreq, audioContext!.currentTime + 0.3, 0.2)
}

// Enable audio on first significant interaction
const setupAudioPermission = () => {
  if (localStorage.getItem("void-audio-enabled")) return

  const enableAudio = () => {
    if (exposure.level >= 18) {
      localStorage.setItem("void-audio-enabled", "true")
      initAudio()
    }
    document.removeEventListener("click", enableAudio)
  }

  // Only prompt after significant exposure
  if (exposure.level >= 18) {
    document.addEventListener("click", enableAudio)
  }
}

// ───────────────────────────────────────────────────────────────────────────
// BEACON CLEANSE LISTENER
// ───────────────────────────────────────────────────────────────────────────

const setupBeaconListener = () => {
  window.addEventListener("beacon-cleanse", ((e: CustomEvent) => {
    // Reload exposure from storage (beacon updated it)
    exposure = loadExposure()

    // Reapply theme
    applyTheme(getThemeState())
    updateStatusDisplay()

    // Remove corruption effects
    document.querySelectorAll(".margin-whisper, .hidden-watermark, .ghost-row").forEach(el => el.remove())

    // Reset title
    if (originalTitle) {
      document.title = originalTitle
    }

    // Reduce audio if active
    if (humGain && audioEnabled) {
      humGain.gain.setTargetAtTime(0, audioContext!.currentTime, 0.5)
    }
  }) as EventListener)
}

// ───────────────────────────────────────────────────────────────────────────
// TERMINAL COUNTER (FAKE BUT PERSISTENT)
// ───────────────────────────────────────────────────────────────────────────

const getTerminalCount = (): number => {
  // Base number + slow increment over time
  const baseCount = 847
  const daysSinceStart = Math.floor((Date.now() - new Date("2024-01-01").getTime()) / (1000 * 60 * 60 * 24))
  return baseCount + Math.floor(daysSinceStart * 1.3) + Math.floor(Math.random() * 5)
}

const showTerminalCount = () => {
  if (exposure.level < 20) return

  const existing = document.querySelector(".terminal-count")
  if (existing) return

  const count = getTerminalCount()
  const counter = document.createElement("div")
  counter.className = "terminal-count"
  counter.innerHTML = `<span class="count-number">${count.toLocaleString()}</span> TERMINALS HAVE REACHED 0,0,0`
  document.body.appendChild(counter)
}

// ───────────────────────────────────────────────────────────────────────────
// INITIALIZATION
// ───────────────────────────────────────────────────────────────────────────

const initTerminal = () => {
  // Apply current theme
  applyTheme(getThemeState())

  // Track page visit
  const path = window.location.pathname
  if (!exposure.pagesVisited.includes(path)) {
    exposure.pagesVisited.push(path)
    const pageExp = getPageExposure(path)
    addExposure(pageExp, "PAGE_VISIT")
  }

  // Update status display
  updateStatusDisplay()

  // Start session timer
  setInterval(() => {
    exposure.totalTime += 1
    if (exposure.totalTime % 60 === 0) {
      // Add exposure every minute
      addExposure(0.1, "TIME")
      saveExposure(exposure)
    }
    updateStatusDisplay()
  }, 1000)

  // Check for 03:47
  check0347()
  setInterval(check0347, 30000) // Check every 30 seconds

  // Check secret unlocks
  checkSecretUnlocks()

  // Apply corruption effects
  setTimeout(applyTextCorruption, 2000)
  setTimeout(addHiddenWatermarks, 1000)

  // Start ambient glitches
  scheduleAmbientGlitch()

  // Show counter at high exposure
  setTimeout(showTerminalCount, 3000)

  // Idle detection
  resetIdleTimer()
  document.addEventListener("mousemove", resetIdleTimer)
  document.addEventListener("keypress", resetIdleTimer)
  document.addEventListener("scroll", resetIdleTimer)
  document.addEventListener("click", resetIdleTimer)

  // NEW HORROR EFFECTS
  // Whispers in margins
  setTimeout(addWhispers, 1500)

  // Ghost table entries
  setTimeout(addGhostEntries, 3000)

  // Link misdirection
  setTimeout(setupLinkMisdirection, 500)

  // Other terminal flashes
  scheduleOtherTerminalFlash()

  // Title corruption
  startTitleCorruption()

  // Audio system
  setupAudioPermission()
  initAudio()

  // Beacon listener
  setupBeaconListener()
}

// Listen for dark mode clicks to trigger secret themes
document.addEventListener("nav", () => {
  initTerminal()

  const darkmodeButtons = document.getElementsByClassName("darkmode")
  for (const btn of darkmodeButtons) {
    btn.addEventListener("click", () => {
      // Direct exposure from clicking
      addExposure(1, "DIRECT_EXPOSURE")

      // Check for secret theme primes
      if (localStorage.getItem("maven-primed") === "true") {
        unlockSecretTheme("MAVEN_ECHO")
        localStorage.removeItem("maven-primed")
      }
      if (localStorage.getItem("sarr-primed") === "true") {
        unlockSecretTheme("SARR_CLEARANCE")
        localStorage.removeItem("sarr-primed")
      }
    })
  }
})

// Also initialize immediately for non-SPA loads
if (document.readyState === "complete") {
  initTerminal()
} else {
  window.addEventListener("load", initTerminal)
}
