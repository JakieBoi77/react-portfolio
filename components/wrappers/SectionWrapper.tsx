import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";


const SectionWrapper = (Component: any, idName: any) =>
  function MotionSection() {
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
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;