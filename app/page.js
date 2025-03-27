'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaGlobe, FaYoutube, FaSpotify, FaPodcast, FaApple } from 'react-icons/fa';
import Lightbox from './components/Lightbox';
import YouTubeEmbed from './components/YouTubeEmbed';
import MusicPlayer from './components/MusicPlayer';
import MusicSection from './components/MusicSection';

export default function Home() {
  const [confetti, setConfetti] = useState(false);
  
  useEffect(() => {
    // Start confetti animation after a short delay
    const timer = setTimeout(() => setConfetti(true), 800);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Background Music Player - Floating control */}
      <MusicPlayer />
      
      {/* Confetti Animation */}
      {confetti && <Confetti />}
      
      {/* Birthday Greeting Section */}
      <BirthdayGreeting />
      
      {/* Memories Section */}
      <MemoriesSection />
      
      {/* Music Section */}
      <MusicSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Podcast Section */}
      <PodcastSection />
      
      {/* Social Media Section */}
      <SocialMediaSection />
      
      {/* Footer */}
      <footer className="py-6 text-center text-gray-600">
        <p>Created with ❤️ for Sasha | Birthday 2025</p>
      </footer>
    </div>
  );
}

// Confetti Animation Component
function Confetti() {
  const [confettiPieces] = useState(() => {
    // Generate 100 confetti pieces with random properties
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      size: 5 + Math.random() * 15,
      rotation: Math.random() * 360,
      color: ['#FF69B4', '#8A2BE2', '#FFD700', '#FF6347', '#7FFFD4'][
        Math.floor(Math.random() * 5)
      ],
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}vw`, 
            y: `${piece.y}vh`, 
            rotate: piece.rotation,
            opacity: 1
          }}
          animate={{ 
            y: '100vh', 
            rotate: piece.rotation + 360,
            opacity: 0.7
          }}
          transition={{ 
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: Math.random() * 5
          }}
          style={{
            position: 'absolute',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
}

// Animated Birthday Greeting Section
function BirthdayGreeting() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/images/sashaHeadshots/GoldenPortrait.jpg",
    "/images/sashaHeadshots/Sasha_2251.jpg",
    "/images/sashaHeadshots/Sasha_655.jpg",
    "/images/sashaHeadshots/edited.jpg",
  ];
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    
    // Rotate through profile images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(imageInterval);
  }, [controls, inView, images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 relative overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: 20 + Math.random() * 100,
              height: 20 + Math.random() * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="text-center z-10"
      >
        <motion.div variants={itemVariants} className="mb-8 relative">
          <div className="w-[220px] h-[220px] mx-auto relative">
            <AnimatePresence mode="sync">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt="Sasha Bershadsky"
                  width={220}
                  height={220}
                  className="rounded-full object-cover w-full h-full border-4 border-white shadow-xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Decorative elements around the profile image */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-yellow-300 rounded-full"
              style={{
                left: `${50 + 45 * Math.cos(i * (Math.PI / 6))}%`,
                top: `${50 + 45 * Math.sin(i * (Math.PI / 6))}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        >
          Happy Birthday, Sasha!
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl text-white max-w-2xl mx-auto"
          style={{ textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}
        >
          Celebrating you on March 27, 2025
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="mt-8"
        >
          <motion.a 
            href="#memories" 
            className="bg-white text-purple-600 font-medium px-6 py-3 rounded-full inline-block shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore ↓
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Our Memories Section
function MemoriesSection() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
  };

  const memories = [
    {
      src: "/images/sashaVivek/IMG_0464.jpg",
      alt: "Sasha and Vivek at Rudraksh Resort 1"
    },
    {
      src: "/images/sashaVivek/IMG_0463.jpg",
      alt: "Sasha and Vivek at Rudraksh Resort 2"
    },
    {
      src: "/images/sashaVivek/IMG_0648.jpg",
      alt: "Sasha and Vivek at Rudraksh Resort 3"
    },
    {
      src: "/images/sashaVivek/IMG_0541.GIF",
      alt: "Sasha and Vivek at Rudraksh Resort 4"
    }
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  // Animated elements for decoration
  const decorElements = [
    { x: '5%', y: '10%', size: 150, rotate: 15, delay: 0 },
    { x: '85%', y: '15%', size: 100, rotate: -10, delay: 0.5 },
    { x: '80%', y: '85%', size: 120, rotate: 20, delay: 1 },
    { x: '10%', y: '80%', size: 90, rotate: -15, delay: 1.5 },
  ];

  return (
    <section id="memories" className="py-20 px-4 sm:px-8 bg-white relative">
      {/* Decorative elements */}
      {decorElements.map((elem, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.03] rounded-full bg-purple-500 z-0"
          style={{
            left: elem.x,
            top: elem.y,
            width: elem.size,
            height: elem.size,
          }}
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.02, 0.04, 0.02],
            rotate: elem.rotate,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            delay: elem.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-600 relative"
          >
            Our Memories Together
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-pink-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto"
          >
            Unforgettable moments from our time at The Rudraksh Resort, Rishikesh (December 2024)
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }}
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={memory.src}
                    alt={memory.alt}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                
                {/* Photo frame border effect */}
                <motion.div 
                  className="absolute inset-0 border-[3px] border-white opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Polaroid-like caption */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-white py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  <p className="text-gray-800 font-medium text-sm">{memory.alt}</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* View more memories button */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            View All Memories
          </motion.button>
        </motion.div>
      </motion.div>

      {showLightbox && (
        <Lightbox 
          images={memories}
          initialIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </section>
  );
}

// Gallery Section
function GallerySection() {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

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

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute opacity-5">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-400" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Floating circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-20"
            style={{
              width: 100 + Math.random() * 150,
              height: 100 + Math.random() * 150,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, -30, 0, 30, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto w-32 rounded-full mb-6"
          />
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Sasha's Gallery
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            A celebration of moments captured through the lens
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
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
                  
                  {/* Decorative corner */}
                  <div className="absolute -top-1 -right-1 w-12 h-12 bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-45 translate-x-4 -translate-y-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Gallery controls */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center gap-4"
        >
          <motion.button
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium shadow-md border border-purple-100"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            View Full Gallery
          </motion.button>
          
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Share Gallery
          </motion.button>
        </motion.div>
      </motion.div>

      {showLightbox && (
        <Lightbox 
          images={gallery}
          initialIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </section>
  );
}

// Podcast Section
function PodcastSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
  };

  const podcastLinks = [
    { icon: <FaYoutube className="text-2xl" />, label: "YouTube", url: "https://www.youtube.com/@ojasoasis", color: "from-red-600 to-red-500" },
    { icon: <FaSpotify className="text-2xl" />, label: "Spotify", url: "https://open.spotify.com/", color: "from-green-600 to-green-500" },
    { icon: <FaApple className="text-2xl" />, label: "Apple Podcasts", url: "https://www.apple.com/apple-podcasts/", color: "from-purple-600 to-blue-500" },
    { icon: <FaPodcast className="text-2xl" />, label: "Podcast Website", url: "https://www.ojasoasis.com", color: "from-blue-500 to-teal-400" },
  ];

  // Featured YouTube video from Ojas Oasis Podcast
  const youtubeVideoId = "ESw9gXERXyo"; 

  return (
    <section className="py-20 px-4 sm:px-8 bg-white relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-purple-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-500 to-transparent" />
        
        {/* Audio wave pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(40)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1 mx-[2px] bg-purple-600"
              style={{ height: 20 + Math.random() * 40 }}
              animate={{
                height: [
                  20 + Math.random() * 40,
                  60 + Math.random() * 40,
                  20 + Math.random() * 40
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.05
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto w-32 rounded-full mb-6"
          />
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Ojas Oasis Podcast
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Sasha's podcast explores how Ayurveda and Yoga—paths toward perfect health and alignment—integrate into the Western world
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="bg-gradient-to-r from-purple-700 to-pink-700 p-1">
            <div className="w-full rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-8 bg-black/50 flex items-center z-10 px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-white text-xs ml-4">Ojas Oasis - Featured Episode</div>
              </div>
              
              <YouTubeEmbed videoId={youtubeVideoId} title="From Autonomic to Volitional Attention - Talk with Sean Oakes" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {podcastLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 bg-gradient-to-r ${link.color} text-white font-medium p-4 rounded-xl shadow-md transition-all`}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {link.icon}
              </div>
              <div>
                <span className="text-sm text-white/80">Listen on</span>
                <p className="text-lg font-bold">{link.label}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <motion.a 
            href="/youtube" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium px-8 py-4 rounded-full shadow-lg transition-all"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FaYoutube className="text-2xl" />
            <span className="text-lg">Explore All YouTube Videos</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Social Media Section
function SocialMediaSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
  };

  const socialLinks = [
    { 
      icon: <FaInstagram className="text-3xl" />, 
      label: "Instagram", 
      url: "https://www.instagram.com/", 
      color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
      hover: "from-purple-600 via-pink-600 to-orange-600" 
    },
    { 
      icon: <FaYoutube className="text-3xl" />, 
      label: "YouTube", 
      url: "/youtube", 
      color: "bg-gradient-to-r from-red-600 to-red-500",
      hover: "from-red-700 to-red-600" 
    },
    { 
      icon: <FaGlobe className="text-3xl" />, 
      label: "ojasoasis.com", 
      url: "https://www.ojasoasis.com", 
      color: "bg-gradient-to-r from-blue-500 to-teal-400",
      hover: "from-blue-600 to-teal-500" 
    },
  ];

  // Generate random positions for floating social icons
  const floatingIcons = [
    { icon: <FaInstagram />, x: '10%', y: '20%', size: 24, color: 'text-pink-500' },
    { icon: <FaYoutube />, x: '85%', y: '30%', size: 28, color: 'text-red-500' },
    { icon: <FaSpotify />, x: '25%', y: '75%', size: 20, color: 'text-green-500' },
    { icon: <FaApple />, x: '75%', y: '80%', size: 22, color: 'text-gray-700' },
    { icon: <FaGlobe />, x: '15%', y: '60%', size: 26, color: 'text-blue-500' },
    { icon: <FaPodcast />, x: '90%', y: '60%', size: 24, color: 'text-purple-500' },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Floating social media icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.color} opacity-20`}
          style={{
            left: item.x,
            top: item.y,
            fontSize: item.size,
          }}
          animate={{
            y: [0, -15, 0, 15, 0],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
      
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.div className="mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto w-32 rounded-full mb-6"
          />
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Connect with Sasha
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Follow Sasha on social media to stay updated with her latest work and adventures
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target={link.url.startsWith('http') ? "_blank" : ""}
              rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 ${link.color} hover:${link.hover} text-white font-medium px-8 py-4 rounded-xl shadow-lg transition-all w-full sm:w-auto`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {link.icon}
              </div>
              <span className="text-lg">{link.label}</span>
            </motion.a>
          ))}
        </div>
        
        {/* Birthday wish box */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-xl max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-purple-600 mb-4">Leave a Birthday Wish</h3>
          <p className="text-gray-600 mb-6">Share your birthday wishes and memories with Sasha!</p>
          
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="px-4 py-3 rounded-xl border border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none"
            />
            <textarea 
              placeholder="Your Birthday Message" 
              rows={4}
              className="px-4 py-3 rounded-xl border border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl"
            >
              Send Birthday Wish
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-100/50 to-transparent" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full opacity-20" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-200 rounded-full opacity-20" />
    </section>
  );
}
