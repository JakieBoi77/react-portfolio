export const THEME_NAMES = ["default", "aurora", "sunset", "nebula", "forest", "mono"] as const
export type ThemeName = (typeof THEME_NAMES)[number]

export type ThemeFlags = {
    /** Frosted-glass surfaces (`.glassy`, `.glassy-node`, `.technology-card`). */
    glassy: boolean
    /** Full-page particle sparkles behind the hero content. */
    sparkles: boolean
    /** The full-screen "Hello, I'm Jake!" intro sequence shown on load. */
    introAnimation: boolean
    /** Radial spotlight glows behind the hero content. */
    spotlights: boolean
    /** Scroll/entrance animations (fade/slide-in) applied throughout the page. */
    animations: boolean
    /** Faint background grid pattern behind the hero/intro. */
    grid: boolean
}

export type Theme = {
    name: ThemeName
    /** Human-readable label shown in the dev theme switcher. */
    label: string
    flags: ThemeFlags
    /** Hex colour passed straight to the hero's particle sparkles. */
    sparkleColor: string
}

/**
 * The single source of truth for every theme. Each entry pairs a name with a
 * flag preset; the matching palette AND structural style tokens (corner
 * radius, heading font, grain, accent spread) live in a sibling
 * `[data-theme="name"]` block in app/globals.css. To add a new theme:
 *   1. Add its name to THEME_NAMES above.
 *   2. Add an entry here with a label, flag preset, and sparkle colour.
 *   3. Add a `[data-theme="name"] { ... }` block in globals.css defining its
 *      palette plus (optionally) --glass-radius/--node-radius/--theme-noise/
 *      --font-display/--heading-transform/--accent-showcase-1..5.
 * The dev theme switcher and SSR attributes pick it up automatically.
 */
export const THEMES: Record<ThemeName, Theme> = {
    default: {
        name: "default",
        label: "Default",
        flags: {
            glassy: true,
            sparkles: true,
            introAnimation: false,
            spotlights: true,
            animations: true,
            grid: true,
        },
        sparkleColor: "#FFFFFF",
    },
    aurora: {
        name: "aurora",
        label: "Aurora",
        flags: {
            glassy: true,
            sparkles: true,
            introAnimation: true,
            spotlights: true,
            animations: true,
            grid: true,
        },
        sparkleColor: "#5EEAD4",
    },
    sunset: {
        name: "sunset",
        label: "Sunset",
        flags: {
            glassy: true,
            sparkles: false,
            introAnimation: true,
            spotlights: true,
            animations: true,
            grid: false,
        },
        sparkleColor: "#FB923C",
    },
    nebula: {
        name: "nebula",
        label: "Nebula",
        flags: {
            glassy: true,
            sparkles: true,
            introAnimation: false,
            spotlights: true,
            animations: true,
            grid: true,
        },
        sparkleColor: "#F472EC",
    },
    forest: {
        name: "forest",
        label: "Forest",
        flags: {
            glassy: true,
            sparkles: false,
            introAnimation: false,
            spotlights: false,
            animations: true,
            grid: false,
        },
        sparkleColor: "#A3D170",
    },
    mono: {
        name: "mono",
        label: "Mono",
        flags: {
            glassy: false,
            sparkles: false,
            introAnimation: false,
            spotlights: false,
            animations: true,
            grid: false,
        },
        sparkleColor: "#E2E2EB",
    },
}

/** The theme rendered on the server and shown to real visitors. */
export const ACTIVE_THEME: Theme = THEMES.default

type ThemeFlagName = keyof ThemeFlags

const toKebabCase = (value: string) =>
    value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export const themeAttributesFor = (theme: Theme) =>
    ({
        "data-theme": theme.name,
        ...(Object.fromEntries(
            Object.entries(theme.flags).map(([flag, enabled]) => [
                `data-fx-${toKebabCase(flag)}`,
                enabled,
            ]),
        ) as Record<`data-fx-${ThemeFlagName}`, boolean>),
    }) as const

export const themeAttributes = themeAttributesFor(ACTIVE_THEME)
