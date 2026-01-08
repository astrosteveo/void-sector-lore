import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import resetScript from "./scripts/reset.inline"
import resetStyle from "./styles/reset.scss"

const EmergencyReset: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div id="emergency-reset" class={`emergency-reset ${displayClass ?? ""}`} style="display: none;">
      <div class="reset-container">
        <div class="reset-warning">⚠</div>
        <div class="reset-info">
          <div class="reset-title">EMERGENCY PROTOCOL</div>
          <div class="reset-subtitle">BEACON SIGNAL LOST</div>
        </div>
        <button id="emergency-reset-btn" class="reset-button" title="Emergency system restore">
          RESTORE
        </button>
      </div>
    </div>
  )
}

EmergencyReset.beforeDOMLoaded = resetScript
EmergencyReset.css = resetStyle

export default (() => EmergencyReset) satisfies QuartzComponentConstructor
