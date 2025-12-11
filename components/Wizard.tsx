import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardState } from '../types';
import { STYLE_TAGS } from '../constants';
import { ChevronRight, ChevronLeft, Upload, Check, X, MapPin, Link as LinkIcon, Instagram } from 'lucide-react';

const INITIAL_STATE: WizardState = {
  step: 1,
  images: [],
  collectionName: '',
  description: '',
  designerName: '',
  email: '',
  location: '',
  bio: '',
  website: '',
  socialHandle: '',
  styleTags: [],
  priceRange: '',
};

const Wizard: React.FC = () => {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // Validation Logic
  useEffect(() => {
    const validateStep = () => {
      switch (state.step) {
        case 1: // Assets
          return state.images.length > 0;
        case 2: // Collection Details
          return state.collectionName.trim().length > 2 && state.description.trim().length > 10;
        case 3: // Startup Profile
          return (
            state.designerName.trim().length > 2 && 
            state.email.includes('@') && 
            state.location.trim().length > 2 &&
            state.bio.trim().length > 10
          );
        case 4: // Tags
          return state.styleTags.length > 0;
        case 5: // Market
          return state.priceRange !== '';
        default:
          return true;
      }
    };
    setIsValid(validateStep());
  }, [state]);

  const nextStep = () => {
    if (isValid) setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 6) }));
  };
  
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));

  const handleInputChange = (field: keyof WizardState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag: string) => {
    const current = state.styleTags;
    if (current.includes(tag)) {
      handleInputChange('styleTags', current.filter(t => t !== tag));
    } else {
      handleInputChange('styleTags', [...current, tag]);
    }
  };

  const handleSubmit = () => {
    if (!isValid) return;
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  const handleViewProfile = () => {
      // Navigate to the dynamic profile page, passing the wizard state as "preview" data
      navigate('/designers/preview', { state: state });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
        <div className="w-24 h-24 bg-fashion-burgundy/10 rounded-full flex items-center justify-center mb-8">
          <Check className="text-fashion-burgundy" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="font-serif text-5xl mb-6 text-fashion-text">Profile Active</h2>
        <p className="text-fashion-text/60 mb-10 max-w-lg text-lg leading-relaxed font-light">
          Welcome to FashionOS. Your startup profile has been initialized and your collection 
          <span className="font-medium text-fashion-burgundy italic"> "{state.collectionName}" </span> 
          is now pending editorial review.
        </p>
        <div className="flex gap-6">
            <button 
            onClick={() => { setState(INITIAL_STATE); setIsSubmitted(false); }}
            className="px-8 py-3 border border-fashion-burgundy text-fashion-burgundy uppercase tracking-widest text-xs hover:bg-fashion-burgundy hover:text-white transition-colors"
            >
            Submit Another
            </button>
            <button 
                onClick={handleViewProfile}
                className="px-8 py-3 bg-fashion-burgundy text-white uppercase tracking-widest text-xs hover:bg-fashion-burgundy/80 transition-colors shadow-lg"
            >
                View Profile
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm p-8 md:p-12 shadow-xl shadow-fashion-slate/5 border border-white mt-12 transition-all duration-500">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-xs uppercase tracking-widest text-fashion-text/50">Step {state.step} of 6</span>
          <span className="text-xs uppercase tracking-widest text-fashion-burgundy font-bold">
            {state.step === 1 && "Visual Assets"}
            {state.step === 2 && "Collection Data"}
            {state.step === 3 && "Startup Profile"}
            {state.step === 4 && "Aesthetics"}
            {state.step === 5 && "Market Positioning"}
            {state.step === 6 && "Final Review"}
          </span>
        </div>
        <div className="w-full h-[2px] bg-fashion-text/10">
          <div 
            className="h-full bg-fashion-burgundy transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ width: `${(state.step / 6) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[450px]">
        {/* Step 1: Upload */}
        {state.step === 1 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-serif text-3xl text-fashion-text">Visual Assets</h2>
            <p className="text-fashion-text/60 font-light">Upload high-resolution editorial shots (Min. 1 required).</p>
            
            <div className="border border-dashed border-fashion-burgundy/30 bg-fashion-bg/20 p-12 flex flex-col items-center justify-center text-center hover:bg-fashion-burgundy/5 transition-colors cursor-pointer group relative">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                    if (e.target.files) {
                        const fileArray = Array.from(e.target.files);
                        handleInputChange('images', [...state.images, ...fileArray]);
                    }
                }}
              />
              <Upload className="mb-4 text-fashion-burgundy/40 group-hover:text-fashion-burgundy transition-colors" size={48} strokeWidth={1} />
              <p className="text-sm uppercase tracking-widest text-fashion-text/50 group-hover:text-fashion-burgundy">Drag & Drop or Click to Upload</p>
            </div>

            {state.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {state.images.map((img, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-white relative group overflow-hidden border border-fashion-text/10 shadow-sm">
                     <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-full cursor-pointer hover:bg-fashion-burgundy hover:text-white transition-colors z-10"
                          onClick={() => handleInputChange('images', state.images.filter((_, i) => i !== idx))}>
                        <X size={12} />
                     </div>
                     <div className="w-full h-full flex items-center justify-center text-xs text-fashion-text/50 p-2 text-center break-words bg-stone-50">
                        {img.name}
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Collection Details */}
        {state.step === 2 && (
          <div className="animate-fade-in space-y-8">
            <h2 className="font-serif text-3xl text-fashion-text">Collection Narrative</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Collection Title <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={state.collectionName}
                  onChange={(e) => handleInputChange('collectionName', e.target.value)}
                  className="w-full border-b border-fashion-text/20 py-3 text-xl font-serif text-fashion-burgundy focus:outline-none focus:border-fashion-burgundy bg-transparent transition-colors placeholder:text-fashion-text/20"
                  placeholder="e.g. The Glass Menagerie"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Manifesto / Description <span className="text-red-400">*</span></label>
                <textarea 
                  value={state.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full border border-fashion-text/20 p-4 font-light text-fashion-text bg-white/50 focus:outline-none focus:border-fashion-burgundy h-40 resize-none transition-colors"
                  placeholder="Describe the inspiration, materials, and vision (Min. 10 chars)..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Startup Profile (Enhanced) */}
        {state.step === 3 && (
          <div className="animate-fade-in space-y-8">
            <h2 className="font-serif text-3xl text-fashion-text">Startup Profile</h2>
            <p className="text-fashion-text/60 font-light text-sm -mt-4 mb-4">This information will be displayed in the Designer Directory.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Col */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Brand Name <span className="text-red-400">*</span></label>
                        <input 
                        type="text" 
                        value={state.designerName}
                        onChange={(e) => handleInputChange('designerName', e.target.value)}
                        className="w-full border-b border-fashion-text/20 py-3 text-lg font-serif text-fashion-burgundy focus:outline-none focus:border-fashion-burgundy bg-transparent"
                        placeholder="Label Name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Official Email <span className="text-red-400">*</span></label>
                        <input 
                        type="email" 
                        value={state.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full border-b border-fashion-text/20 py-3 text-base font-light text-fashion-text focus:outline-none focus:border-fashion-burgundy bg-transparent"
                        placeholder="press@label.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50 flex items-center gap-2"><MapPin size={12}/> HQ Location <span className="text-red-400">*</span></label>
                        <input 
                        type="text" 
                        value={state.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full border-b border-fashion-text/20 py-3 text-base font-light text-fashion-text focus:outline-none focus:border-fashion-burgundy bg-transparent"
                        placeholder="London, UK"
                        />
                    </div>
                </div>

                {/* Right Col */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Biography / Mission <span className="text-red-400">*</span></label>
                        <textarea 
                        value={state.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full border border-fashion-text/20 p-3 font-light text-sm text-fashion-text bg-white/50 focus:outline-none focus:border-fashion-burgundy h-32 resize-none"
                        placeholder="Tell the story of your startup..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50 flex items-center gap-2"><LinkIcon size={12}/> Website</label>
                            <input 
                            type="text" 
                            value={state.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="w-full border-b border-fashion-text/20 py-2 text-sm font-light focus:outline-none focus:border-fashion-burgundy bg-transparent"
                            placeholder="www.label.com"
                            />
                        </div>
                         <div>
                            <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50 flex items-center gap-2"><Instagram size={12}/> Social</label>
                            <input 
                            type="text" 
                            value={state.socialHandle}
                            onChange={(e) => handleInputChange('socialHandle', e.target.value)}
                            className="w-full border-b border-fashion-text/20 py-2 text-sm font-light focus:outline-none focus:border-fashion-burgundy bg-transparent"
                            placeholder="@handle"
                            />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Step 4: Style Tags */}
        {state.step === 4 && (
          <div className="animate-fade-in space-y-8">
             <h2 className="font-serif text-3xl text-fashion-text">Aesthetics</h2>
             <p className="text-fashion-text/60 font-light">Select tags that best describe the mood of this collection (Select at least 1).</p>
             <div className="flex flex-wrap gap-3">
               {STYLE_TAGS.map(tag => (
                 <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-6 py-2 border text-sm transition-all duration-300 uppercase tracking-widest ${
                      state.styleTags.includes(tag)
                      ? 'bg-fashion-burgundy text-white border-fashion-burgundy'
                      : 'bg-transparent text-fashion-text/60 border-fashion-text/20 hover:border-fashion-burgundy hover:text-fashion-burgundy'
                    }`}
                 >
                   {tag}
                 </button>
               ))}
             </div>
          </div>
        )}

        {/* Step 5: Market Info */}
        {state.step === 5 && (
            <div className="animate-fade-in space-y-8">
                <h2 className="font-serif text-3xl text-fashion-text">Market Placement</h2>
                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest mb-2 text-fashion-text/50">Price Range (Average Item)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['$100 - $500', '$500 - $1,500', '$1,500+'].map((range) => (
                            <button
                                key={range}
                                onClick={() => handleInputChange('priceRange', range)}
                                className={`p-6 border text-left transition-all ${
                                    state.priceRange === range
                                    ? 'border-fashion-burgundy bg-fashion-burgundy/5 text-fashion-burgundy'
                                    : 'border-fashion-text/20 text-fashion-text/60 hover:border-fashion-burgundy'
                                }`}
                            >
                                <span className="font-display text-lg">{range}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Step 6: Review (Polished as Preview Card) */}
        {state.step === 6 && (
            <div className="animate-fade-in space-y-8">
                <h2 className="font-serif text-3xl text-fashion-text">Final Review</h2>
                
                {/* Mock Profile Card for Review */}
                <div className="bg-white p-8 border border-fashion-burgundy/10 shadow-xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 bg-fashion-burgundy/10 rounded-bl-xl text-fashion-burgundy text-xs uppercase tracking-widest">
                        Draft Profile
                     </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar Placeholder */}
                         <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center text-fashion-burgundy font-serif text-4xl border-2 border-white shadow-md">
                             {state.designerName.charAt(0)}
                         </div>
                         
                         <div className="flex-grow">
                             <h3 className="font-display text-3xl text-fashion-burgundy mb-2">{state.designerName}</h3>
                             <p className="font-serif italic text-fashion-text/60 mb-4">{state.location} • {state.styleTags.join(', ')}</p>
                             <p className="font-light text-fashion-text text-sm leading-relaxed border-l-2 border-fashion-burgundy/20 pl-4 mb-6">
                                "{state.bio}"
                             </p>
                             
                             <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-fashion-text/50">
                                 <div>Collection: <span className="text-fashion-text">{state.collectionName}</span></div>
                                 <div>Contact: <span className="text-fashion-text">{state.email}</span></div>
                                 <div>Assets: <span className="text-fashion-text">{state.images.length} files</span></div>
                                 <div>Market: <span className="text-fashion-text">{state.priceRange}</span></div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex justify-between mt-12 pt-6 border-t border-fashion-text/10 items-center">
        <button 
          onClick={prevStep}
          disabled={state.step === 1}
          className={`flex items-center text-xs uppercase tracking-widest transition-colors ${
            state.step === 1 ? 'text-fashion-text/20 cursor-not-allowed' : 'text-fashion-text hover:text-fashion-burgundy'
          }`}
        >
          <ChevronLeft className="mr-2" size={16} /> Back
        </button>

        {state.step < 6 ? (
          <button 
            onClick={nextStep}
            disabled={!isValid}
            className={`flex items-center text-xs uppercase tracking-widest px-8 py-3 transition-all duration-300 ${
              isValid 
              ? 'bg-fashion-burgundy text-white hover:bg-fashion-burgundy/80 shadow-lg cursor-pointer' 
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            Next Step <ChevronRight className="ml-2" size={16} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="flex items-center text-xs uppercase tracking-widest bg-fashion-text text-white px-8 py-3 hover:bg-black transition-colors shadow-xl"
          >
            Launch Profile & Collection
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;