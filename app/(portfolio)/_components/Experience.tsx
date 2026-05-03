"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import { experiences } from "../_data/portfolio";
import SectionWrapper from "./SectionWrapper";
import {
    TypographyH2,
    TypographyH3,
    TypographyList,
    TypographyListItem,
    TypographyMuted,
} from "@components";

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

const ExperienceCard = ({ experience }: any) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
    });

    return (
        <div ref={ref} className="vertical-timeline-element">
            <VerticalTimelineElement
                contentStyle={{ background: "#1d1836", color: "#fff" }}
                contentArrowStyle={{ borderRight: "7px solid #232631" }}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                    <div className="flex justify-center items-center w-full h-full">
                        <img
                            src={experience.icon}
                            alt={experience.companyName}
                            className="w-[80%] h-[80%] object-contain"
                        />
                    </div>
                }
                visible={inView}
            >
                <div>
                    <TypographyH3 className="text-2xl font-bold text-white">
                        {experience.title}
                    </TypographyH3>
                    <TypographyMuted className="m-0 text-base font-semibold text-white-200">
                        {experience.companyName}
                    </TypographyMuted>
                </div>
                <TypographyList className="mt-5 mb-0 ml-5">
                    {experience.points.map((point: any, index: any) => (
                        <TypographyListItem
                            key={`experience-point-${index}`}
                            className="text-sm text-white-100"
                        >
                            {point}
                        </TypographyListItem>
                    ))}
                </TypographyList>
            </VerticalTimelineElement>
        </div>
    );
};

const Experience = () => {
    return (
        <>
            <motion.div
                variants={textVariant(0)}
                className="text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                <TypographyH2>Work Experience</TypographyH2>
            </motion.div>
            <div className="pt-10 flex flex-col">
                <VerticalTimeline layout="1-column-left">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
};

export default SectionWrapper(Experience, "experience");
