/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header";

const Floorplan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    // Capture the current ref value
    const currentContainer = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a small delay before loading the iframe to ensure smooth scrolling
          setTimeout(() => {
            setShouldLoad(true);
          }, 200);
        }
      },
      {
        threshold: 0.5, // Load when 10% of the component is visible
        rootMargin: "100px 0px", // Start loading 100px before it comes into view
      }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      // Use the captured ref value in cleanup
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-6 lg:px-8 py-8">
      <Header
        title="Event Floorplan"
        subtitle="Explore the layout of the iGaming Afrika Summit 2026 venue."
      />

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
          <iframe
            className="w-full h-full border-none"
            src="https://igamingafrikasummit.expofp.com?allowConsent=false"
            allow="clipboard-read; clipboard-write"
            title="ExpoFP Floorplan"
            loading="lazy"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            style={{
              pointerEvents: "auto",
              border: "none",
              outline: "none",
              overflow: "hidden",
            }}
            onLoad={(e) => {
              // Prevent iframe from taking focus and affecting scroll
              e.target.blur();
              // Ensure the parent page maintains scroll control
              setTimeout(() => {
                if (document.activeElement === e.target) {
                  document.body.focus();
                }
              }, 100);
            }}
            onFocus={(e) => {
              // Prevent iframe from hijacking scroll
              e.target.blur();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Floorplan;
