'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from '@/constants';
import Image from 'next/image';

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-20 bg-dark-light relative overflow-hidden" >
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5">
        <Image 
          src="/code-6127616.svg"
          alt="Decorative code background"
          width={600}
          height={600}
          className="text-white fill-current"
        />
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
            Our Tech Stack
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cutting-edge technologies powering our solutions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-6 w-32 h-32 bg-dark-light rounded-xl border border-gray-800 hover:border-primary transition-colors duration-300">
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 