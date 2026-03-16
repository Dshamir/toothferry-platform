'use client';

import Link from 'next/link';
import { PortalBar } from '@/components/layout/PortalBar';
import { GlassCard } from '@/components/ui/GlassCard';
import { FadeSlideIn } from '@/components/animation/FadeSlideIn';
import { StaggerChildren, StaggerItem } from '@/components/animation/StaggerChildren';
import { EditablePortalPage } from '@/components/shared/EditablePortalPage';

const PORTALS = [
  { id: 'operator', label: 'Operator Console', desc: 'Real-time case routing & dispatch', icon: '⚡', color: 'var(--landing-accent)', path: '/operator', features: ['Case assignment', 'Queue management', 'Cross-portal dispatch'] },
  { id: 'admin', label: 'Admin Console', desc: 'System health & configuration', icon: '⚙️', color: '#58A6FF', path: '/admin', features: ['GPU monitoring', 'Feature flags', 'Compliance'] },
  { id: 'academic', label: 'Academic Portal', desc: 'University admin — all professors, students, and courses across the institution', icon: '🎓', color: '#185FA5', path: '/academic', features: ['Institutional KPIs', 'All professors & students', '124 students across 3 courses'] },
  { id: 'professor', label: 'Professor Portal', desc: 'Manage your courses, evaluate student preps, and track class performance', icon: '👨\u200D🏫', color: '#6750D6', path: '/academic/professor', features: ['5-axis evaluation scoring', 'Student review queue', 'Assistant management'] },
  { id: 'assistant', label: 'Assistant Portal', desc: 'Grade assigned students and submit evaluations for professor approval', icon: '📝', color: '#0F6E56', path: '/academic/assistant', features: ['Scoped student list', 'Submit for review', 'Reports to professor'] },
  { id: 'student', label: 'Student Portal', desc: 'Submit scans, view your scores, read feedback, and track module progress', icon: '🧑\u200D🎓', color: '#C2185B', path: '/academic/student', features: ['Scan submission', 'Feedback inbox', 'Transcript & grades'] },
  { id: 'dentist', label: 'Dentist Portal', desc: 'Crown generation & case management', icon: '🦷', color: 'var(--landing-accent)', path: '/dentist', features: ['5-step crown wizard', 'AI pipeline tracking', 'Prep evaluation'] },
  { id: 'lab', label: 'Lab Portal', desc: 'Order queue & milling operations', icon: '🏭', color: '#EF9F27', path: '/lab', features: ['STL review', 'Milling queue', 'Material inventory'] },
  { id: 'command', label: 'Command Center', desc: 'Live ops & business intelligence', icon: '📡', color: '#3FB950', path: '/command', features: ['Live event feed', 'GTM tracking', 'Revenue analytics'] },
];

const PIPELINE = [
  { n: 1, title: 'Ingest scan', desc: 'STL/OBJ/PLY. 3Shape, iTero, Medit.' },
  { n: 2, title: 'Segment arch', desc: 'MeshSegNet 18-channel deep learning.' },
  { n: 3, title: 'Detect margin', desc: '5-fold ensemble. 70.7μm accuracy.' },
  { n: 4, title: 'Generate crown', desc: 'Personalized 3D reconstruction.' },
  { n: 5, title: 'QC validate', desc: 'Margin gap + occlusion check.' },
  { n: 6, title: 'Export STL', desc: 'Milling-ready file output.' },
];

const STATS = [
  { value: '23M', label: 'Crowns placed yearly, N. America' },
  { value: '<2min', label: 'Crown design time' },
  { value: '$25', label: 'Per design token' },
  { value: '70.7μm', label: 'Mean margin accuracy' },
  { value: '94%', label: 'Avg. AI confidence' },
];

