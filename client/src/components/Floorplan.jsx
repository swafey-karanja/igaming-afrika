/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FloorPlanIframe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setShouldLoad(true);
          }, 200);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "100px 0px",
      }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8"
    >
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
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
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
        <div className="h-[700px] w-full overflow-hidden rounded-lg shadow-lg relative">
          {!shouldLoad && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading floorplan...</p>
              </div>
            </div>
          )}

          {shouldLoad && (
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://igamingafrikasummit.expofp.com?allowConsent=false"
                allow="clipboard-read; clipboard-write"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FloorPlanIframe);
