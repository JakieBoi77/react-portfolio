import {
    education,
    educationVisibleThroughSemester,
} from "../../../_data/portfolio";
import type { CourseItem, EducationLevel } from "./types";

const semesterSeasonOrder = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3,
} as const;

const getSemesterSortValue = (semesterId: string) => {
    const [year, season] = semesterId.split("-");
    const seasonOrder =
        semesterSeasonOrder[season as keyof typeof semesterSeasonOrder] ?? 0;

    return Number(year) * 10 + seasonOrder;
};

const educationVisibleThroughSortValue = getSemesterSortValue(
    educationVisibleThroughSemester,
);

export const visibleEducation = education
    .map((educationItem) => ({
        ...educationItem,
        levels: educationItem.levels
            .map((level) => ({
                ...level,
                terms: level.terms.filter(
                    (term) =>
                        getSemesterSortValue(term.semesterId) <=
                        educationVisibleThroughSortValue,
                ),
            }))
            .filter((level) => level.terms.length > 0),
    }))
    .filter((educationItem) => educationItem.levels.length > 0);

export const isSpanningCourse = (course: CourseItem) =>
    "spansTerms" in course && course.spansTerms;

export const getCourseSpanCount = (
    course: CourseItem,
    termIndex: number,
    level: EducationLevel,
) => {
    if (!isSpanningCourse(course)) {
        return 1;
    }

    const termsRemaining = level.terms.length - termIndex;
    const requestedSpan =
        "spanTermsCount" in course && typeof course.spanTermsCount === "number"
            ? course.spanTermsCount
            : termsRemaining;

    return Math.max(1, Math.min(requestedSpan, termsRemaining));
};

export const getSpanningCoursesCoveringTerm = (
    level: EducationLevel,
    targetTermIndex: number,
) =>
    level.terms.flatMap((term, sourceTermIndex) =>
        term.courses.filter((course) => {
            if (!isSpanningCourse(course)) {
                return false;
            }

            const spanCount = getCourseSpanCount(
                course,
                sourceTermIndex,
                level,
            );

            return (
                sourceTermIndex <= targetTermIndex &&
                targetTermIndex < sourceTermIndex + spanCount
            );
        }),
    );
