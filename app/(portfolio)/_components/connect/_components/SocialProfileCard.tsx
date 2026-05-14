import { FaArrowRight } from "react-icons/fa";

import type { ContactProfile, CSSVariableStyle } from "../_lib/types";

type SocialProfileCardProps = {
    profile: ContactProfile;
    style: CSSVariableStyle;
};

const SocialProfileCard = ({ profile, style }: SocialProfileCardProps) => {
    const opensNewTab = !profile.link.startsWith("mailto:");

    return (
        <a
            href={profile.link}
            target={opensNewTab ? "_blank" : undefined}
            rel={opensNewTab ? "noopener noreferrer" : undefined}
            className="glassy-node group grid min-h-28 grid-cols-[2.75rem_1fr_auto] items-center gap-3 p-3 transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            style={style}
        >
            <span className="grid size-11 place-items-center rounded-lg border border-[rgb(var(--node-accent)/0.34)] bg-[rgb(var(--node-accent)/0.1)]">
                <img
                    src={profile.img}
                    alt=""
                    aria-hidden="true"
                    className="size-5"
                />
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 tracking-normal text-white">
                    {profile.label}
                </span>
                <span className="mt-1 block text-xs leading-5 tracking-normal text-white-100">
                    {profile.description}
                </span>
            </span>
            <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-md border border-white/10 bg-white/[0.035] text-white-200 transition group-hover:text-[rgb(var(--node-accent))]"
            >
                <FaArrowRight className="size-3" />
            </span>
        </a>
    );
};

export default SocialProfileCard;
