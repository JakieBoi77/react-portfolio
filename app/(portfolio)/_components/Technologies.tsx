"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
    FaCode,
    FaExternalLinkAlt,
    FaLayerGroup,
    FaPuzzlePiece,
    FaServer,
    FaTerminal,
} from "react-icons/fa";

import { technologies, technologySkillTree } from "../_data/portfolio";
import SectionWrapper from "./SectionWrapper";
import { fadeIn } from "@/utils/motion";
import { cn } from "@/lib/utils";

type CSSVariableStyle = React.CSSProperties & {
    [key: `--${string}`]: string | number | undefined;
};

const rootGlassStyle: CSSVariableStyle = {
    "--node-accent": "203 172 249",
    "--node-bg": "rgba(10, 15, 31, 0.78)",
    "--node-bg-strong": "rgba(12, 18, 38, 0.88)",
    "--node-noise": "0.2",
    "--node-sheen-position": "18% 12%",
    "--node-accent-position": "82% 78%",
    "--node-bg-angle": "150deg",
    "--node-border-angle": "122deg",
    "--node-rim-angle": "128deg",
    "--node-noise-size": "176px 176px",
    "--node-noise-position": "12px 18px",
};

const branchGlassStyle: CSSVariableStyle = {
    "--node-bg": "rgba(10, 15, 31, 0.72)",
    "--node-bg-strong": "rgba(12, 18, 38, 0.82)",
    "--node-noise": "0.19",
    "--node-shadow":
        "inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 3px rgba(0, 0, 0, 0.16), 0 12px 30px rgba(0, 0, 0, 0.3)",
};

const branchIcons = {
    frontend: FaCode,
    backend: FaServer,
    tooling: FaTerminal,
    misc: FaPuzzlePiece,
} satisfies Record<string, IconType>;

const branchAccents = {
    frontend: "56 189 248",
    backend: "244 63 94",
    tooling: "34 197 94",
    misc: "168 85 247",
} satisfies Record<string, string>;

const branchGlassTextures: Record<string, CSSVariableStyle> = {
    frontend: {
        "--node-sheen-position": "12% 20%",
        "--node-accent-position": "90% 70%",
        "--node-bg-angle": "142deg",
        "--node-border-angle": "118deg",
        "--node-rim-angle": "132deg",
        "--node-noise-size": "142px 142px",
        "--node-noise-position": "9px 22px",
    },
    backend: {
        "--node-sheen-position": "78% 18%",
        "--node-accent-position": "18% 82%",
        "--node-bg-angle": "158deg",
        "--node-border-angle": "154deg",
        "--node-rim-angle": "166deg",
        "--node-noise-size": "174px 174px",
        "--node-noise-position": "26px 6px",
    },
    tooling: {
        "--node-sheen-position": "22% 78%",
        "--node-accent-position": "84% 24%",
        "--node-bg-angle": "132deg",
        "--node-border-angle": "92deg",
        "--node-rim-angle": "104deg",
        "--node-noise-size": "156px 156px",
        "--node-noise-position": "3px 34px",
    },
    misc: {
        "--node-sheen-position": "74% 72%",
        "--node-accent-position": "16% 18%",
        "--node-bg-angle": "166deg",
        "--node-border-angle": "204deg",
        "--node-rim-angle": "216deg",
        "--node-noise-size": "188px 188px",
        "--node-noise-position": "38px 16px",
    },
};

const technologyGlassTextures: CSSVariableStyle[] = [
    {
        "--tech-sheen-position": "90% 12%",
        "--tech-accent-position": "8% 88%",
        "--tech-bg-angle": "144deg",
        "--tech-wash-angle": "94deg",
        "--tech-noise-size": "132px 132px",
        "--tech-noise-position": "0 12px",
    },
    {
        "--tech-sheen-position": "16% 18%",
        "--tech-accent-position": "88% 84%",
        "--tech-bg-angle": "158deg",
        "--tech-wash-angle": "168deg",
        "--tech-noise-size": "154px 154px",
        "--tech-noise-position": "28px 4px",
    },
    {
        "--tech-sheen-position": "82% 76%",
        "--tech-accent-position": "14% 20%",
        "--tech-bg-angle": "132deg",
        "--tech-wash-angle": "12deg",
        "--tech-noise-size": "146px 146px",
        "--tech-noise-position": "14px 36px",
    },
    {
        "--tech-sheen-position": "22% 82%",
        "--tech-accent-position": "86% 18%",
        "--tech-bg-angle": "166deg",
        "--tech-wash-angle": "128deg",
        "--tech-noise-size": "168px 168px",
        "--tech-noise-position": "42px 18px",
    },
];

