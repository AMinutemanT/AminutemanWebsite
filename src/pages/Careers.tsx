import React, { useState, useEffect, useRef } from 'react';
import { Send, Briefcase, Quote } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Carousel } from '../components/Carousel';

const positions = [
  {
    title: "Aerospace Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "AI/ML Engineer",
    department: "Research & Development",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Mechanical Design Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Quality Assurance Specialist",
    department: "Manufacturing",
    type: "Full-time",
    location: "Pune",
  }
];

const cards = [
  {
    title: "VISIONARY VOYAGERS",
    description: "We welcome people with a zest for exploring uncharted realms of possibility"
  },
  {
    title: "MINDFUL MAVERICKS",
    description: "We are a group of people with independent and unique perspectives"
  },
  {
    title: "INNOVATION IGNITERS",
    description: "Innovation drives us and creating new things motivates us"
  }
];

const carouselSlides = [
  {
    title: "Innovation Hub",
    description: "Our state-of-the-art facilities foster creativity and breakthrough innovations in aerospace technology.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80"
  },
  {
    title: "Collaborative Environment",
    description: "Work alongside industry experts and brilliant minds in a dynamic, collaborative workspace.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
  },
  {
    title: "Work-Life Balance",
    description: "We believe in maintaining a healthy work-life balance with flexible schedules and comprehensive benefits.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
  },
  {
    title: "Global Impact",
    description: "Join us in shaping the future of aerospace and defense technology on a global scale.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
  }
];

const testimonials = [
  {
    name: "Snehlata Kumari",
    role: "Director",
    image: "../images/director.jpg",
    quote: "Aminuteman fosters a culture of innovation and teamwork, making it rewarding to lead projects that shape the future of defense technology."
  },
  {
    name: "Aniruddha Narayan",
    role: "CEO",
    image: "../images/aniruddha.jpg",
    quote: "Being part of Aminuteman means working with passionate innovators dedicated to advancing aerospace defense and national security."
  },
  {
    name: "Drashya Rawal",
    role: "Head of Propulsion",
    image: "../images/propulsionHead.jpg",
    quote: "Our teamwork at Aminuteman drives breakthroughs in propulsion that contribute to safer and more advanced aerospace technology."
  },
  {
    name: "Amit Mishra",
    role: "Combustion Chamber Specialist",
    image: "../images/combustionChamberSpecialist.jpg",
    quote: "Aminuteman supports creativity and precision, allowing me to innovate and tackle real-world challenges every day."
  },
  {
    name: "Pratik Desai",
    role: "Head of Avionics",
    image: "../images/avionicsHead.jpg",
    quote: "Leading avionics at Aminuteman means pushing technical boundaries alongside some of the brightest minds in the field."
  }
];

export function Careers() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const words = ['PLAY', 'WORK', 'LEARN', 'GROW'];
  const [currentWord, setCurrentWord] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', 'translate-x-full');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px'
      }
    );

    document.querySelectorAll('.slide-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await emailjs.sendForm(
        'service_your_service_id',
        'template_your_template_id',
        form.current!,
        'your_public_key'
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We\'ll review and get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          resume: null,
          coverLetter: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFEfd5]">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
            alt="Careers Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-[5rem] overflow-hidden">
              <h1 className="animate-text text-slide-animation">
                {words[currentWord]}
              </h1>
            </div>
            <h1 className="animate-text">AT AMINUTEMAN</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mt-8">
            For those rare intellects who possess both analytical rigor and contemplative depth scientists, researchers, engineers, physicists, and mathematicians whose pursuit of excellence extends beyond conventional boundaries we extend a distinguished invitation.
          </p>
        </div>
      </div>

      <section className="py-20 bg-[#FFEfd5]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
            WHO WE ARE LOOKING FOR
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="slide-card bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl translate-x-full transition-all duration-1000"
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Carousel slides={carouselSlides} />

      <section className="py-20 bg-[#FFEfd5]">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
            LIFE AT AMINUTEMAN
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="slide-card bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl translate-x-full transition-all duration-1000"
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Quote className="w-8 h-8 text-gray-600 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FFEfd5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-lg sticky top-24">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h3>
                  <div className="space-y-6">
                    {positions.map((position, index) => (
                      <div 
                        key={index} 
                        className="group p-6 bg-[#FFEfd5] rounded-2xl transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm">
                            <Briefcase className="w-6 h-6 text-gray-700" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h4>
                            <p className="text-gray-600 mb-3">{position.department}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1.5 text-sm bg-white rounded-full text-gray-700 shadow-sm">
                                {position.type}
                              </span>
                              <span className="px-3 py-1.5 text-sm bg-white rounded-full text-gray-700 shadow-sm">
                                {position.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Apply Now</h3>
                  
                  {submitStatus.type && (
                    <div className={`mb-8 p-6 rounded-2xl ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 placeholder-gray-500 transition-colors"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 placeholder-gray-500 transition-colors"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 placeholder-gray-500 transition-colors"
                          placeholder="+91 XXXXXXXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                          Position
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 transition-colors"
                          required
                        >
                          <option value="">Select a position</option>
                          {positions.map((pos, index) => (
                            <option key={index} value={pos.title}>
                              {pos.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 placeholder-gray-500 transition-colors"
                        placeholder="Years of experience"
                        min="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <p className="mt-1 text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-[#FFEfd5] border-2 border-transparent rounded-xl focus:outline-none focus:border-gray-300 text-gray-900 placeholder-gray-500 resize-none transition-colors"
                        placeholder="Tell us why you'd be a great fit..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}