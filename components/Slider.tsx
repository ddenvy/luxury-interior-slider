import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectData } from '../types';

export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentSlide: ProjectData = PROJECTS[currentIndex];

  // Universal navigation function
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Circular navigation logic: Previous
  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? PROJECTS.length - 1 : prevIndex - 1
    );
  }, []);

  // Circular navigation logic: Next
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === PROJECTS.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      {/* Left Column: Text Content & Navigation */}
      <div className="flex-1 lg:max-w-[40%] flex flex-col pt-8">
        
        {/* Top Navigation Links (Tabs) */}
        <nav className="flex flex-wrap gap-x-8 gap-y-4 mb-12">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => goToSlide(index)}
              className={`font-serif text-sm md:text-base uppercase tracking-wider transition-all duration-300 border-b-2 pb-1 text-left ${
                currentIndex === index
                  ? 'text-gold border-gold'
                  : 'text-gray-400 border-transparent hover:text-gold/70'
              }`}
            >
              {project.navTitle}
            </button>
          ))}
        </nav>

        {/* Slide Info Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
            <div className="space-y-2">
              <h3 className="text-gold font-serif text-lg uppercase">City:</h3>
              <p className="font-sans text-white text-base whitespace-pre-line leading-relaxed">{currentSlide.city}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-gold font-serif text-lg uppercase">Apartment Area:</h3>
              <p className="font-sans text-white text-base leading-relaxed">{currentSlide.apartmentArea}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-gold font-serif text-lg uppercase">Repair Time:</h3>
              <p className="font-sans text-white text-base leading-relaxed">{currentSlide.repairTime}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-gold font-serif text-lg uppercase">Repair Cost:</h3>
              <p className="font-sans text-white text-base leading-relaxed">{currentSlide.repairCost}</p>
            </div>
          </div>
        </div>

        {/* Bottom Controls: Arrows & Dots */}
        <div className="flex items-center gap-6 mt-auto">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded-full p-1"
            aria-label="Previous slide"
          >
            <ArrowLeft size={30} strokeWidth={1.5} />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-4">
            {PROJECTS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none w-2.5 h-2.5 ${
                  currentIndex === index 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded-full p-1"
            aria-label="Next slide"
          >
            <ArrowRight size={30} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="flex-1 lg:max-w-[60%] relative h-[300px] md:h-[480px] lg:h-[640px] w-full mt-8 lg:mt-0">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={project.imageUrl}
              alt={project.city.replace('\n', ' ')}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {/* Decorative elements could go here */}
      </div>
    </div>
  );
};