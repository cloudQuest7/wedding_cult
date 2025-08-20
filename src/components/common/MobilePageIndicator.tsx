import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function MobilePageIndicator() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Map paths to readable names
  const pathNames = {
    '/': 'Home',
    '/portfolio': 'Portfolio',
    '/gallery': 'Gallery',
    '/about': 'About',
    '/faq': 'FAQ',
    '/contact': 'Contact'
  };

  const currentPage = pathNames[currentPath as keyof typeof pathNames] || '';

  if (currentPath === '/') return null;

  return (
    <div className="lg:hidden fixed top-20 left-0 right-0 h-8 bg-cream/10 backdrop-blur-md z-30 border-b border-chocolate/10">
      <div className="h-full max-w-screen-2xl mx-auto flex items-center px-4">
        <div className="flex items-center gap-2 text-chocolate/70">
          <span className=" text-xl">
            {currentPage} 
          </span>
          <div className="ml-auto flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-chocolate/40 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
