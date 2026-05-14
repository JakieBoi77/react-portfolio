import type { ComponentType } from "react";
import { motion } from "framer-motion";

import { staggerContainer } from "@/utils/motion";

const SectionWrapper = <Props extends object>(
    Component: ComponentType<Props>,
    idName: string,
) => {
    const MotionSection = (props: Props) => {
        return (
            <motion.section
                variants={staggerContainer(0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
                className="w-full mx-auto relative z-0"
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>
                <Component {...props} />
            </motion.section>
        );
    };

    MotionSection.displayName = `SectionWrapper(${Component.displayName ?? Component.name ?? "Component"})`;

    return MotionSection;
};

export { SectionWrapper };
