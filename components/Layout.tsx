import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME, NAV_ITEMS } from '../constants';
import { Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-fashion-bg overflow-x-hidden relative selection:bg-fashion-burgundy selection:text-white">
      
      {/* Minimal Header */}
      <header className="fixed top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-start pointer-events-none">
        
        {/* Brand Name - Top Left */}
        <Link to="/" className="pointer-events-auto group mix-blend-difference">
          <div className="flex items-center space-x-4">
             <h1 className="font-sans text-lg md:text-xl tracking-[0.2em] text-white font-light uppercase group-hover:opacity-70 transition-opacity">
               {APP_NAME}
             </h1>
          </div>
        </Link>

        {/* Menu Button - Top Right */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="group flex items-center bg-[#8C3A5B] text-white pl-5 pr-3 py-2 hover:bg-[#6e2d45] transition-all shadow-xl hover:shadow-2xl rounded-sm"
          >
            <span className="text-xs uppercase tracking-widest mr-3 font-medium">Menu</span>
            <span className="text-lg leading-none font-light group-hover:rotate-90 transition-transform duration-300">+</span>
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-fashion-burgundy z-[60] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
         <div className="relative h-full flex flex-col items-center justify-center space-y-8 p-6">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 text-white/80 hover:text-white flex items-center gap-2 group"
            >
              <span className="text-xs uppercase tracking-widest">Close</span>
              <X className="group-hover:rotate-90 transition-transform duration-300" size={24} />
            </button>

            <nav className="flex flex-col items-center space-y-6 md:space-y-8">
              {NAV_ITEMS.map((item, idx) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="font-sans font-thin text-4xl md:text-7xl text-white uppercase tracking-[0.15em] hover:opacity-50 transition-opacity relative group"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-12 text-white/40 text-xs uppercase tracking-widest">
              FashionOS &copy; 2024
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full relative">
        {children}
      </main>

    </div>
  );
};

export default Layout;