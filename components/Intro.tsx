import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';

const Intro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className={`z-20 bg-black-100 fixed inset-0 h-screen flex items-center justify-center transition-all duration-1000 ease-in-out ${show ? "opacity-100" : "translate-y-[-100%]"}`}>
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="h-screen w-full bg-transparent bg-grid-white/[0.03] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="flex justify-center relative my-20">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            words="Hello, I&apos;m Jake!"
            className="text-center text-7xl xl:text-8xl"
          />
          <TextGenerateEffect
            words="Welcome to my portfolio."
            className="text-center md:tracking-wider mb-4 text-xl xl:text-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Intro