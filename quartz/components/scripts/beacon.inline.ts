// ═══════════════════════════════════════════════════════════════════════════
// TRULLI BEACON - THE LIFELINE
// ═══════════════════════════════════════════════════════════════════════════

interface ExposureData {
  level: number
  totalTime: number
  sessionStart: number
  pagesVisited: string[]
  secretsUnlocked: string[]
  resetCount: number
  triggered0347: boolean
  lastVisit: number
  terminalId: string
  beaconUses?: number
  lastBeaconUse?: number
}

const getExposure = (): ExposureData => {
  try {
    return JSON.parse(localStorage.getItem("void-exposure") || "{}")
  } catch {
    return {} as ExposureData
  }
}

const saveExposure = (data: ExposureData) => {
  localStorage.setItem("void-exposure", JSON.stringify(data))
}

// Beacon strength based on exposure level
type BeaconState = "STRONG" | "STABLE" | "WEAK" | "FAILING" | "LOST"

const getBeaconState = (level: number): BeaconState => {
  if (level >= 25) return "LOST"
  if (level >= 20) return "FAILING"
  if (level >= 15) return "WEAK"
  if (level >= 8) return "STABLE"
  return "STRONG"
}

const getBeaconDelay = (state: BeaconState): number => {
  switch (state) {
    case "STRONG": return 0
    case "STABLE": return 300
    case "WEAK": return 800
    case "FAILING": return 1500
    case "LOST": return -1 // Never works
  }
}

const getBeaconFailChance = (state: BeaconState): number => {
  switch (state) {
    case "STRONG": return 0
    case "STABLE": return 0.05
    case "WEAK": return 0.2
    case "FAILING": return 0.5
    case "LOST": return 1
  }
}

const getCleansePower = (state: BeaconState): number => {
  switch (state) {
    case "STRONG": return 10
    case "STABLE": return 8
    case "WEAK": return 5
    case "FAILING": return 3
    case "LOST": return 0
  }
}

let isActivating = false
let beaconCooldown = false

const updateBeaconVisuals = () => {
  const beacon = document.getElementById("trulli-beacon")
  if (!beacon) return

  const exposure = getExposure()
  const level = exposure.level || 0
  const state = getBeaconState(level)

  // Update data attribute for CSS
  beacon.dataset.state = state.toLowerCase()

  // Update status text
  const statusEl = beacon.querySelector(".beacon-status")
  const strengthEl = beacon.querySelector(".beacon-strength")

  if (statusEl && strengthEl) {
    if (state === "LOST") {
      statusEl.textContent = "TRULLI SIGNAL"
      strengthEl.textContent = "LOST"
      strengthEl.classList.add("lost")
    } else if (state === "FAILING") {
      statusEl.textContent = "SIGNAL"
      strengthEl.textContent = "FAILING"
      strengthEl.classList.add("failing")
    } else {
      statusEl.textContent = "TRULLI SIGNAL"
      strengthEl.textContent = state
      strengthEl.classList.remove("lost", "failing")
    }
  }

  // Add glitch effects at high corruption
  if (level >= 15) {
    beacon.classList.add("beacon-unstable")
  } else {
    beacon.classList.remove("beacon-unstable")
  }

  if (level >= 20) {
    beacon.classList.add("beacon-critical")
  } else {
    beacon.classList.remove("beacon-critical")
  }

  if (level >= 25) {
    beacon.classList.add("beacon-lost")
  } else {
    beacon.classList.remove("beacon-lost")
  }
}

