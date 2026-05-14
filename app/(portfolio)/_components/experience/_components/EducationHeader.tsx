import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { FaExternalLinkAlt, FaUniversity } from "react-icons/fa";

import {
    educationIconAccent,
    educationStatusAccent,
    floatInFromRightVariants,
    getEducationPanelStyle,
} from "../_lib/constants";
import type { EducationItem } from "../_lib/types";

type EducationHeaderProps = {
    educationItem: EducationItem;
    index: number;
};

const EducationHeader = ({ educationItem, index }: EducationHeaderProps) => {
    const { style } = getEducationPanelStyle(index);
    const educationStatus =
        educationItem.status === "completed" ? "Completed" : "In progress";

    return (
        <motion.article
            custom={index}
            variants={floatInFromRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="glassy-node p-4 sm:p-5"
            style={style}
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 gap-3">
                    <span
                        className="grid size-12 shrink-0 place-items-center rounded-xl border bg-[rgb(var(--education-accent)/0.1)] text-[rgb(var(--education-accent))]"
                        style={
                            {
                                "--education-accent": educationIconAccent,
                                borderColor: `rgb(${educationIconAccent} / 0.34)`,
                            } as CSSProperties
                        }
                    >
                        <FaUniversity aria-hidden="true" className="size-6" />
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
                            {educationItem.school}
                        </h3>
                        <p className="mt-1 text-sm font-semibold leading-6 tracking-normal text-white-200 sm:text-base">
                            {educationItem.program}
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-6 tracking-normal text-white-100">
                            {educationItem.summary}
                        </p>
                    </div>
                </div>
                <div className="shrink-0 sm:text-right">
                    <p
                        className="font-mono text-xs uppercase leading-5 tracking-normal"
                        style={{ color: `rgb(${educationStatusAccent})` }}
                    >
                        {educationStatus}
                    </p>
                    <p className="text-xs leading-5 tracking-normal text-white-200">
                        {educationItem.location}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {educationItem.links.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold leading-none tracking-normal text-white-100 transition hover:border-[rgb(var(--node-accent)/0.36)] hover:text-[rgb(var(--node-accent))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                        {link.label}
                        <FaExternalLinkAlt
                            aria-hidden="true"
                            className="size-3"
                        />
                    </a>
                ))}
            </div>
        </motion.article>
    );
};

export default EducationHeader;
