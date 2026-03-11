import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { submitToWeb3Forms } from '../utils/cloudinary';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const sectionRefs = {
    form: useRef<HTMLDivElement>(null),
    info: useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare data for Web3Forms
      const web3FormData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `
Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
        `.trim(),
        form_type: 'Contact Form',
      };

      await submitToWeb3Forms(web3FormData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img  loading="lazy" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=60"
            alt="Contact Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Have questions about our defense technology solutions? We're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div 
              ref={sectionRefs.form}
              className="lg:col-span-8 bg-transparent border border-white/20 rounded-3xl p-8 sm:p-10 transform transition-all duration-1000 opacity-0 translate-y-10"
            >
              {submitStatus.type && (
                <div className={`mb-8 p-4 rounded-xl ${
                  submitStatus.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-white/90">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-white/90">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-white/90">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white/90">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 resize-none transition-all"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-white text-black hover:bg-white/90 transition-all rounded-xl flex items-center justify-center gap-2 group text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            <div 
              ref={sectionRefs.info}
              className="lg:col-span-4 space-y-6 transform transition-all duration-1000 opacity-0 translate-y-10"
            >
              <div className="bg-transparent border border-white/20 rounded-3xl p-8">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
                    <p className="text-gray-300">+91 8208038411</p>
                    <p className="text-gray-300">+91 9356221384</p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent border border-white/20 rounded-3xl p-8">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                    <p className="text-gray-300 break-words">aminutemantechnologies@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent border border-white/20 rounded-3xl p-8">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-blue-500/10 rounded-2xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Locations</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-white font-medium">Research & Development</p>
                        <p className="text-gray-400 mt-1">Dr. D.Y. Patil Institute of Engineering</p>
                        <p className="text-gray-400">Akurdi, Nigdi, Pune - 411044</p>
                      </div>
                      <div>
                        <p className="text-white font-medium">Manufacturing Unit 1</p>
                        <p className="text-gray-400 mt-1">Vighnaharta, Vidyanagar</p>
                        <p className="text-gray-400">Dhanori, Pune - 411032</p>
                      </div>
                      <div>
                        <p className="text-white font-medium">Manufacturing Unit 2</p>
                        <p className="text-gray-400 mt-1">Creative Kids</p>
                        <p className="text-gray-400">Dhanori, Pune - 411032</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}