import React from 'react';
import { MOCK_COLLECTIONS } from '../constants';
import { Link } from 'react-router-dom';

const Collections: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-6 min-h-screen">
      <div className="container mx-auto">
        <header className="mb-20 text-center">
            <h1 className="font-display text-5xl md:text-7xl mb-4">Collections</h1>
            <p className="font-serif italic text-neutral-500 text-lg">Curated selections from around the globe</p>
        </header>
        
        {/* Filters (Mock) */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
            {['All', 'SS24', 'FW23', 'Couture', 'Ready-to-Wear'].map((filter, i) => (
                <button 
                    key={filter} 
                    className={`text-xs uppercase tracking-widest pb-1 border-b ${i === 0 ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'}`}
                >
                    {filter}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Duplicating mock data to fill grid for demo */}
            {[...MOCK_COLLECTIONS, ...MOCK_COLLECTIONS].map((col, idx) => (
                <Link to={`/collections/${col.id}`} key={`${col.id}-${idx}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-stone-100">
                        <img 
                            src={col.imageUrl} 
                            alt={col.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                             <span className="text-white text-xs uppercase tracking-widest border border-white px-6 py-2">View Look</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-display text-xl">{col.title}</h3>
                            <span className="text-xs font-mono text-neutral-400">{col.season}</span>
                        </div>
                        <p className="font-serif italic text-neutral-500">{col.designer}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
