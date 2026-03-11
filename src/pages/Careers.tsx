import React, { useState, useRef } from "react";
import { Send } from "lucide-react";
import { Carousel } from "../components/Carousel";
import { uploadToCloudinary, submitToWeb3Forms } from '../utils/cloudinary';

const positions = [
  {
    title: "UAV Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Avionics Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Aerodynamics Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Design Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "Structural Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },

  {
    title: "Electronics Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
  {
    title: "AI Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune",
  },
];

const cards = [
  {
    title: "Visionary Voyagers",
    description:
      "We welcome people with a zest for exploring uncharted realms of possibility",
  },
  {
    title: "Mindful Mavericks",
    description:
      "We are a group of people with independent and unique perspectives",
  },
  {
    title: "Innovation Igniters",
    description: "Innovation drives us and creating new things motivates us",
  },
];

const carouselSlides = [
  {
    title: "Innovation Hub",
    description:
      "Our state-of-the-art facilities foster creativity and breakthrough innovations in aerospace technology.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=60",
  },
  {
    title: "Collaborative Environment",
    description:
      "Work alongside industry experts and brilliant minds in a dynamic, collaborative workspace.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=60",
  },
  {
    title: "Work-Life Balance",
    description:
      "We believe in maintaining a healthy work-life balance with flexible schedules and comprehensive benefits.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=60",
  },
  {
    title: "Global Impact",
    description:
      "Join us in shaping the future of aerospace and defense technology on a global scale.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=60",
  },
];

export function Careers() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadingResume, setUploadingResume] = useState(false);

  const words = ["WORK", "LEARN", "GROW"];
  const [currentWord, setCurrentWord] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Use a simple timeout instead of intersection observer to prevent conflicts
    const timer = setTimeout(() => {
      document.querySelectorAll(".slide-card").forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("opacity-100", "translate-x-0");
          card.classList.remove("opacity-0", "translate-x-full");
        }, index * 200);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null as File | null,
    resumeUrl: "",
    coverLetter: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      let resumeUrl = formData.resumeUrl;

      // Upload resume to Cloudinary if a new file is selected
      if (formData.resume && !formData.resumeUrl) {
        setUploadingResume(true);
        console.log('Uploading resume to Cloudinary...');
        resumeUrl = await uploadToCloudinary(formData.resume);
        console.log('Resume uploaded successfully:', resumeUrl);
      }

      if (!resumeUrl) {
        throw new Error('Resume upload failed. Please try again.');
      }

      // Prepare data for Web3Forms
      const web3FormData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: `${formData.experience} years`,
        resume_url: resumeUrl,
        cover_letter: formData.coverLetter || 'No cover letter provided',
        form_type: 'Career Application',
        subject: `New Career Application - ${formData.position}`,
        message: `
New Career Application Received

Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Position Applied: ${formData.position}
Years of Experience: ${formData.experience}

Resume: ${resumeUrl}

Cover Letter:
${formData.coverLetter || 'No cover letter provided'}
        `.trim(),
      };

      await submitToWeb3Forms(web3FormData);
      
      setSubmitStatus({
        type: "success",
        message: "Application submitted successfully! We'll review your application and get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        resume: null,
        resumeUrl: "",
        coverLetter: "",
      });
      
      if (form.current) form.current.reset();
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit application. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setUploadingResume(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: "error",
          message: "File size should be less than 5MB. Please choose a smaller file.",
        });
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: "error",
          message: "Please upload a PDF, DOC, or DOCX file.",
        });
        return;
      }
      
      setFormData((prev) => ({
        ...prev,
        resume: file,
        resumeUrl: "", // Reset URL when new file is selected
      }));
      
      // Clear any previous error messages
      setSubmitStatus({ type: null, message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            loading="eager"
            decoding="sync"
            crossOrigin="anonymous"
            fetchPriority="high"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=60"
            alt="Careers Hero"
            className="w-full h-full object-cover"
            style={{ 
              imageRendering: 'auto',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'auto',
              WebkitBackfaceVisibility: 'hidden'
            }}
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
            For those rare intellects who possess both analytical rigor and
            contemplative depth scientists, researchers, engineers, physicists,
            and mathematicians whose pursuit of excellence extends beyond
            conventional boundaries we extend a distinguished invitation.
          </p>
        </div>
      </div>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            WHO WE ARE LOOKING FOR
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="slide-card bg-transparent border border-white/20 rounded-2xl p-6 translate-x-full transition-all duration-1000 hover:-translate-y-2"
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Carousel slides={carouselSlides} />

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="bg-transparent border border-white/20 rounded-2xl p-8 sticky top-24">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Open Positions
                  </h3>
                  <div className="space-y-4 overflow-y-auto max-h-[70vh]">
                    {positions.map((position, index) => (
                      <div
                        key={index}
                        className="group p-5 bg-transparent border border-white/20 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 position-card"
                      >
                        <div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {position.title}
                            </h4>
                            <p className="text-gray-400 text-sm mb-3">
                              {position.department}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 text-xs bg-white/10 rounded-full text-gray-300">
                                {position.type}
                              </span>
                              <span className="px-3 py-1 text-xs bg-white/10 rounded-full text-gray-300">
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
                <div className="bg-transparent border border-white/20 rounded-2xl p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Apply Now
                  </h3>

                  {submitStatus.type && (
                    <div
                      className={`mb-8 p-6 rounded-xl ${
                        submitStatus.type === "success"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-white/90"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white/90"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white/90"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                          placeholder="+91 XXXXXXXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-white/90"
                        >
                          Position
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
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
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-white/90"
                      >
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 transition-all"
                        placeholder="Years of experience"
                        min="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="resume"
                        className="block text-sm font-medium text-white/90"
                      >
                        Resume
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-white/90"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      {formData.resume && (
                        <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-sm text-green-400">
                            ✓ Selected: {formData.resume.name} ({(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        </div>
                      )}
                      <p className="mt-1 text-sm text-gray-400">
                        Accepted formats: PDF, DOC, DOCX (Max Size 5MB)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="coverLetter"
                        className="block text-sm font-medium text-white/90"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/30 resize-none transition-all"
                        placeholder="Tell us why you'd be a great fit..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-white text-black hover:bg-white/90 transition-all rounded-xl flex items-center justify-center gap-2 group font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploadingResume 
                        ? "Uploading Resume..." 
                        : isSubmitting 
                        ? "Submitting Application..." 
                        : "Submit Application"
                      }
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
