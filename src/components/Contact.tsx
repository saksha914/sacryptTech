'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTACT_FORM } from '@/constants';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-dark-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {CONTACT_FORM.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {CONTACT_FORM.description}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-2/3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {CONTACT_FORM.fields.map((field) => (
                <div key={field.name} className="relative group">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark border border-gray-800 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 text-white placeholder-gray-500"
                      rows={4}
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark border border-gray-800 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 text-white placeholder-gray-500"
                      required
                    />
                  )}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-primary text-dark font-bold rounded-lg hover:bg-primary-dark transition-colors duration-300 relative group"
              >
                <span className="relative z-10">{CONTACT_FORM.submitText}</span>
                <div className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/3 flex justify-center mt-10 md:mt-0"
          >
            <Image 
              src="/me-150143.svg"
              alt="Contact illustration"
              width={250}
              height={500}
              className="object-contain text-primary"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 