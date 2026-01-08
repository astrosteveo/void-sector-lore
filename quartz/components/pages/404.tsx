import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint not-found-page">
      <div class="not-found-container">
        <div class="not-found-glitch-wrapper">
          <h1 class="not-found-code" data-text="404">404</h1>
        </div>

        <div class="not-found-status">
          <span class="status-label">STATUS:</span>
          <span class="status-value">COORDINATES NOT FOUND</span>
        </div>

        <div class="not-found-message">
          <p class="not-found-primary">
            The requested sector does not exist in the archive.
          </p>
          <p class="not-found-secondary">
            Or it has been <span class="redacted-inline">removed</span>.
          </p>
        </div>

        <div class="not-found-data">
          <div class="data-row">
            <span class="data-label">SIGNAL:</span>
            <span class="data-value data-lost">LOST</span>
          </div>
          <div class="data-row">
            <span class="data-label">LAST KNOWN:</span>
            <span class="data-value">03:47</span>
          </div>
          <div class="data-row">
            <span class="data-label">RECOVERY:</span>
            <span class="data-value data-unlikely">UNLIKELY</span>
          </div>
        </div>

        <div class="not-found-actions">
          <a href={baseDir} class="not-found-beacon-link">
            <span class="beacon-icon-small">◉</span>
            RETURN TO TRULLI BEACON
          </a>
        </div>

        <div class="not-found-whisper">
          they were here once
        </div>
      </div>

      <style>{`
        .not-found-page {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .not-found-container {
          max-width: 500px;
          padding: 2rem;
        }

        .not-found-glitch-wrapper {
          position: relative;
          margin-bottom: 2rem;
        }

        .not-found-code {
          font-family: "JetBrains Mono", monospace;
          font-size: 8rem;
          font-weight: 700;
          color: var(--vs-danger, #ff6644);
          text-shadow:
            3px 0 var(--vs-primary, #4a9eff),
            -3px 0 var(--vs-secondary, #44ff88),
            0 0 40px var(--vs-danger, #ff6644);
          animation: not-found-glitch 3s ease-in-out infinite;
          margin: 0;
          line-height: 1;
        }

        @keyframes not-found-glitch {
          0%, 90%, 100% {
            transform: translate(0);
            text-shadow:
              3px 0 var(--vs-primary, #4a9eff),
              -3px 0 var(--vs-secondary, #44ff88),
              0 0 40px var(--vs-danger, #ff6644);
          }
          92% {
            transform: translate(-3px, 2px);
            text-shadow:
              5px 0 var(--vs-primary, #4a9eff),
              -1px 0 var(--vs-secondary, #44ff88),
              0 0 60px var(--vs-danger, #ff6644);
          }
          94% {
            transform: translate(3px, -1px);
            text-shadow:
              1px 0 var(--vs-primary, #4a9eff),
              -5px 0 var(--vs-secondary, #44ff88),
              0 0 30px var(--vs-danger, #ff6644);
          }
          96% {
            transform: translate(-2px, -2px);
          }
          98% {
            transform: translate(2px, 1px);
          }
        }

        .not-found-status {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--vs-danger, #ff6644);
          background: rgba(255, 102, 68, 0.1);
          display: inline-block;
        }

        .status-label {
          color: var(--vs-muted, #6688aa);
          margin-right: 0.5rem;
        }

        .status-value {
          color: var(--vs-danger, #ff6644);
          animation: status-blink 2s step-end infinite;
        }

        @keyframes status-blink {
          0%, 80%, 100% { opacity: 1; }
          85%, 95% { opacity: 0.3; }
        }

        .not-found-message {
          margin-bottom: 2rem;
        }

        .not-found-primary {
          color: var(--vs-text, #aabbcc);
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .not-found-secondary {
          color: var(--vs-muted, #6688aa);
          font-size: 0.9rem;
          font-style: italic;
        }

        .redacted-inline {
          background: var(--vs-danger, #ff6644);
          color: var(--vs-danger, #ff6644);
          padding: 0 0.3rem;
          cursor: help;
          transition: all 0.3s ease;
        }

        .redacted-inline:hover {
          background: transparent;
          color: var(--vs-danger, #ff6644);
        }

        .not-found-data {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          margin-bottom: 2rem;
          text-align: left;
          max-width: 250px;
          margin-left: auto;
          margin-right: auto;
        }

        .data-row {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
          border-bottom: 1px solid rgba(102, 136, 170, 0.2);
        }

        .data-label {
          color: var(--vs-muted, #6688aa);
        }

        .data-value {
          color: var(--vs-text, #aabbcc);
        }

        .data-lost {
          color: var(--vs-danger, #ff6644);
          animation: data-pulse 1.5s ease-in-out infinite;
        }

        .data-unlikely {
          color: var(--vs-danger, #ff6644);
          opacity: 0.7;
        }

        @keyframes data-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .not-found-actions {
          margin-bottom: 2rem;
        }

        .not-found-beacon-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          color: var(--vs-primary, #4a9eff);
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--vs-primary, #4a9eff);
          background: rgba(74, 158, 255, 0.1);
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
        }

        .not-found-beacon-link:hover {
          background: rgba(74, 158, 255, 0.2);
          box-shadow: 0 0 20px rgba(74, 158, 255, 0.3);
          color: var(--vs-secondary, #44ff88);
          border-color: var(--vs-secondary, #44ff88);
        }

        .beacon-icon-small {
          animation: beacon-pulse-small 2s ease-in-out infinite;
        }

        @keyframes beacon-pulse-small {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .not-found-whisper {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          color: var(--vs-danger, #ff6644);
          opacity: 0.2;
          letter-spacing: 0.2em;
          animation: whisper-fade-404 5s ease-in-out infinite;
        }

        @keyframes whisper-fade-404 {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }

        @media screen and (max-width: 768px) {
          .not-found-code {
            font-size: 5rem;
          }

          .not-found-container {
            padding: 1rem;
          }
        }
      `}</style>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