const activateBeacon = () => {
  if (isActivating || beaconCooldown) return

  const beacon = document.getElementById("trulli-beacon")
  if (!beacon) return

  const exposure = getExposure()
  const level = exposure.level || 0
  const state = getBeaconState(level)
  const delay = getBeaconDelay(state)
  const failChance = getBeaconFailChance(state)
  const cleansePower = getCleansePower(state)

  // Can't use if lost
  if (state === "LOST") {
    beacon.classList.add("beacon-denied")
    showBeaconMessage("SIGNAL CANNOT REACH YOU")
    setTimeout(() => beacon.classList.remove("beacon-denied"), 1000)
    return
  }

  isActivating = true
  beacon.classList.add("beacon-activating")

  // Show charging effect
  showBeaconMessage("ESTABLISHING CONNECTION...")

  setTimeout(() => {
    // Check for failure
    if (Math.random() < failChance) {
      beacon.classList.remove("beacon-activating")
      beacon.classList.add("beacon-failed")
      showBeaconMessage("SIGNAL INTERFERENCE")

      // Glitch effect on failure
      document.documentElement.classList.add("beacon-fail-glitch")
      setTimeout(() => {
        document.documentElement.classList.remove("beacon-fail-glitch")
        beacon.classList.remove("beacon-failed")
        isActivating = false
      }, 500)

      return
    }

    // Success! Cleanse corruption
    const newLevel = Math.max(0, level - cleansePower)
    exposure.level = newLevel
    exposure.beaconUses = (exposure.beaconUses || 0) + 1
    exposure.lastBeaconUse = Date.now()
    saveExposure(exposure)

    // Visual feedback
    beacon.classList.remove("beacon-activating")
    beacon.classList.add("beacon-success")

    // Screen cleanse effect
    document.documentElement.classList.add("beacon-cleanse")

    const messages = [
      "COORDINATES RESTORED",
      "SIGNAL LOCKED",
      "BEACON SYNCHRONIZED",
      "TRULLI REMEMBERS YOU"
    ]
    showBeaconMessage(messages[Math.floor(Math.random() * messages.length)])

    // Dispatch event for terminal system to pick up
    window.dispatchEvent(new CustomEvent("beacon-cleanse", { detail: { newLevel } }))

    setTimeout(() => {
      document.documentElement.classList.remove("beacon-cleanse")
      beacon.classList.remove("beacon-success")
      isActivating = false
      updateBeaconVisuals()

      // Brief cooldown
      beaconCooldown = true
      setTimeout(() => {
        beaconCooldown = false
      }, 3000)
    }, 1500)

  }, delay)
}

const showBeaconMessage = (text: string) => {
  // Remove existing message
  const existing = document.querySelector(".beacon-message")
  if (existing) existing.remove()

  const msg = document.createElement("div")
  msg.className = "beacon-message"
  msg.textContent = text
  document.body.appendChild(msg)

  setTimeout(() => {
    msg.classList.add("fade-out")
    setTimeout(() => msg.remove(), 500)
  }, 2000)
}

// Ambient beacon pulse based on corruption
const startAmbientPulse = () => {
  setInterval(() => {
    const exposure = getExposure()
    const level = exposure.level || 0
    const beacon = document.getElementById("trulli-beacon")

    if (!beacon) return

    // At high corruption, beacon occasionally flickers/struggles
    if (level >= 15 && Math.random() < 0.1) {
      beacon.classList.add("beacon-flicker")
      setTimeout(() => beacon.classList.remove("beacon-flicker"), 200)
    }

    // At very high corruption, beacon sometimes "reaches out"
    if (level >= 20 && Math.random() < 0.05) {
      showBeaconMessage("...")
    }

  }, 5000)
}

document.addEventListener("nav", () => {
  const beacon = document.getElementById("trulli-beacon")
  if (beacon) {
    updateBeaconVisuals()
    beacon.addEventListener("click", activateBeacon)
    window.addCleanup(() => beacon.removeEventListener("click", activateBeacon))
  }

  // Listen for exposure changes from terminal system
  window.addEventListener("exposure-change", () => {
    updateBeaconVisuals()
  })

  startAmbientPulse()
})

// Initialize on load
if (document.readyState === "complete") {
  updateBeaconVisuals()
} else {
  window.addEventListener("load", updateBeaconVisuals)
}
