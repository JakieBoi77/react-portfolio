"use client";

import { Inter } from "next/font/google";
import { SparklesCore } from "@components";
import Experience from "./_components/Experience";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Intro from "./_components/Intro";
import Projects from "./_components/Projects";
import Technologies from "./_components/Technologies";

const inter = Inter({ subsets: ["latin"] });

const AppContent = () => {
    return (
        <div id="root" className={inter.className}>
            <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip text-white tw-class">
                <div className="w-full absolute inset-0">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={5}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="max-w-4xl w-full flex flex-col gap-12">
                    <Intro />
                    <Header />
                    <Hero />
                    <Technologies />
                    <Experience />
                    <Projects />
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default AppContent;
