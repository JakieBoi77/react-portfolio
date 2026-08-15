export const THEME_NAMES = ["default"] as const
export type ThemeName = (typeof THEME_NAMES)[number]

export type ThemeFlags = {
    /** Frosted-glass surfaces (`.glassy`, `.glassy-node`, `.technology-card`). */
    glassy: boolean
    /** Full-page particle sparkles behind the hero content. */
    sparkles: boolean
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
    },
}

export const ACTIVE_THEME: Theme = DEFAULT_THEME

type ThemeFlagName = keyof ThemeFlags

export const themeAttributes = {
    "data-theme": ACTIVE_THEME.name,
    ...(Object.fromEntries(
        Object.entries(ACTIVE_THEME.flags).map(([flag, enabled]) => [`data-fx-${flag}`, enabled]),
    ) as Record<`data-fx-${ThemeFlagName}`, boolean>),
}
