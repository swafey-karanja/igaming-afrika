import { useState } from "react";
import MagazineReading from "../components/MagazineReading.jsx"
import MagazineCarousel from "../components/MagazineCarousel.jsx"

const Magazine = () => {

  const [selectedMagazine, setSelectedMagazine] = useState(null);

  return (
    <>
      <div className="relative py-12 bg-gray-100 sm:py-16 lg:py-20 mt-16 min-w-screen h-1/2">
        <div className="absolute inset-0 w-full">
          <img
            className="object-cover object-right w-full h-1/2 lg:object-center"
            src="https://images.unsplash.com/photo-1519326844852-704caea5679e?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        <div className="absolute inset-0 bg-gray-900 bg-opacity-40"></div>

        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 w-full max-w-7xl">
          <div className="max-w-lg mx-auto text-center xl:max-w-2xl">
          <div className="max-w-2xl text-center">
                <img
                  src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
                  alt="iGaming Afrika Logo"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            <p className="max-w-lg mx-auto mt-6 text-base font-normal leading-7 text-gray-300">
            The first iGaming Magazine in Africa exclusively focused on exploring 
            crucial subjects related to the online and retail gambling sectors across the African continent.
            </p>

          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        {selectedMagazine ? (
          <div className="mb-12">
            <MagazineReading magazine={selectedMagazine} />
          </div>
        ) : (
          <MagazineReading />
        )}
        <MagazineCarousel 
          onSelectMagazine={setSelectedMagazine} 
          selectedMagazineId={selectedMagazine?.id}
        />
      </div>
      {/* <MagazineReading />
      <MagazineCarousel /> */}
    </>
  );
};

export default Magazine;
