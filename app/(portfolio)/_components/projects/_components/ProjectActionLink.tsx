import Link from "next/link";
import type { IconType } from "react-icons";

type ProjectActionLinkProps = {
    href: string;
    label: string;
    Icon: IconType;
    accent: string;
};

const ProjectActionLink = ({
    href,
    label,
    Icon,
    accent,
}: ProjectActionLinkProps) => {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 min-h-10 w-full items-center justify-center gap-2 rounded-lg border bg-white/[0.04] px-3 text-sm font-semibold leading-none tracking-normal text-white transition hover:-translate-y-0.5 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:w-auto"
            style={{ borderColor: `rgb(${accent} / 0.28)` }}
        >
            <Icon aria-hidden="true" className="size-3.5 shrink-0" />
            <span>{label}</span>
        </Link>
    );
};

export default ProjectActionLink;
