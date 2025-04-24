'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CONTENT } from '@/constants';
import Image from 'next/image';
import ContactModal from './ContactModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark z-0" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0 opacity-30" />
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-[5] opacity-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <Image 
              src="/gear-wheel-7163767.svg"
              alt="Futuristic Gear Background"
              width={800} 
              height={800}
              className="object-contain text-white fill-current"
              priority
            />
          </motion.div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-4 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {HERO_CONTENT.title}
            </motion.h1>
            
            <motion.h2
              className="text-2xl md:text-4xl font-medium mb-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {HERO_CONTENT.subtitle}
            </motion.h2>
            
            <motion.p
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {HERO_CONTENT.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 20px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-primary text-dark font-bold rounded-full hover:bg-primary-dark transition-colors duration-300 relative group overflow-hidden shadow-lg"
              >
                <span className="relative z-10">{HERO_CONTENT.cta}</span>
                <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2 } }} 
        />
      </section>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
} 