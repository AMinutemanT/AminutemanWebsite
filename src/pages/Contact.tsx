import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { submitToWeb3Forms } from '../utils/cloudinary';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/HUD';
import { OFFICES } from '../data/company';

/* ---------------------------------------------------------------------------
 * Programme office. Deliberately not a "get in touch" page, the people who
 * write to us are procurement authorities, programme offices and integrators,
 * and the form is scoped to route an enquiry rather than to capture a lead.
 * ------------------------------------------------------------------------- */

const CHANNELS = [
  {
    Icon: Phone,
    label: 'Programme office',
    lines: ['+91 93562 21384'],
  },
  {
    Icon: Mail,
    label: 'Enquiries',
    lines: ['aminutemantechnologies@gmail.com', 'admincontrols@aminutemantechnologies.com'],
  },
];

const ENQUIRY_TYPES = [
  'Programme briefing',
  'Trials & evaluation',
  'Partner integration',
  'Supply chain',
  'Media',
  'Other',
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    document.title = 'Contact, Aminuteman Technologies';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const web3FormData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: `
Contact Form Submission

Name: ${formData.name}
Organisation: ${formData.organisation}
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
        message: 'Enquiry received. The programme office will respond directly.',
      });
      setFormData({ name: '', organisation: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Transmission failed. Please try again, or write to the address above.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-void">
      {/* ---- Header ------------------------------------------------------ */}
      <header className="relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div className="absolute inset-0 bg-grid-coarse bg-grid-coarse opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,rgba(255,138,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />

        <div className="container relative">
          <Reveal direction="none">
            <Eyebrow>Programme office</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl mt-6 text-white">Contact</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2 sm:text-xl">
              Programme briefings, trials, integration and supply enquiries are handled directly
              by the responsible engineering team. Detailed performance data is released to
              qualified government and industry counterparties following end-user certification.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- Form + channels --------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                                  <form
                    onSubmit={handleSubmit}
                    className="border border-line bg-panel/40 p-7 sm:p-10"
                  >
                    <p className="data-label">Enquiry</p>
                    <h2 className="display-md mt-4 text-white">Open a channel</h2>

                    <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                      />
                      <Field
                        label="Organisation"
                        name="organisation"
                        value={formData.organisation}
                        onChange={handleChange}
                        placeholder="Service, agency or company"
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@organisation"
                        required
                      />
                      <div>
                        <label htmlFor="subject" className="data-label">
                          Enquiry type
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="form-input mt-2.5 appearance-none"
                        >
                          <option value="" disabled className="bg-panel">
                            Select…
                          </option>
                          {ENQUIRY_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-panel">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="message" className="data-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Requirement, programme context and timeline. Do not include classified material."
                        className="form-input mt-2.5 resize-y"
                      />
                    </div>

                    <p className="mt-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-widest text-ink-dim">
                      This is an unclassified channel. Do not transmit restricted or classified
                      information through this form.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary mt-8 w-full justify-center sm:w-auto"
                    >
                      {isSubmitting ? 'Transmitting…' : 'Send enquiry'}
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

            {/* Channels */}
            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <Eyebrow>Direct</Eyebrow>
                <dl className="mt-8 space-y-px border border-line bg-line">
                  {CHANNELS.map(({ Icon, label, lines }) => (
                    <div key={label} className="bg-panel/50 px-5 py-5">
                      <dt className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-accent/70" />
                        <span className="data-label">{label}</span>
                      </dt>
                      {lines.map((line) => (
                        <dd
                          key={line}
                          className="mt-2 break-all font-mono text-xs text-white/75"
                        >
                          {line}
                        </dd>
                      ))}
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10">
                  <Eyebrow>Facilities</Eyebrow>
                  <dl className="mt-8 space-y-px border border-line bg-line">
                    {OFFICES.map((office) => (
                      <div key={office.city + office.role} className="bg-panel/50 px-5 py-5">
                        <dt className="flex items-center gap-2.5">
                          <MapPin className="h-4 w-4 shrink-0 text-accent/70" />
                          <span className="data-label">
                            {office.city}
                            <span className="text-ink-dim"> · {office.role}</span>
                          </span>
                        </dt>
                        {office.lines
                          ? office.lines.map((line) => (
                              <dd key={line} className="mt-2 text-xs leading-relaxed text-ink-2">
                                {line}
                              </dd>
                            ))
                          : (
                            <dd className="mt-2 text-xs leading-relaxed text-ink-3">
                              {office.state}
                            </dd>
                          )}
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-10 border border-line bg-panel/30 p-6">
                  <p className="data-label">Integrators</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    Bringing a sensor or effector onto the grid is handled through the partner
                    programme rather than this channel.
                  </p>
                  <Link
                    to="/valley/partner-program"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-accent transition-colors hover:text-white"
                  >
                    Partner integration
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
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
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
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
        placeholder={placeholder}
        required={required}
        className="form-input mt-2.5"
      />
    </div>
  );
}

export default Contact;
