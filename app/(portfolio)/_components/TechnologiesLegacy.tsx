"use client";

import { technologies } from "../_data/portfolio";
import React from "react";
import BallCanvas from "./BallCanvas";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import SectionWrapper from "./SectionWrapper";
import { TypographyH2 } from "@components";

const TechnologiesLegacy = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <motion.div
                variants={textVariant(0)}
                className="text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 1 }}
            >
                <TypographyH2>Technologies</TypographyH2>
            </motion.div>
            <BallCanvas technologies={technologies} />
        </div>
    );
};

export default SectionWrapper(TechnologiesLegacy, "technologies");
