import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Check,
  CircleCheck,
  Clock3,
  HeartHandshake,
  Menu,
  MessageCircle,
  MessageSquareText,
  PhoneMissed,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import './index.css';

// OPTIONAL: paste a real scheduling link (GoHighLevel calendar, Calendly, etc.) to show a
// "pick a time yourself" link inside the form. Leave as '' to hide it.
const BOOKING_URL = '';
// Free access key from https://web3forms.com (enter your email, they send you the key).
// Every form submission is emailed to that address. The key is public by design.
const WEB3FORMS_ACCESS_KEY = '7bc875f7-72c5-4b41-82cb-e79659035096';
const KEY_NOT_SET = WEB3FORMS_ACCESS_KEY === '7bc875f7-72c5-4b41-82cb-e79659035096';
const DENTAL_DEMO_URL = 'https://bright-smile-dental-website--spdfecta.replit.app/';
const CONTACT_EMAIL = 'hello@aibooknest.com';
const BOOKINGS_EMAIL = 'bookings@aibooknest.com';
const SUPPORT_EMAIL = 'support@aibooknest.com';

const demoLinkProps = {
  href: DENTAL_DEMO_URL,
  target: '_blank',
  rel: 'noopener noreferrer',
};

const problems = [
  { icon: PhoneMissed, title: 'Missed Calls', text: 'Customers call after hours and never hear back.' },
  { icon: Clock3, title: 'Slow Responses', text: "Potential customers move on when they don't get an answer quickly." },
  { icon: CalendarClock, title: 'Manual Booking', text: 'Staff spend valuable time answering repetitive questions and scheduling appointments.' },
  { icon: MessageCircle, title: 'Lost Follow-Ups', text: 'Leads and past customers are forgotten after the first interaction.' },
];

const steps = [
  { icon: MessageSquareText, title: 'Customer Reaches Out', text: 'Website visitors can ask questions anytime.' },
  { icon: Sparkles, title: 'AI Responds', text: 'The AI receptionist instantly answers questions using your business information.' },
  { icon: CalendarCheck, title: 'Appointment Gets Booked', text: 'Customers can choose an available time and book without waiting for staff.' },
  { icon: BellRing, title: 'Follow-Up Happens Automatically', text: 'Confirmation, reminders, feedback requests, and follow-ups happen automatically.' },
];

const features = [
  { icon: MessageSquareText, title: 'AI Website Receptionist', text: 'Answer customer questions instantly, day or night.' },
  { icon: CalendarDays, title: 'Appointment Booking', text: 'Let customers schedule appointments directly through the conversation.' },
  { icon: CircleCheck, title: 'Appointment Confirmations', text: 'Automatically send confirmation messages after a booking.' },
  { icon: Bell, title: 'Appointment Reminders', text: 'Help reduce no-shows with automated reminders.' },
  { icon: PhoneMissed, title: 'Missed-Call Follow-Up', text: 'Automatically follow up when a potential customer calls and nobody answers.' },
  { icon: HeartHandshake, title: 'Feedback & Reviews', text: 'Collect feedback after appointments and guide happy customers toward leaving a review.' },
  { icon: UserRoundCheck, title: 'Lead & Patient Reactivation', text: "Reconnect with old leads or customers who haven't returned." },
  { icon: Workflow, title: 'Custom Follow-Up Workflows', text: 'Create automated follow-ups based on what each customer does.' },
];

const basicFeatures = [
  'AI Website Receptionist',
  '24/7 FAQ & service answers',
  'Appointment booking',
  'Appointment rescheduling',
  'Confirmation emails',
  'Lead/contact capture',
  '1 location',
];
const standardFeatures = [
  'Everything in Basic',
  'Appointment reminders',
  'Missed-call text-back',
  'Feedback collection',
  'Google review requests',
  'Monthly performance report',
  '1 location',
];
const premiumFeatures = [
  'Everything in Standard',
  'Custom follow-up workflows',
  'Patient reactivation',
  'Advanced AI knowledge/custom training',
  'Priority support',
  'Up to 3 locations',
];

