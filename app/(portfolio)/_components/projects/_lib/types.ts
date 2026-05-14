import type { CSSProperties } from "react";

import {
    fullStackProjects,
    learningProjectCollections,
} from "../../../_data/portfolio";

export type CSSVariableStyle = CSSProperties & {
    [key: `--${string}`]: string | number | undefined;
};

export type FeaturedProject = (typeof fullStackProjects)[number];
export type LearningProjectCollection =
    (typeof learningProjectCollections)[number];
export type LearningProject = LearningProjectCollection["projects"][number];
