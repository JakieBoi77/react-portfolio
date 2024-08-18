import React from "react";
import { motion } from "framer-motion";

import { fadeIn, textVariant } from "../utils/motion";
import SectionWrapper from "./wrappers/SectionWrapper";
import { aboutParagraph, skills } from "@/data";
import { CardBody, CardContainer, CardItem } from "./ui/FloatingCard";

const SkillCard = ({ index, title, icon }: any) => (
  <CardContainer className="w-[250px] h-[250px] relative rounded-2xl text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-green-500 p-[2px]">
    <CardBody className="relative group/card w-full h-full rounded-2xl p-6 bg-zinc-900">
      <div className="flex flex-col items-center justify-center">
        <CardItem translateZ="75" className="mt-4">
          <img
            className="w-16 h-16 m-4"
            src={`/misc${icon}`}
            alt={`Icon ${index}`}
          />
        </CardItem>
        <CardItem
          translateZ="100"
          className="text-lg font-bold text-white text-center"
        >
          {title}
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
)

const About = () => {
  return (
    <>
      <motion.h1
        variants={textVariant(0)}
        className="heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 1 }}
      >
        About
      </motion.h1>

      <div className="flex items-center justify-center">
        <motion.p
          variants={fadeIn("right", "spring", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="my-12 text-xs sm:text-lg leading-relaxed text-center max-w-4xl"
        >
          {aboutParagraph}
        </motion.p>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            variants={fadeIn("right", "spring", 0.3 * index, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
          >
            <SkillCard index={index} {...skill} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");