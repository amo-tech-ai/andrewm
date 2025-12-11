import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Wizard from './components/Wizard';

// Placeholder components for routing completeness
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center pt-24 bg-stone-50">
    <div className="text-center">
      <h1 className="font-display text-4xl mb-4 text-neutral-300">{title}</h1>
      <p className="font-serif italic text-neutral-400">Coming Soon to FashionOS</p>
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
          <Route path="/designers" element={<PlaceholderPage title="Designer Directory" />} />
          <Route path="/designers/:id" element={<PlaceholderPage title="Designer Profile" />} />
          <Route path="/press" element={<PlaceholderPage title="Press Room" />} />
          <Route path="/submit" element={
            <div className="pt-32 pb-20 px-4 min-h-screen bg-stone-50">
               <div className="text-center mb-12">
                 <h1 className="font-display text-4xl md:text-5xl mb-4">Submission Portal</h1>
                 <p className="font-serif italic text-neutral-500">Showcase your work to the world</p>
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
