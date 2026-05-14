import type { CSSVariableStyle } from "@components";

import {
    fullStackProjects,
    learningProjectCollections,
} from "../../../_data/portfolio";

export type { CSSVariableStyle };

export type FeaturedProject = (typeof fullStackProjects)[number];
export type LearningProjectCollection =
    (typeof learningProjectCollections)[number];
export type LearningProject = LearningProjectCollection["projects"][number];
