import React, { useEffect, useRef, useState } from 'react';
import { Send, Upload, FileCheck } from 'lucide-react';
import { uploadToCloudinary, submitToWeb3Forms } from '../utils/cloudinary';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { Eyebrow, SectionHeading } from '../components/ui/HUD';

/* ---------------------------------------------------------------------------
 * Careers. The pitch is the work, not the perks, the people worth hiring for
 * this are the ones who want the hard problem, so the page leads with it.
 * ------------------------------------------------------------------------- */

const POSITIONS = [
  {
    title: 'UAV Engineer',
    discipline: 'Airframe',
    note: 'Loitering munition and interceptor airframes from concept through trials.',
  },
  {
    title: 'Aerodynamics Engineer',
    discipline: 'Airframe',
    note: 'Subsonic through hypersonic configuration work, CFD and wind-tunnel correlation.',
  },
  {
    title: 'Structural Engineer',
    discipline: 'Airframe',
    note: 'Composite and metallic primary structure sized for attritable production rates.',
  },
  {
    title: 'Design Engineer',
    discipline: 'Airframe',
    note: 'Detail design and design-for-manufacture across the programme families.',
  },
  {
    title: 'Avionics Engineer',
    discipline: 'Avionics',
    note: 'Flight control, datalink and navigation that hold through jamming and GNSS denial.',
  },
  {
    title: 'Electronics Engineer',
    discipline: 'Avionics',
    note: 'Power, sensing and payload interfaces qualified for field environments.',
  },
  {
    title: 'AI Engineer',
    discipline: 'Autonomy',
    note: 'Edge autonomy, perception and mission behaviours for the Valley stack.',
  },
];

const WHY = [
  {
    title: 'The hard problem is the job',
    body: 'Edge autonomy that survives disconnection, denied-environment navigation, effectors priced against what they intercept. Nobody hands you a reference design for these.',
  },
  {
    title: 'Hardware that flies',
    body: 'Work here reaches a test range, not a slide. Engineers see their parts fabricated, instrumented and flown, and own the results either way.',
  },
  {
    title: 'Whole stack, small team',
    body: 'Airframe, avionics, autonomy and effectors sit in the same programme office. You will work across boundaries that larger primes keep separate.',
  },
  {
    title: 'It matters who builds it',
    body: 'Every programme exists because the alternative was an import licence. The work is national capability, and it is treated that way.',
  },
];

const EXPERIENCE_BANDS = ['0 to 1', '2 to 4', '5 to 9', '10+'];

