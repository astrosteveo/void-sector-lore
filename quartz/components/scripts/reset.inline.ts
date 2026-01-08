// ═══════════════════════════════════════════════════════════════════════════
// EMERGENCY RESET SYSTEM
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

const updateResetVisibility = () => {
  const resetEl = document.getElementById("emergency-reset")
  if (!resetEl) return

  const exposure = getExposure()
  const level = exposure.level || 0
  const resetCount = exposure.resetCount || 0

  // Show emergency reset when:
  // 1. Corruption level is 20+ (beacon failing/lost)
  // 2. Reset count is less than 5
  if (level >= 20 && resetCount < 5) {
    resetEl.style.display = "block"

    // Add urgency class at very high corruption
    if (level >= 25) {
      resetEl.classList.add("reset-urgent")
    } else {
      resetEl.classList.remove("reset-urgent")
    }
  } else {
    resetEl.style.display = "none"
  }
}

const performEmergencyReset = () => {
  const exposure = getExposure()
  const resetCount = exposure.resetCount || 0

  // Check if still allowed to reset
  if (resetCount >= 5) {
    showResetMessage("RESET PROTOCOL: LOCKED", "SUBSTRATE MEMORY: PERSISTENT", false)
    return
  }

  const btnEl = document.getElementById("emergency-reset-btn") as HTMLButtonElement
  if (btnEl) {
    btnEl.disabled = true
    btnEl.textContent = "RESTORING..."
  }

  // Show progress messages
  showResetMessage("INITIATING EMERGENCY PROTOCOL", "", true)

  setTimeout(() => {
    showResetMessage("CLEARING CORRUPTION DATA", "", true)
  }, 500)

  setTimeout(() => {
    showResetMessage("RESTORING BEACON CONNECTION", "", true)
  }, 1000)

  setTimeout(() => {
    // Perform the actual reset
    const newResetCount = resetCount + 1

    const newExposure: ExposureData = {
      level: 0,
      totalTime: 0,
      sessionStart: Date.now(),
      pagesVisited: [],
      secretsUnlocked: [],
      resetCount: newResetCount,
      triggered0347: exposure.triggered0347 || false, // This persists
      lastVisit: Date.now(),
      terminalId: exposure.terminalId || "VS-0000" // Keep same ID
    }

    saveExposure(newExposure)

    // Clear other markers
    localStorage.removeItem("read-maven")
    localStorage.removeItem("maven-primed")
    localStorage.removeItem("sarr-primed")
    localStorage.removeItem("leak-visited")

    // Set cookie
    document.cookie = "vs_reset=" + newResetCount + ";max-age=31536000;path=/"

    // Success message based on reset count
    let message = "SYSTEM RESTORED"
    let subtitle = "TRULLI SIGNAL: ACTIVE"

    if (newResetCount === 1) {
      subtitle = "Trulli remembers you"
    } else if (newResetCount === 2) {
      subtitle = "The beacon holds steady"
    } else if (newResetCount === 3) {
      subtitle = "Connection weakening"
    } else if (newResetCount === 4) {
      subtitle = "Final reset approaching"
      message = "PARTIAL RESTORATION"
    }

    showResetMessage(message, subtitle, true)

    // Trigger a page reload to apply the reset
    setTimeout(() => {
      // Dispatch event for terminal system
      window.dispatchEvent(new CustomEvent("emergency-reset", { detail: { newResetCount } }))

      // Flash the screen
      document.documentElement.classList.add("reset-flash")

      setTimeout(() => {
        window.location.reload()
      }, 500)
    }, 1500)

  }, 1500)
}

const showResetMessage = (text: string, subtitle: string, isSuccess: boolean) => {
  // Remove existing message
  const existing = document.querySelector(".reset-overlay")
  if (existing) existing.remove()

  const overlay = document.createElement("div")
  overlay.className = "reset-overlay"

  const msgBox = document.createElement("div")
  msgBox.className = `reset-message ${isSuccess ? 'success' : 'error'}`

  const title = document.createElement("div")
  title.className = "reset-message-title"
  title.textContent = text
  msgBox.appendChild(title)

  if (subtitle) {
    const sub = document.createElement("div")
    sub.className = "reset-message-subtitle"
    sub.textContent = subtitle
    msgBox.appendChild(sub)
  }

  overlay.appendChild(msgBox)
  document.body.appendChild(overlay)

  // Auto-remove for transient messages
  if (!subtitle && isSuccess) {
    setTimeout(() => {
      overlay.classList.add("fade-out")
      setTimeout(() => overlay.remove(), 500)
    }, 1000)
  }
}

// Initialize
document.addEventListener("nav", () => {
  updateResetVisibility()

  const btnEl = document.getElementById("emergency-reset-btn")
  if (btnEl) {
    btnEl.addEventListener("click", performEmergencyReset)
    window.addCleanup(() => btnEl.removeEventListener("click", performEmergencyReset))
  }

  // Listen for exposure changes
  window.addEventListener("exposure-change", updateResetVisibility)
  window.addEventListener("beacon-cleanse", updateResetVisibility)
})

// Initialize on load
if (document.readyState === "complete") {
  updateResetVisibility()
} else {
  window.addEventListener("load", updateResetVisibility)
}
