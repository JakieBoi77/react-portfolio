import type { Variants } from "framer-motion";
import type { IconType } from "react-icons";
import { FaCode, FaLayerGroup } from "react-icons/fa";

import type { CSSVariableStyle } from "./types";

export const projectShellAccent = "56 189 248";

export const projectTabs = [
    {
        id: "featured",
        label: "Featured",
        Icon: FaLayerGroup,
        accent: projectShellAccent,
    },
    {
        id: "mini",
        label: "Mini",
        Icon: FaCode,
        accent: "34 197 94",
    },
] satisfies Array<{
    id: string;
    label: string;
    Icon: IconType;
    accent: string;
}>;

export type ProjectTab = (typeof projectTabs)[number]["id"];

export const projectAccents = [
    projectShellAccent,
    "34 197 94",
    "244 63 94",
    "251 191 36",
    "168 85 247",
];

const projectGlassTextures: CSSVariableStyle[] = [
    {
        "--node-sheen-position": "14% 18%",
        "--node-accent-position": "88% 78%",
        "--node-bg-angle": "144deg",
        "--node-border-angle": "118deg",
        "--node-rim-angle": "132deg",
        "--node-noise-size": "154px 154px",
        "--node-noise-position": "10px 22px",
    },
    {
        "--node-sheen-position": "80% 18%",
        "--node-accent-position": "16% 84%",
        "--node-bg-angle": "156deg",
        "--node-border-angle": "154deg",
        "--node-rim-angle": "166deg",
        "--node-noise-size": "176px 176px",
        "--node-noise-position": "28px 8px",
    },
    {
        "--node-sheen-position": "22% 78%",
        "--node-accent-position": "84% 24%",
        "--node-bg-angle": "132deg",
        "--node-border-angle": "96deg",
        "--node-rim-angle": "108deg",
        "--node-noise-size": "164px 164px",
        "--node-noise-position": "4px 34px",
    },
    {
        "--node-sheen-position": "74% 72%",
        "--node-accent-position": "16% 18%",
        "--node-bg-angle": "166deg",
        "--node-border-angle": "204deg",
        "--node-rim-angle": "216deg",
        "--node-noise-size": "188px 188px",
        "--node-noise-position": "38px 16px",
    },
];

export const getProjectAccent = (index: number) =>
    projectAccents[index % projectAccents.length];

export const getProjectGlassStyle = (
    index: number,
    accent = getProjectAccent(index),
) => {
    const texture = projectGlassTextures[index % projectGlassTextures.length];

    return {
        accent,
        style: {
            ...texture,
            "--node-accent": accent,
            "--node-bg": "rgba(10, 15, 31, 0.68)",
            "--node-bg-strong": "rgba(12, 18, 38, 0.84)",
            "--node-noise": "0.19",
            borderColor: `rgb(${accent} / 0.24)`,
        } as CSSVariableStyle,
    };
};

export const projectCardVariants: Variants = {
    hidden: {
        x: 52,
        opacity: 0,
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.78,
            bounce: 0.16,
        },
    },
};

export const projectPanelVariants: Variants = {
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
