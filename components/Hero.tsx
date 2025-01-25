"use client"

import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { aboutParagraph, links } from '@/data'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/utils/motion'

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="flex justify-center relative mt-20 z-10 bg-black-200/50 backdrop-filter p-6 rounded-xl shadow-lg ring-1 ring-black/5">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col justify-between">
            <div className="flex gap-5">
              <motion.div
                variants={fadeIn("right", "spring", 0.5, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
              >
                <div className="relative inline-block">
                  <div className="relative size-[80px] sm:size-[100px]">
                    <div className="absolute inset-1">
                      <img className="size-full rounded-full bg-muted-foreground/30 object-cover ring-2 ring-muted-foreground/50 ring-offset-2 ring-offset-background" alt="Profile Picture" src="/pfp.jpg" />
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="flex items-left justify-center flex-col">
                <motion.h1
                  variants={textVariant(0.5)}
                  className="font-semibold text-left text-xl sm:text-2xl"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 1 }}
                >
                  Hey I&apos;m Jake Finlay <span className="inline-block origin-bottom-right hover:animate-wave">👋</span>
                </motion.h1>
                <div className="flex flex-row gap-4 pt-1">
                  <div className="flex flex-row gap-2">
                    <img
                      src="/misc/location.svg"
                      alt="Location Symbol"
                      width={10}
                      height={10}
                    />
                    <p className="py-2 text-xs sm:text-lg">
                      Hamilton, ON
                    </p>
                  </div>
                  <a href="mailto:jakef7@icloud.com" rel="noopener noreferrer" target="_blank" className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <div className="relative cursor-pointer overflow-hidden">
                      <p className="group">
                        <span className="group-hover:-translate-y-full flex flex-col transition-all duration-1000 ease-slow text-xs sm:text-lg">
                          Available for work
                          <span className="invisible h-0"> Reach out</span>
                        </span>
                        <span className="group-hover:-translate-y-full absolute top-full flex items-center transition-all duration-1000 ease-slow text-xs sm:text-lg">
                          Reach out
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 size-4"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="py-4 flex justify-center sm:justify-start items-center sm:gap-3 gap-6">
              {links.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  variants={fadeIn("left", "spring", 0.5 + 0.3 * index, 1)}
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
            
            <motion.p
              variants={fadeIn("right", "spring", 0.1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="py-4 text-xs sm:text-lg leading-relaxed text-left"
            >
              {aboutParagraph}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero