"use client"

import Intro from "@/components/Intro";
import Header from "@/components/Header";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { Inter } from "next/font/google";
import { LoadingProvider } from "./loading-provider";
import { SparklesCore } from "@/components/ui/Sparkles";

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
          {/* <FloatingNav navItems={navItems} /> */}
          <Intro />
          <Header />
          <Hero />
          {/* <About /> */}
          <Technologies />
          <Experience />
          <Projects />
          <Footer />
        </div>
      </main>
    </div>
  );
}

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
