"use client"

import React, { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion';
import { textVariant } from '@/utils/motion';
import { experiences } from '@/data';
import SectionWrapper from './wrappers/SectionWrapper';

import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

const ExperienceCard = ({ experience }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return  (
    <div ref={ref} className="vertical-timeline-element">
      <VerticalTimelineElement
        contentStyle={{ background: "#1d1836", color: "#fff"}}
        contentArrowStyle={{ borderRight: "7px solid #232631"}}
        date={experience.date}
        iconStyle={{ background: experience.iconBg }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <img 
              src={`/work-icons${experience.icon}`}
              alt={experience.company_name}
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
        }
        visible={inView}
      >
        <div>
          <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
          <p className="text-secondary text-[16px] font-semibold m-0">{experience.companyName}</p>
        </div>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point: any, index: any) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div
        variants={textVariant(0)}
        className="heading"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 1 }}
      >
        Work Experience
      </motion.div>
      <div className="pt-10 flex flex-col">
        <VerticalTimeline layout="1-column-left">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "experience")