const FOUNDERS = [
  { name: 'Haim Keren', role: 'CEO & Co-Founder', initials: 'HK', bio: 'Prosthodontist & McGill professor. 30+ years of crown design expertise encoded into AI.' },
  { name: 'Julia Keren', role: 'COO & Co-Founder', initials: 'JK', bio: 'Operations architect. Scaled dental technology platforms across Canada and internationally.' },
  { name: 'Dr. Nathaniel Lasry', role: 'CSO & Co-Founder', initials: 'NL', bio: 'Physics professor at John Abbott College. AI/ML research lead and scientific advisor.' },
];

export default function LandingPage() {
  return (
    <EditablePortalPage slug="landing">
    <>
      <PortalBar />
      <div className="min-h-screen" style={{ background: 'var(--landing-bg)', paddingTop: 38 }}>

        {/* ── Nav ── */}
        <nav
          className="sticky top-[38px] z-[100] backdrop-blur-[12px] flex items-center justify-between px-6 md:px-12 h-[60px]"
          style={{ background: 'var(--landing-nav-bg)', borderBottom: '1px solid var(--landing-nav-border)' }}
        >
          <div className="flex items-center gap-[9px]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z" fill="var(--landing-accent)" opacity="0.9"/>
              <path d="M12 7C10.2 7 9 8.4 9 10.25C9 12 9.9 12.85 10.15 14H13.85C14.1 12.85 15 12 15 10.25C15 8.4 13.8 7 12 7Z" fill="white" opacity=".95"/>
              <path d="M10.15 14H13.85V15.4C13.85 15.55 13.75 15.65 13.6 15.65H10.4C10.25 15.65 10.15 15.55 10.15 15.4V14Z" fill="white" opacity=".6"/>
            </svg>
            <span className="text-[16px] font-extrabold tracking-[0.01em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>ToothFerry</span>
          </div>
          <div className="hidden md:flex gap-6">
            {['Platform', 'For Labs', 'For Dentists', 'Academic', 'Pricing'].map((l) => (
              <span key={l} className="text-[12px] cursor-pointer hover:text-white transition-colors" style={{ color: 'var(--landing-body)' }}>{l}</span>
            ))}
          </div>
          <div className="flex gap-[9px]">
            <button
              className="px-4 py-[7px] rounded-[var(--btn-radius-std,7px)] text-[12px] font-medium bg-transparent cursor-pointer hover:text-white transition-all"
              style={{ border: '1px solid var(--landing-ghost-border)', color: 'var(--landing-ghost-text)' }}
            >
              Sign in
            </button>
            <Link
              href="/dentist"
              className="px-4 py-[7px] rounded-[var(--btn-radius-std,7px)] text-[12px] font-medium text-white no-underline transition-all"
              style={{ background: 'var(--landing-accent)' }}
            >
              Get started →
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="px-6 md:px-12 py-[90px] text-center relative overflow-hidden">
          {/* Gradient mesh */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 900px 500px at 50% 0%, var(--landing-gradient-from) 0%, transparent 70%)` }}
          />

          <FadeSlideIn>
            <div
              className="relative inline-flex items-center gap-[6px] rounded-[20px] px-[14px] py-[4px] text-[11px] mb-6"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--landing-accent-glow)',
                border: '1px solid var(--landing-accent-border)',
                color: 'var(--landing-accent-light)',
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: 'var(--landing-accent-light)' }} />
              $3.8M non-dilutive funding · NVIDIA Inception · MEDTEQ+ Innovator of the Year
            </div>
          </FadeSlideIn>

          <FadeSlideIn delay={0.1}>
            <h1
              className="relative text-[clamp(38px,5.5vw,68px)] font-extrabold leading-[1.05] mb-[18px] max-w-[780px] mx-auto"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}
            >
              AI-generated dental crowns<br/>
              in <em style={{ color: 'var(--landing-accent-light)', fontStyle: 'italic' }}>under two minutes.</em><br/>
              From scan to STL.
            </h1>
          </FadeSlideIn>

          <FadeSlideIn delay={0.2}>
            <p className="relative text-[16px] max-w-[520px] mx-auto mb-9 leading-[1.75]" style={{ color: 'var(--landing-body)' }}>
              ToothFerry encodes 30 years of master craftsmanship into software — automatic arch segmentation, margin detection, occlusal reconstruction, and personalized 3D crown generation.
            </p>
          </FadeSlideIn>

          <FadeSlideIn delay={0.3}>
            <div className="relative flex gap-[10px] justify-center flex-wrap mb-14">
              <Link
                href="/dentist"
                className="px-[22px] py-[9px] rounded-[var(--btn-radius-std,7px)] text-[12px] font-semibold text-white no-underline transition-all"
                style={{ background: 'var(--landing-accent)' }}
              >
                Start free trial →
              </Link>
              <Link
                href="/lab"
                className="px-[16px] py-[9px] rounded-[var(--btn-radius-std,7px)] text-[12px] font-medium bg-transparent no-underline hover:text-white transition-all"
                style={{ border: '1px solid var(--landing-ghost-border)', color: 'var(--landing-ghost-text)' }}
              >
                I manage a lab
              </Link>
              <Link
                href="/academic"
                className="px-[16px] py-[9px] rounded-[var(--btn-radius-std,7px)] text-[12px] font-medium bg-transparent no-underline hover:text-white transition-all"
                style={{ border: '1px solid var(--landing-ghost-border)', color: 'var(--landing-ghost-text)' }}
              >
                Academic access
              </Link>
            </div>
          </FadeSlideIn>

          <div className="relative flex justify-center gap-8 md:gap-12 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[30px] font-extrabold" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>{s.value}</div>
                <div className="text-[11px] mt-[2px]" style={{ color: 'var(--landing-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section
          className="py-[72px] px-6 md:px-12"
          style={{
            background: 'var(--landing-section-bg)',
            borderTop: '1px solid var(--landing-faint)',
            borderBottom: '1px solid var(--landing-faint)',
          }}
        >
          <div className="text-center text-[10px] tracking-[0.14em] uppercase mb-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-subtle)' }}>How it works</div>
          <div className="text-center text-[34px] font-extrabold mb-[6px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>Six automated steps. One token.</div>
          <div className="text-center text-[13px] mb-11" style={{ color: 'var(--landing-muted)' }}>From raw intraoral scan to milling-ready STL file.</div>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1000px] mx-auto">
            {PIPELINE.map((step) => (
              <StaggerItem key={step.n}>
                <div className="text-center">
                  <div
                    className="w-9 h-9 rounded-full text-[14px] font-bold flex items-center justify-center mx-auto mb-3"
                    style={{ fontFamily: 'var(--font-mono)', border: '1px solid var(--landing-step-border)', color: 'var(--landing-accent-light)' }}
                  >
                    {step.n}
                  </div>
                  <h4 className="text-[13px] font-bold mb-[5px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>{step.title}</h4>
                  <p className="text-[11px] leading-[1.6]" style={{ color: 'var(--landing-muted)' }}>{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </section>

        {/* ── Portal Cards ── */}
        <section className="px-6 md:px-12 py-[72px]">
          <div className="text-center text-[10px] tracking-[0.14em] uppercase mb-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-subtle)' }}>Platform</div>
          <div className="text-center text-[34px] font-extrabold mb-[6px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>Seven portals. One platform.</div>
          <div className="text-center text-[13px] mb-11" style={{ color: 'var(--landing-muted)' }}>Every stakeholder — from university admin to student — gets a purpose-built experience.</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px] max-w-[1100px] mx-auto">
            {PORTALS.map((portal) => (
              <Link key={portal.id} href={portal.path} className="no-underline">
                <div
                  className="relative overflow-hidden rounded-[16px] p-6 cursor-pointer hover:-translate-y-[2px] transition-transform h-full backdrop-blur-[16px]"
                  style={{
                    background: 'var(--landing-card-bg)',
                    border: '1px solid var(--landing-card-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-[9px] flex items-center justify-center mb-[14px] text-[18px]" style={{ background: 'var(--landing-accent-glow)' }}>
                    {portal.icon}
                  </div>
                  <div className="text-[9px] tracking-[0.08em] mb-[6px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-accent-light)' }}>{portal.id.toUpperCase()}</div>
                  <div className="text-[15px] font-bold mb-[6px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>{portal.label}</div>
                  <div className="text-[12px] leading-[1.6] mb-4" style={{ color: 'var(--landing-body)' }}>{portal.desc}</div>
                  <div className="flex flex-col gap-[5px] mb-4">
                    {portal.features.map((f) => (
                      <div key={f} className="text-[11px] flex items-start gap-[7px]" style={{ color: 'var(--landing-body)' }}>
                        <span className="w-1 h-1 rounded-full mt-[5px] flex-shrink-0" style={{ background: 'var(--landing-feature-dot)' }} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div
                    className="w-full py-2 text-[12px] font-semibold text-center transition-all"
                    style={{
                      background: 'var(--landing-accent-glow)',
                      border: '1px solid var(--landing-accent-border)',
                      color: 'var(--landing-accent-light)',
                      borderRadius: 'var(--btn-radius-std, 7px)',
                    }}
                  >
                    Open portal →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Founders ── */}
        <section className="px-6 md:px-12 py-[72px]">
          <div className="text-center text-[10px] tracking-[0.14em] uppercase mb-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-subtle)' }}>Team</div>
          <div className="text-center text-[34px] font-extrabold mb-11" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>Founded by clinicians & scientists</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[900px] mx-auto">
            {FOUNDERS.map((f) => (
              <div
                key={f.name}
                className="relative overflow-hidden rounded-[16px] p-6 backdrop-blur-[16px]"
                style={{ background: 'var(--landing-card-bg)', border: '1px solid var(--landing-card-border)' }}
              >
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[18px] font-extrabold text-white mb-[14px]"
                  style={{ background: 'var(--landing-accent)', fontFamily: 'var(--font-display)' }}
                >
                  {f.initials}
                </div>
                <div className="text-[15px] font-bold mb-[2px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>{f.name}</div>
                <div className="text-[11px] mb-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-accent-light)' }}>{f.role}</div>
                <div className="text-[11px] leading-[1.65]" style={{ color: 'var(--landing-body)' }}>{f.bio}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <div
          className="py-7 px-6 md:px-12 flex items-center justify-center gap-9 flex-wrap"
          style={{ borderTop: '1px solid var(--landing-faint)', background: 'var(--landing-section-bg)' }}
        >
          {['FDA Class II', 'HIPAA Compliant', 'NVIDIA Inception', '$3.8M Funded', '3 Universities'].map((item) => (
            <span key={item} className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-body)' }}>{item}</span>
          ))}
        </div>

        {/* ── Watch Demo CTA ── */}
        <section className="px-6 md:px-12 py-16 text-center">
          <h2 className="text-[30px] font-extrabold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-heading)' }}>See it in action</h2>
          <p className="mb-8" style={{ color: 'var(--landing-muted)' }}>Watch a crown go from scan to STL across all 7 portals.</p>
          <Link
            href="/demo"
            className="inline-flex px-8 py-3 rounded-full text-white text-[14px] font-semibold no-underline transition-all"
            style={{ background: 'var(--landing-accent)' }}
          >
            Watch Demo →
          </Link>
        </section>

        {/* ── Footer ── */}
        <footer
          className="py-8 px-6 md:px-12 flex items-center justify-between flex-wrap gap-[10px]"
          style={{ borderTop: '1px solid var(--landing-faint)' }}
        >
          <p className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-subtle)' }}>© 2026 IntelliDent Inc. / ToothFerry AI — Montreal, Canada</p>
          <div className="flex gap-[18px]">
            {['Privacy', 'Terms', 'Contact'].map((l) => (
              <span key={l} className="text-[11px] cursor-pointer hover:text-white/60" style={{ fontFamily: 'var(--font-mono)', color: 'var(--landing-subtle)' }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
    </EditablePortalPage>
  );
}
