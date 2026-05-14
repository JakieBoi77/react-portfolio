import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

import type { CSSVariableStyle } from "./types";

export const experienceTabs = [
    {
        id: "work",
        label: "Work",
        Icon: FaBriefcase,
    },
    {
        id: "education",
        label: "Education",
        Icon: FaGraduationCap,
    },
] satisfies Array<{
    id: string;
    label: string;
    Icon: IconType;
}>;

export type ExperienceTab = (typeof experienceTabs)[number]["id"];

export const experienceShellAccent = "56 189 248";
export const educationIconAccent = experienceShellAccent;
export const educationPanelAccent = "148 163 184";
export const educationStatusAccent = "34 197 94";

export const timelineAccents = [
    "56 189 248",
    "34 197 94",
    "244 63 94",
    "251 191 36",
];

const timelineGlassTextures: CSSVariableStyle[] = [
    {
        "--node-sheen-position": "12% 18%",
        "--node-accent-position": "88% 76%",
        "--node-bg-angle": "144deg",
        "--node-border-angle": "118deg",
        "--node-rim-angle": "132deg",
        "--node-noise-size": "154px 154px",
        "--node-noise-position": "10px 22px",
    },
    {
        "--node-sheen-position": "78% 16%",
        "--node-accent-position": "16% 84%",
        "--node-bg-angle": "156deg",
        "--node-border-angle": "154deg",
        "--node-rim-angle": "166deg",
        "--node-noise-size": "176px 176px",
        "--node-noise-position": "28px 8px",
    },
    {
        "--node-sheen-position": "20% 78%",
        "--node-accent-position": "84% 24%",
        "--node-bg-angle": "132deg",
        "--node-border-angle": "96deg",
        "--node-rim-angle": "108deg",
        "--node-noise-size": "164px 164px",
        "--node-noise-position": "4px 34px",
    },
];

export const floatInFromRightVariants: Variants = {
    hidden: {
        x: 52,
        opacity: 0,
    },
    show: (index = 0) => ({
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.78,
            bounce: 0.16,
            delay: Math.min(Number(index) * 0.07, 0.35),
        },
    }),
};

export const panelVariants: Variants = {
    hidden: {
        x: 20,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.22,
            ease: "easeOut",
        },
    },
    exit: {
        x: -14,
        opacity: 0,
        transition: {
            duration: 0.16,
            ease: "easeIn",
        },
    },
};

export const getTimelineStyle = (index: number, preferredAccent?: string) => {
    const accent =
        preferredAccent ?? timelineAccents[index % timelineAccents.length];
    const texture = timelineGlassTextures[index % timelineGlassTextures.length];

    return {
        accent,
        style: {
            ...texture,
            "--node-accent": accent,
            "--node-bg": "rgba(10, 15, 31, 0.66)",
            "--node-bg-strong": "rgba(12, 18, 38, 0.84)",
            "--node-noise": "0.2",
            borderColor: `rgb(${accent} / 0.28)`,
        } as CSSVariableStyle,
    };
};

export const getGlassPanelStyle = (index: number) => {
    const texture = timelineGlassTextures[index % timelineGlassTextures.length];

    return {
        accent: experienceShellAccent,
        style: {
            ...texture,
            "--node-accent": experienceShellAccent,
            "--node-bg": "rgba(10, 15, 31, 0.66)",
            "--node-bg-strong": "rgba(12, 18, 38, 0.84)",
            "--node-noise": "0.2",
            borderColor: `rgb(${experienceShellAccent} / 0.24)`,
        } as CSSVariableStyle,
    };
};

export const getWorkPanelStyle = (
    index: number,
    preferredAccent?: string,
) => {
    const texture =
        preferredAccent === "30 64 175"
            ? {
                  ...timelineGlassTextures[index % timelineGlassTextures.length],
                  "--node-accent-position": "88% 82%",
                  "--node-bg-angle": "138deg",
              }
            : timelineGlassTextures[index % timelineGlassTextures.length];

    return {
        accent: experienceShellAccent,
        style: {
            ...texture,
            "--node-accent": experienceShellAccent,
            "--node-bg": "rgba(10, 15, 31, 0.66)",
            "--node-bg-strong": "rgba(12, 18, 38, 0.84)",
            "--node-noise": "0.2",
            borderColor: `rgb(${experienceShellAccent} / 0.24)`,
        } as CSSVariableStyle,
    };
};

export const getEducationPanelStyle = (index: number) => {
    const texture = timelineGlassTextures[index % timelineGlassTextures.length];

    return {
        accent: educationPanelAccent,
        style: {
            ...texture,
            "--node-accent": educationPanelAccent,
            "--node-bg": "rgba(5, 10, 22, 0.78)",
            "--node-bg-strong": "rgba(7, 12, 25, 0.9)",
            "--node-noise": "0.12",
            borderColor: "rgba(148, 163, 184, 0.18)",
        } as CSSVariableStyle,
    };
};

export const getCourseAccent = (index: number) =>
    timelineAccents[index % timelineAccents.length];

export const splitGraphLabel = (
    label: string,
    maxLineLength = 22,
    maxLines = 2,
) => {
    const words = label.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
        const nextLine = currentLine ? `${currentLine} ${word}` : word;

        if (nextLine.length > maxLineLength && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = nextLine;
        }
    });

    if (currentLine) {
        lines.push(currentLine);
    }

    return lines.slice(0, maxLines);
};
