"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "../../_styles/ThemeProvider"
import { THEME_NAMES, THEMES } from "../../_styles/theme"

// Colours are set inline (not via Tailwind utility classes) so this dev-only
// overlay always renders with guaranteed contrast, independent of the active
// theme's tokens, corner radius, and heading font. This tree also sits
// outside the `.tw-class`/`#tw-id` scope that Tailwind's preflight reset is
// scoped to (see globals.css), so plain <button>s keep the browser's native
// background unless it's overridden explicitly below.
const panelStyle: React.CSSProperties = {
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    backgroundColor: "#18181b",
    color: "#f4f4f5",
    border: "1px solid rgba(255,255,255,0.15)",
}

const DevThemeSwitcher = () => {
    const { theme, setThemeName } = useTheme()
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return

        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false)
        }

        document.addEventListener("mousedown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [open])

    return (
        <div
            ref={rootRef}
            className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center"
        >
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="listbox"
                aria-expanded={open}
                style={{ ...panelStyle, borderRadius: 9999 }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium shadow-lg transition-colors hover:brightness-125"
            >
                <span
                    style={{ backgroundColor: "#fbbf24", color: "#18181b" }}
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                >
                    Dev
                </span>
                <span>{theme.label}</span>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {open && (
                <div
                    role="listbox"
                    style={{ ...panelStyle, borderRadius: 10 }}
                    className="mt-2 w-44 overflow-hidden py-1 text-xs shadow-xl"
                >
                    {THEME_NAMES.map((name) => {
                        const isActive = name === theme.name
                        return (
                            <button
                                key={name}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onClick={() => {
                                    setThemeName(name)
                                    setOpen(false)
                                }}
                                style={{
                                    color: isActive ? "#fbbf24" : "#f4f4f5",
                                    backgroundColor: "transparent",
                                }}
                                className="flex w-full items-center justify-between px-3 py-1.5 text-left transition-colors hover:bg-white/10"
                            >
                                {THEMES[name].label}
                                {isActive && <span aria-hidden="true">✓</span>}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DevThemeSwitcher
