"use client"

import React from 'react'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { links } from '@/data'

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-5" id="contact">
      <div className="flex flex-col items-center justify-center">
        <h1 className="heading lg:max-w-[45vw] text-center">
          Let&apos;s connect!
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">Join me as I explore the exciting world of tech and programming.</p>
        <a href="mailto:jakef7@icloud.com">
          <MagicButton
            title="Let&apos;s get in touch!"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-6">
        <p className="md:text-base text-sm md:font-normal font-light">Copyright © {new Date().getFullYear()} Jake Finlay</p>
        <div className="flex items-center md:gap-3 gap-6">
          {links.map((profile) => (
            <a key={profile.id} href={profile.link} target="_blank" rel="noreferrer" className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border-black-300">
              <img
                src={`/social-icons${profile.img}`}
                alt={`${profile.id}`}
                width={20}
                height={20}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer