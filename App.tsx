import React from 'react';
import { Slider } from './components/Slider';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-primary flex flex-col items-center justify-center p-4 md:p-8">
      <header className="mb-12 text-center max-w-4xl">
        <h1 className="text-gold font-serif text-3xl md:text-4xl uppercase mb-4">
          Completed Projects
        </h1>
        <p className="text-gray-300 font-sans text-lg max-w-xl mx-auto">
          Only a small part of the work performed by our company is presented on the site. For over 10 years, we have been helping to create coziness and comfort.
        </p>
      </header>

      <main className="w-full max-w-[1440px]">
        <Slider />
      </main>
    </div>
  );
};

export default App;