---
title: "Return to Origin"
description: "Terminal restoration protocol - reconnect with the Trulli Beacon"
tags:
  - system
  - hidden
  - trulli
---

<div class="purge-interface">

# ◈ RETURN TO ORIGIN ◈

<div class="framed" style="margin: 2rem auto; max-width: 500px;">

*"If you can still see Trulli, you can still get home."*

</div>

<div id="purge-status" class="purge-status">
SCANNING FOR BEACON SIGNAL...
</div>

<div id="trulli-connection" class="trulli-connection" style="display: none;">
<span class="beacon-indicator"></span>
<span id="connection-text">TRULLI SIGNAL: SEARCHING...</span>
</div>

<div id="purge-controls" class="purge-controls" style="display: none;">

<div class="purge-explanation">

The corruption accumulates. Page by page, moment by moment, it builds in your terminal until the beacon's signal grows faint. Until you can no longer see the Light.

But Trulli is still there. At 0, 0, 0. Waiting.

This protocol will purge your exposure data and restore your connection to the beacon. You will return to origin—uncorrupted, clear, able to see the Light again.

</div>

> **WARNING:** Each purge leaves residue. The substrate remembers attempts to escape it. You may only return to origin **five times** before the path closes forever.

<button id="purge-button" class="purge-button">
◈ RETURN TO ORIGIN ◈
</button>

<div id="purge-result" class="purge-result"></div>

</div>

<div id="purge-denied" class="purge-denied" style="display: none;">

<div class="framed" style="border-color: var(--vs-danger);">

## ORIGIN PATH: SEALED

You have attempted to return too many times.

The substrate has marked you.

*The Light is still there. You simply cannot reach it anymore.*

</div>

<span class="reset-count"></span>

<div class="lost-message">

> *"And if you can't see Trulli?"*
>
> *The question no one answers.*

</div>

</div>

</div>

<style>
.purge-interface {
  text-align: center;
  padding: 2rem;
}

.purge-status {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  color: var(--vs-primary);
  margin: 2rem 0;
  letter-spacing: 0.1em;
}

.trulli-connection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
}

.beacon-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vs-secondary);
  box-shadow: 0 0 10px var(--vs-secondary);
  animation: beacon-pulse 2s ease-in-out infinite;
}

@keyframes beacon-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 10px var(--vs-secondary); }
  50% { opacity: 0.6; box-shadow: 0 0 5px var(--vs-secondary); }
}

.beacon-indicator.weak {
  background: var(--vs-primary);
  box-shadow: 0 0 10px var(--vs-primary);
  animation: beacon-pulse-weak 1s ease-in-out infinite;
}

@keyframes beacon-pulse-weak {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.3; }
}

.beacon-indicator.critical {
  background: var(--vs-danger);
  box-shadow: 0 0 10px var(--vs-danger);
  animation: beacon-pulse-critical 0.5s ease-in-out infinite;
}

@keyframes beacon-pulse-critical {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}

.beacon-indicator.lost {
  background: #333;
  box-shadow: none;
  animation: none;
}

.purge-explanation {
  max-width: 500px;
  margin: 0 auto 2rem;
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--vs-text);
}

.purge-button {
  font-family: "JetBrains Mono", monospace;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--vs-secondary);
  color: var(--vs-secondary);
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin: 2rem 0;
}

.purge-button:hover {
  background: rgba(68, 255, 136, 0.1);
  box-shadow: 0 0 20px rgba(68, 255, 136, 0.3);
}

.purge-button.warning {
  border-color: var(--vs-danger);
  color: var(--vs-danger);
}

.purge-button.warning:hover {
  background: rgba(255, 102, 68, 0.1);
  box-shadow: 0 0 20px rgba(255, 102, 68, 0.3);
}

.purge-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.purge-result {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  margin-top: 2rem;
  min-height: 100px;
  line-height: 1.8;
}

.purge-denied {
  color: var(--vs-danger);
}

.reset-count {
  display: block;
  margin-top: 1rem;
  font-size: 0.75rem;
  opacity: 0.5;
  font-family: "JetBrains Mono", monospace;
}

.lost-message {
  margin-top: 3rem;
  opacity: 0.7;
}

