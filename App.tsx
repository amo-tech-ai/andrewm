import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Wizard from './components/Wizard';
import DesignerProfile from './pages/DesignerProfile';

// Placeholder components for routing completeness
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center pt-24 bg-fashion-bg">
    <div className="text-center">
      <h1 className="font-display text-4xl mb-4 text-fashion-burgundy opacity-80">{title}</h1>
      <p className="font-serif italic text-fashion-text/60 tracking-wider">Coming Soon to FashionOS</p>
    </div>
  </div>
);

const ContactPage = () => (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-fashion-bg px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full">
            <div>
                <h1 className="font-sans font-thin text-5xl mb-8 text-fashion-burgundy uppercase tracking-widest">Contact</h1>
                <p className="font-serif italic text-fashion-text/60 mb-8">For press inquiries, showroom appointments, and collaborations.</p>
                <div className="space-y-4 text-fashion-text font-light">
                    <p>London HQ<br/>365 St. John Street<br/>EC1V 4LB</p>
                    <p>+44 (0)20 7713 1288</p>
                    <a href="mailto:info@andrewmajtenyi.com" className="border-b border-fashion-burgundy text-fashion-burgundy">info@andrewmajtenyi.com</a>
                </div>
            </div>
            <div className="bg-white/40 p-12 flex items-center justify-center">
                 <span className="font-display text-2xl text-fashion-slate opacity-50">Map Integration Pending</span>
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<PlaceholderPage title="Look Detail" />} />
          
          <Route path="/designers" element={<DesignerProfile />} />
          <Route path="/designers/:id" element={<DesignerProfile />} />
          
          <Route path="/press" element={<PlaceholderPage title="Press Room" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<PlaceholderPage title="Online Boutique" />} />
          
          <Route path="/submit" element={
            <div className="pt-32 pb-20 px-4 min-h-screen bg-fashion-bg">
               <div className="text-center mb-12">
                 <h1 className="font-display text-4xl md:text-5xl mb-4 text-fashion-burgundy">Submission Portal</h1>
                 <p className="font-serif italic text-fashion-text/60">Showcase your work to the world</p>
               </div>
               <Wizard />
            </div>
          } />
          <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;