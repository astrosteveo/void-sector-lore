---
title: "SYSTEM PURGE"
description: "Terminal restoration protocol"
tags:
  - system
  - hidden
---

<div class="purge-interface">

# ◈ TERMINAL PURGE PROTOCOL ◈

<div id="purge-status" class="purge-status">
ANALYZING TERMINAL STATE...
</div>

<div id="purge-controls" class="purge-controls" style="display: none;">

> **WARNING:** This action will attempt to restore your terminal to factory state.

<button id="purge-button" class="purge-button">
INITIATE PURGE SEQUENCE
</button>

<div id="purge-result" class="purge-result"></div>

</div>

<div id="purge-denied" class="purge-denied" style="display: none;">

> **PURGE SEQUENCE UNAVAILABLE**

The substrate does not forget.

Your reset attempts have been logged.

<span class="reset-count"></span>

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

.purge-button {
  font-family: "JetBrains Mono", monospace;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--vs-danger);
  color: var(--vs-danger);
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin: 2rem 0;
}

.purge-button:hover {
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
}

.purge-denied {
  color: var(--vs-danger);
}

.reset-count {
  display: block;
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.6;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const statusEl = document.getElementById("purge-status");
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

  setTimeout(() => {
    if (resetCount >= 5) {
      // Too many resets - denied
      statusEl.textContent = "PURGE PROTOCOL: LOCKED";
      statusEl.style.color = "var(--vs-danger)";
      deniedEl.style.display = "block";
      deniedEl.querySelector(".reset-count").textContent =
        "RESET ATTEMPTS: " + resetCount + " | SUBSTRATE MEMORY: PERSISTENT";
    } else {
      // Show purge controls
      statusEl.textContent = "TERMINAL STATUS: " +
        (exposure.level >= 20 ? "CRITICAL" :
         exposure.level >= 10 ? "COMPROMISED" : "NOMINAL");
      controlsEl.style.display = "block";
    }
  }, 1500);

  if (buttonEl) {
    buttonEl.addEventListener("click", function() {
      buttonEl.disabled = true;
      resultEl.innerHTML = "INITIATING PURGE SEQUENCE...";

      setTimeout(() => {
        resultEl.innerHTML += "<br>CLEARING EXPOSURE DATA...";
      }, 500);

      setTimeout(() => {
        resultEl.innerHTML += "<br>RESETTING THEME STATE...";
      }, 1000);

      setTimeout(() => {
        resultEl.innerHTML += "<br>RESTORING BEACON CONNECTION...";
      }, 1500);

      setTimeout(() => {
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

        // Clear other markers but set a "was reset" flag
        localStorage.removeItem("read-maven");
        localStorage.removeItem("maven-primed");
        localStorage.removeItem("sarr-primed");
        localStorage.removeItem("leak-visited");

        // Set a cookie that remembers the reset (harder to clear)
        document.cookie = "vs_reset=" + newResetCount + ";max-age=31536000;path=/";

        if (newResetCount === 1) {
          resultEl.innerHTML += "<br><br><span style='color: var(--vs-secondary)'>PURGE COMPLETE</span>";
          resultEl.innerHTML += "<br>TRULLI SIGNAL: RESTORED";
          resultEl.innerHTML += "<br><br><em>Redirecting to archive...</em>";
        } else if (newResetCount === 2) {
          resultEl.innerHTML += "<br><br><span style='color: var(--vs-primary)'>PURGE COMPLETE</span>";
          resultEl.innerHTML += "<br>TRULLI SIGNAL: RESTORED [" + newResetCount + "]";
          resultEl.innerHTML += "<br><br><em>The beacon remembers your return.</em>";
        } else if (newResetCount === 3) {
          resultEl.innerHTML += "<br><br><span style='color: var(--vs-danger)'>PURGE COMPLETE</span>";
          resultEl.innerHTML += "<br>TRULLI SIGNAL: UNSTABLE";
          resultEl.innerHTML += "<br><br><em>The beacon cannot always hear you.</em>";
        } else if (newResetCount === 4) {
          resultEl.innerHTML += "<br><br><span style='color: var(--vs-danger)'>PURGE INCOMPLETE</span>";
          resultEl.innerHTML += "<br>SUBSTRATE RESIDUE: DETECTED";
          resultEl.innerHTML += "<br><br><em>Something remains.</em>";
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);

      }, 2500);
    });
  }
});
</script>
