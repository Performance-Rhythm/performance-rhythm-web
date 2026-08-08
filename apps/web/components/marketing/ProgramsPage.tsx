'use client';

import { PROGRAMS_CONTENT } from '@/content/programs';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

export default function ProgramsPage() {
  const {
    hero,
    openingContext,
    workshopProgram,
    leadershipProgram,
    corporateProgram,
    platformProgram,
    foundingPartnerProgram,
    comparisonSection,
    faqSection,
    finalCta
  } = PROGRAMS_CONTENT;

  return (
    <main className="bg-white">
      {/* IMMERSIVE HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAF8] via-white to-[#FAFAF8]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #D97742 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 max-w-6xl text-center space-y-8">
          <p className="text-sm lg:text-base font-bold tracking-widest text-[#D97742] uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-[#D97742] via-[#E5A464] to-[#5E8AA8] bg-clip-text text-transparent">
            {hero.headline}
          </h1>

          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            {hero.intro}
          </p>

          <div className="pt-8">
            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* OPENING CONTEXT */}
      <section className="py-24 bg-white border-t border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent text-center leading-tight">
              {openingContext.headline}
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {openingContext.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#0B1D2A]">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM 1: WORKSHOPS */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                  {workshopProgram.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {workshopProgram.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <div className="px-4 py-2 bg-white rounded-full border border-[#A7BBC6] border-opacity-30">
                  {workshopProgram.duration}
                </div>
                <div className="px-4 py-2 bg-white rounded-full border border-[#A7BBC6] border-opacity-30">
                  {workshopProgram.audience}
                </div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {workshopProgram.overview}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {workshopProgram.sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 border-t border-[#A7BBC6] border-opacity-20 pt-8">
              <div>
                <p className="text-sm font-bold text-[#D97742] uppercase tracking-wide mb-2">Format</p>
                <p className="text-lg text-gray-700">{workshopProgram.format}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide mb-2">Investment</p>
                <p className="text-lg text-gray-700">{workshopProgram.investment}</p>
              </div>
            </div>

            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="w-full bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
            >
              {workshopProgram.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* PROGRAM 2: LEADERSHIP */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold tracking-widest text-[#5E8AA8] uppercase">
                  {leadershipProgram.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {leadershipProgram.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <div className="px-4 py-2 bg-[#FAFAF8] rounded-full border border-[#A7BBC6] border-opacity-30">
                  {leadershipProgram.duration}
                </div>
                <div className="px-4 py-2 bg-[#FAFAF8] rounded-full border border-[#A7BBC6] border-opacity-30">
                  {leadershipProgram.audience}
                </div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {leadershipProgram.overview}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {leadershipProgram.sections.map((section, idx) => (
                <div key={idx} className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <span className="text-[#5E8AA8] font-bold flex-shrink-0">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 border-t border-[#A7BBC6] border-opacity-20 pt-8">
              <div>
                <p className="text-sm font-bold text-[#D97742] uppercase tracking-wide mb-2">Format</p>
                <p className="text-lg text-gray-700">{leadershipProgram.format}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide mb-2">Investment</p>
                <p className="text-lg text-gray-700">{leadershipProgram.investment}</p>
              </div>
            </div>

            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="w-full bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
            >
              {leadershipProgram.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* PROGRAM 3: CORPORATE */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                  {corporateProgram.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {corporateProgram.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <div className="px-4 py-2 bg-white rounded-full border border-[#A7BBC6] border-opacity-30">
                  {corporateProgram.duration}
                </div>
                <div className="px-4 py-2 bg-white rounded-full border border-[#A7BBC6] border-opacity-30">
                  {corporateProgram.audience}
                </div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {corporateProgram.overview}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {corporateProgram.sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 border-t border-[#A7BBC6] border-opacity-20 pt-8">
              <div>
                <p className="text-sm font-bold text-[#D97742] uppercase tracking-wide mb-2">Format</p>
                <p className="text-lg text-gray-700">{corporateProgram.format}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide mb-2">Investment</p>
                <p className="text-lg text-gray-700">{corporateProgram.investment}</p>
              </div>
            </div>

            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="w-full bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
            >
              {corporateProgram.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* PLATFORM PREVIEW SECTION */}
      <section className="py-24 bg-[#FAFAF8] border-t border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
            {/* Left: Headline & Description */}
            <div className="space-y-6">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                Future Platform Preview
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D2A] leading-tight">
                Built For Continuous Reinforcement
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Performance Rhythm is being designed as a consulting plus platform: high-trust human development experiences supported by digital infrastructure that helps organizations reinforce learning over time.
              </p>
              <div className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-6">
                <p className="text-sm font-bold text-gray-700">
                  Conceptual preview only. Phase 1 does not include login, dashboards, assignments, progress tracking, or platform functionality.
                </p>
              </div>
            </div>

            {/* Right: Two Scrollable App Previews */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Manager Insights Preview */}
              <div className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Manager Insights</h3>
                </div>
                <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                  {/* Team Header */}
                  <div>
                    <p className="text-sm font-bold text-[#5E8AA8] mb-4">Team: Customer Success Team</p>
                  </div>

                  {/* Metric 1: Team Participation */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-[#0B1D2A]">Team Participation</p>
                      <p className="text-lg font-bold text-[#0B1D2A]">76%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#5E8AA8] h-2 rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>

                  {/* Metric 2: Content Completion */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-[#0B1D2A]">Content Completion</p>
                      <p className="text-lg font-bold text-[#0B1D2A]">62%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#D97742] h-2 rounded-full" style={{width: '62%'}}></div>
                    </div>
                  </div>

                  {/* Assigned Path */}
                  <div className="bg-[#FAFAF8] rounded-lg p-4 space-y-3">
                    <p className="text-xs font-bold text-[#5E8AA8] uppercase">Assigned Path</p>
                    <p className="text-lg font-bold text-[#0B1D2A]">Leadership Resilience</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#5E8AA8] h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="bg-[#ECE7DF] rounded-lg p-4 border border-[#A7BBC6] border-opacity-30">
                    <p className="text-xs font-bold leading-relaxed text-[#0B1D2A]">
                      Designed for aggregate visibility, not invasive individual monitoring.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Dashboard Preview */}
              <div className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Company Dashboard</h3>
                </div>
                <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                  {/* Top Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center space-y-1">
                      <p className="text-3xl font-bold text-[#0B1D2A]">84</p>
                      <p className="text-xs font-bold uppercase text-[#5E8AA8] tracking-wide">Active Members</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-3xl font-bold text-[#0B1D2A]">71%</p>
                      <p className="text-xs font-bold uppercase text-[#D97742] tracking-wide">Content Engagement</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-3xl font-bold text-[#0B1D2A]">3</p>
                      <p className="text-xs font-bold uppercase text-[#5E8AA8] tracking-wide">Active Programs</p>
                    </div>
                  </div>

                  {/* Current Focus Box */}
                  <div className="bg-[#0B1D2A] rounded-lg p-6 text-white space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D97742]">Current Focus</p>
                    <h4 className="text-2xl font-bold leading-tight">Sustainable Performance Foundations</h4>
                  </div>

                  {/* Active Programs List */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase text-[#0B1D2A] tracking-wide">Active Programs</p>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5E8AA8] mt-2"></div>
                      <div>
                        <p className="font-bold text-[#0B1D2A]">Leadership Resilience Path</p>
                        <p className="text-xs text-gray-600 font-bold">01</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5E8AA8] mt-2"></div>
                      <div>
                        <p className="font-bold text-[#0B1D2A]">Customer Success Team</p>
                        <p className="text-xs text-gray-600 font-bold">02</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5E8AA8] mt-2"></div>
                      <div>
                        <p className="font-bold text-[#0B1D2A]">Organization Signals</p>
                        <p className="text-xs text-gray-600 font-bold">03</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM 4: PLATFORM */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold tracking-widest text-[#5E8AA8] uppercase">
                  {platformProgram.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {platformProgram.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <div className="px-4 py-2 bg-[#FAFAF8] rounded-full border border-[#A7BBC6] border-opacity-30">
                  {platformProgram.duration}
                </div>
                <div className="px-4 py-2 bg-[#FAFAF8] rounded-full border border-[#A7BBC6] border-opacity-30">
                  {platformProgram.audience}
                </div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {platformProgram.overview}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {platformProgram.sections.map((section, idx) => (
                <div key={idx} className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <span className="text-[#5E8AA8] font-bold flex-shrink-0">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 border-t border-[#A7BBC6] border-opacity-20 pt-8">
              <div>
                <p className="text-sm font-bold text-[#D97742] uppercase tracking-wide mb-2">Format</p>
                <p className="text-lg text-gray-700">{platformProgram.format}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide mb-2">Investment</p>
                <p className="text-lg text-gray-700">{platformProgram.investment}</p>
              </div>
            </div>

            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="w-full bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
            >
              {platformProgram.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* FOUNDING PARTNER PROGRAM */}
      <section className="py-24 bg-gradient-to-r from-[#D97742] to-[#5E8AA8]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                {foundingPartnerProgram.headline}
              </h2>
              <p className="text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto">
                {foundingPartnerProgram.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {foundingPartnerProgram.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-8 text-left border border-white border-opacity-20">
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white text-opacity-90">{benefit.description}</p>
                </div>
              ))}
            </div>

            <Button 
              href={routes.bookFoundingPartner}
              size="lg"
              className="bg-white hover:bg-[#ECE7DF] text-[#D97742] font-bold shadow-lg"
            >
              {foundingPartnerProgram.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* COMPARISON & DECISION FRAMEWORK */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                {comparisonSection.headline}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                {comparisonSection.intro}
              </p>
            </div>

            <div className="space-y-6">
              {comparisonSection.scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <p className="text-sm font-bold text-[#D97742] uppercase tracking-wide mb-2">Your Situation</p>
                      <p className="text-lg font-bold text-[#0B1D2A]">{scenario.situation}</p>
                    </div>
                    <div className="lg:col-span-1">
                      <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide mb-2">Recommendation</p>
                      <p className="text-lg font-bold text-[#0B1D2A]">{scenario.recommendation}</p>
                    </div>
                    <div className="lg:col-span-1">
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Why</p>
                      <p className="text-gray-700 leading-relaxed">{scenario.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent text-center leading-tight">
              {faqSection.headline}
            </h2>

            <div className="space-y-6">
              {faqSection.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-4">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
              {finalCta.headline}
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {finalCta.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                href={routes.bookDiscovery}
                size="lg"
                className="bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
              >
                {finalCta.primaryCta}
              </Button>
              <Button 
                href={routes.bookFoundingPartner}
                size="lg"
                className="bg-[#5E8AA8] hover:bg-[#D97742] text-white font-bold"
              >
                {finalCta.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
