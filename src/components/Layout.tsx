'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/constants';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    // Close mobile menu on resize
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } },
    exit: { x: '100%', opacity: 0, transition: { type: 'tween', ease: 'easeInOut', duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };


  return (
    <div className="min-h-screen bg-dark text-white">
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-dark/80 backdrop-blur-md' : 'bg-transparent' // Ensure bg on mobile open
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary" onClick={closeMobileMenu}>
              SacryptTech
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="text-white focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                 ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                 )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden" // Backdrop
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobileMenu}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-64 bg-dark-lighter shadow-lg z-50 md:hidden p-6"
            >
              <ul className="flex flex-col space-y-6 pt-16">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                      onClick={closeMobileMenu} // Close menu on link click
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className={`pt-20 transition-transform duration-300 ${isMobileMenuOpen ? 'filter blur-sm pointer-events-none' : ''}`}>
        {children}
      </main>

      <footer className="bg-dark-light py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">SacryptTech</h3>
              <p className="text-sm text-gray-400">Full-Stack Tech Agency</p>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} SacryptTech. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 