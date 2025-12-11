import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, Facebook, Instagram, Twitter, ArrowDown } from 'lucide-react';
import { MOCK_COLLECTIONS, MOCK_DESIGNERS } from '../constants';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-trigger').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Parallax scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % MOCK_COLLECTIONS.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + MOCK_COLLECTIONS.length) % MOCK_COLLECTIONS.length);
  };

  // Calculate indices for carousel effect
  const prevIndex = (activeSlide - 1 + MOCK_COLLECTIONS.length) % MOCK_COLLECTIONS.length;
  const nextIndex = (activeSlide + 1) % MOCK_COLLECTIONS.length;

  const currentCollection = MOCK_COLLECTIONS[activeSlide];

  return (
    <div className="w-full bg-fashion-bg">
      
      {/* --- SECTION 1: HERO LANDING --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Layer (Left Grey Gradient/Shape) */}
        <div 
            className="absolute top-0 left-0 w-full h-full z-10 hero-clip bg-fashion-slate/90 md:bg-fashion-slate/80 transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * -0.1}px)` // Subtle parallax on the shape
            }}
        />

        {/* Model Image - Right Side */}
        <div className="absolute right-0 bottom-0 h-full w-full md:w-[60%] z-0 flex justify-end items-end">
            <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200" 
                alt="Hero Model" 
                className="h-[85vh] md:h-[95vh] object-cover md:object-contain object-bottom md:mr-12 filter contrast-[1.1] saturate-[0.8]"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            />
        </div>

        {/* Start Journey Interaction - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
             onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth'})}>
            <span className="text-white italic font-serif mb-6 text-xl tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-500 text-shadow-sm">
                start the journey
            </span>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-fashion-circle/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-fashion-burgundy/80 transition-all duration-500 border border-white/30 shadow-2xl">
                <Plus size={32} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500" />
            </div>
        </div>

        {/* Mobile Scroller Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden animate-bounce text-white/50">
          <ArrowDown size={20} />
        </div>
      </section>


      {/* --- SECTION 2: EYE SPY COLLECTION (Carousel Feel) --- */}
      <section className="relative min-h-[120vh] w-full bg-fashion-bg flex items-center overflow-hidden py-24">
         
         {/* Huge Background Title */}
         <div className="absolute left-4 md:left-12 top-24 z-0 pointer-events-none select-none">
            <h2 
              className="font-sans font-thin text-[20vw] md:text-[12rem] text-fashion-burgundy/10 md:text-fashion-burgundy tracking-tighter leading-none mix-blend-multiply reveal-trigger"
              style={{ transform: `translateX(${scrollY * -0.05}px)` }}
            >
                EYE <br className="hidden md:block"/> SPY
            </h2>
         </div>

         <div className="container mx-auto relative h-[700px] w-full flex items-center justify-center mt-20 md:mt-0">
            
            {/* Background Blurred Model (Left) */}
            <div className="hidden md:block absolute left-[10%] opacity-30 blur-[2px] transform scale-75 grayscale hover:grayscale-0 transition-all duration-700 z-10">
                <img 
                  key={`prev-${prevIndex}`}
                  src={MOCK_COLLECTIONS[prevIndex].imageUrl} 
                  className="h-[500px] object-cover" 
                  alt="Previous Look" 
                />
            </div>
            
            {/* Background Blurred Model (Right) */}
            <div className="hidden md:block absolute right-[10%] opacity-30 blur-[2px] transform scale-75 grayscale hover:grayscale-0 transition-all duration-700 z-10">
                <img 
                  key={`next-${nextIndex}`}
                  src={MOCK_COLLECTIONS[nextIndex].imageUrl} 
                  className="h-[500px] object-cover" 
                  alt="Next Look" 
                />
            </div>

            {/* Main Center Model - Focal Point */}
            <div className="relative z-20 h-[60vh] md:h-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 reveal-trigger stagger-1">
                <img 
                  key={`current-${activeSlide}`}
                  src={currentCollection.imageUrl} 
                  className="h-full w-auto object-cover animate-fade-in" 
                  alt={currentCollection.title} 
                />
                
                {/* Mobile Caption Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden text-white">
                  <p className="font-sans text-lg uppercase tracking-widest">{currentCollection.title}</p>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="hidden md:block absolute left-[25%] top-1/2 text-fashion-burgundy hover:scale-125 transition-transform z-30"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              onClick={nextSlide}
              className="hidden md:block absolute right-[25%] top-1/2 text-fashion-burgundy hover:scale-125 transition-transform z-30"
            >
                <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Desktop Product Info - Floating Right */}
            <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 w-64 text-right z-30 reveal-trigger stagger-2">
                <div className="flex items-center justify-end space-x-3 text-fashion-burgundy mb-8 group cursor-pointer">
                     <Link to={`/collections/${currentCollection.id}`} className="w-10 h-10 rounded-full border border-fashion-burgundy flex items-center justify-center text-fashion-burgundy group-hover:bg-fashion-burgundy group-hover:text-white transition-colors">
                        <span className="text-xs font-serif italic">ii</span>
                     </Link>
                     <Link to={`/collections/${currentCollection.id}`} className="text-xs uppercase tracking-[0.2em] font-medium border-b border-transparent group-hover:border-fashion-burgundy transition-all">
                        View Collection
                     </Link>
                </div>
                
                <div className="border-t border-fashion-burgundy/30 pt-6 mt-12">
                    <p className="text-fashion-burgundy text-[10px] uppercase tracking-[0.3em] mb-2">Current Item</p>
                    <p className="text-fashion-text text-xl font-sans font-light uppercase tracking-widest leading-normal">
                        {currentCollection.season} <br/> <span className="font-medium">{currentCollection.title}</span>
                    </p>
                </div>
            </div>
         </div>
      </section>


      {/* --- SECTION 3: PAST COLLECTIONS (Grid & Lines) --- */}
      <section className="relative w-full bg-[#E0D8D3] py-32 overflow-hidden">
          <div className="container mx-auto px-6 relative">
              <h2 className="font-sans font-thin text-4xl md:text-6xl text-fashion-burgundy text-center mb-32 tracking-[0.15em] uppercase reveal-trigger">
                  Past Collections
              </h2>

              {/* Connecting Lines SVG */}
              <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
                  <svg className="w-full h-full overflow-visible">
                      <line x1="25%" y1="100" x2="50%" y2="80%" stroke="#8C3A5B" strokeWidth="0.5" />
                      <line x1="75%" y1="100" x2="50%" y2="80%" stroke="#8C3A5B" strokeWidth="0.5" />
                      <line x1="50%" y1="80%" x2="50%" y2="100%" stroke="#8C3A5B" strokeWidth="0.5" />
                  </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-4 items-end relative z-10 pb-20">
                  {/* Collection Items */}
                  {[
                    { c: MOCK_COLLECTIONS[1], offset: 'md:translate-y-12' },
                    { c: MOCK_COLLECTIONS[2], offset: 'md:-translate-y-12' },
                    { c: MOCK_COLLECTIONS[3], offset: 'md:translate-y-8' },
                    { c: MOCK_COLLECTIONS[4], offset: 'md:-translate-y-8' }
                  ].map((item, i) => (
                    <Link to={`/collections/${item.c.id}`} key={i} className={`flex flex-col items-center group cursor-pointer transition-transform duration-700 hover:scale-105 reveal-trigger stagger-${i%3}`}>
                        {i % 2 === 0 ? (
                            <>
                                <div className="h-[400px] w-full flex items-end justify-center mb-6">
                                    <img src={item.c.imageUrl} className="h-full object-contain drop-shadow-xl" alt={item.c.title} />
                                </div>
                                <p className="text-fashion-text text-xs uppercase tracking-[0.2em] text-center border-b border-transparent group-hover:border-fashion-burgundy pb-1 transition-all">{item.c.title}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-fashion-text text-xs uppercase tracking-[0.2em] text-center mb-6 border-b border-transparent group-hover:border-fashion-burgundy pb-1 transition-all">{item.c.title}</p>
                                <div className="h-[350px] w-full flex items-start justify-center">
                                    <img src={item.c.imageUrl} className="h-full object-contain drop-shadow-xl" alt={item.c.title} />
                                </div>
                            </>
                        )}
                    </Link>
                  ))}
              </div>
          </div>
      </section>

      {/* --- SECTION 4: BIOGRAPHY (Editorial Layout) --- */}
      <section className="relative min-h-screen w-full bg-fashion-bg py-24 flex items-center">
        <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-sans font-thin text-5xl md:text-8xl text-fashion-burgundy mb-8 tracking-[0.1em] uppercase relative z-20 mix-blend-multiply reveal-trigger">
                Biography
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8 md:mt-[-60px]">
                {/* Image Block */}
                <div className="md:col-start-4 md:col-span-6 relative z-10 reveal-trigger stagger-1">
                   <div className="aspect-[16/9] md:aspect-[3/2] bg-[#2a2a2a] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                      <img src={MOCK_DESIGNERS[0].imageUrl} className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" alt="Biography" />
                   </div>
                </div>

                {/* Text Content */}
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-12 md:pt-24 border-t border-fashion-burgundy/10 mt-12">
                   {[
                     "Unlike most fashion designers who start with a sketch, Andrew Majtenyi gets his inspiration from the textures, colour and feel of the fabric. Andrew has designed for film and television, and has worked on numerous productions.",
                     "London was the obvious next step setting up a shop in Clerkenwell in 2009 and showing during London Fashion Week. Over the years he learned about filmmaking, a skill he now uses to write and direct the film shorts that open his catwalk shows.",
                     "He apprenticed under master tailor Vincenzo Cardone in late 19th and 20th century tailoring. Madame Sophie who taught him advanced draping techniques, and honed his couture skills while working with the National Ballet of Canada."
                   ].map((text, i) => (
                     <div key={i} className={`md:col-span-1 reveal-trigger stagger-${i}`}>
                        <p className="text-fashion-text text-sm md:text-base font-light leading-loose text-justify md:text-left">
                          {text}
                        </p>
                     </div>
                   ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 5: CONTACT & FOOTER --- */}
      <section className="relative min-h-screen w-full bg-[#E6E0DB] pt-24 pb-12 flex flex-col justify-between border-t border-white/50">
          <div className="container mx-auto px-6">
              <h2 className="font-sans font-thin text-5xl md:text-9xl text-fashion-burgundy mb-20 tracking-[0.1em] uppercase opacity-90 relative reveal-trigger">
                  Contact
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-fashion-text mb-32">
                  <div className="reveal-trigger stagger-1">
                      <h3 className="text-xl text-fashion-burgundy mb-6 font-serif italic">Europe/International</h3>
                      <p className="font-light text-sm leading-loose opacity-80">
                          365 St. John Street<br/>
                          London EC1V 4LB<br/>
                          United Kingdom<br/>
                          Tel: +44 (0)20 7713 1288<br/>
                          info@andrewmajtenyi.com
                      </p>
                  </div>
                  <div className="reveal-trigger stagger-2">
                      <h3 className="text-xl text-fashion-burgundy mb-6 font-serif italic">Canadian Press</h3>
                      <p className="font-light text-sm leading-loose opacity-80">
                          Christian Dare<br/>
                          Stylist Box<br/>
                          Tel: +1 647 466 1077<br/>
                          christian@stylistbox.com
                          <br/><br/>
                          Larry Scott<br/>
                          press@andrewmajtenyi.com
                      </p>
                  </div>
                  <div className="reveal-trigger stagger-3">
                      <h3 className="text-xl text-fashion-burgundy mb-6 font-serif italic">International Press</h3>
                      <p className="font-light text-sm leading-loose opacity-80">
                          Portia Shaw<br/>
                          Pop PR<br/>
                          Tel: +44 (0) 20 7637 3332<br/>
                          portia@poppr.co.uk
                      </p>
                  </div>
                  <div className="reveal-trigger stagger-1">
                      <h3 className="text-xl text-fashion-burgundy mb-6 font-serif italic">Buyer Inquiries</h3>
                      <p className="font-light text-sm leading-loose opacity-80">
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
              <div className="flex flex-col items-center border-t border-fashion-burgundy/20 pt-16">
                  <div className="flex space-x-12 text-fashion-burgundy mb-16 reveal-trigger">
                      <a href="#" className="flex items-center space-x-2 hover:text-black transition-colors transform hover:-translate-y-1"><Twitter size={20} strokeWidth={1.5} /><span className="text-xs tracking-widest hidden md:inline">@AndrewMajtenyi</span></a>
                      <a href="#" className="flex items-center space-x-2 hover:text-black transition-colors transform hover:-translate-y-1"><Facebook size={20} strokeWidth={1.5} /><span className="text-xs tracking-widest hidden md:inline">/Andrew-Majtenyi</span></a>
                      <a href="#" className="flex items-center space-x-2 hover:text-black transition-colors transform hover:-translate-y-1"><Instagram size={20} strokeWidth={1.5} /><span className="text-xs tracking-widest hidden md:inline">@AndrewMajtenyi</span></a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl reveal-trigger stagger-2">
                      <div className="group cursor-pointer">
                          <p className="text-fashion-burgundy text-xs mb-4 uppercase tracking-[0.2em] text-center md:text-left group-hover:text-black transition-colors">London Shop</p>
                          <div className="overflow-hidden bg-black/5">
                            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 h-64 object-cover" alt="Shop" />
                          </div>
                          <div className="text-left mt-4 text-fashion-text/60 text-xs leading-relaxed uppercase tracking-wider">
                             London Shop<br/>
                             365 St. John Street<br/>
                             London EC1V 4LB
                          </div>
                      </div>
                      <div className="group cursor-pointer">
                          <p className="text-fashion-burgundy text-xs mb-4 uppercase tracking-[0.2em] text-center md:text-left group-hover:text-black transition-colors">ShopAndrew.com</p>
                          <div className="aspect-[3/2] bg-white flex items-center justify-center border border-stone-200 group-hover:border-stone-400 transition-colors h-64">
                             <span className="font-sans font-thin text-3xl tracking-widest text-black group-hover:scale-110 transition-transform duration-500">shopandrew</span>
                          </div>
                          <div className="text-left mt-4 text-fashion-text/60 text-xs leading-relaxed uppercase tracking-wider">
                             Online Shop &amp; Archives
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