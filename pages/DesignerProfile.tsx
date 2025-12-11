import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { MOCK_DESIGNERS, MOCK_COLLECTIONS } from '../constants';
import { MapPin, Globe, Instagram, Mail } from 'lucide-react';

const DesignerProfile: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  
  // Data resolution strategy:
  // 1. Check if data was passed via Router State (Wizard Preview)
  // 2. Check if ID matches a mock designer
  // 3. Fallback to null
  
  const wizardData = location.state as any;
  const mockDesigner = MOCK_DESIGNERS.find(d => d.id === id || (id === 'd1')); // Default to d1 for 'designers' route if no ID
  
  // Normalize data structure
  const profile = wizardData ? {
    name: wizardData.designerName,
    location: wizardData.location,
    bio: wizardData.bio,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', // Placeholder for wizard
    specialty: wizardData.styleTags?.[0] || 'Emerging Talent',
    email: wizardData.email,
    website: wizardData.website,
    social: wizardData.socialHandle,
    isNew: true // Flag to show "New" badge
  } : mockDesigner;

  if (!profile) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-fashion-bg">
            <h1 className="font-display text-2xl text-fashion-burgundy">Designer Not Found</h1>
        </div>
    );
  }

  return (
    <div className="bg-fashion-bg min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
            src={profile.imageUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-fashion-slate/30 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container mx-auto">
                {profile.isNew && (
                    <span className="bg-fashion-burgundy text-white text-[10px] uppercase tracking-widest px-3 py-1 mb-4 inline-block">
                        New Arrival
                    </span>
                )}
                <h1 className="text-white font-sans font-thin text-5xl md:text-8xl uppercase tracking-wider mb-2">
                    {profile.name}
                </h1>
                <p className="text-white/80 font-serif italic text-xl">{profile.specialty}</p>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Sidebar Info */}
            <div className="md:col-span-4 space-y-8 animate-reveal-up">
                <div className="border-t border-fashion-burgundy/20 pt-6">
                    <h3 className="text-xs uppercase tracking-widest text-fashion-slate mb-4">Headquarters</h3>
                    <div className="flex items-center gap-3 text-fashion-text font-light">
                        <MapPin size={16} className="text-fashion-burgundy"/>
                        {profile.location}
                    </div>
                </div>

                <div className="border-t border-fashion-burgundy/20 pt-6">
                    <h3 className="text-xs uppercase tracking-widest text-fashion-slate mb-4">Connect</h3>
                    <div className="space-y-3 text-fashion-text font-light">
                        {profile.website && (
                            <div className="flex items-center gap-3">
                                <Globe size={16} className="text-fashion-burgundy"/>
                                <span>{profile.website}</span>
                            </div>
                        )}
                         {profile.social && (
                            <div className="flex items-center gap-3">
                                <Instagram size={16} className="text-fashion-burgundy"/>
                                <span>{profile.social}</span>
                            </div>
                        )}
                         {profile.email && (
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-fashion-burgundy"/>
                                <span>{profile.email}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Bio & Content */}
            <div className="md:col-span-8 space-y-12 animate-reveal-up stagger-1">
                <div>
                    <h2 className="font-display text-4xl text-fashion-burgundy mb-8">The Vision</h2>
                    <p className="font-serif text-lg leading-loose text-fashion-text/80 text-justify">
                        {profile.bio}
                    </p>
                </div>

                {/* Simulated Collection Grid (For Wizard Preview or Mock) */}
                <div>
                    <h2 className="font-display text-3xl text-fashion-burgundy mb-8">Latest Collections</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {wizardData?.images?.length > 0 ? (
                            // Show images uploaded in wizard (using placeholder logic for File objects as we can't display blob URLs easily in this prompt constraint, using placeholders)
                            wizardData.images.map((_: any, i: number) => (
                                <div key={i} className="aspect-[3/4] bg-stone-200 flex items-center justify-center text-stone-400 border border-stone-300">
                                    <span className="text-xs uppercase">Uploaded Asset {i+1}</span>
                                </div>
                            ))
                        ) : (
                             // Show mock collections for existing designer
                            MOCK_COLLECTIONS.slice(0, 3).map((col, i) => (
                                <Link to={`/collections/${col.id}`} key={i} className="block group cursor-pointer overflow-hidden">
                                    <img 
                                        src={col.imageUrl} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                                        alt="Collection"
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerProfile;