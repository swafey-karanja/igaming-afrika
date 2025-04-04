import { useEffect, useState } from 'react';

const BookReader = ({ magazine }) => {
   // Sample book content
  const bookPages =  magazine?.content || [
    "Page 1 content... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Page 2 content... Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Page 3 content... Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Page 4 content... Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Page 5 content... Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const totalPages = bookPages.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isTurning) {
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsTurning(false);
      }, 300);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isTurning) {
      setIsTurning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsTurning(false);
      }, 300);
    }
  };

  const progress = ((currentPage + 1) / totalPages) * 100;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isTurning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-2">
        <div className="max-w-6xl mx-auto w-full"> 
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            {magazine ? (
                <h2 className="text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
                    Currently Reading: {magazine.title}
                </h2>
            ) : (
                <h2 className="text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
                    Latest Magazine Issue
                </h2>
            )}
        </div>
            <div className="my-8 mx-auto max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden relative h-[70vh] group">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
                
                {/* Page Counter */}
                <div className="p-2 text-center text-gray-600">
                Page {currentPage + 1} of {totalPages}
                </div>
                
                {/* Book Content */}
                <div className={`p-8 min-h-[400px] border-t border-b border-gray-200 ${isTurning ? 'flip-animation' : ''}`}>
                {bookPages[currentPage]}
                </div>
                
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 0 || isTurning}
                        className={`py-10 px-2 ${currentPage === 0 || isTurning ? 
                        'text-gray-400 cursor-not-allowed' : 
                        'text-green-600 hover:bg-green-100'} rounded-md`}
                        aria-label="Previous page"
                    >
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1 || isTurning}
                        className={`py-10 px-2 ${currentPage === totalPages - 1 || isTurning ? 
                        'text-gray-400 cursor-not-allowed' : 
                        'text-green-600 hover:bg-green-100'} rounded-md`}
                        aria-label="Next page"
                    >
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default BookReader;