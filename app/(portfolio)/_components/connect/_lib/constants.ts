import { links } from "../../../_data/portfolio";
import type { ContactProfile, CSSVariableStyle } from "./types";

export const connectAccent = "56 189 248";

const profileMeta = {
    GitHub: {
        accent: "203 172 249",
        cta: "View code",
        description: "Browse active projects, experiments, and source code.",
    },
    Email: {
        accent: connectAccent,
        cta: "Send email",
        description:
            "Feel free to send me a message about projects, software roles, collaboration ideas, or anything else worth talking about.",
    },
    LinkedIn: {
        accent: "34 197 94",
        cta: "Connect",
        description:
            "Follow career updates and connect through my LinkedIn profile.",
    },
    Resume: {
        accent: "251 191 36",
        cta: "Open PDF",
        description: "View a concise summary of my experience and skills.",
    },
} satisfies Record<
    string,
    {
        accent: string;
        cta: string;
        description: string;
    }
>;

const fallbackProfileMeta = {
    accent: "148 163 184",
    cta: "Open link",
    description: "Open this profile link.",
};

const connectGlassTextures: CSSVariableStyle[] = [
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

export const contactProfiles = links.map<ContactProfile>((profile) => ({
    ...profile,
    ...(profileMeta[profile.label as keyof typeof profileMeta] ??
        fallbackProfileMeta),
}));

export const primaryContactProfile =
    contactProfiles.find((profile) => profile.label === "Email") ??
    contactProfiles[0];

export const secondaryContactProfiles = contactProfiles.filter(
    (profile) => profile.id !== primaryContactProfile.id,
);

export const getConnectCardStyle = (index: number, accent: string) => {
    const texture = connectGlassTextures[index % connectGlassTextures.length];

    return {
        ...texture,
        "--node-accent": accent,
        "--node-bg": "rgba(10, 15, 31, 0.66)",
        "--node-bg-strong": "rgba(12, 18, 38, 0.84)",
        "--node-noise": "0.2",
        borderColor: `rgb(${accent} / 0.24)`,
    } as CSSVariableStyle;
};

export const connectPrimaryStyle = {
    "--node-accent": primaryContactProfile.accent,
    "--node-bg": "rgba(10, 15, 31, 0.7)",
    "--node-bg-strong": "rgba(12, 18, 38, 0.88)",
    "--node-noise": "0.2",
    "--node-sheen-position": "14% 16%",
    "--node-accent-position": "86% 74%",
    "--node-bg-angle": "145deg",
    "--node-border-angle": "128deg",
    "--node-rim-angle": "140deg",
    "--node-noise-size": "180px 180px",
    "--node-noise-position": "12px 20px",
    borderColor: `rgb(${primaryContactProfile.accent} / 0.28)`,
} as CSSVariableStyle;
