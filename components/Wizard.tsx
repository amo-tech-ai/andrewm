import React, { useState } from 'react';
import { WizardState } from '../types';
import { STYLE_TAGS } from '../constants';
import { ChevronRight, ChevronLeft, Upload, Check, X } from 'lucide-react';

const INITIAL_STATE: WizardState = {
  step: 1,
  images: [],
  collectionName: '',
  description: '',
  designerName: '',
  email: '',
  styleTags: [],
  priceRange: '',
};

const Wizard: React.FC = () => {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 7) }));
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <Check className="text-green-600" size={40} />
        </div>
        <h2 className="font-serif text-4xl mb-4">Submission Received</h2>
        <p className="text-neutral-500 mb-8 max-w-md">
          Your collection has been submitted to the editorial board for review. You will receive an email confirmation shortly.
        </p>
        <button 
          onClick={() => { setState(INITIAL_STATE); setIsSubmitted(false); }}
          className="px-8 py-3 bg-neutral-900 text-white uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-stone-100 mt-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-xs uppercase tracking-widest text-neutral-500">Step {state.step} of 6</span>
          <span className="text-xs uppercase tracking-widest text-neutral-900 font-bold">
            {state.step === 1 && "Upload"}
            {state.step === 2 && "Details"}
            {state.step === 3 && "Designer"}
            {state.step === 4 && "Tags"}
            {state.step === 5 && "Market"}
            {state.step === 6 && "Review"}
          </span>
        </div>
        <div className="w-full h-1 bg-neutral-100">
          <div 
            className="h-full bg-neutral-900 transition-all duration-500 ease-out"
            style={{ width: `${(state.step / 6) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        {/* Step 1: Upload */}
        {state.step === 1 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="font-serif text-3xl">Visual Assets</h2>
            <p className="text-neutral-500 font-light">Upload high-resolution editorial shots of your collection (Max 10).</p>
            
            <div className="border-2 border-dashed border-stone-200 p-12 flex flex-col items-center justify-center text-center hover:bg-stone-50 transition-colors cursor-pointer group relative">
              <input 
                type="file" 
                multiple 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                    if (e.target.files) {
                        const fileArray = Array.from(e.target.files);
                        handleInputChange('images', [...state.images, ...fileArray]);
                    }
                }}
              />
              <Upload className="mb-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" size={48} strokeWidth={1} />
              <p className="text-sm uppercase tracking-widest text-neutral-400 group-hover:text-neutral-600">Drag & Drop or Click to Upload</p>
            </div>

            {state.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {state.images.map((img, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-stone-100 relative group overflow-hidden">
                     <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-colors z-10"
                          onClick={() => handleInputChange('images', state.images.filter((_, i) => i !== idx))}>
                        <X size={12} />
                     </div>
                     <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
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
            <h2 className="font-serif text-3xl">Collection Narrative</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-neutral-500">Collection Title</label>
                <input 
                  type="text" 
                  value={state.collectionName}
                  onChange={(e) => handleInputChange('collectionName', e.target.value)}
                  className="w-full border-b border-stone-300 py-3 text-xl font-serif focus:outline-none focus:border-neutral-900 bg-transparent transition-colors"
                  placeholder="e.g. The Glass Menagerie"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-neutral-500">Description / Manifesto</label>
                <textarea 
                  value={state.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full border border-stone-200 p-4 font-light text-neutral-600 focus:outline-none focus:border-neutral-900 h-40 resize-none transition-colors"
                  placeholder="Describe the inspiration, materials, and vision..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Designer Info */}
        {state.step === 3 && (
          <div className="animate-fade-in space-y-8">
            <h2 className="font-serif text-3xl">The Creator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-neutral-500">Designer / Brand Name</label>
                <input 
                  type="text" 
                  value={state.designerName}
                  onChange={(e) => handleInputChange('designerName', e.target.value)}
                  className="w-full border-b border-stone-300 py-3 text-xl font-serif focus:outline-none focus:border-neutral-900 bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-neutral-500">Contact Email</label>
                <input 
                  type="email" 
                  value={state.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border-b border-stone-300 py-3 text-lg font-light focus:outline-none focus:border-neutral-900 bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Style Tags */}
        {state.step === 4 && (
          <div className="animate-fade-in space-y-8">
             <h2 className="font-serif text-3xl">Aesthetics</h2>
             <p className="text-neutral-500 font-light">Select tags that best describe the mood of this collection.</p>
             <div className="flex flex-wrap gap-3">
               {STYLE_TAGS.map(tag => (
                 <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-6 py-2 border text-sm transition-all duration-300 ${
                      state.styleTags.includes(tag)
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-transparent text-neutral-500 border-stone-200 hover:border-neutral-400'
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
                <h2 className="font-serif text-3xl">Market Placement</h2>
                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest mb-2 text-neutral-500">Price Range (Average Item)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['$100 - $500', '$500 - $1,500', '$1,500+'].map((range) => (
                            <button
                                key={range}
                                onClick={() => handleInputChange('priceRange', range)}
                                className={`p-6 border text-left transition-all ${
                                    state.priceRange === range
                                    ? 'border-neutral-900 bg-stone-50'
                                    : 'border-stone-200 hover:border-neutral-400'
                                }`}
                            >
                                <span className="font-display text-lg">{range}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Step 6: Review */}
        {state.step === 6 && (
            <div className="animate-fade-in space-y-8">
                <h2 className="font-serif text-3xl">Review Submission</h2>
                <div className="bg-stone-50 p-8 space-y-6 border border-stone-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400">Collection</p>
                            <p className="font-serif text-xl">{state.collectionName || 'Untitled'}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400">Designer</p>
                            <p className="font-serif text-xl">{state.designerName || 'Anonymous'}</p>
                        </div>
                        <div className="md:col-span-2">
                             <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Assets</p>
                             <p className="text-sm font-light">{state.images.length} images ready for upload</p>
                        </div>
                         <div className="md:col-span-2">
                             <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Tags</p>
                             <div className="flex gap-2">
                                {state.styleTags.map(t => (
                                    <span key={t} className="bg-white border border-stone-200 px-2 py-1 text-xs">{t}</span>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex justify-between mt-12 pt-6 border-t border-stone-100">
        <button 
          onClick={prevStep}
          disabled={state.step === 1}
          className={`flex items-center text-xs uppercase tracking-widest transition-colors ${
            state.step === 1 ? 'text-stone-300 cursor-not-allowed' : 'text-neutral-900 hover:text-fashion-accent'
          }`}
        >
          <ChevronLeft className="mr-2" size={16} /> Back
        </button>

        {state.step < 6 ? (
          <button 
            onClick={nextStep}
            className="flex items-center text-xs uppercase tracking-widest bg-neutral-900 text-white px-8 py-3 hover:bg-neutral-800 transition-colors"
          >
            Next Step <ChevronRight className="ml-2" size={16} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="flex items-center text-xs uppercase tracking-widest bg-fashion-accent text-white px-8 py-3 hover:bg-yellow-600 transition-colors"
          >
            Publish Collection
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
