import { cn } from "@/lib/utils";

type ProjectIconStackProps = {
    icons: string[];
    accent: string;
    label: string;
    className?: string;
};

const ProjectIconStack = ({
    icons,
    accent,
    label,
    className,
}: ProjectIconStackProps) => {
    return (
        <div
            className={cn("flex flex-wrap items-center gap-2", className)}
            aria-label={label}
        >
            {icons.map((icon) => (
                <span
                    key={icon}
                    className="grid size-9 place-items-center rounded-lg border bg-black-100/35 sm:size-10"
                    style={{
                        borderColor: `rgb(${accent} / 0.26)`,
                        backgroundColor: `rgb(${accent} / 0.065)`,
                    }}
                >
                    <img
                        src={icon}
                        alt=""
                        aria-hidden="true"
                        className="size-5 object-contain sm:size-6"
                    />
                </span>
            ))}
        </div>
    );
};

export default ProjectIconStack;
