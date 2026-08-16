"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ACTIVE_THEME, THEMES, type Theme, type ThemeName, themeAttributesFor } from "./theme"

const STORAGE_KEY = "dev-theme"
const isDev = process.env.NODE_ENV === "development"

type ThemeContextValue = {
    theme: Theme
    /** No-op outside development; the site otherwise always renders ACTIVE_THEME. */
    setThemeName: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const applyThemeAttributes = (theme: Theme) => {
    const root = document.documentElement
    for (const [attribute, value] of Object.entries(themeAttributesFor(theme))) {
        root.setAttribute(attribute, String(value))
    }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [themeName, setThemeNameState] = useState<ThemeName>(ACTIVE_THEME.name)

    // Dev-only: pick up a previously chosen theme so the switcher survives reloads.
    useEffect(() => {
        if (!isDev) return
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored && stored in THEMES) {
            setThemeNameState(stored as ThemeName)
        }
    }, [])

    const theme = THEMES[themeName]

    useEffect(() => {
        if (!isDev) return
        applyThemeAttributes(theme)
    }, [theme])

    const setThemeName = useCallback((name: ThemeName) => {
        if (!isDev) return
        setThemeNameState(name)
        window.localStorage.setItem(STORAGE_KEY, name)
    }, [])

    const value = useMemo(() => ({ theme, setThemeName }), [theme, setThemeName])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
