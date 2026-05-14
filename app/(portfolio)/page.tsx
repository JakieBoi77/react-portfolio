"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Inter } from "next/font/google";
import { SparklesCore } from "@components";
import Connect from "./_components/connect";
import Experience from "./_components/experience";
import Header from "./_components/header";
import Hero from "./_components/hero";
import Intro from "./_components/intro";
import Projects from "./_components/projects";
import Technologies from "./_components/technologies";

const inter = Inter({ subsets: ["latin"] });
const mobilePerformanceQuery =
    "(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)";

const useMobilePerformanceMode = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(mobilePerformanceQuery);
        const updateMode = () => setIsEnabled(mediaQuery.matches);

        updateMode();
        mediaQuery.addEventListener("change", updateMode);

        return () => mediaQuery.removeEventListener("change", updateMode);
    }, []);

    return isEnabled;
};

const AppContent = () => {
    const mobilePerformanceMode = useMobilePerformanceMode();

    return (
        <MotionConfig reducedMotion={mobilePerformanceMode ? "always" : "user"}>
            <div
                id="root"
                className={inter.className}
                data-mobile-performance-mode={mobilePerformanceMode}
            >
                <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip text-white tw-class">
                    <div className="w-full absolute inset-0">
                        {!mobilePerformanceMode && (
                            <SparklesCore
                                id="tsparticlesfullpage"
                                background="transparent"
                                minSize={0.6}
                                maxSize={1.4}
                                particleDensity={5}
                                className="w-full h-full"
                                particleColor="#FFFFFF"
                            />
                        )}
                    </div>
                    <div className="max-w-4xl w-full flex flex-col gap-12">
                        <Intro skipAnimation={mobilePerformanceMode} />
                        <Header />
                        <Hero />
                        <Experience />
                        <Technologies />
                        <Projects />
                        <Connect />
                    </div>
                </main>
            </div>
        </MotionConfig>
    );
};

export default AppContent;
