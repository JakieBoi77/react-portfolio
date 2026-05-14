import type { CSSVariableStyle } from "@components";

import { education, experiences } from "../../../_data/portfolio";

export type { CSSVariableStyle };

export type ExperienceItem = (typeof experiences)[number];
export type EducationItem = (typeof education)[number];
export type EducationLevel = EducationItem["levels"][number];
export type EducationTerm = EducationLevel["terms"][number];
export type CourseItem = EducationTerm["courses"][number];

export type CourseGraphNode = CourseItem & {
    accent: string;
    columnIndex: number;
    x: number;
    y: number;
    width: number;
    level: string;
    term: string;
    session: string;
};
