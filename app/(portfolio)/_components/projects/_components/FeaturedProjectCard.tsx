import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

import {
    getProjectAccent,
    getProjectGlassStyle,
    projectCardVariants,
} from "../_lib/constants";
import type { FeaturedProject } from "../_lib/types";
import ProjectActionLink from "./ProjectActionLink";
import ProjectIconStack from "./ProjectIconStack";

type FeaturedProjectCardProps = {
    project: FeaturedProject;
    index: number;
};

const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
    const accent = getProjectAccent(index);
    const { style } = getProjectGlassStyle(index, accent);
    const [primaryImage, ...supportingImages] = project.picList;

    return (
        <motion.div
            custom={index}
            variants={projectCardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.01 }}
        >
            <article
                className="glassy-node grid gap-4 p-3 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 sm:p-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.82fr)]"
                style={style}
            >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black-100/45">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-black-100">
                        <img
                            src={primaryImage}
                            alt={`${project.projectTitle} screen`}
                            className="size-full object-cover"
                        />
                    </div>

                    {supportingImages.length > 0 && (
                        <div
                            className="grid gap-px border-t border-white/10 bg-white/10"
                            style={{
                                gridTemplateColumns: `repeat(${Math.min(
                                    supportingImages.length,
                                    4,
                                )}, minmax(0, 1fr))`,
                            }}
                        >
                            {supportingImages.map((image) => (
                                <div
                                    key={image}
                                    className="aspect-[16/10] overflow-hidden bg-black-100"
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        aria-hidden="true"
                                        className="size-full object-cover opacity-80"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-col justify-between gap-5">
                    <div>
                        <p
                            className="font-mono text-xs uppercase leading-5 tracking-normal"
                            style={{ color: `rgb(${accent})` }}
                        >
                            featured / 0{index + 1}
                        </p>
                        <h3 className="mt-1 text-xl font-bold leading-tight tracking-normal text-white sm:text-2xl">
                            {project.projectTitle}
                        </h3>
                        <p className="mt-3 break-words text-sm leading-6 tracking-normal text-white-100">
                            {project.des}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <ProjectIconStack
                            icons={project.iconList}
                            accent={accent}
                            label={`${project.projectTitle} technologies`}
                        />

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <ProjectActionLink
                                href={project.link}
                                label="Visit"
                                Icon={FaExternalLinkAlt}
                                accent={accent}
                            />
                            <ProjectActionLink
                                href={project.github}
                                label="GitHub"
                                Icon={FaGithub}
                                accent={accent}
                            />
                        </div>
                    </div>
                </div>
            </article>
        </motion.div>
    );
};

export default FeaturedProjectCard;