const Technologies = () => {
    const treeRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const branchRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const connectorRefs = useRef<Record<string, SVGPathElement | null>>({});

    const [selectedBranchId, setSelectedBranchId] = useState(
        technologySkillTree.branches[0].id,
    );

    const selectedBranch =
        technologySkillTree.branches.find(
            (branch) => branch.id === selectedBranchId,
        ) ?? technologySkillTree.branches[0];

    const selectedTechnologies = useMemo(
        () =>
            selectedBranch.technologies
                .map((technologyName) =>
                    technologies.find(
                        (technology) => technology.name === technologyName,
                    ),
                )
                .filter(
                    (technology): technology is (typeof technologies)[number] =>
                        Boolean(technology),
                ),
        [selectedBranch],
    );

    const setBranchRef = useCallback(
        (branchId: string) => (node: HTMLButtonElement | null) => {
            branchRefs.current[branchId] = node;
        },
        [],
    );

    const setConnectorRef = useCallback(
        (branchId: string) => (node: SVGPathElement | null) => {
            connectorRefs.current[branchId] = node;
        },
        [],
    );

    useEffect(() => {
        let animationFrame = 0;

        const updateConnectors = () => {
            const tree = treeRef.current;
            const root = rootRef.current;

            if (!tree || !root) {
                return;
            }

            const treeRect = tree.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            const startX = rootRect.left + rootRect.width / 2 - treeRect.left;
            const startY = rootRect.bottom - treeRect.top;

            technologySkillTree.branches.forEach((branch) => {
                const branchNode = branchRefs.current[branch.id];
                const connector = connectorRefs.current[branch.id];

                if (!branchNode || !connector) {
                    return;
                }

                const branchRect = branchNode.getBoundingClientRect();
                const endX =
                    branchRect.left + branchRect.width / 2 - treeRect.left;
                const endY = branchRect.top - treeRect.top;
                const distanceY = Math.max(48, endY - startY);
                const controlY = startY + distanceY * 0.55;
                const accent =
                    branchAccents[branch.id as keyof typeof branchAccents] ??
                    "203 172 249";

                connector.setAttribute(
                    "d",
                    `M ${startX} ${startY} C ${startX} ${controlY}, ${endX} ${controlY}, ${endX} ${endY}`,
                );
                connector.style.setProperty("--branch-accent", accent);
            });
        };

        const scheduleUpdate = () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(updateConnectors);
        };

        scheduleUpdate();
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, []);

    const selectedAccent =
        branchAccents[selectedBranch.id as keyof typeof branchAccents] ??
        "203 172 249";

    return (
        <div className="w-full">
            <motion.div
                variants={fadeIn("up", "spring", 0.1, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <div className="mx-auto mb-7 max-w-4xl text-left">
                    <h2 className="text-2xl font-bold leading-tight tracking-normal text-white sm:text-3xl">
                        Technologies
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 tracking-normal text-white-100">
                        A compact map of the tools I use across the stack.
                    </p>
                </div>

                <div ref={treeRef} className="relative mx-auto max-w-4xl pt-1">
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible"
                    >
                        {technologySkillTree.branches.map((branch) => (
                            <path
                                key={branch.id}
                                ref={setConnectorRef(branch.id)}
                                style={
                                    {
                                        "--branch-accent":
                                            branchAccents[
                                                branch.id as keyof typeof branchAccents
                                            ] ?? "203 172 249",
                                    } as React.CSSProperties
                                }
                                className={cn(
                                    "transition-opacity duration-300",
                                    branch.id === selectedBranchId
                                        ? "opacity-100"
                                        : "opacity-35",
                                )}
                                fill="none"
                                stroke="rgb(var(--branch-accent) / 0.72)"
                                strokeWidth={
                                    branch.id === selectedBranchId ? 1.6 : 1.1
                                }
                                strokeLinecap="round"
                            />
                        ))}
                    </svg>

                    <div
                        ref={rootRef}
                        className="glassy-node relative z-10 mx-auto max-w-md p-4 text-center"
                        style={rootGlassStyle}
                    >
                        <span
                            className="relative mx-auto mb-3 grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-[rgb(var(--node-accent))]"
                            aria-hidden="true"
                        >
                            <FaLayerGroup className="size-6" />
                            <span className="absolute left-2 top-2 size-2 rounded-full bg-[rgb(56,189,248)] shadow-[0_0_12px_rgba(56,189,248,0.65)]" />
                            <span className="absolute right-2 top-2 size-2 rounded-full bg-[rgb(244,63,94)] shadow-[0_0_12px_rgba(244,63,94,0.65)]" />
                            <span className="absolute bottom-2 left-2 size-2 rounded-full bg-[rgb(34,197,94)] shadow-[0_0_12px_rgba(34,197,94,0.65)]" />
                            <span className="absolute bottom-2 right-2 size-2 rounded-full bg-[rgb(168,85,247)] shadow-[0_0_12px_rgba(168,85,247,0.65)]" />
                        </span>
                        <h3 className="text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
                            {technologySkillTree.root.title}
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 tracking-normal text-white-100 sm:text-sm">
                            &ldquo;{technologySkillTree.root.quote}&rdquo;
                        </p>
                    </div>

                    <div className="relative z-10 grid gap-3 pt-14 sm:grid-cols-2 lg:grid-cols-4">
                        {technologySkillTree.branches.map((branch) => {
                            const isSelected = branch.id === selectedBranch.id;
                            const BranchIcon =
                                branchIcons[
                                    branch.id as keyof typeof branchIcons
                                ];
                            const branchAccent =
                                branchAccents[
                                    branch.id as keyof typeof branchAccents
                                ] ?? "203 172 249";

                            return (
                                <button
                                    key={branch.id}
                                    ref={setBranchRef(branch.id)}
                                    type="button"
                                    onClick={() =>
                                        setSelectedBranchId(branch.id)
                                    }
                                    className={cn(
                                        "glassy-node min-h-24 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                                        isSelected
                                            ? "border-white/15"
                                            : "opacity-80 hover:opacity-100",
                                    )}
                                    style={
                                        {
                                            ...branchGlassStyle,
                                            ...(branchGlassTextures[
                                                branch.id as keyof typeof branchGlassTextures
                                            ] ?? {}),
                                            "--node-accent": branchAccent,
                                            borderColor: isSelected
                                                ? `rgb(${branchAccent} / 0.34)`
                                                : undefined,
                                        } as CSSVariableStyle
                                    }
                                >
                                    <span className="flex gap-3 py-2.5 pl-3.5 pr-2.5">
                                        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-[rgb(var(--node-accent)/0.34)] bg-[rgb(var(--node-accent)/0.1)] text-[rgb(var(--node-accent))]">
                                            <BranchIcon
                                                aria-hidden="true"
                                                className="size-6"
                                            />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold leading-5 tracking-normal text-white">
                                                {branch.title}
                                            </span>
                                            <span className="mt-0.5 block text-xs leading-5 tracking-normal text-white-100">
                                                {branch.summary}
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-4xl">
                    <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p
                                className="font-mono text-xs uppercase tracking-normal"
                                style={{ color: `rgb(${selectedAccent})` }}
                            >
                                fullstack / {selectedBranch.id}
                            </p>
                            <h3 className="text-xl font-semibold leading-tight tracking-normal text-white">
                                {selectedBranch.title}
                            </h3>
                        </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {selectedTechnologies.map((technology, index) => {
                            const texture =
                                technologyGlassTextures[
                                    index % technologyGlassTextures.length
                                ];

                            return (
                                <a
                                    key={technology.name}
                                    href={technology.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="technology-card grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 p-2.5 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                                    style={
                                        {
                                            ...texture,
                                            "--tech-accent": selectedAccent,
                                        } as CSSVariableStyle
                                    }
                                >
                                    <span className="grid size-10 place-items-center rounded-lg border border-white/10 bg-black-100/35">
                                        <img
                                            src={technology.icon}
                                            alt=""
                                            aria-hidden="true"
                                            className="size-6"
                                        />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="technology-card-title block text-sm font-semibold leading-5 tracking-normal text-white">
                                            {technology.name}
                                        </span>
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="technology-card-arrow grid size-7 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-white-200"
                                    >
                                        <FaExternalLinkAlt className="size-3" />
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SectionWrapper(Technologies, "technologies");
