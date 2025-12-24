import React from 'react';
import ContactForm from './ContactForm';

/**
 * Contact Component
 * Displays the contact header and the form component.
 * Includes a decorative dot pattern background.
 */
const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-20 bg-nth-black border-t border-nth-border relative transition-colors duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-dot-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold text-nth-white mb-6">
          LET'S <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--nth-white)' }}>BUILD</span> THE<br />
          <span className="text-nth-red">FUTURE</span>
        </h2>
        <p className="text-gray-500 font-mono text-sm md:text-base">
          Have an idea? Let's discuss how we can engineer a solution.
        </p>
      </div>

      <ContactForm />
    </section>
  );
};

export default Contact;