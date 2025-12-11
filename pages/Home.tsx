import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import { MOCK_COLLECTIONS, MOCK_DESIGNERS } from '../constants';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      
      {/* --- SECTION 1: HERO LANDING --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-fashion-bg">
        
        {/* Diagonal Gradient Overlay */}
        <div 
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{
                background: 'linear-gradient(115deg, #707785 0%, #707785 45%, transparent 45.1%)',
                opacity: 0.8,
                mixBlendMode: 'multiply'
            }}
        />

        {/* Model Image - Right Side (Cutout style) */}
        <div className="absolute right-0 bottom-0 h-[90vh] w-1/2 z-0 flex justify-center items-end">
            <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800" 
                alt="Hero Model" 
                className="h-full object-contain object-bottom drop-shadow-2xl"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            />
        </div>

        {/* Start Journey Interaction */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <span className="text-white italic font-serif mb-4 text-lg drop-shadow-md">start the journey</span>
            <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}
                className="w-24 h-24 rounded-full bg-fashion-circle/80 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform duration-500 border border-white/20"
            >
                <Plus size={40} strokeWidth={0.5} />
            </button>
        </div>
      </section>


      {/* --- SECTION 2: EYE SPY COLLECTION --- */}
      <section className="relative min-h-screen w-full bg-fashion-bg flex items-center overflow-hidden py-24">
         <div className="absolute left-6 top-32 z-10">
            <h2 className="font-sans font-thin text-7xl md:text-9xl text-fashion-burgundy tracking-tighter leading-none opacity-90">
                EYE <br/> SPY
            </h2>
         </div>

         <div className="container mx-auto relative h-[600px] flex items-center justify-center">
            {/* Background Blurred Models */}
            <div className="absolute left-10 md:left-40 opacity-40 blur-sm transform scale-75 grayscale duration-1000">
                <img src={MOCK_COLLECTIONS[3].imageUrl} className="h-[400px] object-cover" />
            </div>
            <div className="absolute right-10 md:right-40 opacity-40 blur-sm transform scale-75 grayscale duration-1000">
                <img src={MOCK_COLLECTIONS[4].imageUrl} className="h-[400px] object-cover" />
            </div>

            {/* Main Center Model */}
            <div className="relative z-20 h-full shadow-2xl transition-all duration-500 hover:scale-105">
                <img src={MOCK_COLLECTIONS[0].imageUrl} className="h-full w-auto object-cover" />
            </div>

            {/* Navigation Arrows */}
            <button className="absolute left-4 md:left-1/4 top-1/2 text-white mix-blend-difference hover:scale-125 transition-transform">
                <ChevronLeft size={64} strokeWidth={0.5} />
            </button>
            <button className="absolute right-4 md:right-1/4 top-1/2 text-white mix-blend-difference hover:scale-125 transition-transform">
                <ChevronRight size={64} strokeWidth={0.5} />
            </button>

            {/* Product Info */}
            <div className="absolute right-6 top-1/2 md:top-32 w-64 text-right">
                <div className="flex items-center justify-end space-x-2 text-fashion-burgundy mb-8">
                     <div className="w-8 h-8 rounded-full bg-fashion-burgundy flex items-center justify-center text-white">
                        <span className="text-xs">ii</span>
                     </div>
                     <span className="text-xs uppercase tracking-widest">View Full Collection</span>
                </div>
                
                <div className="border-t border-white/50 pt-4 mt-12">
                    <p className="text-fashion-burgundy text-xs uppercase tracking-widest mb-1">Current Item</p>
                    <p className="text-white text-lg font-sans uppercase tracking-widest mix-blend-difference">
                        170601B Black Shiny Dive Dress
                    </p>
                </div>
            </div>
         </div>
      </section>


      {/* --- SECTION 3: PAST COLLECTIONS --- */}
      <section className="relative min-h-screen w-full bg-fashion-bg py-24 flex flex-col justify-center">
          <div className="container mx-auto px-6">
              <h2 className="font-sans font-thin text-5xl md:text-7xl text-fashion-burgundy text-center mb-24 tracking-[0.1em] uppercase">
                  Past Collections
              </h2>

              {/* Connecting Lines (Decorative) */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                  <svg className="w-full h-full">
                      <line x1="20%" y1="0" x2="50%" y2="100%" stroke="#8C3A5B" strokeWidth="1" />
                      <line x1="80%" y1="0" x2="50%" y2="100%" stroke="#8C3A5B" strokeWidth="1" />
                  </svg>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-end relative z-10">
                  {/* Collection 1 */}
                  <div className="flex flex-col items-center group cursor-pointer translate-y-12">
                      <img src={MOCK_COLLECTIONS[1].imageUrl} className="h-64 md:h-96 object-contain mb-6 drop-shadow-xl group-hover:-translate-y-4 transition-transform duration-500" />
                      <p className="text-white text-sm uppercase tracking-widest text-center mix-blend-difference">Madame de Pizan</p>
                  </div>
                   {/* Collection 2 */}
                   <div className="flex flex-col items-center group cursor-pointer -translate-y-12">
                       <p className="text-white text-sm uppercase tracking-widest text-center mb-6 mix-blend-difference">Romanov Women</p>
                      <img src={MOCK_COLLECTIONS[2].imageUrl} className="h-64 md:h-80 object-contain drop-shadow-xl group-hover:-translate-y-4 transition-transform duration-500" />
                  </div>
                   {/* Collection 3 */}
                   <div className="flex flex-col items-center group cursor-pointer translate-y-8">
                      <img src={MOCK_COLLECTIONS[3].imageUrl} className="h-64 md:h-96 object-contain mb-6 drop-shadow-xl group-hover:-translate-y-4 transition-transform duration-500" />
                      <p className="text-white text-sm uppercase tracking-widest text-center mix-blend-difference">Modern Shipping</p>
                  </div>
                   {/* Collection 4 */}
                   <div className="flex flex-col items-center group cursor-pointer -translate-y-8">
                      <p className="text-white text-sm uppercase tracking-widest text-center mb-6 mix-blend-difference">Ice Moon of Europa</p>
                      <img src={MOCK_COLLECTIONS[4].imageUrl} className="h-64 md:h-80 object-contain drop-shadow-xl group-hover:-translate-y-4 transition-transform duration-500" />
                  </div>
              </div>
          </div>
      </section>

      {/* --- SECTION 4: BIOGRAPHY --- */}
      <section className="relative min-h-screen w-full bg-fashion-bg py-24 flex items-center">
        <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-sans font-thin text-6xl md:text-8xl text-fashion-burgundy mb-0 tracking-[0.1em] uppercase relative z-20 mix-blend-multiply">
                Biography
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-[-40px]">
                {/* Image Block */}
                <div className="md:col-start-3 md:col-span-5 relative z-10">
                   <div className="aspect-[4/3] bg-[#2a2a2a] overflow-hidden grayscale contrast-125">
                      <img src={MOCK_DESIGNERS[0].imageUrl} className="w-full h-full object-cover opacity-80" />
                   </div>
                </div>

                {/* Text Content */}
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-white mix-blend-difference pt-12">
                   <div className="md:col-span-1">
                      <p className="text-sm font-light leading-relaxed">
                        Unlike most fashion designers who start with a sketch, Andrew Majtenyi gets his inspiration from the textures, colour and feel of the fabric. 
                        <br/><br/>
                        Andrew has designed for film and television, and has worked on numerous productions.
                      </p>
                   </div>
                   <div className="md:col-span-1">
                      <p className="text-sm font-light leading-relaxed">
                        London was the obvious next step setting up a shop in Clerkenwell in 2009 and showing during London Fashion Week.
                        <br/><br/>
                        Over the years he learned about filmmaking, a skill he now uses to write and direct the film shorts that open his catwalk shows.
                      </p>
                   </div>
                   <div className="md:col-span-1">
                      <p className="text-sm font-light leading-relaxed">
                        He apprenticed under master tailor Vincenzo Cardone in late 19th and 20th century tailoring. Madame Sophie who taught him advanced draping techniques, and honed his couture skills while working with the National Ballet of Canada.
                      </p>
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 5: CONTACT --- */}
      <section className="relative min-h-screen w-full bg-fashion-bg pt-24 pb-12 flex flex-col justify-between">
          <div className="container mx-auto px-6">
              <h2 className="font-sans font-thin text-6xl md:text-9xl text-fashion-burgundy mb-20 tracking-[0.1em] uppercase opacity-90 relative">
                  Contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white mix-blend-difference mb-24">
                  <div>
                      <h3 className="text-xl mb-6">Europe/International</h3>
                      <p className="font-light text-sm leading-loose">
                          365 St. John Street<br/>
                          London EC1V 4LB<br/>
                          United Kingdom<br/>
                          Tel: +44 (0)20 7713 1288<br/>
                          info@andrewmajtenyi.com
                      </p>
                  </div>
                  <div>
                      <h3 className="text-xl mb-6">Canadian Press</h3>
                      <p className="font-light text-sm leading-loose">
                          Christian Dare<br/>
                          Stylist Box<br/>
                          Tel: +1 647 466 1077<br/>
                          christian@stylistbox.com
                          <br/><br/>
                          Larry Scott<br/>
                          press@andrewmajtenyi.com
                      </p>
                  </div>
                  <div>
                      <h3 className="text-xl mb-6">International Press</h3>
                      <p className="font-light text-sm leading-loose">
                          Portia Shaw<br/>
                          Pop PR<br/>
                          Tel: +44 (0) 20 7637 3332<br/>
                          portia@poppr.co.uk
                      </p>
                  </div>
                  <div>
                      <h3 className="text-xl mb-6">Buyer Inquiries</h3>
                      <p className="font-light text-sm leading-loose">
                          International Sales<br/>
                          Talent to Trend<br/>
                          12-18 Passage Choiseul<br/>
                          75002 Paris
                          <br/><br/>
                          Miyoko Fouloun<br/>
                          Tel: +33 6 63 92 50 12<br/>
                          miyoko@talent-to-trend.com
                      </p>
                  </div>
              </div>

              {/* Social & Shop */}
              <div className="flex flex-col items-center">
                  <div className="flex space-x-8 text-white mb-12">
                      <a href="#" className="flex items-center space-x-2 hover:text-fashion-burgundy transition-colors"><Twitter size={16}/><span className="text-xs">@AndrewMajtenyi</span></a>
                      <a href="#" className="flex items-center space-x-2 hover:text-fashion-burgundy transition-colors"><Facebook size={16}/><span className="text-xs">/Andrew-Majtenyi</span></a>
                      <a href="#" className="flex items-center space-x-2 hover:text-fashion-burgundy transition-colors"><Instagram size={16}/><span className="text-xs">@AndrewMajtenyi</span></a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                      <div className="text-center">
                          <p className="text-white text-sm mb-4 uppercase tracking-widest">London Shop</p>
                          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" className="w-full grayscale hover:grayscale-0 transition-all duration-500" alt="Shop" />
                          <div className="text-left mt-4 text-white/60 text-xs leading-relaxed">
                             London Shop<br/>
                             365 St. John Street<br/>
                             London EC1V 4LB
                          </div>
                      </div>
                      <div className="text-center">
                          <p className="text-white text-sm mb-4 uppercase tracking-widest">ShopAndrew.com</p>
                          <div className="aspect-[3/2] bg-white flex items-center justify-center border border-stone-200">
                             <span className="font-sans font-thin text-3xl tracking-widest text-black">shopandrew</span>
                          </div>
                          <div className="text-left mt-4 text-white/60 text-xs leading-relaxed">
                             Online Shop
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default Home;
