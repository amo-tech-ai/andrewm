import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME, NAV_ITEMS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // We want the header to be extremely minimal and overlaying content
  return (
    <div className="flex flex-col min-h-screen font-sans bg-fashion-bg overflow-x-hidden">
      
      {/* Minimal Header */}
      <header className="fixed top-0 w-full z-50 py-6 px-8 flex justify-between items-start pointer-events-none">
        
        {/* Brand Name - Top Left */}
        <Link to="/" className="pointer-events-auto group">
          <div className="flex items-center space-x-4">
             <h1 className="font-sans text-xl tracking-[0.15em] text-white mix-blend-difference font-light">
               {APP_NAME.split(' ')[0]}<span className="font-semibold">{APP_NAME.split(' ')[1]}</span>
             </h1>
          </div>
        </Link>

        {/* Menu Button - Top Right */}
        <div className="pointer-events-auto">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center bg-[#8C3A5B] text-white pl-6 pr-4 py-2 hover:bg-[#6e2d45] transition-colors shadow-lg"
          >
            <span className="text-sm uppercase tracking-widest mr-3 font-light">Menu</span>
            <span className="text-xl leading-none font-light">+</span>
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-fashion-burgundy z-40 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
         <div className="h-full flex flex-col items-center justify-center space-y-8">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-thin text-4xl md:text-6xl text-white uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white text-sm uppercase tracking-widest"
            >
              Close [x]
            </button>
         </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full">
        {children}
      </main>

    </div>
  );
};

export default Layout;
