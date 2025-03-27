'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import Link from 'next/link';

export default function MusicSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(null);

  // Keep the main track as our default track
  const mainTrack = {
    id: 1,
    title: "Birthday Song",
    path: "/music/SashabirthdaySong1.mp3",
    description: "The official birthday melody to celebrate your special day"
  };
  
  // Keep other tracks as additional options
  const additionalTracks = [
    {
      id: 2,
      title: "Birthday Song 2",
      path: "/music/SashabirthdaySong2.mp3",
      description: "An upbeat celebration tune to brighten your birthday"
    },
    {
      id: 3,
      title: "Birthday Song 3",
      path: "/music/SashabirthdaySong3.mp3",
      description: "A heartfelt composition dedicated to your birthday"
    },
    {
      id: 4,
      title: "Birthday Song 4",
      path: "/music/SashabirthdaySong4.mp3",
      description: "A special melody created just for your birthday celebration"
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = (track) => {
    // Stop current track if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // If clicking the same track that's playing, just pause it
    if (playingTrack && playingTrack.id === track.id) {
      setPlayingTrack(null);
      return;
    }

    // Play new track
    const audio = new Audio(track.path);
    audioRef.current = audio;
    
    audio.addEventListener('ended', () => {
      setPlayingTrack(null);
    });
    
    audio.play().catch(e => console.log('Play prevented:', e));
    setPlayingTrack(track);
  };

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

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-purple-100 to-pink-100">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">
            Birthday Music
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of special music tracks to celebrate your birthday. Play them anytime to relive the joy!
          </p>
        </motion.div>

        {/* Main featured track */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform mb-10 border-2 border-purple-200"
        >
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-purple-700 mb-3">{mainTrack.title}</h3>
                <p className="text-gray-600 text-lg">{mainTrack.description}</p>
                <div className="mt-4 inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  Featured Birthday Song
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => playTrack(mainTrack)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md"
              >
                {playingTrack && playingTrack.id === mainTrack.id ? (
                  <FaPause className="text-white text-xl" />
                ) : (
                  <FaPlay className="text-white ml-1 text-xl" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* View More Songs Button */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <Link href="/music">
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              View More Songs
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 