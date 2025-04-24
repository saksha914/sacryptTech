'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/constants';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/80 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              SacryptTech
            </Link>
            <ul className="flex space-x-8">
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
          </div>
        </nav>
      </motion.header>

      <main className="pt-20">{children}</main>

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