const journey = [
  { icon: UserRoundCheck, text: 'Visitor arrives' },
  { icon: MessageCircle, text: 'Gets an instant answer' },
  { icon: CalendarCheck, text: 'Books appointment' },
  { icon: CircleCheck, text: 'Receives confirmation' },
  { icon: Bell, text: 'Gets reminder' },
  { icon: Stethoscope, text: 'Completes appointment' },
  { icon: MessageSquareText, text: 'Receives feedback request' },
  { icon: HeartHandshake, text: 'Happy customer leaves a review' },
  { icon: RefreshCw, text: 'Inactive customers can be reactivated' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#home" aria-label="AIBookNest home" data-testid={footer ? 'link-footer-brand-home' : 'link-brand-home'}>
      <span className="brand-mark"><Sparkles size={17} /></span>
      <span>AIBookNest</span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [inquiry, setInquiry] = useState<string | null>(null);
  const openInquiry = (plan: string) => { setMenuOpen(false); setInquiry(plan); };
  const closeInquiry = useCallback(() => setInquiry(null), []);

  return (
    <div className="site-shell">
      <header className="header">
        <div className="header-inner">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
            <a className="nav-link" href="#how-it-works" onClick={closeMenu} data-testid="link-nav-how-it-works">How It Works</a>
            <a className="nav-link" href="#features" onClick={closeMenu} data-testid="link-nav-features">Features</a>
            <a className="nav-link" href="#pricing" onClick={closeMenu} data-testid="link-nav-pricing">Pricing</a>
            <a className="nav-link" href="#dental" onClick={closeMenu} data-testid="link-nav-dental">For Dental Practices</a>
            <button type="button" className="button button-primary header-cta mobile-demo" onClick={() => openInquiry('Demo request')} data-testid="link-nav-book-demo">Book a Demo <ArrowUpRight size={14} /></button>
          </nav>
          <button type="button" className="button button-primary header-cta" onClick={() => openInquiry('Demo request')} data-testid="link-header-book-demo">Book a Demo <ArrowUpRight size={14} /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <div className="eyebrow"><span className="eyebrow-dot" /> Turn missed inquiries into booked appointments.</div>
              <h1 id="hero-heading">Your AI Receptionist.<br /><span>Always On.</span></h1>
              <p className="hero-copy">AIBookNest answers customer questions, captures leads, books appointments, and follows up automatically — 24/7.</p>
              <p className="hero-support">Stop losing customers to missed calls, unanswered messages, and slow follow-ups.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#live-demo" data-testid="link-hero-see-in-action">See It In Action <ArrowRight size={15} /></a>
                <button type="button" className="button button-quiet" onClick={() => openInquiry('Demo request')} data-testid="link-hero-book-demo">Book a Demo <ArrowUpRight size={15} /></button>
              </div>
              <div className="trust-line" aria-label="24/7, instant responses, automated booking">
                <span><Clock3 size={13} /> 24/7</span><i className="trust-sep" />
                <span><Zap size={13} /> Instant Responses</span><i className="trust-sep" />
                <span><CalendarCheck size={13} /> Automated Booking</span>
              </div>
            </div>

            <div className="product-stage" aria-label="A preview of an AI receptionist conversation">
              <div className="stage-orbit" />
              <div className="floating-note float-response">
                <span className="float-icon"><Zap size={15} /></span>
                <span>Instant response<small>Patient questions, answered</small></span>
              </div>
              <div className="chat-window">
                <div className="chat-top">
                  <div className="chat-identity">
                    <span className="chat-avatar"><Sparkles size={16} /></span>
                    <span><span className="chat-title">AIBookNest Reception</span><span className="chat-status"><i className="online" />Here to help</span></span>
                  </div>
                  <MessageCircle size={17} color="#8795a9" />
                </div>
                <div className="chat-body">
                  <div className="chat-date">TODAY · 10:42 AM</div>
                  <div className="message message-user">Hi, do you have appointments available this week?<span className="message-time">10:42 AM</span></div>
                  <div className="message message-ai">Absolutely! We have openings Thursday at 2:00 PM and Friday at 10:30 AM. Would you like me to book one for you?<span className="message-time">10:42 AM</span></div>
                  <div className="message message-user">Friday at 10:30.<span className="message-time">10:43 AM</span></div>
                  <div className="message message-ai">Perfect. I'll just need your name and email to complete the booking.<span className="message-time">10:43 AM</span></div>
                </div>
                <div className="chat-input"><span>Write a message...</span><span className="send-icon"><Send size={12} /></span></div>
              </div>
              <div className="floating-note float-booked">
                <span className="float-icon"><CalendarCheck size={15} /></span>
                <span>Appointment requested<small>Friday · 10:30 AM</small></span>
              </div>
            </div>
          </div>
        </section>

        <div className="metric-strip" aria-label="AIBookNest capabilities">
          <div className="container metric-inner">
            <div className="metric-item"><Clock3 size={15} /> Available day and night</div>
            <div className="metric-item"><MessageSquareText size={15} /> Answers with your business information</div>
            <div className="metric-item"><CalendarCheck size={15} /> Helps customers book</div>
          </div>
        </div>

        <section className="section problems" id="problem" aria-labelledby="problem-heading">
          <div className="container">
            <div className="problem-head">
              <div>
                <span className="section-kicker">The moments that get missed</span>
                <h2 className="section-heading" id="problem-heading">Every missed inquiry is a missed opportunity.</h2>
              </div>
              <p className="section-intro">The workday doesn't always line up with the moment a customer needs an answer.</p>
            </div>
            <div className="problem-grid">
              {problems.map(({ icon: Icon, title, text }, index) => (
                <article className="problem-card" key={title} data-testid={`card-problem-${index + 1}`}>
                  <span className="problem-icon"><Icon size={18} /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
            <div className="transition-band"><ArrowDownRight size={21} /><span>AIBookNest automates the conversations that happen before, during, and after the appointment.</span></div>
          </div>
        </section>

        <section className="section how-section" id="how-it-works" aria-labelledby="how-heading">
          <div className="container">
            <div className="center-heading">
              <span className="section-kicker">A clear path forward</span>
              <h2 className="section-heading" id="how-heading">From first question to booked appointment.</h2>
              <p className="section-intro">A simple, thoughtful flow that helps customers get the next step they need.</p>
            </div>
            <div className="process-grid">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <article className="process-step" key={title} data-testid={`step-process-${index + 1}`}>
                  <div className="step-icon"><Icon size={23} /></div>
                  <span className="step-num">0{index + 1}</span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section features" id="features" aria-labelledby="features-heading">
          <div className="container feature-layout">
            <div className="feature-aside">
              <span className="section-kicker">A dependable digital front desk</span>
              <h2 className="section-heading" id="features-heading">Your digital front desk, working 24/7.</h2>
              <p className="section-intro">From the first question to the follow-up, give every conversation a clear next step.</p>
              <a className="button button-quiet" href="#live-demo" data-testid="link-features-see-demo">See it in action <ArrowRight size={15} /></a>
            </div>
            <div className="feature-grid">
              {features.map(({ icon: Icon, title, text }, index) => (
                <article className="feature-card" key={title} data-testid={`card-feature-${index + 1}`}>
                  <span className="feature-icon"><Icon size={17} /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section live-demo" id="live-demo" aria-labelledby="demo-heading">
          <div className="container">
            <div className="center-heading">
              <span className="section-kicker">Experience the conversation</span>
              <h2 className="section-heading" id="demo-heading">Don't take our word for it. Talk to the AI.</h2>
              <p className="section-intro">See how an AI receptionist can handle a real customer conversation.</p>
            </div>
            <div className="demo-card">
              <div className="demo-copy">
                <span className="section-kicker">Dental practice demo</span>
                <h3>See what a helpful first conversation can feel like.</h3>
                <p>Explore a dental practice experience and ask the AI receptionist a question for yourself.</p>
                <a className="button button-primary" {...demoLinkProps} data-testid="link-live-demo">Try the Live Demo <ArrowUpRight size={15} /></a>
                <p className="demo-example">Ask about pricing, services, availability, or book an appointment.</p>
              </div>
              <div className="demo-preview" aria-hidden="true">
                <div className="mini-dashboard">
                  <div className="mini-top"><span>Reception overview</span><span className="mini-badge"><i className="online" /> Available</span></div>
                  <div className="mini-lines">
                    <div className="mini-line"><span>New patient question</span><strong>Answered</strong></div>
                    <div className="mini-line"><span>Appointment request</span><strong>Friday · 10:30</strong></div>
                    <div className="mini-line"><span>Follow-up</span><strong>Ready to send</strong></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="aibooknest-chat-widget-mount" className="integration-mount" aria-hidden="true" />
          </div>
        </section>

        <section className="section dental" id="dental" aria-labelledby="dental-heading">
          <div className="container dental-grid">
            <div className="dental-visual" aria-label="Appointment coordination product interface">
              <div className="practice-card">
                <div className="practice-head">
                  <span className="practice-symbol"><Stethoscope size={17} /></span>
                  <span><strong>Patient care, in motion</strong><small>Reception activity</small></span>
                </div>
                <div className="appointment-row"><MessageCircle size={15} /><span>Patient question answered</span></div>
                <div className="appointment-row"><CalendarCheck size={15} /><span>Booking request received</span></div>
                <div className="appointment-row"><BellRing size={15} /><span>Confirmation ready to send</span></div>
              </div>
            </div>
            <div className="dental-copy">
              <span className="section-kicker">Starting with dental practices</span>
              <h2 className="section-heading" id="dental-heading">Built for businesses that depend on appointments.</h2>
              <p className="section-intro">Starting with dental practices.</p>
              <p className="body-copy">Your front desk can't answer every question, every call, every hour of the day.</p>
              <p className="body-copy">AIBookNest gives dental practices an AI receptionist that can answer common patient questions, help patients book appointments, send confirmations and reminders, and automatically follow up with missed opportunities.</p>
              <a className="button button-primary" {...demoLinkProps} data-testid="link-dental-demo">See the Dental Demo <ArrowUpRight size={15} /></a>
              <div className="dental-note"><ShieldCheck size={16} /> Works alongside your existing website and appointment process.</div>
            </div>
          </div>
        </section>

        <section className="section journey" id="patient-journey" aria-labelledby="journey-heading">
          <div className="container">
            <div className="center-heading">
              <span className="section-kicker">Thoughtful follow-through</span>
              <h2 className="section-heading" id="journey-heading">Automate the journey. Not the relationship.</h2>
              <p className="section-intro">A connected sequence of helpful moments, from the first visit to staying in touch.</p>
            </div>
            <div className="journey-panel">
              <div className="journey-track">
                {journey.map(({ icon: Icon, text }, index) => (
                  <span className="journey-node" key={text} data-testid={`journey-stage-${index + 1}`}><Icon size={15} />{text}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing" id="pricing" aria-labelledby="pricing-heading">
          <div className="container">
            <div className="pricing-head">
              <span className="section-kicker">Plans for your practice</span>
              <h2 className="section-heading" id="pricing-heading">Simple plans. Clear value.</h2>
              <p className="section-intro">Choose the level of support that fits the way your team works.</p>
            </div>
            <div className="pricing-grid">
              <PricingCard name="BASIC" price="$99" features={basicFeatures} testId="basic" onSelect={openInquiry} />
              <PricingCard name="STANDARD" price="$199" features={standardFeatures} popular testId="standard" onSelect={openInquiry} />
              <PricingCard name="PREMIUM" price="$299" features={premiumFeatures} premium testId="premium" onSelect={openInquiry} />
            </div>
            <p className="custom-plan">Need something custom? <button type="button" className="link-button" onClick={() => openInquiry('Custom plan')} data-testid="link-custom-plan">Let's talk.</button></p>
          </div>
        </section>

        <section className="section why" id="why-aibooknest" aria-labelledby="why-heading">
          <div className="container why-grid">
            <div>
              <span className="section-kicker">A better kind of automation</span>
              <h2 className="section-heading" id="why-heading">More than a chatbot.</h2>
              <p className="section-intro">The right technology should make it easier for people to get help—not get in the way.</p>
            </div>
            <div className="why-points">
              <article className="why-point"><MessageSquareText size={18} /><h3>Built for conversations</h3><p>Designed around real customer interactions, not just FAQs.</p></article>
              <article className="why-point"><CalendarCheck size={18} /><h3>Built for appointments</h3><p>The goal isn't just answering questions. It's turning conversations into booked appointments.</p></article>
              <article className="why-point"><Clock3 size={18} /><h3>Always available</h3><p>Your digital receptionist works around the clock.</p></article>
              <article className="why-point"><Workflow size={18} /><h3>Automated follow-through</h3><p>Keep conversations moving even when your team is busy.</p></article>
            </div>
          </div>
        </section>

        <section className="final-cta" id="book-demo" aria-labelledby="final-heading">
          <div className="container cta-inner">
            <div className="cta-copy">
              <span className="section-kicker">A more responsive front desk starts here</span>
              <h2 id="final-heading">Stop losing customers to missed opportunities.</h2>
              <p>Give your business a receptionist that never sleeps, never forgets to follow up, and is ready to help customers 24/7.</p>
            </div>
            <div className="cta-actions">
              <button type="button" className="button button-white" onClick={() => openInquiry('Demo request')} data-testid="link-final-book-demo">Book a 10-Minute Demo <ArrowUpRight size={15} /></button>
              <a className="button button-clear" {...demoLinkProps} data-testid="link-final-live-demo">Try the Live Demo <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-top">
            <div className="footer-about">
              <Brand footer />
              <p>AI-powered customer communication and appointment automation for modern businesses.</p>
              <div className="footer-links"><a href={`mailto:${CONTACT_EMAIL}`} data-testid="link-contact-email">{CONTACT_EMAIL}</a></div>
            </div>
            <div className="footer-col">
              <h3>Explore</h3>
              <div className="footer-links">
                <a href="#home" data-testid="link-footer-home">Home</a>
                <a href="#how-it-works" data-testid="link-footer-how-it-works">How It Works</a>
                <a href="#features" data-testid="link-footer-features">Features</a>
                <a href="#pricing" data-testid="link-footer-pricing">Pricing</a>
                <a href="#contact" data-testid="link-footer-contact">Contact</a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Get in touch</h3>
               <div className="footer-links">
                 <a href={`mailto:${BOOKINGS_EMAIL}`} data-testid="link-footer-bookings">Demo bookings: {BOOKINGS_EMAIL}</a>
                 <a href={`mailto:${SUPPORT_EMAIL}`} data-testid="link-footer-support">Support: {SUPPORT_EMAIL}</a>
                 <a href={`mailto:${CONTACT_EMAIL}`} data-testid="link-footer-email">General: {CONTACT_EMAIL} <ArrowUpRight size={12} /></a>
                 <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Privacy policy request')}`} data-testid="link-footer-privacy">Privacy Policy</a>
                 <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Terms of service request')}`} data-testid="link-footer-terms">Terms</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 AIBookNest. All rights reserved.</span>
            <div className="footer-legal">
               <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Privacy policy request')}`} data-testid="link-legal-privacy">Privacy</a>
               <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Terms of service request')}`} data-testid="link-legal-terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      {inquiry && <InquiryModal plan={inquiry} onClose={closeInquiry} />}
    </div>
  );
}

function PricingCard({ name, price, features: items, popular, premium, testId, onSelect }: {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  testId: string;
  onSelect: (plan: string) => void;
}) {
  const planLabel = `${name.charAt(0)}${name.slice(1).toLowerCase()} plan (${price}/month)`;

  return (
    <article className={`price-card${popular ? ' popular' : ''}`} data-testid={`card-pricing-${testId}`}>
      {popular && <span className="popular-tag">Most Popular</span>}
      <span className="plan-name">{name}</span>
      <div className="plan-price">{price}<span>/month</span></div>
      <div className="plan-blurb">A dependable digital front desk for your team.</div>
      <ul className="plan-list">
        {items.map((item) => <li key={item}><Check size={14} />{item}</li>)}
      </ul>
      <button type="button" className={`button ${popular ? 'button-primary' : 'button-quiet'}`} onClick={() => onSelect(planLabel)} data-testid={`link-pricing-${testId}-get-started`}>
        {premium ? 'Book a Demo' : 'Get Started'} <ArrowUpRight size={14} />
      </button>
    </article>
  );
}

type SendState = 'idle' | 'sending' | 'sent' | 'error';

function InquiryModal({ plan, onClose }: { plan: string; onClose: () => void }) {
  const [state, setState] = useState<SendState>('idle');
  const firstField = useRef<HTMLInputElement>(null);
  const isDemo = plan === 'Demo request';

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('botcheck')) return; // honeypot: real people never fill this in
    const field = (key: string) => String(data.get(key) ?? '').trim();
    const details = {
      name: field('name'),
      email: field('email'),
      business: field('business'),
      phone: field('phone'),
      message: field('message') || '(no message)',
    };

    // Safety net: until the Web3Forms key is added, fall back to the visitor's email app.
    if (KEY_NOT_SET) {
      const body = `Name: ${details.name}\nEmail: ${details.email}\nPractice: ${details.business}\nPhone: ${details.phone}\n\n${details.message}`;
      window.location.href = `mailto:${BOOKINGS_EMAIL}?subject=${encodeURIComponent(`${plan} - ${details.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New AIBookNest lead: ${plan}${details.business ? ` - ${details.business}` : ''}`,
          from_name: 'AIBookNest Website',
          interest: plan,
          ...details,
          submitted_at: `${new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Karachi' })} (PKT)`,
          page: window.location.href,
        }),
      });
      const result = await response.json();
      setState(result.success ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} data-testid="modal-inquiry">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close form" data-testid="button-inquiry-close"><X size={18} /></button>

        {state === 'sent' ? (
          <div className="modal-success" data-testid="inquiry-success">
            <span className="modal-success-icon"><CircleCheck size={26} /></span>
            <h3 id="inquiry-title">Thanks, we've got your request.</h3>
            <p>We'll get back to you by email shortly.</p>
            <button type="button" className="button button-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <span className="modal-plan">{isDemo ? 'Demo request' : plan}</span>
            <h3 id="inquiry-title">{isDemo ? 'Book a demo' : 'Let’s get you started'}</h3>
            <p className="modal-intro">{isDemo
              ? 'Tell us a little about your practice and we’ll set up a quick walkthrough.'
              : 'Leave your details and we’ll be in touch to get you set up.'}</p>

            <form onSubmit={handleSubmit} className="modal-form">
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hp-field" aria-hidden="true" />
              <label>Your name
                <input ref={firstField} type="text" name="name" required autoComplete="name" data-testid="input-inquiry-name" />
              </label>
              <label>Work email
                <input type="email" name="email" required autoComplete="email" data-testid="input-inquiry-email" />
              </label>
              <div className="modal-row">
                <label>Practice / business name
                  <input type="text" name="business" autoComplete="organization" data-testid="input-inquiry-business" />
                </label>
                <label>Phone (optional)
                  <input type="tel" name="phone" autoComplete="tel" data-testid="input-inquiry-phone" />
                </label>
              </div>
              <label>Anything we should know?
                <textarea name="message" rows={3} data-testid="input-inquiry-message" />
              </label>

              {state === 'error' && (
                <p className="modal-error" role="alert">Something went wrong sending that. Please email us at <a href={`mailto:${BOOKINGS_EMAIL}`}>{BOOKINGS_EMAIL}</a> and we'll sort it out.</p>
              )}

              <button type="submit" className="button button-primary modal-submit" disabled={state === 'sending'} data-testid="button-inquiry-submit">
                {state === 'sending' ? 'Sending…' : 'Send request'} <ArrowUpRight size={14} />
              </button>
              {BOOKING_URL && (
                <p className="modal-alt">Prefer to pick a time yourself? <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Open the calendar</a></p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
