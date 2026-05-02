import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";

import speakerBuh from "@/assets/speaker-buh.jpg";
import speakerEkundayo from "@/assets/speaker-ekundayo.jpg";
import speakerOlarewaju from "@/assets/speaker-olarewaju.jpg";
import speakerAdubiOlajide from "@/assets/speaker-adubi-olajide.jpg";
import logoGlyph from "@/assets/logo-glyph.png";

/* ------------------------------------------------------------------ */
/* Event constants                                                     */
/* ------------------------------------------------------------------ */

const EVENT_NAME = "TECH NETWORK";
const EVENT_TAGLINE = "The Future of Tech Starts Here";
const EVENT_DATE_LABEL = "October 19, 2026";
const EVENT_TIME_LABEL = "9:00 AM – Late";
const EVENT_LOCATION = "Ikorodu, Lagos";
const CONTACT_EMAIL = "adubiadebukola788@gmail.com";
const CONTACT_PHONE_DISPLAY = "+234 806 081 0552";
const CONTACT_PHONE_TEL = "+2348060810552";
const WHATSAPP_NUMBER = "2348060810552"; // international format, no +
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd like to know more about Tech Network."
)}`;
// Target date for countdown (Oct 19, 2026 09:00 WAT / +01:00)
const EVENT_TARGET = new Date("2026-10-19T09:00:00+01:00").getTime();

const NAV_LINKS = [
  { href: "#speakers", label: "Speakers" },
  { href: "#schedule", label: "Schedule" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

const SPEAKERS = [
  { name: "Adubi Adebukola", role: "Web Developer · Social Media Manager · CEO, Bee's Collection", img: speakerBuh, tag: "Host" },
  { name: "Ekundayo Victor", role: "AI Automation · Social Media Manager · CEO, VC Media", img: speakerEkundayo },
  { name: "Olarewaju Michael", role: "Software Developer", img: speakerOlarewaju },
  { name: "Adubi Olajide", role: "Video Editor · CEO, Rampage Crew", img: speakerAdubiOlajide },
];

const SCHEDULE = [
  { time: "09:00", title: "Doors & Networking Brunch", desc: "Coffee, croissants, and cold introductions that turn warm." },
  { time: "10:00", title: "Opening Keynote — Why AI Is the Unfair Advantage of This Decade", desc: "Adubi Adebukola opens the day with the mindset shift every builder, marketer, and founder needs to actually win with AI." },
  { time: "11:15", title: "AI Automation That Runs Your Business While You Sleep", desc: "Ekundayo Victor breaks down real automation stacks for content, DMs, and operations — and how VC Media uses them to scale social media without burning out." },
  { time: "12:30", title: "Founder Lunch + Lightning Demos", desc: "Six builders, six minutes each. Show the AI workflow, skip the slides." },
  { time: "14:00", title: "Shipping AI-Native Software, Faster", desc: "Olarewaju Michael on how developers should actually use AI tools — from prompt-driven coding to building production features in a fraction of the time." },
  { time: "15:30", title: "AI for Video Editors & Creative Teams", desc: "Adubi Olajide (CEO, Rampage Crew) shows how to cut editing time in half using AI for cuts, captions, b-roll, and post-production workflows." },
  { time: "16:45", title: "Panel — Using AI Tools The Right Way", desc: "All four speakers, one stage. Honest takes on what's hype, what's worth your time, and the prompts/tools they actually use every day." },
  { time: "18:00", title: "Afterparty — Neon Garden", desc: "Live set, open bar, and the conversations the talks couldn't fit." },
];

const SPONSORS = [
  "STRIPE", "VERCEL", "OPENAI", "FIGMA", "LINEAR", "SUPABASE", "ANTHROPIC", "RAYCAST",
];

const FAQ = [
  {
    q: "Where exactly in Ikorodu is the venue?",
    a: "We'll send the precise address and a venue map to your inbox 7 days before the event. Expect a purpose-built tech campus 25 minutes from Lekki by ferry.",
  },
  {
    q: "Is the ticket really free?",
    a: "Yes — Tech Network is free for builders. We cap attendance at 600 to keep the room signal-dense, so register early.",
  },
  {
    q: "Will talks be recorded?",
    a: "Keynotes and panels yes, posted within 14 days. Workshops and the founder lunch are off-record by design.",
  },
  {
    q: "I'd like to sponsor or speak. Who do I contact?",
    a: "Email partnerships@technetwork.dev with a one-paragraph pitch. We respond within 48 hours.",
  },
  {
    q: "What should I bring?",
    a: "A laptop if you want to join the LLM workshop, business cards if you're old-school, and curiosity in industrial quantities.",
  },
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

/* ------------------------------------------------------------------ */
/* Bits                                                                */
/* ------------------------------------------------------------------ */

function Wordmark() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5 font-tech font-bold">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent ring-1 ring-primary/20 shadow-[inset_0_1px_0_hsl(var(--primary)/0.25),0_8px_24px_-8px_hsl(var(--primary)/0.55)] transition-all duration-500 group-hover:ring-primary/40 group-hover:shadow-[inset_0_1px_0_hsl(var(--primary)/0.35),0_10px_28px_-6px_hsl(var(--primary)/0.65)]">
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.35),transparent_60%)] opacity-70" />
        <img
          src={logoGlyph}
          alt=""
          className="relative h-6 w-6 object-contain drop-shadow-[0_0_10px_hsl(var(--primary)/0.7)] transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="text-sm font-semibold tracking-[0.24em] bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
        TECH<span className="text-primary">.</span>NETWORK
      </span>
    </Link>
  );
}

function CountdownCell({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="glass flex min-w-[68px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[88px] sm:px-5 sm:py-4">
      <span className="font-tech text-3xl font-bold tabular-nums text-foreground sm:text-5xl">
        {display}
      </span>
      <span className="mt-1 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-tech text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
          <a href="#register">Register</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_TARGET);
  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* layered glow background */}
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="absolute inset-0 -z-10 grid-bg" />
      <motion.div
        style={{ y: yGlow }}
        className="absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-neon-pulse"
      />
      <motion.div
        style={{ y: yGlow }}
        className="absolute right-[-120px] top-[10%] -z-10 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl animate-float-slow"
      />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 font-mono-tech text-[11px] uppercase tracking-[0.24em] text-primary backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Edition 01 · Lagos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-tech text-6xl font-bold leading-[0.92] tracking-[-0.04em] sm:text-7xl md:text-[8.5rem]"
        >
          <span className="block text-shimmer">{EVENT_NAME}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          {EVENT_TAGLINE}. One day in Lagos with the engineers, founders, and researchers
          shaping what comes next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 font-mono-tech text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" /> {EVENT_DATE_LABEL}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {EVENT_LOCATION}
          </span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <CountdownCell value={days} label="Days" />
          <CountdownCell value={hours} label="Hours" />
          <CountdownCell value={minutes} label="Minutes" />
          <CountdownCell value={seconds} label="Seconds" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group h-12 bg-gradient-to-r from-primary to-accent px-7 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.45)] hover:opacity-95"
          >
            <a href="#register">
              Register Now
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 border-border/60 bg-transparent px-7 text-foreground hover:bg-card">
            <a href="#schedule">View Schedule</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-tech text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Speakers"
          title="Meet the Speakers"
          subtitle="A handpicked lineup of operators and builders shipping with AI every day."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
          {SPEAKERS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl bg-card shadow-[0_4px_20px_-8px_hsl(240_30%_14%/0.12)] ring-1 ring-border/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_hsl(var(--primary)/0.35),0_0_0_1px_hsl(var(--primary)/0.25)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={768}
                  height={896}
                  className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/85 via-40% to-transparent to-65%" />
              </div>
              {s.tag && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/50 ring-1 ring-white/20">
                  {s.tag}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-tech text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground sm:text-[13px]">
                  {s.role}
                </p>
                <span className="mt-3 block h-px w-8 origin-left scale-x-0 bg-gradient-to-r from-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary/0 transition-all duration-500 group-hover:ring-primary/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Schedule"
          title="One day. Zero filler."
          subtitle="Doors open at 09:00. Last call after midnight."
        />
        <div className="relative mt-14">
          {/* timeline rail */}
          <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 sm:left-[140px]" />

          <ol className="space-y-6">
            {SCHEDULE.map((item, i) => (
              <motion.li
                key={item.time}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="relative flex gap-4 sm:gap-8"
              >
                <div className="hidden w-[124px] flex-shrink-0 pt-1 text-right sm:block">
                  <span className="font-mono-tech text-sm tracking-wider text-primary">{item.time}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-0 top-2 grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-card glow-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                </div>
                <div className="flex-1 rounded-2xl border border-border/60 bg-card/50 p-5 pl-12 sm:pl-6 transition-colors hover:border-primary/30">
                  <div className="flex items-baseline gap-3 sm:hidden">
                    <span className="font-mono-tech text-sm text-primary">{item.time}</span>
                  </div>
                  <h3 className="font-tech text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="register" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

          <div className="relative">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-primary">Register</p>
            <h2 className="mt-3 font-tech text-3xl font-bold tracking-tight sm:text-4xl">
              Claim your seat.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Free for builders. 600 seats only. We'll email your ticket and venue
              details before the event.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  You're on the list, {name.split(" ")[0]}. Check your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <Input
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-full border-border/60 bg-background/40 px-5 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />
                <Input
                  required
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full border-border/60 bg-background/40 px-5 placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 bg-gradient-to-r from-primary to-accent px-6 text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.45)] hover:opacity-95"
                >
                  Get Ticket
                  <ArrowRight />
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section id="sponsors" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Sponsors" title="Backed by the best." />
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4">
          {SPONSORS.map((name) => (
            <div
              key={name}
              className="group flex items-center justify-center bg-card/60 px-6 py-10 transition-all hover:bg-card"
            >
              <span className="font-tech text-lg font-bold tracking-[0.18em] text-muted-foreground transition-all group-hover:text-foreground group-hover:[text-shadow:0_0_18px_hsl(var(--primary)/0.55)]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border/60 last:border-b-0"
              >
                <AccordionTrigger className="text-left font-tech text-base font-semibold hover:no-underline data-[state=open]:text-primary sm:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-card/20 to-card/50 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {EVENT_TAGLINE}. {EVENT_DATE_LABEL} · {EVENT_LOCATION}.
          </p>
        </div>

        <div>
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-primary">
            Get in touch
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-primary" /> {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" /> {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/60 hover:shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
            >
              <MessageCircle className="h-3.5 w-3.5 text-primary" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="md:text-right">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-primary">
            Follow
          </p>
          <div className="mt-4 flex items-center gap-2 md:justify-end">
            {[
              { Icon: Twitter, href: "#" },
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_18px_hsl(var(--primary)/0.4)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-2 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tech Network. All rights reserved.</p>
          <p className="font-mono-tech tracking-[0.18em] uppercase">v 1.0 · Lagos Edition</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <div className="dark min-h-screen bg-background text-foreground antialiased">
      <StickyNav />
      <main>
        <Hero />
        <Speakers />
        <Schedule />
        <Register />
        <Sponsors />
        <FAQSection />
      </main>
      <Footer />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.55)] transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}