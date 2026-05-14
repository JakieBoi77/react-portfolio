import { fullStackProjects } from "../../../_data/portfolio";
import FeaturedProjectCard from "./FeaturedProjectCard";

const FeaturedProjectsPanel = () => {
    return (
        <div className="mx-auto max-w-4xl space-y-5">
            {fullStackProjects.map((project, index) => (
                <FeaturedProjectCard
                    key={project.projectTitle}
                    project={project}
                    index={index}
                />
            ))}
        </div>
    );
};

export default FeaturedProjectsPanel;
