import { experiences } from "../../../_data/portfolio";
import ExperienceCard from "./ExperienceCard";

const WorkPanel = () => {
    return (
        <ol className="relative mx-auto max-w-4xl">
            {experiences.map((experience, index) => (
                <ExperienceCard
                    key={`${experience.companyName}-${experience.date}`}
                    experience={experience}
                    index={index}
                    isLast={index === experiences.length - 1}
                />
            ))}
        </ol>
    );
};

export default WorkPanel;
