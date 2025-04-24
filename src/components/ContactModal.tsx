'use client';

import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import React from 'react'; // Import React for CSSProperties

const services = [
  { name: 'Android', icon: '🤖', color: '#3DDC84' }, // Example colors
  { name: 'iOS', icon: '🍎', color: '#A2AAAD' },
  { name: 'Web', icon: '🌐', color: '#4A90E2' },
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Service, 2: Enter Details

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setStep(2); // Move to the next step
  };

  const handleBack = () => {
    setStep(1); // Go back to service selection
    setSelectedService(null); // Reset selection if needed, or keep it
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { service: selectedService, ...formData });
    setIsSubmitted(true);
    setStep(3); // Move to success step
    setTimeout(() => {
      onClose();
      // Reset state after closing
      setTimeout(() => {
        setStep(1);
        setSelectedService(null);
        setFormData({ name: '', email: '', details: '' });
        setIsSubmitted(false);
      }, 300); // Delay reset to allow exit animation
    }, 2500); 
  };

  const resetModal = () => {
    onClose();
    // Ensure reset happens after modal is fully closed
    setTimeout(() => {
      setStep(1);
      setSelectedService(null);
      setFormData({ name: '', email: '', details: '' });
      setIsSubmitted(false);
    }, 300); 
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 30 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 35, delay: 0.1 } },
    exit: { scale: 0.95, opacity: 0, y: 30, transition: { duration: 0.2 } },
  };

  const stepVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 25 } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.2 } },
  };

  const successVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', delay: 0.2 } },
    exit: { scale: 0.5, opacity: 0 },
  };

  // Function to generate style object for service color
  const getServiceColorStyle = (serviceName: string | null): React.CSSProperties => {
    const color = services.find(s => s.name === serviceName)?.color || '#FFFFFF'; // Default white
    return { color };
  };

  // Function to generate background style for card hover
  const getCardBackgroundStyle = (color: string): React.CSSProperties => {
    return { background: `radial-gradient(circle at center, ${color}30, transparent 70%)` };
  };

  return (
    <AnimatePresence onExitComplete={() => { /* Reset internal state only if needed */ }}>
      {isOpen && (
        <Dialog static as={Fragment} open={isOpen} onClose={resetModal}>
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={resetModal} 
            />

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-gradient-to-br from-dark-lighter to-dark p-1 shadow-2xl border border-gray-800/50"
              >
                <div className="relative bg-dark-lighter rounded-[14px] p-6 overflow-hidden min-h-[350px]">
                  {/* Back Button - Conditional */}
                  {step === 2 && (
                    <motion.button
                      onClick={handleBack}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-20 p-1 rounded-full hover:bg-white/10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                  )}
                  
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex flex-col items-center"
                      >
                        <h3 className="text-xl font-semibold leading-6 text-white mb-6 text-center">
                          Choose Your Platform
                        </h3>
                        <div className="flex space-x-4 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide w-full justify-center px-4">
                          {services.map((service, index) => (
                            <motion.div
                              key={service.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 * index } }}
                              className="flex-shrink-0 snap-center"
                            >
                              <motion.button
                                onClick={() => handleServiceSelect(service.name)}
                                whileHover={{ scale: 1.03, y: -5, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                                whileTap={{ scale: 0.97 }}
                                className="relative group flex flex-col items-center justify-between p-5 rounded-xl border border-gray-700 bg-dark w-32 h-40 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                              >
                                {/* Background color swell */}
                                <motion.div 
                                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                  style={getCardBackgroundStyle(service.color)}
                                />
                                <div className="relative z-10 flex flex-col items-center">
                                  <span className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">{service.icon}</span>
                                  <span className="text-sm font-medium text-white text-center">{service.name}</span>
                                </div>
                                <span className="relative z-10 text-xs text-gray-500 group-hover:text-primary transition-colors mt-2">Select</span>
                              </motion.button>
                             </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                       <motion.div
                          key="step2"
                          variants={stepVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                       >
                        <h3 className="text-xl font-semibold leading-6 text-white mb-5 text-center">
                            Project Details for {selectedService}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 text-white placeholder-gray-500 text-sm" placeholder="Your Name" />
                           </motion.div>
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 text-white placeholder-gray-500 text-sm" placeholder="your.email@example.com" />
                           </motion.div>
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
                              <label htmlFor="details" className="block text-sm font-medium text-gray-400 mb-1">Brief Details</label>
                              <textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 text-white placeholder-gray-500 text-sm" placeholder="A short description of your idea..." />
                           </motion.div>
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }} className="pt-2">
                              <button type="submit" disabled={!formData.name || !formData.email} className="w-full px-5 py-2.5 bg-primary text-dark font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group overflow-hidden">
                                <motion.span className="relative z-10" whileTap={{ scale: 0.98 }}>Submit Request</motion.span>
                                <div className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                              </button>
                           </motion.div>
                        </form>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        variants={successVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="text-center py-10 flex flex-col items-center justify-center min-h-[250px]"
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360, transition: { type: 'spring', stiffness: 200, damping: 10, delay: 0.1 } }}
                          className="text-6xl mb-5"
                        >
                          🚀
                        </motion.div>
                        <h3 className="text-xl text-white font-semibold mb-2">Success!</h3>
                        <p 
                          className="text-gray-400 text-sm"
                        >
                          Your request for {selectedService} development is sent. We&apos;ll be in touch!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 