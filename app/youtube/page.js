'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaYoutube, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function YouTubePage() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const videos = [
    {
      id: "ESw9gXERXyo",
      title: "Ayurveda's Modern Relevance with Anuradha Gupta",
      description: `Join host Sasha Bershadsky for an enlightening conversation with Anuradha Gupta, an Ayurvedic practitioner, mentor, and teacher. In this episode, we explore the transformative power of Ayurveda, meditation, and the wisdom of ancient Vedic traditions.

✨ Discover Anuradha Gupta journey from engineering and business to a profound path in Ayurveda.
✨ Learn how Ayurveda offers holistic healing, including the powerful Panchakarma detox.
✨ Explore the significance of lineage, past lives, and the deep soul connection to Vedic knowledge.
✨ Understand the role of Guru Sri Sri Ravi Shankar and the Art of Living in reviving Ayurveda and meditation.
✨ Celebrate the Winter Solstice through an Ayurvedic lens—honoring seasonal shifts, balance, and inner transformation.
✨ Experience sacred Vedic chanting that invokes healing, wisdom, and universal connection.

🌀 Whether you're new to Ayurveda or already on the path, this conversation will inspire you to embrace ancient wisdom for modern well-being.

🔔 Subscribe to OJAS OASIS for more soulful conversations that bridge tradition and contemporary living.
📲 Follow us on Instagram: @ojasoasis`,
      publishedAt: "10 min ago"
    },
    {
      id: "V4USP85bf38",
      title: "Undo Yourself and Your Energetic Debris (Samskaras) with Nidhi Pandya",
      description: `This episode features a conversation with Nidhi Pandya about understanding and clearing energetic debris, known as Samskaras, to achieve personal growth and healing.`,
      publishedAt: "2.1 years ago"
    },
    {
      id: "3VuTFeosu3A",
      title: "Connect with CONNECT for Community Wellbeing",
      description: `In this video, the focus is on community well-being and the importance of building connections to support collective health and harmony.`,
      publishedAt: "1 year ago"
    },
    {
      id: "OngbSF53odY",
      title: "Say BUH-BYE to Comparison & Start Living the Life YOU Deserve!!",
      description: `This episode addresses the pitfalls of self-comparison and offers insights on embracing one's unique journey to live a fulfilling life.`,
      publishedAt: "4 months ago"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-purple-50">
      {/* Header */}
      <header className="py-8 px-4 sm:px-8 bg-gradient-to-r from-red-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-red-100 transition-colors">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <FaYoutube className="text-2xl" />
            <span className="font-medium">Ojas Oasis Podcast</span>
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
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-4">Ojas Oasis Podcast</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hosted by Clinical Ayurvedic Specialist Sasha Bershadsky. This channel explores how Ayurveda and Yoga—paths toward perfect health and alignment—integrate into the Western world.
            </p>
            <motion.a
              href="https://www.youtube.com/@ojasoasis"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all mt-6"
            >
              <FaYoutube className="text-xl" />
              <span>Visit Channel</span>
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 gap-16">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-purple-700 mb-2">{video.title}</h2>
                  <p className="text-gray-500 mb-6">Published: {video.publishedAt}</p>
                </div>
                <div className="w-full">
                  <YouTubeEmbed videoId={video.id} title={video.title} />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-gray-600">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-16">
            <a
              href="https://www.youtube.com/@ojasoasis"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-medium px-8 py-4 rounded-full shadow-lg transition-all inline-flex items-center gap-2"
            >
              <FaYoutube className="text-2xl" />
              <span className="text-lg">View More Videos</span>
            </a>
          </motion.div>
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