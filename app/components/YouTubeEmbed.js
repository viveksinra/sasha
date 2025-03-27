'use client';

import { motion } from 'framer-motion';

export default function YouTubeEmbed({ videoId, title = 'YouTube video player' }) {
  return (
    <motion.div 
      className="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
} 