"use client"

import { technologies } from '@/data'
import React from 'react'
import BallCanvas from './canvas/Ball'
import { motion } from 'framer-motion'
import { textVariant } from '@/utils/motion'
import SectionWrapper from './wrappers/SectionWrapper'

const Technologies = () => {
  return (
    <div className="w-full h-full">
      <motion.h1
        variants={textVariant(0)}
        className="heading"
      >
        Technologies
      </motion.h1>
      <BallCanvas technologies={technologies} />
    </div>
  )
}

export default SectionWrapper(Technologies)