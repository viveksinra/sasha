'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaForward } from 'react-icons/fa';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);
  
  const tracks = [
    {
      id: 1,
      title: "Birthday Song 1",
      path: "/music/SashabirthdaySong (1).mp3"
    },
    {
      id: 2,
      title: "Birthday Song 2",
      path: "/music/SashabirthdaySong (2).mp3"
    },
    {
      id: 3,
      title: "Birthday Song 3",
      path: "/music/SashabirthdaySong (3).mp3"
    },
    {
      id: 4,
      title: "Birthday Song 4",
      path: "/music/SashabirthdaySong (4).mp3"
    }
  ];

  useEffect(() => {
    // Create audio element
    const audio = new Audio(tracks[currentTrackIndex].path);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('ended', handleTrackEnd);
    audio.addEventListener('canplaythrough', () => {
      // Auto-play when the page loads
      audio.play().catch(e => {
        console.log('Auto-play prevented:', e);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    });
    
    // Cleanup function
    return () => {
      audio.removeEventListener('ended', handleTrackEnd);
      audio.pause();
      audioRef.current = null;
    };
  }, [currentTrackIndex]);

  // Toggle visibility of the player controls
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handle track end - play next track
  const handleTrackEnd = () => {
    playNextTrack();
  };

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

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Play next track
  const playNextTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {/* Floating music button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleVisibility}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer shadow-lg"
      >
        <div className="text-white">
          {isPlaying ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
        </div>
      </motion.div>

      {/* Player controls */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-xl p-4 mb-2"
        >
          <h3 className="text-lg font-bold text-purple-700 mb-2">Now Playing</h3>
          <p className="text-sm text-gray-600 mb-3">
            {tracks[currentTrackIndex].title}
          </p>
          
          <div className="flex justify-around">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
            >
              {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playNextTrack}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
            >
              <FaForward size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 