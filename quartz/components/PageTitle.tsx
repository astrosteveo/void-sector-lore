import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="page-title-link">
        <img
          src={`${baseDir}/static/void-sector-logo-compact.svg`}
          alt="Void Sector"
          class="page-title-logo"
        />
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}

.page-title-link {
  display: block;
  background: none !important;
  padding: 0 !important;
}

.page-title-logo {
  height: 40px;
  width: auto;
  transition: filter 0.3s ease, transform 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(74, 158, 255, 0.3));
}

.page-title-link:hover .page-title-logo {
  filter: drop-shadow(0 0 10px rgba(74, 158, 255, 0.5));
  transform: scale(1.02);
}

@media screen and (max-width: 768px) {
  .page-title-logo {
    height: 32px;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
