"use client";

import { SectionHeading, SectionWrapper, TypographyMuted } from "@components";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

import PrimaryContactCard from "./_components/PrimaryContactCard";
import SocialProfileCard from "./_components/SocialProfileCard";
import {
    connectPrimaryStyle,
    getConnectCardStyle,
    primaryContactProfile,
    secondaryContactProfiles,
} from "./_lib/constants";

const Connect = () => {
    return (
        <footer className="w-full pb-10 mb-[100px] md:mb-5">
            <motion.div
                variants={fadeIn("up", "spring", 0.1, 1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <SectionHeading
                    title="Let's connect"
                    description="Reach out for software roles, project ideas, or anything worth building."
                />

                <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
                    <PrimaryContactCard
                        profile={primaryContactProfile}
                        style={connectPrimaryStyle}
                    />

                    <div className="grid gap-3">
                        {secondaryContactProfiles.map((profile, index) => (
                            <SocialProfileCard
                                key={profile.id}
                                profile={profile}
                                style={getConnectCardStyle(
                                    index + 1,
                                    profile.accent,
                                )}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
                <TypographyMuted className="text-sm font-light text-white-200 md:text-base md:font-normal">
                    Copyright © {new Date().getFullYear()} Jake Finlay
                </TypographyMuted>
            </div>
        </footer>
    );
};

export default SectionWrapper(Connect, "contact");
