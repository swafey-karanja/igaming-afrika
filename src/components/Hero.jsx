import React from 'react'

const Hero = () => {
  return (
    <div className="overflow-x-hidden bg-gray-50 pt-6">
      {/* Add pt-16 for mobile and lg:pt-20 for larger screens to account for fixed navbar height */}
      <section className="pt-16 lg:pt-20 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <img 
                    src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png" 
                    alt="iGaming Afrika Logo"
                    className="w-full max-w-md mx-auto" 
                />
            </div>
        </div>

        <div className="pb-12 bg-white">
            <div className="relative">
                <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
                <div className="relative mx-auto">
                    <div className="lg:max-w-6xl lg:mx-auto">
                        <img className="transform scale-110" src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Hero