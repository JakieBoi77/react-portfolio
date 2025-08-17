"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Tab = {
    title: string;
    value: string;
    content?: string | React.ReactNode | any;
};

export const Tabs = ({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}: {
    tabs: Tab[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
}) => {
    const [active, setActive] = useState<Tab>(propTabs[0]);
    const [tabs, setTabs] = useState<Tab[]>(propTabs);

    const moveSelectedTabToTop = (idx: number) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };

    return (
        <>
            <FadeInDiv
                tabs={tabs}
                active={active}
                key={active.value}
                className={cn("-mt-24", contentClassName)}
            />
            <div
                className={cn(
                    "flex flex-row flex-wrap items-center justify-center [perspective:1000px] relative max-w-full w-full",
                    containerClassName,
                )}
            >
                {propTabs.map((tab, idx) => (
                    <button
                        key={tab.title}
                        onClick={() => {
                            moveSelectedTabToTop(idx);
                        }}
                        className={cn(
                            "relative px-4 py-2 rounded-full",
                            tabClassName,
                        )}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {active.value === tab.value && (
                            <motion.div
                                layoutId="clickedbutton"
                                transition={{
                                    type: "spring",
                                    bounce: 0.3,
                                    duration: 0.6,
                                }}
                                className={cn(
                                    "absolute inset-0 bg-zinc-800 rounded-full ",
                                    activeTabClassName,
                                )}
                            />
                        )}

                        <span className="relative block text-white">
                            {tab.title}
                        </span>
                    </button>
                ))}
            </div>
        </>
    );
};

export const FadeInDiv = ({
    className,
    tabs,
}: {
    className?: string;
    key?: string;
    tabs: Tab[];
    active: Tab;
}) => {
    const isActive = (tab: Tab) => {
        return tab.value === tabs[0].value;
    };
    return (
        <div className="relative w-full h-full">
            {tabs.map((tab, idx) => (
                <motion.div
                    key={tab.value}
                    layoutId={tab.value}
                    style={{
                        scale: 1 - idx * 0.1,
                        top: idx * -50,
                        zIndex: -idx,
                        opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                        position: idx === 0 ? "relative" : "absolute",
                    }}
                    animate={{
                        y: isActive(tab) ? [0, 40, 0] : 0,
                    }}
                    className={cn("w-full h-full", className)}
                >
                    {tab.content}
                </motion.div>
            ))}
        </div>
    );
};
