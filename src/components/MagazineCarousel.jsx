import { useState, useEffect, useRef } from 'react';
// import BookReader from './BookReader';

const MagazineCarousel = ({ onSelectMagazine, selectedMagazineId }) => {
    const magazines = [
        { 
          id: 1, 
          title: 'Tech Today', 
          cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
          content: [],
          year: '2023'  
        },
        { 
          id: 2, 
          title: 'Science Weekly', 
          cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
          content: [],
          year: '2024'  
        },
        { 
          id: 3, 
          title: 'Business Insights', 
          cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
          content: [],
          year: '2023'  
        },
        { 
          id: 4, 
          title: 'Health Matters', 
          cover: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
          content: [],
          year: '2025'  
        },
        { 
          id: 5, 
          title: 'Travel Explorer', 
          cover: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 
          content: [], 
          year: '2024' 
        },
      ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMagazines, setFilteredMagazines] = useState(magazines);
  const [selectedMagazine, setSelectedMagazine] = useState(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [selectedYear, setSelectedYear] = useState('All');
  const years = ['All', '2023', '2024', '2025']; 
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  // Filter magazines based on search term
  useEffect(() => {
    const results = magazines.filter(magazine => {
      const matchesSearch = magazine.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === 'All' || magazine.year === selectedYear;
      return matchesSearch && matchesYear;
    });
    setFilteredMagazines(results);
    setCenterIndex(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedYear]);

  // Smooth carousel navigation
  const navigateCarousel = (direction) => {
    if (isAnimating || filteredMagazines.length <= 1) return;
    
    setIsAnimating(true);
    const newIndex = (centerIndex + direction + filteredMagazines.length) % filteredMagazines.length;
    
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
    
    setTimeout(() => {
      setCenterIndex(newIndex);
      setIsAnimating(false);
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'none';
      }
    }, 400);
  };

  const goToPrev = () => navigateCarousel(-1);
  const goToNext = () => navigateCarousel(1);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isAnimating && containerRef.current) {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      containerRef.current.style.transform = `translateX(calc(-${centerIndex * 100}% - ${diff}px))`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!containerRef.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Reset position
    containerRef.current.style.transform = `translateX(-${centerIndex * 100}%)`;
    
    // Determine if swipe was significant enough to change page
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Go to a specific slide when clicking on a dot
  const goToSlide = (index) => {
    if (isAnimating || index === centerIndex) return;
    
    setIsAnimating(true);
    
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
    
    setTimeout(() => {
      setCenterIndex(index);
      setIsAnimating(false);
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'none';
      }
    }, 400);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerIndex, isAnimating, filteredMagazines.length]);

  // Calculate visible magazines with virtualization
  const getVisibleMagazines = () => {
    const visible = [];
    const length = filteredMagazines.length;
    
    // Always show 5 items (center + 2 on each side) when possible
    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + length) % length;
      visible.push({
        ...filteredMagazines[index],
        position: i, // -2, -1, 0, 1, 2
      });
    }
    
    return visible;
  };

  // If a magazine is selected, show the reader
  if (selectedMagazine) {
    return (
      <div className="p-4">
        <button 
          onClick={() => setSelectedMagazine(null)} 
          className="mb-4 flex items-center text-green-600 hover:text-green-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to magazines
        </button>
        {/* <BookReader pages={selectedMagazine.content} /> */}
      </div>
    );
  }

  const handleMagazineClick = (magazine) => {
    if (selectedMagazineId === magazine.id) {
      onSelectMagazine(null); // Deselect if same magazine clicked
    } else {
      onSelectMagazine(magazine); // Select new magazine
    }
  };

  // Add a selected style for the active magazine
  const getMagazineStyle = (magazineId) => {
    return magazineId === selectedMagazineId 
      ? 'ring-4 ring-green-500 scale-105' 
      : '';
  };

  return (
    <div className="min-h-[60vh] bg-white px-6 py-12 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <h2 className="text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
                Other Magazines
            </h2>
        </div>
        {/* Compact Search Bar */}
        <div className="my-6 flex flex-col sm:flex-row gap-2 justify-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-[400px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </div>
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search magazines..."
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
            </div>

            {/* Year Filter Dropdown */}
            <div className="relative w-[150px]">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                {years.map((year) => (
                    <option key={year} value={year}>
                    {year === 'All' ? 'All Years' : year}
                    </option>
                ))}
                </select>
            </div>
            </div>


        {/* Carousel Container */}
        <div className="relative h-[400px] overflow-hidden">
          {filteredMagazines.length > 0 ? (
            <>
              {/* Left Arrow */}
              <button
                onClick={goToPrev}
                disabled={isAnimating || filteredMagazines.length <= 1}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-md py-10 px-2 shadow-md hover:bg-green-100 focus:outline-none transition-all ${
                  isAnimating || filteredMagazines.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Magazine Items with Virtualization */}
              <div
                ref={containerRef}
                className="flex h-full items-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ transform: `translateX(-${centerIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {getVisibleMagazines().map(({ id, title, cover, position }) => {

                  return (
                    <div
                      key={`${id}-${position}`} // Unique key for each position
                      className="flex-shrink-0 w-full px-4 h-full flex items-center justify-center"
                    >
                      <div
                            onClick={() => handleMagazineClick(filteredMagazines[(centerIndex + position + filteredMagazines.length) % filteredMagazines.length])}
                            className={`transition-all duration-300 cursor-pointer w-full max-w-sm ${getMagazineStyle(id)}`}
                        >
                        <div className="h-[350px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                          <div className="h-[280px] bg-gray-100 flex items-center justify-center">
                            <img
                              src={cover}
                              alt={title}
                              className="h-full w-full object-cover"
                              loading="lazy" // Lazy load images
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={goToNext}
                disabled={isAnimating || filteredMagazines.length <= 1}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-md py-10 px-2 shadow-md hover:bg-green-100 focus:outline-none transition-all ${
                  isAnimating || filteredMagazines.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
                <div className="flex space-x-2">
                  {filteredMagazines.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
                        centerIndex === index
                          ? 'bg-green-600 w-6' // Active dot is wider and green
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-12 h-full flex items-center justify-center">
              <p className="text-gray-500">No magazines found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagazineCarousel;