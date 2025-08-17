"use client";

import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa";
import { links } from "@/data";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Footer = () => {
    return (
        <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
            <div className="flex flex-col items-center justify-center">
                <h1 className="heading lg:max-w-[45vw] text-center">
                    Let&apos;s connect!
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Join me as I explore the exciting world of tech and
                    programming.
                </p>
                <a href="mailto:jakef7@icloud.com">
                    <MagicButton
                        title="Let's get in touch!"
                        icon={<FaLocationArrow />}
                        position="right"
                    />
                </a>
            </div>
            <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-6">
                <p className="md:text-base text-sm md:font-normal font-light">
                    Copyright © {new Date().getFullYear()} Jake Finlay
                </p>
                <div className="flex items-center md:gap-3 gap-6">
                    {links.map((profile, index) => (
                        <motion.div
                            key={profile.id}
                            variants={fadeIn(
                                "left",
                                "spring",
                                0.5 + 0.3 * index,
                                1,
                            )}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0 }}
                        >
                            <a
                                href={profile.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 sm:w-11 sm:h-11 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border-black-300 transition-transform transform hover:scale-110"
                            >
                                <img
                                    src={`/social-icons${profile.img}`}
                                    alt={`${profile.id}`}
                                    className="w-[55%] h-[55%]"
                                />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
