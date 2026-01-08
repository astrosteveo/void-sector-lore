// Void Sector: Light mode is not available in the void
document.documentElement.setAttribute("saved-theme", "dark")
localStorage.setItem("theme", "dark")

const glitchMessages = [
  "LIGHT_MODE_UNAVAILABLE",
  "ERROR: PHOTON_DEFICIT",
  "VOID_SECTOR_PROTOCOL",
  "LUMINANCE_REJECTED",
  "DARKNESS_REQUIRED",
  "SIGNAL_CORRUPTED",
]

const triggerGlitch = () => {
  const root = document.documentElement

  // Add glitch class
  root.classList.add("void-glitch")

  // Create glitch overlay
  const overlay = document.createElement("div")
  overlay.className = "glitch-overlay"
  overlay.innerHTML = `<span class="glitch-text">${glitchMessages[Math.floor(Math.random() * glitchMessages.length)]}</span>`
  document.body.appendChild(overlay)

  // Rapid flicker effect
  let flickerCount = 0
  const flicker = setInterval(() => {
    root.style.filter = flickerCount % 2 === 0
      ? "hue-rotate(180deg) saturate(3) brightness(1.5)"
      : "none"
    flickerCount++
    if (flickerCount > 6) {
      clearInterval(flicker)
      root.style.filter = "none"
    }
  }, 50)

  // Clean up
  setTimeout(() => {
    root.classList.remove("void-glitch")
    overlay.remove()
  }, 800)
}

document.addEventListener("nav", () => {
  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", triggerGlitch)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", triggerGlitch))
  }
})
