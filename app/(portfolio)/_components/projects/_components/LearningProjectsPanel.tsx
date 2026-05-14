"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { learningProjectCollections } from "../../../_data/portfolio";
import {
    getProjectAccent,
    getProjectGlassStyle,
    projectCardVariants,
} from "../_lib/constants";
import type {
    CSSVariableStyle,
    LearningProjectCollection,
} from "../_lib/types";
import ProjectIconStack from "./ProjectIconStack";

type LearningProjectShowcaseProps = {
    collection: LearningProjectCollection;
    collectionIndex: number;
};

const LearningProjectShowcase = ({
    collection,
    collectionIndex,
}: LearningProjectShowcaseProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const accent = getProjectAccent(collectionIndex + 1);
    const { style } = getProjectGlassStyle(collectionIndex + 1, accent);
    const activeProject = collection.projects[activeIndex];

    return (
        <motion.section
            custom={collectionIndex}
            variants={projectCardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="glassy-node p-3 sm:p-4"
            style={style}
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <p
                        className="font-mono text-xs uppercase leading-5 tracking-normal"
                        style={{ color: `rgb(${accent})` }}
                    >
                        collection / 0{collectionIndex + 1}
                    </p>
                    <h3 className="text-xl font-semibold leading-tight tracking-normal text-white">
                        {collection.collectionTitle}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 tracking-normal text-white-100">
                        {collection.des}
                    </p>
                </div>

                <ProjectIconStack
                    icons={collection.iconLists}
                    accent={accent}
                    label={`${collection.collectionTitle} technologies`}
                    className="sm:justify-end"
                />
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]">
                <div
                    id={`mini-project-preview-${collection.folder}`}
                    role="tabpanel"
                    aria-live="polite"
                    className="overflow-hidden rounded-xl border border-white/10 bg-black-100/45"
                >
                    <div className="flex h-9 items-center gap-2 border-b border-white/10 bg-white/[0.035] px-3">
                        <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full bg-[rgb(244,63,94)]"
                        />
                        <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full bg-[rgb(251,191,36)]"
                        />
                        <span
                            aria-hidden="true"
                            className="size-2.5 rounded-full bg-[rgb(34,197,94)]"
                        />
                        <span className="ml-2 truncate font-mono text-[0.68rem] uppercase leading-none tracking-normal text-white-100">
                            /{collection.folder}/{activeProject.value}
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.value}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <Link
                                href={`/${collection.folder}/${activeProject.value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                            >
                                <span className="block aspect-[16/10] overflow-hidden bg-black-100">
                                    <img
                                        src={activeProject.pic}
                                        alt={`${activeProject.title} preview`}
                                        className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                    />
                                </span>

                                <span className="grid min-h-[10rem] gap-3 border-t border-white/10 p-4 sm:min-h-[7.75rem] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                                    <span className="min-w-0">
                                        <span className="line-clamp-2 block text-lg font-semibold leading-tight tracking-normal text-white">
                                            {activeProject.title}
                                        </span>
                                        <span className="mt-2 line-clamp-3 block min-h-[4.5rem] text-sm leading-6 tracking-normal text-white-100">
                                            {activeProject.des}
                                        </span>
                                    </span>

                                    <span
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-white/[0.04] px-3 text-sm font-semibold leading-none tracking-normal text-white transition group-hover:-translate-y-0.5 group-hover:bg-white/[0.08]"
                                        style={{
                                            borderColor: `rgb(${accent} / 0.3)`,
                                        }}
                                    >
                                        Open
                                        <FaArrowRight
                                            aria-hidden="true"
                                            className="size-3"
                                        />
                                    </span>
                                </span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div
                    role="tablist"
                    aria-label={`${collection.collectionTitle} projects`}
                    className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
                >
                    {collection.projects.map((project, projectIndex) => {
                        const isActive = projectIndex === activeIndex;

                        return (
                            <button
                                key={project.value}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`mini-project-preview-${collection.folder}`}
                                onClick={() => setActiveIndex(projectIndex)}
                                className={cn(
                                    "group grid min-h-[4.75rem] grid-cols-[4.25rem_minmax(0,1fr)] items-center overflow-hidden rounded-xl border bg-black-100/45 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                                    isActive
                                        ? "border-white/20"
                                        : "border-white/10 opacity-70 hover:opacity-100",
                                )}
                                style={
                                    {
                                        borderColor: isActive
                                            ? `rgb(${accent} / 0.44)`
                                            : undefined,
                                    } as CSSVariableStyle
                                }
                            >
                                <span className="block h-full min-h-[4.75rem] w-full overflow-hidden bg-black-100">
                                    <img
                                        src={project.pic}
                                        alt=""
                                        aria-hidden="true"
                                        className={cn(
                                            "size-full object-cover transition duration-300",
                                            isActive
                                                ? "opacity-100"
                                                : "opacity-60 group-hover:opacity-90",
                                        )}
                                    />
                                </span>

                                <span className="min-w-0 px-3">
                                    <span className="flex min-w-0 items-baseline gap-2">
                                        <span
                                            className="shrink-0 font-mono text-[0.68rem] uppercase leading-4 tracking-normal"
                                            style={{
                                                color: isActive
                                                    ? `rgb(${accent})`
                                                    : undefined,
                                            }}
                                        >
                                            0{projectIndex + 1}
                                        </span>
                                        <span className="truncate text-sm font-semibold leading-5 tracking-normal text-white">
                                            {project.title}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};

const LearningProjectsPanel = () => {
    return (
        <div className="mx-auto max-w-4xl space-y-9">
            {learningProjectCollections.map((collection, collectionIndex) => (
                <LearningProjectShowcase
                    key={collection.collectionTitle}
                    collection={collection}
                    collectionIndex={collectionIndex}
                />
            ))}
        </div>
    );
};

export default LearningProjectsPanel;
