"use client";

import {
    IconButton,
    Spotlight,
    TypographyH1,
    TypographyLead,
    TypographySmall,
} from "@components";
import { aboutParagraph, availableToWork, links } from "../../_data/portfolio";
import { assets } from "../../_data/assets";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Hero = () => {
    return (
        <div className="relative flex items-center justify-center">
            <div>
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="white"
                />
                <Spotlight
                    className="top-10 left-full h-[80vh] w-[50vw]"
                    fill="purple"
                />
                <Spotlight
                    className="top-28 left-80 h-[80vh] w-[50vw]"
                    fill="blue"
                />
            </div>
            <div className="glassy relative z-10 mt-10 flex w-full justify-center rounded-xl p-5 sm:mt-16 sm:p-6 md:p-7">
                <div className="flex w-full flex-col gap-5">
                    <div className="flex w-full flex-col justify-between gap-5">
                        <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
                                <motion.div
                                    className="shrink-0"
                                    variants={fadeIn("right", "spring", 0.5, 1)}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.01 }}
                                >
                                    <div className="relative inline-block">
                                        <div className="relative size-[88px] sm:size-[100px]">
                                            <div className="absolute inset-1">
                                                <img
                                                    className="size-full rounded-full bg-muted-foreground/30 object-cover ring-2 ring-muted-foreground/50 ring-offset-2 ring-offset-background"
                                                    alt="Profile Picture"
                                                    src={assets.profile}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <div className="flex min-w-0 flex-col items-center justify-center sm:items-start">
                                    <TypographyH1 className="text-center text-[clamp(1.125rem,5.7vw,1.5rem)] font-semibold leading-tight text-white min-[360px]:whitespace-nowrap sm:text-left sm:text-2xl md:text-3xl">
                                        Hey I&apos;m Jake Finlay{" "}
                                        <span className="inline-block origin-bottom-right hover:animate-wave">
                                            👋
                                        </span>
                                    </TypographyH1>
                                    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white-100 sm:justify-start">
                                        <div className="flex min-w-0 flex-row items-center gap-2">
                                            <img
                                                src={assets.misc.location}
                                                alt="Location Symbol"
                                                width={10}
                                                height={10}
                                            />
                                            <TypographySmall
                                                as="p"
                                                className="text-xs text-white-100 sm:text-sm"
                                            >
                                                Hamilton, ON
                                            </TypographySmall>
                                        </div>
                                        {availableToWork && (
                                            <a
                                                href="mailto:jakef7@icloud.com"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                className="group flex items-center gap-1.5 text-white-100"
                                            >
                                                <div className="size-2 shrink-0 rounded-full bg-green-500"></div>
                                                <div className="relative cursor-pointer overflow-hidden">
                                                    <TypographySmall
                                                        as="p"
                                                        className="text-xs text-white-100 sm:text-sm"
                                                    >
                                                        <span className="group-hover:-translate-y-full flex flex-col transition-all duration-1000 ease-slow">
                                                            Available for work
                                                            <span className="invisible h-0">
                                                                {" "}
                                                                Reach out
                                                            </span>
                                                        </span>
                                                        <span className="group-hover:-translate-y-full absolute top-full flex items-center transition-all duration-1000 ease-slow">
                                                            Reach out
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="ml-1 size-4"
                                                            >
                                                                <rect
                                                                    width="20"
                                                                    height="16"
                                                                    x="2"
                                                                    y="4"
                                                                    rx="2"
                                                                ></rect>
                                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                                            </svg>
                                                        </span>
                                                    </TypographySmall>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:shrink-0 md:justify-end">
                                {links.map((profile) => (
                                    <IconButton
                                        key={profile.id}
                                        href={profile.link}
                                        icon={profile.img}
                                        label={profile.label}
                                        className="size-9 shrink-0 sm:size-10 md:size-11"
                                        iconClassName="size-5 object-contain sm:size-5 md:size-6"
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.div
                            variants={fadeIn("right", "spring", 0.1, 1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.01 }}
                        >
                            <TypographyLead className="text-center text-sm leading-6 text-white-100 sm:text-left sm:text-base sm:leading-7 md:text-lg md:leading-8">
                                {aboutParagraph}
                            </TypographyLead>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