export function Careers() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [uploadingResume, setUploadingResume] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null as File | null,
    resumeUrl: '',
    coverLetter: '',
  });

  useEffect(() => {
    document.title = 'Careers, Aminuteman Technologies';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      let resumeUrl = formData.resumeUrl;

      // Upload resume to Cloudinary if a new file is selected
      if (formData.resume && !formData.resumeUrl) {
        setUploadingResume(true);
        resumeUrl = await uploadToCloudinary(formData.resume);
      }

      if (!resumeUrl) {
        throw new Error('Resume upload failed. Please try again.');
      }

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
        type: 'success',
        message: 'Application received. We review every submission and respond directly.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
        resumeUrl: '',
        coverLetter: '',
      });

      if (form.current) form.current.reset();
    } catch (error) {
      console.error('Application submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Submission failed. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
      setUploadingResume(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'File size should be less than 5MB. Please choose a smaller file.',
        });
        return;
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please upload a PDF, DOC, or DOCX file.',
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        resume: file,
        resumeUrl: '', // Reset URL when new file is selected
      }));

      setSubmitStatus({ type: null, message: '' });
    }
  };

  const selectPosition = (title: string) => {
    setFormData((prev) => ({ ...prev, position: title }));
    document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
        <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,rgba(255,138,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />

        <div className="container relative">
          <Reveal direction="none">
            <Eyebrow>Careers</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-6 max-w-4xl text-white">
              Build the things
              <br />
              nobody will sell us
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              We are hiring engineers who want the unsolved half of the problem, autonomy,
              structures, guidance and avionics for systems that have to work in contested
              airspace, on a schedule India controls.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
              {POSITIONS.length} open positions · Pune, India · Full-time
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- Why --------------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The work"
              index="01"
              title="Why this, and not somewhere else"
            />
          </Reveal>

          <Stagger className="mt-16 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item, i) => (
              <StaggerItem key={item.title} className="bg-void">
                <div className="group relative h-full bg-panel/40 p-8 transition-colors duration-300 hover:bg-panel">
                  <span className="font-mono text-[0.6rem] tracking-widest text-accent/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.body}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Positions --------------------------------------------------- */}
      <section className="section border-b border-line">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Open roles"
              index="02"
              title="Positions"
              lede="All roles are full-time and on-site in Pune. If none of these match and you are still the right person, apply anyway and say why."
            />
          </Reveal>

          <div className="mt-14 border-t border-line">
            {POSITIONS.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.04}>
                <div className="group grid grid-cols-1 items-center gap-3 border-b border-line py-7 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-1">
                    <span className="font-mono text-xs text-ink-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-white transition-colors group-hover:text-accent">
                      {role.title}
                    </h3>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
                      {role.discipline} · Pune · Full-time
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm leading-relaxed text-ink-3">{role.note}</p>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <button
                      type="button"
                      onClick={() => selectPosition(role.title)}
                      className="font-mono text-[0.65rem] uppercase tracking-widest text-accent transition-colors hover:text-white"
                    >
                      Apply →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Application ------------------------------------------------- */}
      <section id="application" className="section scroll-mt-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="03">Application</Eyebrow>
                <h2 className="display-md mt-6 text-white">Send it in</h2>
                <p className="body-copy mt-5">
                  One form, one attachment. We read every application ourselves, there is no
                  keyword filter between you and the engineering team.
                </p>
                <p className="mt-8 font-mono text-[0.6rem] uppercase leading-relaxed tracking-widest text-ink-dim">
                  PDF, DOC or DOCX · 5 MB maximum · unclassified material only
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="border border-line bg-panel/40 p-7 sm:p-10"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <div>
                        <label htmlFor="position" className="data-label">
                          Position
                        </label>
                        <select
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                          className="form-input mt-2.5 appearance-none"
                        >
                          <option value="" disabled className="bg-panel">
                            Select…
                          </option>
                          {POSITIONS.map((p) => (
                            <option key={p.title} value={p.title} className="bg-panel">
                              {p.title}
                            </option>
                          ))}
                          <option value="Other" className="bg-panel">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="experience" className="data-label">
                        Years of experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="form-input mt-2.5 appearance-none"
                      >
                        <option value="" disabled className="bg-panel">
                          Select…
                        </option>
                        {EXPERIENCE_BANDS.map((b) => (
                          <option key={b} value={b} className="bg-panel">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Resume */}
                    <div className="mt-6">
                      <span className="data-label">Resume</span>
                      <label
                        htmlFor="resume"
                        className="mt-2.5 flex cursor-pointer items-center gap-3 border border-dashed border-white/20 bg-white/[0.03] px-4 py-5 transition-colors hover:border-accent/50 hover:bg-white/[0.05]"
                      >
                        {formData.resume ? (
                          <FileCheck className="h-5 w-5 shrink-0 text-nominal" />
                        ) : (
                          <Upload className="h-5 w-5 shrink-0 text-accent/70" />
                        )}
                        <span className="font-mono text-xs text-ink-2">
                          {formData.resume ? formData.resume.name : 'Attach PDF, DOC or DOCX'}
                        </span>
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="coverLetter" className="data-label">
                        Why this work <span className="text-ink-dim">(optional)</span>
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={6}
                        value={formData.coverLetter}
                        onChange={handleChange}
                        placeholder="What you have built, and which of these problems you want."
                        className="form-input mt-2.5 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary mt-8 w-full justify-center sm:w-auto"
                    >
                      {uploadingResume
                        ? 'Uploading resume…'
                        : isSubmitting
                          ? 'Submitting…'
                          : 'Submit application'}
                      <Send className="h-4 w-4" />
                    </button>

                    {submitStatus.type && (
                      <p
                        role="status"
                        className={`mt-6 border px-4 py-3 font-mono text-[0.65rem] uppercase tracking-widest ${
                          submitStatus.type === 'success'
                            ? 'border-nominal/40 bg-nominal/[0.07] text-nominal'
                            : 'border-critical/40 bg-critical/[0.07] text-critical'
                        }`}
                      >
                        {submitStatus.message}
                      </p>
                    )}
                  </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="data-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input mt-2.5"
      />
    </div>
  );
}

export default Careers;
