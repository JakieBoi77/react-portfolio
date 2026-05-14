import { getCourseAccent } from "./constants";
import {
    getCourseSpanCount,
    getSpanningCoursesCoveringTerm,
    isSpanningCourse,
} from "./educationData";
import type { CourseGraphNode, EducationLevel } from "./types";

export const courseGraphMetrics = {
    columnGap: 238,
    levelGap: 64,
    rowGap: 78,
    nodeWidth: 178,
    nodeHeight: 56,
    horizontalPadding: 52,
    topPadding: 140,
    bottomPadding: 60,
} as const;

export type CourseGraphColumn = {
    level: string;
    term: string;
    session: string;
    levelIndex: number;
    termIndex: number;
    columnIndex: number;
    x: number;
};

export type CourseGraphEdge = {
    source: CourseGraphNode;
    target: CourseGraphNode;
};

export const createCourseGraphLayout = (levels: EducationLevel[]) => {
    const {
        columnGap,
        horizontalPadding,
        levelGap,
        nodeHeight,
        nodeWidth,
        rowGap,
        topPadding,
        bottomPadding,
    } = courseGraphMetrics;
    const columns = levels.flatMap((level, levelIndex) =>
        level.terms.map((term, termIndex) => ({
            level: level.level,
            term: term.term,
            session: term.session,
            levelIndex,
            termIndex,
            columnIndex:
                levels
                    .slice(0, levelIndex)
                    .reduce(
                        (total, currentLevel) =>
                            total + currentLevel.terms.length,
                        0,
                    ) + termIndex,
        })),
    );

    const columnByLevelAndTerm = new Map(
        columns.map((column) => [
            `${column.level}-${column.term}`,
            {
                ...column,
                x:
                    horizontalPadding +
                    column.columnIndex * columnGap +
                    column.levelIndex * levelGap,
            },
        ]),
    );

    const columnRowCounts = levels.flatMap((level) =>
        level.terms.map((term, termIndex) => {
            const spanningCourseCount = getSpanningCoursesCoveringTerm(
                level,
                termIndex,
            ).length;
            const courseCount = term.courses.filter(
                (course) => !isSpanningCourse(course),
            ).length;

            return spanningCourseCount + courseCount;
        }),
    );
    const maxRows = Math.max(1, ...columnRowCounts);
    const graphWidth =
        horizontalPadding * 2 +
        nodeWidth +
        Math.max(0, columns.length - 1) * columnGap +
        Math.max(0, levels.length - 1) * levelGap;
    const graphHeight =
        topPadding +
        bottomPadding +
        Math.max(0, maxRows - 1) * rowGap +
        nodeHeight;

    const nodes = levels.flatMap((level, levelIndex) => {
        const spanningNodes: CourseGraphNode[] = level.terms.flatMap(
            (term, termIndex) => {
                const column = columnByLevelAndTerm.get(
                    `${level.level}-${term.term}`,
                );

                if (!column) {
                    return [];
                }

                return term.courses.filter(isSpanningCourse).map((course) => {
                    const spanCount = getCourseSpanCount(
                        course,
                        termIndex,
                        level,
                    );
                    const endTerm =
                        level.terms[termIndex + spanCount - 1] ?? term;
                    const coveringSpans = getSpanningCoursesCoveringTerm(
                        level,
                        termIndex,
                    );
                    const spanRowIndex = Math.max(
                        0,
                        coveringSpans.findIndex(
                            (spanningCourse) =>
                                spanningCourse.code === course.code,
                        ),
                    );

                    return {
                        ...course,
                        accent: getCourseAccent(levelIndex),
                        columnIndex: column.columnIndex,
                        x: column.x,
                        y: topPadding + spanRowIndex * rowGap,
                        width:
                            spanCount > 1
                                ? (spanCount - 1) * columnGap + nodeWidth
                                : nodeWidth,
                        level: level.level,
                        term: spanCount > 1 ? "Full year" : term.term,
                        session:
                            spanCount > 1
                                ? `${term.session} - ${endTerm.session}`
                                : term.session,
                    };
                });
            },
        );

        const termNodes = level.terms.flatMap((term, termIndex) => {
            const column = columnByLevelAndTerm.get(
                `${level.level}-${term.term}`,
            );

            if (!column) {
                return [];
            }

            return term.courses
                .filter((course) => !isSpanningCourse(course))
                .map((course, courseIndex) => ({
                    ...course,
                    accent: getCourseAccent(levelIndex),
                    columnIndex: column.columnIndex,
                    x: column.x,
                    y:
                        topPadding +
                        getSpanningCoursesCoveringTerm(level, termIndex)
                            .length *
                            rowGap +
                        courseIndex * rowGap,
                    width: nodeWidth,
                    level: level.level,
                    term: term.term,
                    session: term.session,
                }));
        });

        return [...spanningNodes, ...termNodes];
    });

    const nodeMap = new Map(nodes.map((node) => [node.code, node]));
    const edges = nodes.flatMap((target) =>
        target.prerequisites
            .map((prerequisite) => {
                const source = nodeMap.get(prerequisite);

                if (!source) {
                    return null;
                }

                return { source, target };
            })
            .filter((edge): edge is CourseGraphEdge => Boolean(edge)),
    );

    return {
        columnByLevelAndTerm,
        columns: Array.from(columnByLevelAndTerm.values()),
        edges,
        graphHeight,
        graphWidth,
        nodes,
        nodeMap,
    };
};
