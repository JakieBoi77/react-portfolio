import { cn } from "@/lib/utils"
import { technologyNamesByIcon } from "../../../_data/portfolio"

type ProjectIconStackProps = {
    icons: string[]
    accent: string
    label: string
    className?: string
}

const ProjectIconStack = ({ icons, accent, label, className }: ProjectIconStackProps) => {
    return (
        <ul className={cn("flex flex-wrap items-center gap-2", className)} aria-label={label}>
            {icons.map((icon) => {
                const name = technologyNamesByIcon[icon] ?? ""

                return (
                    <li
                        key={icon}
                        title={name || undefined}
                        className="grid size-9 place-items-center rounded-lg border bg-surface/35 sm:size-10"
                        style={{
                            borderColor: `rgb(${accent} / 0.26)`,
                            backgroundColor: `rgb(${accent} / 0.065)`,
                        }}
                    >
                        <img src={icon} alt={name} className="size-5 object-contain sm:size-6" />
                    </li>
                )
            })}
        </ul>
    )
}

export default ProjectIconStack
