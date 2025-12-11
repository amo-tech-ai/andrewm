import React, { useEffect, useState } from 'react';
import { MOCK_COLLECTIONS } from '../constants';
import { Link } from 'react-router-dom';

const Collections: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCollections = filter === 'All' 
    ? [...MOCK_COLLECTIONS, ...MOCK_COLLECTIONS] // Keeping duplicated for demo grid fullness
    : MOCK_COLLECTIONS.filter(c => c.season === filter);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-fashion-bg">
      <div className="container mx-auto">
        <header className="mb-24 text-center">
            <h1 className="font-sans font-thin text-5xl md:text-7xl mb-6 text-fashion-burgundy tracking-[0.1em] uppercase">Collections</h1>
            <div className="w-24 h-[1px] bg-fashion-burgundy mx-auto opacity-50"></div>
        </header>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
            {['All', 'Current', 'Archive'].map((f, i) => (
                <button 
                    key={f} 
                    onClick={() => setFilter(f)}
                    className={`text-xs uppercase tracking-[0.2em] pb-2 border-b transition-all duration-300 ${filter === f ? 'border-fashion-burgundy text-fashion-burgundy' : 'border-transparent text-fashion-text/50 hover:text-fashion-burgundy'}`}
                >
                    {f}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 min-h-[50vh]">
            {filteredCollections.length > 0 ? (
                filteredCollections.map((col, idx) => (
                    <Link to={`/collections/${col.id}`} key={`${col.id}-${idx}`} className="group block animate-fade-in">
                        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-stone-200">
                            {/* Image Hover Scale */}
                            <img 
                                src={col.imageUrl} 
                                alt={col.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0"
                            />
                            
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-fashion-burgundy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                                <span className="text-white text-sm uppercase tracking-[0.3em] border border-white px-8 py-3 hover:bg-white hover:text-fashion-burgundy transition-colors">View Look</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <span className="text-[10px] font-sans text-fashion-slate uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">{col.season}</span>
                            <h3 className="font-sans text-xl text-fashion-text tracking-widest uppercase mb-1 group-hover:text-fashion-burgundy transition-colors">{col.title}</h3>
                            <p className="font-serif italic text-fashion-text/60 text-sm">{col.designer}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center text-fashion-text/50 py-20 font-serif italic">
                    No collections found in this category.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Collections;