import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import beaconScript from "./scripts/beacon.inline"
import beaconStyle from "./styles/beacon.scss"

const TrulliBeacon: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div id="trulli-beacon" class={`trulli-beacon ${displayClass ?? ""}`} title="TRULLI BEACON">
      <div class="beacon-ring beacon-ring-outer"></div>
      <div class="beacon-ring beacon-ring-inner"></div>
      <div class="beacon-core">
        <svg viewBox="0 0 100 100" class="beacon-icon">
          {/* Beacon tower */}
          <path
            d="M50 15 L50 45 M35 45 L65 45 L60 85 L40 85 Z"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          {/* Signal waves */}
          <path
            d="M30 25 Q40 20 50 15 Q60 20 70 25"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="beacon-wave wave-1"
          />
          <path
            d="M22 32 Q36 24 50 15 Q64 24 78 32"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="beacon-wave wave-2"
          />
          <path
            d="M15 40 Q32 28 50 15 Q68 28 85 40"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="beacon-wave wave-3"
          />
        </svg>
      </div>
      <div class="beacon-status">TRULLI SIGNAL</div>
      <div class="beacon-strength">STRONG</div>
    </div>
  )
}

TrulliBeacon.beforeDOMLoaded = beaconScript
TrulliBeacon.css = beaconStyle

export default (() => TrulliBeacon) satisfies QuartzComponentConstructor
