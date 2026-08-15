"use client"

import { SectionHeading, SectionWrapper } from "@components"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { fadeIn } from "@/utils/motion"
import EducationPanel from "./_components/EducationPanel"
import WorkPanel from "./_components/WorkPanel"
import {
    type ExperienceTab,
    experienceTabs,
    getGlassPanelStyle,
    panelVariants,
} from "./_lib/constants"
import type { CSSVariableStyle } from "./_lib/types"

const Experience = () => {
    const [activeTab, setActiveTab] = useState<ExperienceTab>("work")
    const switcherShell = getGlassPanelStyle(0)

    return (
        <div className="w-full">
            <motion.div
                variants={fadeIn("up", "spring", 0.1, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.01 }}
            >
                <SectionHeading
                    title="Experience"
                    description="A collection of my work history and education."
                >
                    <div
                        role="tablist"
                        aria-label="Experience sections"
                        className="glassy-node mt-5 flex w-full p-1"
                        style={
                            {
                                ...switcherShell.style,
                                "--node-bg": "rgb(var(--glass-panel) / 0.6)",
                                "--node-bg-strong": "rgb(var(--glass-panel-strong) / 0.78)",
                                "--node-radius": "0.75rem",
                            } as CSSVariableStyle
                        }
                    >
                        {experienceTabs.map(({ id, label, Icon }) => {
                            const isActive = activeTab === id

                            return (
                                <button
                                    key={id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    aria-controls={`experience-panel-${id}`}
                                    id={`experience-tab-${id}`}
                                    onClick={() => setActiveTab(id)}
                                    className={cn(
                                        "inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 text-center text-sm font-semibold leading-none tracking-normal transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                                        isActive
                                            ? "border border-white/10 bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                            : "text-ink-muted hover:bg-white/[0.035] hover:text-white",
                                    )}
                                    style={
                                        isActive
                                            ? {
                                                  color: `rgb(${switcherShell.accent})`,
                                              }
                                            : undefined
                                    }
                                >
                                    <Icon aria-hidden="true" className="size-4" />
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </SectionHeading>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        id={`experience-panel-${activeTab}`}
                        role="tabpanel"
                        aria-labelledby={`experience-tab-${activeTab}`}
                        variants={panelVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        {activeTab === "work" ? <WorkPanel /> : <EducationPanel />}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Experience, "experience")
