import { useMemo } from "react";

import { getCourseAccent, splitGraphLabel } from "../_lib/constants";
import {
    courseGraphMetrics,
    type CourseGraphColumn,
    type CourseGraphEdge,
} from "../_lib/courseGraphLayout";
import type { CourseGraphNode, EducationLevel } from "../_lib/types";

type CourseGraphSvgProps = {
    columnByLevelAndTerm: Map<string, CourseGraphColumn>;
    columns: CourseGraphColumn[];
    edges: CourseGraphEdge[];
    graphHeight: number;
    graphWidth: number;
    hoveredCourseCode: string | null;
    levels: EducationLevel[];
    nodeMap: Map<string, CourseGraphNode>;
    nodes: CourseGraphNode[];
    onCourseHover: (courseCode: string | null) => void;
};

type CourseGraphLink = CourseGraphEdge & {
    id: string;
    path: string;
    sourceCode: string;
    targetCode: string;
};

const emptyCourseGraphLinks: CourseGraphLink[] = [];
const graphLinkTransitionStyle = {
    transition: "opacity 160ms ease, stroke 160ms ease, stroke-width 160ms ease",
};

const getCourseGraphLinkPath = ({ source, target }: CourseGraphEdge) => {
    const { nodeHeight } = courseGraphMetrics;
    const startX = source.x + source.width;
    const startY = source.y + nodeHeight / 2;
    const endX = target.x;
    const endY = target.y + nodeHeight / 2;
    const controlOffset = Math.max(42, Math.abs(endX - startX) * 0.42);
    const sameColumn = source.columnIndex === target.columnIndex;

    return sameColumn
        ? `M ${startX} ${startY} C ${startX + 34} ${startY}, ${startX + 34} ${endY}, ${endX} ${endY}`
        : `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
};

const CourseGraphSvg = ({
    columnByLevelAndTerm,
    columns,
    edges,
    graphHeight,
    graphWidth,
    hoveredCourseCode,
    levels,
    nodeMap,
    nodes,
    onCourseHover,
}: CourseGraphSvgProps) => {
    const hoveredNode = hoveredCourseCode
        ? nodeMap.get(hoveredCourseCode)
        : undefined;
    const activeEdgeAccent = hoveredNode?.accent ?? "56 189 248";
    const { nodeHeight, nodeWidth } = courseGraphMetrics;
    const { courseGraphLinks, linksByCourseCode } = useMemo(() => {
        const nextLinks = edges.map((edge, index) => ({
            ...edge,
            id: `${edge.source.code}-${edge.target.code}-${index}`,
            path: getCourseGraphLinkPath(edge),
            sourceCode: edge.source.code,
            targetCode: edge.target.code,
        }));
        const nextLinksByCourseCode = new Map<string, CourseGraphLink[]>();

        nextLinks.forEach((link) => {
            const connectedCourseCodes =
                link.sourceCode === link.targetCode
                    ? [link.sourceCode]
                    : [link.sourceCode, link.targetCode];

            connectedCourseCodes.forEach((courseCode) => {
                const linksForCourse = nextLinksByCourseCode.get(courseCode);

                if (linksForCourse) {
                    linksForCourse.push(link);
                } else {
                    nextLinksByCourseCode.set(courseCode, [link]);
                }
            });
        });

        return {
            courseGraphLinks: nextLinks,
            linksByCourseCode: nextLinksByCourseCode,
        };
    }, [edges]);
    const levelLabels = useMemo(
        () =>
            levels
                .map((level, levelIndex) => {
                    const levelColumns = level.terms
                        .map((term) =>
                            columnByLevelAndTerm.get(
                                `${level.level}-${term.term}`,
                            ),
                        )
                        .filter(Boolean);
                    const firstColumn = levelColumns[0];
                    const lastColumn = levelColumns[levelColumns.length - 1];

                    if (!firstColumn || !lastColumn) {
                        return null;
                    }

                    return {
                        accent: getCourseAccent(levelIndex),
                        label: level.level.toUpperCase(),
                        x: (firstColumn.x + lastColumn.x + nodeWidth) / 2,
                    };
                })
                .filter((label): label is NonNullable<typeof label> =>
                    Boolean(label),
                ),
        [columnByLevelAndTerm, levels, nodeWidth],
    );
    const nodeLabelLinesByCode = useMemo(
        () =>
            new Map(
                nodes.map((node) => [node.code, splitGraphLabel(node.name)]),
            ),
        [nodes],
    );
    const activeLinks = useMemo(
        () =>
            hoveredCourseCode
                ? (linksByCourseCode.get(hoveredCourseCode) ??
                  emptyCourseGraphLinks)
                : emptyCourseGraphLinks,
        [hoveredCourseCode, linksByCourseCode],
    );
    const activeLinkIds = useMemo(
        () => new Set(activeLinks.map(({ id }) => id)),
        [activeLinks],
    );
    const hasHoveredCourse = Boolean(hoveredCourseCode);

    return (
        <svg
            aria-label="Course prerequisite graph"
            role="img"
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
            width={graphWidth}
            height={graphHeight}
            className="block overflow-visible"
        >
            <defs>
                <marker
                    id="course-arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                >
                    <path
                        d="M 0 0 L 10 5 L 0 10 z"
                        fill="rgba(190, 193, 221, 0.72)"
                    />
                </marker>
                <marker
                    id="course-arrow-active"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                >
                    <path
                        d="M 0 0 L 10 5 L 0 10 z"
                        fill={`rgb(${activeEdgeAccent} / 0.92)`}
                    />
                </marker>
                <filter
                    id="course-node-shadow"
                    x="-20%"
                    y="-40%"
                    width="140%"
                    height="180%"
                >
                    <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="10"
                        floodColor="rgba(0, 0, 0, 0.42)"
                    />
                </filter>
            </defs>

            {levelLabels.map((levelLabel) => (
                <text
                    key={levelLabel.label}
                    x={levelLabel.x}
                    y="28"
                    textAnchor="middle"
                    fill={`rgb(${levelLabel.accent})`}
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="700"
                >
                    {levelLabel.label}
                </text>
            ))}

            {columns.map((column) => (
                <g key={`${column.level}-${column.term}`}>
                    <text
                        x={column.x}
                        y="54"
                        fill="rgba(255, 255, 255, 0.68)"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="700"
                    >
                        {column.term.toUpperCase()}
                    </text>
                    <text
                        x={column.x}
                        y="70"
                        fill="rgba(255, 255, 255, 0.52)"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="600"
                    >
                        {column.session.toUpperCase()}
                    </text>
                </g>
            ))}

            {courseGraphLinks.map((link) => {
                const isActiveLink = activeLinkIds.has(link.id);

                return (
                    <path
                        key={link.id}
                        d={link.path}
                        fill="none"
                        stroke="rgba(190, 193, 221, 0.42)"
                        strokeWidth="1.2"
                        markerEnd="url(#course-arrow)"
                        opacity={
                            hasHoveredCourse ? (isActiveLink ? 0.24 : 0.12) : 1
                        }
                        style={graphLinkTransitionStyle}
                    />
                );
            })}

            {nodes.map((node) => {
                const labelLines = nodeLabelLinesByCode.get(node.code) ?? [];
                const isHovered = hoveredCourseCode === node.code;

                return (
                    <a
                        key={node.code}
                        href={node.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${node.code} course description in a new tab`}
                        className="course-graph-node-link"
                        tabIndex={0}
                        style={{ outline: "none" }}
                        onDragStart={(event) => event.preventDefault()}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => onCourseHover(node.code)}
                        onMouseLeave={() => onCourseHover(null)}
                        onFocus={() => onCourseHover(node.code)}
                        onBlur={() => onCourseHover(null)}
                    >
                        <title>{`${node.code}: ${node.name}. Opens course description.`}</title>
                        <g
                            transform={`translate(${node.x}, ${node.y})`}
                            filter="url(#course-node-shadow)"
                        >
                            <rect
                                width={node.width}
                                height={nodeHeight}
                                rx="10"
                                fill="rgba(10, 15, 31, 0.84)"
                                stroke={`rgb(${node.accent} / ${isHovered ? 0.78 : 0.4})`}
                                strokeWidth={isHovered ? "1.8" : "1.1"}
                            />
                            <rect
                                x="1"
                                y="1"
                                width={node.width - 2}
                                height={nodeHeight - 2}
                                rx="9"
                                fill={`rgb(${node.accent} / ${isHovered ? 0.16 : 0.08})`}
                            />
                            <text
                                x="12"
                                y="18"
                                fill={`rgb(${node.accent})`}
                                fontSize="10"
                                fontFamily="monospace"
                                fontWeight="700"
                            >
                                {node.code}
                            </text>
                            <g
                                aria-hidden="true"
                                className="course-graph-node-link-icon"
                                opacity={isHovered ? 1 : 0}
                                transform={`translate(${node.width - 36}, 16)`}
                            >
                                <rect
                                    width="24"
                                    height="24"
                                    rx="7"
                                    fill={`rgb(${node.accent} / 0.18)`}
                                    stroke={`rgb(${node.accent} / 0.58)`}
                                />
                                <path
                                    d="M7 9.5V17h7.5"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.86)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M12 7h5v5"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.86)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M17 7 10.25 13.75"
                                    fill="none"
                                    stroke="rgba(255, 255, 255, 0.86)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                            </g>
                            {labelLines.map((line, lineIndex) => (
                                <text
                                    key={`${node.code}-${lineIndex}`}
                                    x="12"
                                    y={34 + lineIndex * 12}
                                    fill="rgba(255, 255, 255, 0.88)"
                                    fontSize="10"
                                    fontWeight="600"
                                >
                                    {line}
                                </text>
                            ))}
                        </g>
                    </a>
                );
            })}

            {activeLinks.map((link) => (
                <g key={`${link.id}-active`} pointerEvents="none">
                    <path
                        d={link.path}
                        fill="none"
                        stroke={`rgb(${activeEdgeAccent} / 0.24)`}
                        strokeLinecap="round"
                        strokeWidth="7"
                    />
                    <path
                        d={link.path}
                        fill="none"
                        stroke={`rgb(${activeEdgeAccent} / 0.92)`}
                        strokeLinecap="round"
                        strokeWidth="2.8"
                        markerEnd="url(#course-arrow-active)"
                        style={graphLinkTransitionStyle}
                    />
                </g>
            ))}

            {hoveredNode &&
                (() => {
                    const tooltipLines = splitGraphLabel(
                        hoveredNode.learned,
                        36,
                        4,
                    );
                    const nameLines = splitGraphLabel(hoveredNode.name, 36, 3);
                    const tooltipWidth = 286;
                    const tooltipHeight =
                        62 + nameLines.length * 14 + tooltipLines.length * 14;
                    const tooltipX = Math.min(
                        Math.max(
                            12,
                            hoveredNode.x +
                                hoveredNode.width / 2 -
                                tooltipWidth / 2,
                        ),
                        graphWidth - tooltipWidth - 12,
                    );
                    const tooltipY = hoveredNode.y - tooltipHeight - 12;

                    return (
                        <g
                            transform={`translate(${tooltipX}, ${tooltipY})`}
                            pointerEvents="none"
                        >
                            <rect
                                width={tooltipWidth}
                                height={tooltipHeight}
                                rx="12"
                                fill="rgba(8, 13, 28, 0.96)"
                                stroke={`rgb(${hoveredNode.accent} / 0.52)`}
                            />
                            <rect
                                x="1"
                                y="1"
                                width={tooltipWidth - 2}
                                height={tooltipHeight - 2}
                                rx="11"
                                fill={`rgb(${hoveredNode.accent} / 0.08)`}
                            />
                            <text
                                x="14"
                                y="20"
                                fill={`rgb(${hoveredNode.accent})`}
                                fontSize="10"
                                fontFamily="monospace"
                                fontWeight="700"
                            >
                                {hoveredNode.code}
                            </text>
                            {nameLines.map((line, lineIndex) => (
                                <text
                                    key={`${hoveredNode.code}-name-${lineIndex}`}
                                    x="14"
                                    y={40 + lineIndex * 14}
                                    fill="rgba(255, 255, 255, 0.9)"
                                    fontSize="11"
                                    fontWeight="700"
                                >
                                    {line}
                                </text>
                            ))}
                            {tooltipLines.map((line, lineIndex) => (
                                <text
                                    key={`${hoveredNode.code}-tooltip-${lineIndex}`}
                                    x="14"
                                    y={
                                        54 +
                                        nameLines.length * 14 +
                                        lineIndex * 14
                                    }
                                    fill="rgba(226, 232, 240, 0.88)"
                                    fontSize="11"
                                >
                                    {line}
                                </text>
                            ))}
                        </g>
                    );
                })()}
        </svg>
    );
};

export default CourseGraphSvg;
