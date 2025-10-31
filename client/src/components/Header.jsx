// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Header = ({ title, subtitle }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div className="max-w-8xl mx-auto text-center">
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent py-5">
          {title}
        </h2>

        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <p className="text-gray-500 max-w-3xl mx-auto text-xs md:text-[13px] font-semibold">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default Header;
