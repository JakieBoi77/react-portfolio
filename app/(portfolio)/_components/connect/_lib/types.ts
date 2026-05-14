import type { CSSVariableStyle } from "@components";

import type { links } from "../../../_data/portfolio";

export type ContactProfileBase = (typeof links)[number];

export type ContactProfile = ContactProfileBase & {
    accent: string;
    cta: string;
    description: string;
};

export type { CSSVariableStyle };
