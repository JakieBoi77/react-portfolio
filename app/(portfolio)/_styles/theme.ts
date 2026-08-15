export const THEME_NAMES = ["default"] as const
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
}

export type Theme = {
    name: ThemeName
    flags: ThemeFlags
}

export const DEFAULT_THEME: Theme = {
    name: "default",
    flags: {
        glassy: true,
        sparkles: true,
        introAnimation: true,
        spotlights: true,
        animations: true,
    },
}

export const ALTERNATE_THEME: Theme = {
    name: "default",
    flags: {
        glassy:false,
        sparkles: false,
        introAnimation: false,
        spotlights: false,
        animations: true,
    },
}

export const ACTIVE_THEME: Theme = ALTERNATE_THEME

type ThemeFlagName = keyof ThemeFlags

const toKebabCase = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export const themeAttributes = {
    "data-theme": ACTIVE_THEME.name,
    ...(Object.fromEntries(
        Object.entries(ACTIVE_THEME.flags).map(([flag, enabled]) => [
            `data-fx-${toKebabCase(flag)}`,
            enabled,
        ]),
    ) as Record<`data-fx-${ThemeFlagName}`, boolean>),
}
