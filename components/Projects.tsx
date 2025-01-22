"use client"

import React from 'react'
import { Tabs } from './ui/Tabs'
import { learningProjectCollections } from '@/data';
import { CardBody, CardContainer, CardItem } from './ui/FloatingCard';
import Link from 'next/link';
import { BackgroundGradient } from './ui/BackgroundGradient';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '@/utils/motion';
import SectionWrapper from './wrappers/SectionWrapper';
import { ProjectSelector } from './ui/ProjectSelector';

const Projects = () => {
  return (
    <>
      {/* Not ready yet */}
      {/* <FullStackProjects /> */}
      <MicroProjects />
    </>
  );
}

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
    </section>
  );
}

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
        Learning Projects
      </motion.h1>
      <div className="flex flex-wrap flex-row items-center justify-center w-full py-16 gap-8">
        {learningProjectCollections.map(({ id, collectionTitle, folder, des, projects, iconLists }, index) => (
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
                <ProjectSelector projects={projects} folder={folder}/>
              </div>
              <div className="flex items-center justify-center mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div key={icon} className="flex items-center justify-center border border-white/[0.2] bg-zinc-900 rounded-full w-10 h-10 sm:w-12 sm:h-12">
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
        ))}
      </div>
    </section>
  )
}

export default SectionWrapper(Projects, "projects");