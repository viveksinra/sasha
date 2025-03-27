'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

export default function MusicSection() {
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
      title: "Birthday Song 1",
      path: "/music/SashabirthdaySong (1).mp3",
      description: "A beautiful birthday melody to celebrate your special day"
    },
    {
      id: 2,
      title: "Birthday Song 2",
      path: "/music/SashabirthdaySong (2).mp3",
      description: "An upbeat celebration tune to brighten your birthday"
    },
    {
      id: 3,
      title: "Birthday Song 3",
      path: "/music/SashabirthdaySong (3).mp3",
      description: "A heartfelt composition dedicated to your birthday"
    },
    {
      id: 4,
      title: "Birthday Song 4",
      path: "/music/SashabirthdaySong (4).mp3",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">{track.title}</h3>
                    <p className="text-gray-600">{track.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playTrack(track)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md"
                  >
                    {playingTrack && playingTrack.id === track.id ? (
                      <FaPause className="text-white" />
                    ) : (
                      <FaPlay className="text-white ml-1" />
                    )}
                  </motion.button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500">
                    <FaMusic className="mr-2" />
                    <span className="text-sm">Play this track</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 