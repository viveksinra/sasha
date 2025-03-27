'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import Lightbox from '../components/Lightbox';

export default function GalleryPage() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const gallery = [
    { src: "/images/sashaHeadshots/Sasha_2251.jpg", alt: "Sasha Portrait 1" },
    { src: "/images/sashaHeadshots/Sasha_4001.jpg", alt: "Sasha Portrait 2" },
    { src: "/images/sashaHeadshots/Sasha_655.jpg", alt: "Sasha Portrait 3" },
    { src: "/images/sashaHeadshots/Sasha_635.jpg", alt: "Sasha Portrait 4" },
    { src: "/images/sashaHeadshots/Sasha_826.jpg", alt: "Sasha Portrait 5" },
    { src: "/images/sashaHeadshots/Sasha_493.jpg", alt: "Sasha Portrait 6" },
    { src: "/images/sashaHeadshots/Sasha_501.jpg", alt: "Sasha Portrait 7" },
    { src: "/images/sashaHeadshots/Sasha_553.jpg", alt: "Sasha Portrait 8" },
    { src: "/images/sashaHeadshots/edited.jpg", alt: "Sasha Portrait 9" },
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  // Share functionality
  const shareGallery = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sasha\'s Gallery',
        text: 'Check out Sasha\'s beautiful gallery!',
        url: 'https://sasha.viveksinra.com/gallery',
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      const shareUrl = 'https://sasha.viveksinra.com/gallery';
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Gallery link copied to clipboard!'))
        .catch((error) => console.log('Error copying to clipboard:', error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-purple-600">
            <FaArrowLeft />
            <span className="font-medium">Back to Homepage</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-purple-600">Sasha's Gallery</h1>
          
          <button 
            onClick={shareGallery}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
        {/* Gallery intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            Complete Photo Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through all of Sasha's beautiful portraits and memories
          </p>
        </div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-1 aspect-h-1 w-full bg-white p-3 shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full transition-transform duration-300"
                    />
                  </motion.div>
                  
                  {/* Overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white font-medium text-center">{image.alt}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            Created with ❤️ for Sasha | Birthday 2025
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {showLightbox && (
        <Lightbox 
          images={gallery}
          initialIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  );
} 