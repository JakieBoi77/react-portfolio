"use client";

import React from "react";
import { fullStackProjects, learningProjectCollections } from "@/data";
import Link from "next/link";
import { BackgroundGradient } from "./ui/BackgroundGradient";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import SectionWrapper from "./wrappers/SectionWrapper";
import { ProjectSelector } from "./ui/ProjectSelector";
import Carousel from "./ui/Carousel";

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
            <motion.h1
                variants={textVariant(0)}
                className="heading"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                Full Stack Projects
            </motion.h1>
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
                        _index,
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
                                <p className="text-xl sm:text-3xl mt-4 mb-2 text-neutral-200">
                                    {projectTitle}
                                </p>
                                <div className="overflow-hidden w-full pt-5 pb-20">
                                    <Carousel slides={picList} />
                                </div>
                                <p className="text-center text-md text-neutral-400 p-4 sm:px-14 pb-6">
                                    {des}
                                </p>
                                <div className="flex flex-row gap-4">
                                    <Link
                                        href={link}
                                        className="h-10 w-24 rounded-full bg-gray-100 flex items-center justify-center group/button transition-all duration-300 hover:scale-105 text-black"
                                    >
                                        <div className="flex flex-row gap-2">
                                            <img
                                                src="/misc/arrow.svg"
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
                                                src="/social-icons/git2.svg"
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
                                                    src={`/dev-icons${icon}`}
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
            <motion.h1
                variants={textVariant(0)}
                className="heading"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                Mini Projects
            </motion.h1>
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
                        index,
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
                                <p className="text-base sm:text-xl mt-4 mb-2 text-neutral-200">
                                    {collectionTitle}
                                </p>
                                <p className="text-md text-neutral-400 p-4">
                                    {des}
                                </p>
                                <div className="flex flex-col mx-auto w-full items-center justify-center pt-10 md:pb-20">
                                    <ProjectSelector
                                        projects={projects}
                                        folder={folder}
                                    />
                                </div>
                                <div className="flex items-center justify-center mt-7 mb-3">
                                    <div className="flex items-center">
                                        {iconLists.map((icon, index) => (
                                            <div
                                                key={icon}
                                                className="flex items-center justify-center border border-white/[0.2] bg-zinc-900 rounded-full w-10 h-10 sm:w-12 sm:h-12"
                                            >
                                                <img
                                                    src={`/dev-icons${icon}`}
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
