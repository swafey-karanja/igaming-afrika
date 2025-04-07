import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] lg:h-screen mt-16">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source 
            src="https://videos.pexels.com/video-files/4523108/4523108-sd_640_360_25fps.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl">
          <img
            src="src/assets/africa-gaming.png"
            alt="iGaming Afrika Logo"
            className="w-full max-w-md mx-auto"
          />
          
          {/* <h1 className="mt-10 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            We write articles on SaaS startup growth.
          </h1> */}
          
          <p className="mt-6 text-lg font-normal leading-7 text-gray-200 max-w-2xl mx-auto">
            iGaming AFRIKA is the best b2b and b2c gambling media source
            focused on informing the betting business community on all matters
            related to gaming in Africa.
          </p>
          
          <div className="mt-10">
            <div className="relative inline-flex group">
              <div className="absolute transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="#"
                title="Read Exclusive Blog"
                className="inline-flex relative items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Pre Register 2026 
              </a>
            </div>
          </div>
        </div>

        {/* Featured Articles Section */}
        {/* <div className="w-full max-w-4xl mt-16">
          <p className="text-xl font-bold text-white mb-6">
            Featured Articles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            Article Card 1
            <div className="overflow-hidden transition-all duration-200 transform bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="p-5">
                <div className="flex flex-col">
                  <a href="#" title="" className="mb-4">
                    <img
                      className="w-full h-48 rounded-xl object-cover"
                      src="/api/placeholder/400/320"
                      alt="Article thumbnail"
                    />
                  </a>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" title="">Growth</a>
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900 group-hover:text-gray-600">
                      <a href="#" title="">
                        How a visual artist redefines success in graphic design
                      </a>
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      April 09, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Article Card 2
            <div className="overflow-hidden transition-all duration-200 transform bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="p-5">
                <div className="flex flex-col">
                  <a href="#" title="" className="mb-4">
                    <img
                      className="w-full h-48 rounded-xl object-cover"
                      src="/api/placeholder/400/320"
                      alt="Article thumbnail"
                    />
                  </a>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" title="">Growth</a>
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900 group-hover:text-gray-600">
                      <a href="#" title="">
                        Marketing strategies that drive conversion and retention
                      </a>
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      March 21, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            Article Card 3
            <div className="overflow-hidden transition-all duration-200 transform bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-lg hover:-translate-y-1">
              <div className="p-5">
                <div className="flex flex-col">
                  <a href="#" title="" className="mb-4">
                    <img
                      className="w-full h-48 rounded-xl object-cover"
                      src="/api/placeholder/400/320"
                      alt="Article thumbnail"
                    />
                  </a>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" title="">Growth</a>
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900 group-hover:text-gray-600">
                      <a href="#" title="">
                        How to scale your SaaS business in emerging markets
                      </a>
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      February 15, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;