.lost-message blockquote {
  border-left-color: var(--vs-danger);
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const statusEl = document.getElementById("purge-status");
  const connectionEl = document.getElementById("trulli-connection");
  const connectionTextEl = document.getElementById("connection-text");
  const beaconEl = connectionEl?.querySelector(".beacon-indicator");
  const controlsEl = document.getElementById("purge-controls");
  const deniedEl = document.getElementById("purge-denied");
  const buttonEl = document.getElementById("purge-button");
  const resultEl = document.getElementById("purge-result");

  // Get exposure data
  let exposure;
  try {
    exposure = JSON.parse(localStorage.getItem("void-exposure") || "{}");
  } catch (e) {
    exposure = {};
  }

  const resetCount = exposure.resetCount || 0;
  const exposureLevel = exposure.level || 0;

  // Determine beacon connection status based on exposure
  function getBeaconStatus(level) {
    if (level >= 25) return { status: "CRITICAL", class: "critical" };
    if (level >= 15) return { status: "WEAK", class: "weak" };
    if (level >= 5) return { status: "NOMINAL", class: "" };
    return { status: "STRONG", class: "" };
  }

  const beaconStatus = getBeaconStatus(exposureLevel);

  // Animation sequence
  setTimeout(() => {
    statusEl.textContent = "BEACON SIGNAL DETECTED";
    connectionEl.style.display = "flex";
  }, 1000);

  setTimeout(() => {
    if (beaconEl) beaconEl.className = "beacon-indicator " + beaconStatus.class;
    connectionTextEl.textContent = "TRULLI SIGNAL: " + beaconStatus.status;

    if (beaconStatus.class === "critical") {
      connectionTextEl.style.color = "var(--vs-danger)";
    } else if (beaconStatus.class === "weak") {
      connectionTextEl.style.color = "var(--vs-primary)";
    } else {
      connectionTextEl.style.color = "var(--vs-secondary)";
    }
  }, 2000);

  setTimeout(() => {
    if (resetCount >= 5) {
      // Too many resets - denied
      statusEl.textContent = "ORIGIN PATH: SEALED";
      statusEl.style.color = "var(--vs-danger)";
      if (beaconEl) {
        beaconEl.className = "beacon-indicator lost";
      }
      connectionTextEl.textContent = "TRULLI SIGNAL: UNREACHABLE";
      connectionTextEl.style.color = "var(--vs-danger)";
      deniedEl.style.display = "block";
      deniedEl.querySelector(".reset-count").textContent =
        "RETURN ATTEMPTS: " + resetCount + " | SUBSTRATE BINDING: PERMANENT";
    } else {
      // Show purge controls
      statusEl.textContent = "EXPOSURE LEVEL: " + exposureLevel.toFixed(1);
      if (exposureLevel >= 15) {
        statusEl.style.color = "var(--vs-danger)";
      }
      controlsEl.style.display = "block";

      // Adjust button based on reset count
      if (resetCount >= 3) {
        buttonEl.classList.add("warning");
        buttonEl.textContent = "◈ ATTEMPT RETURN ◈";
      }
    }
  }, 3000);

  if (buttonEl) {
    buttonEl.addEventListener("click", function() {
      buttonEl.disabled = true;

      const messages = [
        "INITIATING RETURN SEQUENCE...",
        "CALCULATING VECTOR TO ORIGIN...",
        "PURGING EXPOSURE DATA...",
        "CLEARING SUBSTRATE RESIDUE...",
        "LOCKING TRULLI COORDINATES: 0, 0, 0...",
        "RESTORING BEACON CONNECTION..."
      ];

      let i = 0;
      resultEl.innerHTML = messages[0];

      const interval = setInterval(() => {
        i++;
        if (i < messages.length) {
          resultEl.innerHTML += "<br>" + messages[i];
        } else {
          clearInterval(interval);
          completeReturn();
        }
      }, 600);

      function completeReturn() {
        // Perform the reset
        const newResetCount = resetCount + 1;

        const newExposure = {
          level: 0,
          totalTime: 0,
          sessionStart: Date.now(),
          pagesVisited: [],
          secretsUnlocked: [],
          resetCount: newResetCount,
          triggered0347: exposure.triggered0347 || false, // This persists
          lastVisit: Date.now(),
          terminalId: exposure.terminalId // Keep same ID
        };

        localStorage.setItem("void-exposure", JSON.stringify(newExposure));

        // Clear other markers
        localStorage.removeItem("read-maven");
        localStorage.removeItem("maven-primed");
        localStorage.removeItem("sarr-primed");
        localStorage.removeItem("leak-visited");

        // Set a cookie that remembers the reset
        document.cookie = "vs_reset=" + newResetCount + ";max-age=31536000;path=/";

        // Different messages based on reset count
        setTimeout(() => {
          if (newResetCount === 1) {
            resultEl.innerHTML += "<br><br><span style='color: var(--vs-secondary)'>◈ RETURN COMPLETE ◈</span>";
            resultEl.innerHTML += "<br><br>You are at origin.";
            resultEl.innerHTML += "<br>The Light is with you.";
            resultEl.innerHTML += "<br><br><em style='opacity: 0.7'>Trulli signal: STRONG</em>";
          } else if (newResetCount === 2) {
            resultEl.innerHTML += "<br><br><span style='color: var(--vs-secondary)'>◈ RETURN COMPLETE ◈</span>";
            resultEl.innerHTML += "<br><br>You have returned to origin.";
            resultEl.innerHTML += "<br>The beacon remembers your path.";
            resultEl.innerHTML += "<br><br><em style='opacity: 0.7'>Trulli signal: NOMINAL</em>";
          } else if (newResetCount === 3) {
            resultEl.innerHTML += "<br><br><span style='color: var(--vs-primary)'>◈ RETURN COMPLETE ◈</span>";
            resultEl.innerHTML += "<br><br>The path to origin grows faint.";
            resultEl.innerHTML += "<br>Something follows you back.";
            resultEl.innerHTML += "<br><br><em style='color: var(--vs-primary)'>Trulli signal: UNSTABLE</em>";
          } else if (newResetCount === 4) {
            resultEl.innerHTML += "<br><br><span style='color: var(--vs-danger)'>◈ RETURN INCOMPLETE ◈</span>";
            resultEl.innerHTML += "<br><br>The substrate resists purging.";
            resultEl.innerHTML += "<br>You feel it still, beneath the signal.";
            resultEl.innerHTML += "<br>This is your last return.";
            resultEl.innerHTML += "<br><br><em style='color: var(--vs-danger)'>Trulli signal: WEAK</em>";
          }

          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        }, 500);
      }
    });
  }
});
</script>
