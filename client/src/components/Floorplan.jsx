import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FloorPlanIframe = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Floorplan
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Explore the layout of the iGaming AFRIKA SUMMIT 2026 venue and find
            your way around.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="h-[700px] w-full overflow-hidden rounded-lg shadow-lg">
          <iframe
            className="w-full h-full border-none"
            src="https://igamingafrikasummit.expofp.com?allowConsent=false"
            allow="clipboard-read; clipboard-write"
            title="ExpoFP Floorplan"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FloorPlanIframe);
