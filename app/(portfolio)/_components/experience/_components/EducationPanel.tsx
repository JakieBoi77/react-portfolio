import CourseDependencyGraph from "./CourseDependencyGraph";
import EducationHeader from "./EducationHeader";
import { visibleEducation } from "../_lib/educationData";

const EducationPanel = () => {
    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {visibleEducation.map((educationItem, educationIndex) => (
                <section
                    key={`${educationItem.school}-${educationItem.program}`}
                    className="space-y-4"
                >
                    <EducationHeader
                        educationItem={educationItem}
                        index={educationIndex}
                    />
                    <CourseDependencyGraph levels={educationItem.levels} />
                </section>
            ))}
        </div>
    );
};

export default EducationPanel;
