import { useLocation, Link } from 'react-router-dom'; // or use Next.js router

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex items-center text-sm font-medium text-gray-600 max-w-7xl mx-auto py-8">
      <Link to="/" className="text-gray-800 hover:text-indigo-600 flex items-center">
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        Home
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={name} className="flex items-center">
            <svg 
              className="w-4 h-4 mx-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
            
            {isLast ? (
              <span className="text-gray-500 capitalize">{name.replace(/-/g, ' ')}</span>
            ) : (
              <Link to={routeTo} className="text-gray-800 hover:text-indigo-600 capitalize">
                {name.replace(/-/g, ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;