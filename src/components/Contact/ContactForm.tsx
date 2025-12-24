import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

/**
 * ContactForm Component
 * A styled form with "System" style labels and inputs.
 * Includes decorative corner bolts.
 * Integrating EmailJS for real email delivery.
 */
const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS
    const SERVICE_ID = 'service_4wg5drg';
    const TEMPLATE_ID = 'template_c4yel6l';
    const PUBLIC_KEY = 'SWKdDwSzed5lMYn-E';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        form.current?.reset();
        setTimeout(() => setStatus('idle'), 5000); // Reset status after 5 seconds
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-nth-white/5 p-8 border border-nth-border backdrop-blur-md relative">
      {/* Decorative bolts */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-nth-white"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-nth-white"></div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-nth-red"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-nth-red"></div>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">System.User.Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full bg-nth-white/10 border border-nth-border p-3 text-nth-red focus:outline-none focus:border-nth-red transition-colors font-mono text-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-500 uppercase">System.User.Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full bg-nth-white/10 border border-nth-border p-3 text-nth-red focus:outline-none focus:border-nth-red transition-colors font-mono text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-500 uppercase">Data.Message</label>
          <textarea
            name="message"
            required
            rows={4}
            className="w-full bg-nth-white/10 border border-nth-border p-3 text-nth-red focus:outline-none focus:border-nth-red transition-colors font-mono text-sm"
            placeholder="Project specifications..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full py-4 font-bold font-mono tracking-widest transition-all duration-300
            ${status === 'sending' ? 'bg-gray-600 text-gray-400 cursor-not-allowed' :
              status === 'success' ? 'bg-green-600 text-white' :
                status === 'error' ? 'bg-red-600 text-white' :
                  'bg-nth-white text-nth-black hover:bg-nth-red hover:text-white'}`}
        >
          {status === 'sending' ? 'TRANSMITTING...' :
            status === 'success' ? 'TRANSMISSION COMPLETE' :
              status === 'error' ? 'TRANSMISSION FAILED' :
                'INITIATE_TRANSMISSION'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;