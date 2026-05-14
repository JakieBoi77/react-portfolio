import { FaArrowRight, FaEnvelope } from "react-icons/fa";

import type { ContactProfile, CSSVariableStyle } from "../_lib/types";

type PrimaryContactCardProps = {
    profile: ContactProfile;
    style: CSSVariableStyle;
};

const PrimaryContactCard = ({ profile, style }: PrimaryContactCardProps) => {
    const emailAddress = profile.link.replace("mailto:", "");

    return (
        <a
            href={profile.link}
            className="glassy-node group flex min-h-72 flex-col justify-between p-5 transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:p-6"
            style={style}
        >
            <span className="flex items-start justify-between gap-4">
                <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl border border-[rgb(var(--node-accent)/0.34)] bg-[rgb(var(--node-accent)/0.1)] text-[rgb(var(--node-accent))]"
                    aria-hidden="true"
                >
                    <FaEnvelope className="size-6" />
                </span>
            </span>

            <span className="mt-8 block">
                <span className="block text-2xl font-bold leading-tight tracking-normal text-white sm:text-3xl">
                    Start a conversation
                </span>
                <span className="mt-3 block max-w-xl text-sm leading-6 tracking-normal text-white-100">
                    {profile.description}
                </span>
            </span>

            <span className="mt-8 flex flex-col gap-3 rounded-xl border border-white/10 bg-black-100/30 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="min-w-0 truncate text-sm font-semibold leading-5 tracking-normal text-white">
                    {emailAddress}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold leading-5 tracking-normal text-[rgb(var(--node-accent))]">
                    {profile.cta}
                    <FaArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-hover:translate-x-1"
                    />
                </span>
            </span>
        </a>
    );
};

export default PrimaryContactCard;
