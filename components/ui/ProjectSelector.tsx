"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
    title: string;
    des: string;
    value: string;
    pic: string;
};
export const ProjectSelector = ({
    projects,
    folder,
    autoplay = false,
}: {
    projects: Project[];
    folder: string;
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };
    return (
        <div className="w-full mx-auto antialiased font-sans px-4 sm:px-6 md:px-12">
            <div className="h-auto grid grid-cols-1 md:grid-cols-2 md:gap-20">
                <div className="h-auto flex items-center justify-center">
                    <div className="relative md:aspect-square aspect-[3/4] w-[80%] sm:w-[50%] md:w-full">
                        <AnimatePresence>
                            {projects.map(
                                ({ title, des, value, pic }, index) => (
                                    <motion.div
                                        key={value}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.9,
                                            z: -100,
                                            rotate: randomRotateY(),
                                        }}
                                        animate={{
                                            opacity: isActive(index) ? 1 : 0.7,
                                            scale: isActive(index) ? 1 : 0.95,
                                            z: isActive(index) ? 0 : -100,
                                            rotate: isActive(index)
                                                ? 0
                                                : randomRotateY(),
                                            zIndex: isActive(index)
                                                ? 999
                                                : projects.length + 2 - index,
                                            y: isActive(index)
                                                ? [0, -80, 0]
                                                : 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            z: 100,
                                            rotate: randomRotateY(),
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 origin-bottom"
                                    >
                                        <Link
                                            href={`/${folder}/${value}`}
                                            className="flex flex-col items-center justify-items w-full relative rounded-2xl p-6 bg-gradient-to-br from-blue-500 to-green-500"
                                        >
                                            <p className="font-bold pb-4">
                                                {title}
                                            </p>
                                            <img
                                                className="rounded-2xl"
                                                src={`/project-pics${pic}`}
                                                alt={`${title} Project Picture`}
                                            />
                                        </Link>
                                    </motion.div>
                                ),
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex justify-between flex-col py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-2xl font-bold">
                            {projects[active].title}
                        </h3>

                        <motion.p className="py-5 text-md text-neutral-400">
                            {projects[active].des
                                .split(" ")
                                .map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            delay: 0.02 * index,
                                        }}
                                        className="inline-block"
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 justify-center pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="h-10 w-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button transition-all duration-300 hover:scale-105"
                        >
                            <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="h-10 w-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button transition-all duration-300 hover:scale-105"
                        >
                            <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
