import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";


const SectionWrapper = (Component: any) =>
  function MotionSection() {
    return (
      <motion.section
        variants={staggerContainer(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;