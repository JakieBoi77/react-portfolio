import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
    floatInFromRightVariants,
    getWorkPanelStyle,
} from "../_lib/constants";
import type { CSSVariableStyle, ExperienceItem } from "../_lib/types";

type ExperienceCardProps = {
    experience: ExperienceItem;
    index: number;
    isLast: boolean;
};

const ExperienceCard = ({ experience, index, isLast }: ExperienceCardProps) => {
    const accent = experience.timelineAccent;
    const { style } = getWorkPanelStyle(index, accent);

    return (
        <motion.li
            custom={index}
            variants={floatInFromRightVariants}
            className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 pb-7 last:pb-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.01 }}
        >
            <div className="relative flex justify-center">
                <span
                    aria-hidden="true"
                    className={cn(
                        "absolute top-14 w-px rounded-full sm:top-16",
                        isLast ? "bottom-0" : "bottom-[-1.75rem]",
                    )}
                    style={{
                        background: `linear-gradient(to bottom, rgb(${accent} / 0.72), rgb(${accent} / 0.18), transparent)`,
                    }}
                />

                <div
                    className="glassy-node grid size-14 shrink-0 place-items-center rounded-2xl p-1.5 shadow-[0_0_28px_rgb(var(--node-accent)/0.2)] sm:size-16"
                    style={
                        {
                            ...style,
                            "--node-accent": accent,
                            borderColor: `rgb(${accent} / 0.42)`,
                        } as CSSVariableStyle
                    }
                >
                    <span
                        className="grid size-full place-items-center rounded-xl border border-white/15 p-1.5"
                        style={{
                            backgroundColor: experience.iconBg,
                            borderColor: `rgb(${accent} / 0.34)`,
                        }}
                    >
                        <img
                            src={experience.icon}
                            alt={experience.companyName}
                            className="max-h-full max-w-full object-contain"
                        />
                    </span>
                </div>
            </div>

            <article
                className={cn(
                    "glassy-node p-4 transition duration-300 sm:p-5",
                    "hover:-translate-y-0.5 hover:border-white/20",
                )}
                style={style}
            >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
                            {experience.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold leading-6 tracking-normal text-white-200 sm:text-base">
                            {experience.companyName}
                        </p>
                    </div>
                    <p
                        className="shrink-0 font-mono text-xs uppercase leading-5 tracking-normal"
                        style={{ color: `rgb(${accent})` }}
                    >
                        {experience.date}
                    </p>
                </div>

                <ul className="mt-4 space-y-3">
                    {experience.points.map((point, pointIndex) => (
                        <li
                            key={`experience-point-${index}-${pointIndex}`}
                            className="flex gap-3 text-sm leading-6 tracking-normal text-white-100"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-2 size-1.5 shrink-0 rounded-full shadow-[0_0_12px_rgb(var(--node-accent)/0.68)]"
                                style={{ backgroundColor: `rgb(${accent})` }}
                            />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </motion.li>
    );
};

export default ExperienceCard;
