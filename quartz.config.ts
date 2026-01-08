import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Void Sector",
    pageTitleSuffix: " | Void Sector Lore",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "void-sector-lore",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "JetBrains Mono",
        code: "JetBrains Mono",
      },
      colors: {
        // Both modes use dark theme to match game aesthetic
        lightMode: {
          light: "#0a0a0f",         // void black background
          lightgray: "#0a0f19",     // dark navy panels
          gray: "#6688aa",          // muted blue-gray
          darkgray: "#aabbcc",      // cool gray text
          dark: "#ddeeff",          // bright text
          secondary: "#4a9eff",     // cyan accent (links, interactive)
          tertiary: "#44ff88",      // green accent (success, active)
          highlight: "rgba(74, 158, 255, 0.15)",
          textHighlight: "#8c5ac888", // purple highlight
        },
        darkMode: {
          light: "#0a0a0f",         // void black background
          lightgray: "#0a0f19",     // dark navy panels
          gray: "#6688aa",          // muted blue-gray
          darkgray: "#aabbcc",      // cool gray text
          dark: "#ddeeff",          // bright text
          secondary: "#4a9eff",     // cyan accent (links, interactive)
          tertiary: "#44ff88",      // green accent (success, active)
          highlight: "rgba(74, 158, 255, 0.15)",
          textHighlight: "#8c5ac888", // purple highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // CustomOgImages disabled - requires network access for fonts
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
