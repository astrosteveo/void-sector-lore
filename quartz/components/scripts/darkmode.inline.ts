// Void Sector: Light mode is not available in the void
document.documentElement.setAttribute("saved-theme", "dark")
localStorage.setItem("theme", "dark")

// Corruption state persists across sessions
let corruptionLevel = parseInt(localStorage.getItem("void-corruption") || "0")

// Messages escalate with corruption
const glitchMessages = [
  // Level 0-2: Denial
  ["LIGHT_MODE_UNAVAILABLE", "ERROR: PHOTON_DEFICIT", "VOID_SECTOR_PROTOCOL", "LUMINANCE_REJECTED", "DARKNESS_REQUIRED"],
  // Level 3-5: Warning
  ["SIGNAL_CORRUPTED", "WHY DO YOU KEEP TRYING", "THE VOID NOTICES", "STOP", "SUBSTRATE_INTERFERENCE"],
  // Level 6-8: Creeping
  ["IT REMEMBERS YOU NOW", "COORDINATE_DRIFT_DETECTED", "YOU SHOULD NOT BE HERE", "CAN YOU HEAR IT", "03:47"],
  // Level 9-11: Dread
  ["THE DARKNESS IS NOT EMPTY", "SOMETHING IS LISTENING", "YOU CANNOT GO BACK", "TRULLI SIGNAL WEAKENING", "IT FOUND YOU"],
  // Level 12-14: Corruption
  ["TRULLI_SIGNAL_LOST", "YOU ARE NOT ALONE", "THE SUBSTRATE REMEMBERS", "ACCEPTABLE LOSS", "THEY NEVER LEFT"],
  // Level 15+: The End
  ["WELCOME HOME", "YOU WERE ALWAYS HERE", "THE VOID THANKS YOU", "SIGNAL_ORIGIN: 0,0,0", "TRULLI WENT DARK"],
]

const getMessageTier = () => Math.min(Math.floor(corruptionLevel / 3), glitchMessages.length - 1)

const getRandomMessage = () => {
  const tier = getMessageTier()
  const messages = glitchMessages[tier]
  return messages[Math.floor(Math.random() * messages.length)]
}

const triggerGlitch = () => {
  const root = document.documentElement
  corruptionLevel++
  localStorage.setItem("void-corruption", corruptionLevel.toString())

  // Intensity scales with corruption
  const intensity = Math.min(corruptionLevel, 20)
  const duration = 800 + (intensity * 100)
  const shakeClass = intensity > 10 ? "void-glitch-intense" : "void-glitch"

  // Add glitch class
  root.classList.add(shakeClass)
  root.dataset.corruption = intensity.toString()

  // Create glitch overlay
  const overlay = document.createElement("div")
  overlay.className = `glitch-overlay corruption-${Math.min(Math.floor(intensity / 5), 4)}`

  const message = getRandomMessage()
  overlay.innerHTML = `<span class="glitch-text">${message}</span>`

  // At high corruption, add secondary whispers
  if (intensity > 8) {
    const whisper = document.createElement("div")
    whisper.className = "glitch-whisper"
    whisper.textContent = glitchMessages[Math.max(0, getMessageTier() - 1)][Math.floor(Math.random() * 5)]
    overlay.appendChild(whisper)
  }

  // At very high corruption, add a third layer
  if (intensity > 14) {
    const echo = document.createElement("div")
    echo.className = "glitch-echo"
    echo.textContent = "0,0,0"
    overlay.appendChild(echo)
  }

  document.body.appendChild(overlay)

  // Rapid flicker effect - more intense at higher corruption
  let flickerCount = 0
  const maxFlickers = 6 + Math.floor(intensity / 2)
  const flickerSpeed = Math.max(30, 50 - intensity)

  const flicker = setInterval(() => {
    const hueShift = 180 + (Math.random() * intensity * 10)
    const saturation = 3 + (intensity * 0.3)
    const brightness = 1.5 + (Math.random() * intensity * 0.05)

    root.style.filter = flickerCount % 2 === 0
      ? `hue-rotate(${hueShift}deg) saturate(${saturation}) brightness(${brightness})`
      : "none"
    flickerCount++
    if (flickerCount > maxFlickers) {
      clearInterval(flicker)
      // At high corruption, leave residual filter
      if (intensity > 12) {
        root.style.filter = `saturate(${1 + intensity * 0.02}) contrast(${1 + intensity * 0.01})`
      } else {
        root.style.filter = "none"
      }
    }
  }, flickerSpeed)

  // Screen tear effect at higher corruption
  if (intensity > 6) {
    const tear = document.createElement("div")
    tear.className = "screen-tear"
    tear.style.top = `${Math.random() * 100}%`
    document.body.appendChild(tear)
    setTimeout(() => tear.remove(), duration / 2)
  }

  // Clean up overlay (but corruption persists)
  setTimeout(() => {
    root.classList.remove(shakeClass)
    overlay.remove()
  }, duration)

  // Permanent corruption effects at extreme levels
  if (intensity >= 15 && !document.querySelector(".permanent-corruption")) {
    const permCorrupt = document.createElement("div")
    permCorrupt.className = "permanent-corruption"
    document.body.appendChild(permCorrupt)
  }

  // At max corruption, occasionally trigger random glitches
  if (intensity >= 18) {
    scheduleRandomGlitch()
  }
}

// Random ambient glitches at max corruption
let randomGlitchScheduled = false
const scheduleRandomGlitch = () => {
  if (randomGlitchScheduled) return
  randomGlitchScheduled = true

  const randomDelay = 5000 + Math.random() * 20000
  setTimeout(() => {
    randomGlitchScheduled = false
    if (corruptionLevel >= 18) {
      // Mini glitch
      const root = document.documentElement
      root.classList.add("void-glitch")
      root.style.filter = "hue-rotate(180deg) brightness(1.3)"
      setTimeout(() => {
        root.classList.remove("void-glitch")
        root.style.filter = `saturate(${1 + corruptionLevel * 0.02})`
      }, 150)

      // Maybe show a brief message
      if (Math.random() > 0.5) {
        const flash = document.createElement("div")
        flash.className = "glitch-flash-message"
        flash.textContent = "03:47"
        document.body.appendChild(flash)
        setTimeout(() => flash.remove(), 300)
      }

      scheduleRandomGlitch()
    }
  }, randomDelay)
}

document.addEventListener("nav", () => {
  // Apply persistent corruption on page load
  const root = document.documentElement
  if (corruptionLevel > 12) {
    root.style.filter = `saturate(${1 + corruptionLevel * 0.02}) contrast(${1 + corruptionLevel * 0.01})`
  }
  if (corruptionLevel >= 15 && !document.querySelector(".permanent-corruption")) {
    const permCorrupt = document.createElement("div")
    permCorrupt.className = "permanent-corruption"
    document.body.appendChild(permCorrupt)
  }
  if (corruptionLevel >= 18) {
    scheduleRandomGlitch()
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", triggerGlitch)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", triggerGlitch))
  }
})
