import type { IconType } from "react-icons";
import { FaCode, FaPuzzlePiece, FaServer, FaTerminal } from "react-icons/fa";

import type { CSSVariableStyle } from "@components";

export const rootGlassStyle: CSSVariableStyle = {
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

export const branchGlassStyle: CSSVariableStyle = {
    "--node-bg": "rgba(10, 15, 31, 0.72)",
    "--node-bg-strong": "rgba(12, 18, 38, 0.82)",
    "--node-noise": "0.19",
    "--node-shadow":
        "inset 0 1px 0 rgba(255, 255, 255, 0.045), 0 1px 3px rgba(0, 0, 0, 0.16), 0 12px 30px rgba(0, 0, 0, 0.3)",
};

export const branchIcons = {
    frontend: FaCode,
    backend: FaServer,
    tooling: FaTerminal,
    misc: FaPuzzlePiece,
} satisfies Record<string, IconType>;

export const branchAccents = {
    frontend: "56 189 248",
    backend: "244 63 94",
    tooling: "34 197 94",
    misc: "168 85 247",
} satisfies Record<string, string>;

export const branchGlassTextures: Record<string, CSSVariableStyle> = {
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

export const technologyGlassTextures: CSSVariableStyle[] = [
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
