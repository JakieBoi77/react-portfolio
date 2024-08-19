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
      <div className="flex flex-wrap flex-row items-center justify-center px-4 py-16 gap-32 mt-10">
        {learningProjectCollections.map(({ id, collectionTitle, folder, des, projects, iconLists }, index) => (
          <motion.div
            variants={fadeIn("right", "spring", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            key={id}
          >
            <BackgroundGradient className="flex items-center justify-center flex-col max-w-[600px] w-[80vw] rounded-[22px] p-4 sm:p-10 bg-zinc-900">
              <p className="text-base sm:text-xl mt-4 mb-2 text-neutral-200">
                {collectionTitle}
              </p>
              <p className="text-sm text-neutral-400 p-4">
                {des}
              </p>
              <div className="[perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start mt-40">
                <Tabs tabs={projects.map(({ title, value, pic }) => {
                  return {
                    title: title,
                    value: value,
                    content: (
                      <Link href={`/${folder}/${value}`} className="cursor-pointer">
                        <CardContainer className="inter-var w-full relative rounded-2xl sm:p-4 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-green-500 sm:min-h-[600px]" containerClassName="pb-20">
                          <CardBody className="relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6">
                            <div className="flex flex-col items-center justify-items">
                              <CardItem
                                translateZ="100"
                                className="text-xl font-bold text-white"
                              >
                                {title}
                              </CardItem>
                              <CardItem translateZ="75" className="w-full mt-4">
                                <img
                                  className="rounded-2xl"
                                  src={`/project-pics${pic}`}
                                  alt={`${title} Project Picture`}
                                />
                              </CardItem>
                            </div>
                          </CardBody>
                        </CardContainer>
                      </Link>  
                    )
                  }
                })} />
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