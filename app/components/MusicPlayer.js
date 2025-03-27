'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);
  
  // Keep only one track
  const track = {
    id: 1,
    title: "Birthday Song",
    path: "/music/SashabirthdaySong1.mp3"
  };

  useEffect(() => {
    // Create audio element
    const audio = new Audio(track.path);
    audioRef.current = audio;
    
    // Set up event listener
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    // Auto-play when audio is loaded
    audio.addEventListener('loadeddata', () => {
      audio.play().catch(e => {
        console.log('Auto-play prevented:', e);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    });
    
    // Cleanup function
    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
      audio.removeEventListener('loadeddata', () => {});
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Play prevented:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 sm:right-4">
      {/* Floating music button - play/stop only */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer shadow-lg"
      >
        <div className="text-white">
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
        </div>
      </motion.div>
    </div>
  );
}