"use client"

import { SectionHeading, SectionWrapper, TabSwitcher } from "@components"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { fadeIn } from "@/utils/motion"
import FeaturedProjectsPanel from "./_components/FeaturedProjectsPanel"
import LearningProjectsPanel from "./_components/LearningProjectsPanel"
import {
    getProjectGlassStyle,
    type ProjectTab,
    projectPanelVariants,
    projectShellAccent,
    projectTabs,
} from "./_lib/constants"
import type { CSSVariableStyle } from "./_lib/types"

const Projects = () => {
    const [activeTab, setActiveTab] = useState<ProjectTab>("featured")
    const switcherShell = getProjectGlassStyle(0, projectShellAccent)

    return (
        <div className="w-full">
            <motion.div
                variants={fadeIn("up", "spring", 0.1, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.01 }}
            >
                <SectionHeading
                    title="Projects"
                    description="Featured full-stack builds and smaller projects from my learning path."
                >
                    <TabSwitcher
                        options={projectTabs}
                        value={activeTab}
                        onChange={setActiveTab}
                        idPrefix="projects"
                        label="Project sections"
                        accent={projectShellAccent}
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
                        id={`projects-panel-${activeTab}`}
                        role="tabpanel"
                        aria-labelledby={`projects-tab-${activeTab}`}
                        variants={projectPanelVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        {activeTab === "featured" ? (
                            <FeaturedProjectsPanel />
                        ) : (
                            <LearningProjectsPanel />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Projects, "projects")
