'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMusic, FaArrowLeft, FaPlay, FaPause } from 'react-icons/fa';
import Link from 'next/link';

export default function MusicPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: "Birthday Song",
      path: "/music/SashabirthdaySong1.mp3",
      description: "The official birthday melody to celebrate your special day"
    },
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
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="py-8 px-4 sm:px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-100 transition-colors">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <FaMusic className="text-2xl" />
            <span className="font-medium">Birthday Music Collection</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-4 sm:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">
              Birthday Music Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A collection of special music tracks to celebrate your birthday. Play them anytime to relive the joy!
            </p>
          </motion.div>

          <div className="space-y-8">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-transform border-2 border-purple-100"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-700 mb-3">{track.title}</h3>
                      <p className="text-gray-600 text-lg">{track.description}</p>
                      {track.id === 1 && (
                        <div className="mt-4 inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          Featured Birthday Song
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => playTrack(track)}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md"
                    >
                      {playingTrack && playingTrack.id === track.id ? (
                        <FaPause className="text-white text-xl" />
                      ) : (
                        <FaPlay className="text-white ml-1 text-xl" />
                      )}
                    </motion.button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500">
                      <FaMusic className="mr-2 text-purple-500" />
                      <span className="text-sm">Play this track</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 bg-gray-50 text-center text-gray-600">
        <div className="max-w-6xl mx-auto">
          <p>Created with ❤️ for Sasha | Birthday 2025</p>
        </div>
      </footer>
    </div>
  );
} 