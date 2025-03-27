'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Lightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex]);
  
  const showNextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <motion.div 
          className="relative w-full h-full flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <FaTimes size={24} />
          </button>
          
          {/* Navigation buttons */}
          <button 
            onClick={showPrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <FaChevronLeft size={24} />
          </button>
          
          <button 
            onClick={showNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <FaChevronRight size={24} />
          </button>
          
          {/* Current Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
          >
            <Image 
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="object-contain max-h-[90vh] max-w-[90vw]"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
              <p>{images[currentIndex].alt}</p>
              <p className="text-sm text-gray-300">{`${currentIndex + 1} / ${images.length}`}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 