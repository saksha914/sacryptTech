'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/constants';
import Image from 'next/image';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-dark-light relative overflow-hidden">
      {/* Decorative chip background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 transform rotate-12 translate-x-20 -translate-y-20">
          <Image 
            src="/chip-1710300.svg"
            alt="Decorative chip"
            width={300}
            height={300}
            className="text-white fill-current"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 transform -rotate-12 -translate-x-20 translate-y-20">
          <Image 
            src="/chip-1710300.svg"
            alt="Decorative chip"
            width={300}
            height={300}
            className="text-white fill-current"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions for your digital needs, from concept to completion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group h-full"
            >
              <div className="relative p-8 bg-dark rounded-xl border border-gray-800 hover:border-primary transition-colors duration-300 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 