"use client"

import { motion } from "framer-motion"
import type { CSSProperties, KeyboardEvent } from "react"
import { useRef } from "react"
import type { IconType } from "react-icons"

import { cn } from "@/lib/utils"

export type TabSwitcherOption<TId extends string> = {
    id: TId
    label: string
    Icon: IconType
    accent?: string
}

type TabSwitcherProps<TId extends string> = {
    options: ReadonlyArray<TabSwitcherOption<TId>>
    value: TId
    onChange: (id: TId) => void
    idPrefix: string
    label: string
    accent: string
    className?: string
    style?: CSSProperties
}

const TabSwitcher = <TId extends string>({
    options,
    value,
    onChange,
    idPrefix,
    label,
    accent,
    className,
    style,
}: TabSwitcherProps<TId>) => {
    const tabRefs = useRef<Partial<Record<TId, HTMLButtonElement | null>>>({})

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = options.findIndex((option) => option.id === value)
        let nextIndex: number | null = null

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % options.length
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (currentIndex - 1 + options.length) % options.length
        } else if (event.key === "Home") {
            nextIndex = 0
        } else if (event.key === "End") {
            nextIndex = options.length - 1
        }

        if (nextIndex === null) {
            return
        }

        event.preventDefault()
        const nextId = options[nextIndex].id
        onChange(nextId)
        tabRefs.current[nextId]?.focus()
    }

    return (
        <div
            role="tablist"
            aria-label={label}
            onKeyDown={handleKeyDown}
            className={cn("glassy-node mt-5 flex w-full gap-1.5 p-1.5", className)}
            style={style}
        >
            {options.map(({ id, label: optionLabel, Icon, accent: optionAccent }) => {
                const isActive = value === id
                const tabAccent = optionAccent ?? accent

                return (
                    <button
                        key={id}
                        ref={(node) => {
                            tabRefs.current[id] = node
                        }}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`${idPrefix}-panel-${id}`}
                        id={`${idPrefix}-tab-${id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => onChange(id)}
                        className={cn(
                            "relative inline-flex h-10 flex-1 items-center justify-center rounded-lg border text-center text-sm font-semibold leading-none tracking-normal transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                            isActive
                                ? "border-transparent text-white"
                                : "border-white/[0.09] bg-white/[0.025] text-ink-muted hover:-translate-y-px hover:border-white/25 hover:bg-white/[0.07] hover:text-white",
                        )}
                    >
                        {isActive && (
                            <motion.span
                                layoutId={`${idPrefix}-tab-indicator`}
                                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                aria-hidden="true"
                                className="absolute inset-0 rounded-lg border shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                                style={{
                                    borderColor: `rgb(${tabAccent} / 0.45)`,
                                    backgroundColor: `rgb(${tabAccent} / 0.13)`,
                                }}
                            />
                        )}
                        <span
                            className="relative z-10 inline-flex items-center gap-2 px-3"
                            style={isActive ? { color: `rgb(${tabAccent})` } : undefined}
                        >
                            <Icon aria-hidden="true" className="size-4" />
                            {optionLabel}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export { TabSwitcher }
