"use client";

import React from "react";
import {
    fullStackProjects,
    learningProjectCollections,
} from "../_data/portfolio";
import { assets } from "../_data/assets";
import Link from "next/link";
import {
    BackgroundGradient,
    TypographyH2,
    TypographyH3,
    TypographyMuted,
} from "@components";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import SectionWrapper from "./SectionWrapper";
import { ProjectSelector } from "./ProjectSelector";
import Carousel from "./Carousel";

const Projects = () => {
    return (
        <>
            <FullStackProjects />
            <MicroProjects />
        </>
    );
};

const FullStackProjects = () => {
    return (
        <section>
            <motion.div
                variants={textVariant(0)}
                className="text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                <TypographyH2>Full Stack Projects</TypographyH2>
            </motion.div>
            <div className="flex flex-wrap flex-row items-center justify-center w-full py-16 gap-8">
                {fullStackProjects.map(
                    (
                        {
                            id,
                            projectTitle,
                            link,
                            github,
                            des,
                            picList,
                            iconList,
                        },
                    ) => (
                        <motion.div
                            variants={fadeIn("right", "spring", 0.3, 1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.05 }}
                            key={id}
                            className="w-full"
                        >
                            <BackgroundGradient className="flex items-center justify-center flex-col w-full rounded-[22px] p-4 bg-zinc-900">
                                <TypographyH3 className="mt-4 mb-2 text-center text-xl text-neutral-200 sm:text-3xl">
                                    {projectTitle}
                                </TypographyH3>
                                <div className="overflow-hidden w-full pt-5 pb-20">
                                    <Carousel slides={picList} />
                                </div>
                                <TypographyMuted className="p-4 pb-6 text-center text-base text-neutral-400 sm:px-14">
                                    {des}
                                </TypographyMuted>
                                <div className="flex flex-row gap-4">
                                    <Link
                                        href={link}
                                        className="h-10 w-24 rounded-full bg-gray-100 flex items-center justify-center group/button transition-all duration-300 hover:scale-105 text-black"
                                    >
                                        <div className="flex flex-row gap-2">
                                            <img
                                                src={assets.misc.arrow}
                                                className="text-black"
                                                alt="arrow"
                                            />
                                            Visit
                                        </div>
                                    </Link>
                                    <Link
                                        href={github}
                                        className="h-10 w-24 rounded-full bg-gray-100 flex items-center justify-center group/button transition-all duration-300 hover:scale-105 text-black"
                                    >
                                        <div className="flex flex-row gap-2">
                                            <img
                                                src={assets.socialIcons.githubButton}
                                                className="text-black"
                                                alt="git"
                                            />
                                            GitHub
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center mt-7 mb-3">
                                    <div className="flex items-center">
                                        {iconList.map((icon, _index) => (
                                            <div
                                                key={icon}
                                                className="flex items-center justify-center border border-white/[0.2] bg-zinc-900 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                                            >
                                                <img
                                                    src={icon}
                                                    alt={icon}
                                                    className="p-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </BackgroundGradient>
                        </motion.div>
                    ),
                )}
            </div>
        </section>
    );
};

const MicroProjects = () => {
    return (
        <section>
            <motion.div
                variants={textVariant(0)}
                className="text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                <TypographyH2>Mini Projects</TypographyH2>
            </motion.div>
            <div className="flex flex-wrap flex-row items-center justify-center w-full py-16 gap-8">
                {learningProjectCollections.map(
                    (
                        {
                            id,
                            collectionTitle,
                            folder,
                            des,
                            projects,
                            iconLists,
                        },
                    ) => (
                        <motion.div
                            variants={fadeIn("right", "spring", 0.3, 1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.05 }}
                            key={id}
                            className="w-full"
                        >
                            <BackgroundGradient className="flex items-center justify-center flex-col w-full rounded-[22px] p-4 bg-zinc-900">
                                <TypographyH3 className="mt-4 mb-2 text-center text-lg text-neutral-200 sm:text-xl">
                                    {collectionTitle}
                                </TypographyH3>
                                <TypographyMuted className="p-4 text-base text-neutral-400">
                                    {des}
                                </TypographyMuted>
                                <div className="flex flex-col mx-auto w-full items-center justify-center pt-10 md:pb-20">
                                    <ProjectSelector
                                        projects={projects}
                                        folder={folder}
                                    />
                                </div>
                                <div className="flex items-center justify-center mt-7 mb-3">
                                    <div className="flex items-center">
                                        {iconLists.map((icon) => (
                                            <div
                                                key={icon}
                                                className="flex items-center justify-center border border-white/[0.2] bg-zinc-900 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                                            >
                                                <img
                                                    src={icon}
                                                    alt={icon}
                                                    className="p-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </BackgroundGradient>
                        </motion.div>
                    ),
                )}
            </div>
        </section>
    );
};

export default SectionWrapper(Projects, "projects");
