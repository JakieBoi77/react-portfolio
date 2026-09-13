"use client"

import { SectionHeading, SectionWrapper, TabSwitcher } from "@components"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
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
                    <TabSwitcher
                        options={experienceTabs}
                        value={activeTab}
                        onChange={setActiveTab}
                        idPrefix="experience"
                        label="Experience sections"
                        accent={switcherShell.accent}
                        style={
                            {
                                ...switcherShell.style,
                                "--node-bg": "rgb(var(--glass-panel) / 0.6)",
                                "--node-bg-strong": "rgb(var(--glass-panel-strong) / 0.78)",
                                "--node-radius": "0.75rem",
                            } as CSSVariableStyle
                        }
                    />
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
