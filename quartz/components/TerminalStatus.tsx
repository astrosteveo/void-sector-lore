import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import terminalScript from "./scripts/terminal.inline"
import terminalStyle from "./styles/terminal.scss"

const TerminalStatus: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div id="terminal-status" class={`terminal-status ${displayClass ?? ""}`}>
      <div class="terminal-status-inner">
        <span class="terminal-id">VS-0000</span>
        <span class="terminal-divider">│</span>
        <span class="terminal-state">INITIALIZING</span>
        <span class="terminal-divider">│</span>
        <span class="terminal-session">00:00:00</span>
      </div>
      <div class="terminal-exposure-bar">
        <div class="terminal-exposure-fill"></div>
      </div>
    </div>
  )
}

TerminalStatus.beforeDOMLoaded = terminalScript
TerminalStatus.css = terminalStyle

export default (() => TerminalStatus) satisfies QuartzComponentConstructor
