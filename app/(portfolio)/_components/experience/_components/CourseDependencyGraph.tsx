import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { FaArrowsAltH } from "react-icons/fa";

import {
    floatInFromRightVariants,
    getEducationPanelStyle,
} from "../_lib/constants";
import { createCourseGraphLayout } from "../_lib/courseGraphLayout";
import CourseGraphSvg from "./CourseGraphSvg";
import type { EducationLevel } from "../_lib/types";
import { useCourseGraphScroll } from "../_lib/useCourseGraphScroll";

type CourseDependencyGraphProps = {
    levels: EducationLevel[];
};

const CourseDependencyGraph = ({ levels }: CourseDependencyGraphProps) => {
    const [hoveredCourseCode, setHoveredCourseCode] = useState<string | null>(
        null,
    );
    const layout = useMemo(() => createCourseGraphLayout(levels), [levels]);
    const {
        handleGraphClickCapture,
        handleGraphPointerDown,
        handleGraphScroll,
        handleScrollbarPointerDown,
        scrollContainerRef,
        scrollHintRef,
        scrollThumbRef,
        scrollTrackRef,
    } = useCourseGraphScroll(layout.graphWidth);
    const graphSurfaceStyle: CSSProperties = {
        width: layout.graphWidth,
    };
    const { style } = getEducationPanelStyle(0);

    return (
        <motion.div
            custom={0}
            variants={floatInFromRightVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="glassy-node p-2 sm:p-3"
            style={style}
        >
            <div
                ref={scrollHintRef}
                className="course-graph-drag-hint pointer-events-none absolute bottom-5 right-5 z-10 grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[rgb(var(--node-accent))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
                <FaArrowsAltH aria-hidden="true" className="size-3.5" />
            </div>
            <div
                ref={scrollContainerRef}
                onPointerDown={handleGraphPointerDown}
                onScroll={handleGraphScroll}
                onWheel={handleGraphScroll}
                onClickCapture={handleGraphClickCapture}
                className="course-graph-scroll relative cursor-grab overflow-x-auto rounded-2xl border border-white/10 p-3 pb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] select-none overscroll-x-contain"
                style={{ scrollBehavior: "auto", touchAction: "pan-y" }}
            >
                <div style={graphSurfaceStyle}>
                    <CourseGraphSvg
                        columnByLevelAndTerm={layout.columnByLevelAndTerm}
                        columns={layout.columns}
                        edges={layout.edges}
                        graphHeight={layout.graphHeight}
                        graphWidth={layout.graphWidth}
                        hoveredCourseCode={hoveredCourseCode}
                        levels={levels}
                        nodeMap={layout.nodeMap}
                        nodes={layout.nodes}
                        onCourseHover={setHoveredCourseCode}
                    />
                </div>
            </div>
            <div
                ref={scrollTrackRef}
                className="course-graph-custom-scrollbar absolute bottom-3 left-5 right-16 z-10 h-3"
            >
                <div
                    ref={scrollThumbRef}
                    className="course-graph-scroll-thumb"
                    onPointerDown={handleScrollbarPointerDown}
                />
            </div>
        </motion.div>
    );
};

export default CourseDependencyGraph;
