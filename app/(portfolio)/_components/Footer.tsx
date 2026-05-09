"use client";

import React from "react";
import {
    IconButton,
    MagicButton,
    TypographyH2,
    TypographyLead,
    TypographyMuted,
} from "@components";
import { FaLocationArrow } from "react-icons/fa";
import { links } from "../_data/portfolio";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Footer = () => {
    return (
        <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
            <div className="flex flex-col items-center justify-center">
                <TypographyH2 className="text-center lg:max-w-[45vw]">
                    Let&apos;s connect!
                </TypographyH2>
                <TypographyLead className="my-5 text-center text-base text-white-200 md:mt-10">
                    Join me as I explore the exciting world of tech and
                    programming.
                </TypographyLead>
                <a href="mailto:jakef7@icloud.com">
                    <MagicButton
                        title="Let's get in touch!"
                        icon={<FaLocationArrow />}
                        position="right"
                    />
                </a>
            </div>
            <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-6">
                <TypographyMuted className="text-sm font-light text-white-200 md:text-base md:font-normal">
                    Copyright © {new Date().getFullYear()} Jake Finlay
                </TypographyMuted>
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
                            <IconButton
                                href={profile.link}
                                icon={profile.img}
                                label={profile.label}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
