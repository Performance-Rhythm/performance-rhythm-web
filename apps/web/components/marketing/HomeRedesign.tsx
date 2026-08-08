'use client';

import Image from 'next/image';
import { HOMEPAGE_CONTENT } from '@/content/homepage';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

export default function HomeRedesign() {
  const {
    opening,
    hero,
    recognition,
    biology,
    shift,
    method,
    offer,
    engagement,
    outcomes,
    founder,
    finalCta
  } = HOMEPAGE_CONTENT;

  return (
    <main className="bg-white">
      {/* A. OPENING SECTION - Internal Balance. External Performance. */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/brand/logo-performance-signal.png"
                alt="Performance Rhythm Signal"
                width={300}
                height={300}
                priority
                className="w-full max-w-xs lg:max-w-sm"
              />
            </div>

            {/* Text */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-wide bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {opening.headline}
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                {opening.blurb}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B. HERO SECTION - Ancient Biology. Modern Workplace. */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-[#FAFAF8] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Subtle rhythm line pattern */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="rhythm" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="#5E8AA8" strokeWidth="1" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rhythm)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            {/* Gradient Eyebrow - Split into 2 lines */}
            <div className="space-y-2">
              <h3 className="text-2xl lg:text-4xl font-bold tracking-widest bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {hero.eyebrow1}
              </h3>
              <h3 className="text-2xl lg:text-4xl font-bold tracking-widest bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {hero.eyebrow2}
              </h3>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-[#0B1D2A]">
              {hero.headline}
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              {hero.body}
            </p>

            {/* Dual Gradient Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                href={routes.bookDiscovery} 
                size="lg" 
                className="bg-[#D97742] hover:bg-[#c86a37] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                {hero.cta}
              </Button>
              <Button 
                href={routes.method}
                size="lg" 
                className="bg-[#5E8AA8] hover:bg-[#4a7089] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 lg:h-full">
            <Image
              src={`/images/${hero.image}`}
              alt={hero.imageAlt}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* C. RECOGNITION SECTION */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative h-96 lg:h-full">
              <Image
                src={`/images/${recognition.image}`}
                alt={recognition.imageAlt}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                  {recognition.eyebrow}
                </h2>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1D2A] leading-relaxed">
                  {recognition.headline}
                </h3>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {recognition.body}
              </p>

              {/* Four Outcome Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recognition.outcomes.map((outcome, idx) => (
                  <div key={idx} className="space-y-2 p-4 bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-30">
                    <h3 className="font-bold text-[#0B1D2A] text-lg">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. THE BIOLOGY EXPLANATION */}
      <section className="py-20 lg:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                {biology.headline}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {biology.body}
              </p>

              {/* Brain Education Section */}
              <div className="p-6 bg-white rounded-lg border-l-4 border-[#D97742] space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {biology.brainEducation}
                </p>
                <p className="text-xs text-gray-600 italic border-t border-gray-200 pt-3">
                  {biology.scientific}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-96 lg:h-full order-1 lg:order-2">
              <Image
                src={`/images/${biology.image}`}
                alt={biology.imageAlt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* E. THE SHIFT */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative w-full h-auto order-1 lg:order-1">
              <Image
                src={`/images/${shift.image}`}
                alt={shift.imageAlt}
                width={500}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="space-y-6 order-2 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                {shift.headline}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                {shift.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* F. THE METHOD */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[#FAFAF8] to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Header */}
            <div className="text-center space-y-4">
              <span className="text-sm font-bold tracking-widest text-[#5E8AA8]">
                {method.eyebrow}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {method.headline}
              </h2>
            </div>

            {/* Four Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {method.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Connecting line */}
                  {idx < method.steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[90%] h-1 bg-gradient-to-r from-[#5E8AA8] to-transparent" />
                  )}

                  <div className="relative space-y-4">
                    {/* Number circle */}
                    <div className="w-12 h-12 rounded-full bg-[#5E8AA8] text-white flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-[#0B1D2A]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Method CTA */}
            <div className="text-center pt-8">
              <Button 
                href={routes.method} 
                size="lg" 
                className="bg-[#5E8AA8] hover:bg-[#4a7089] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                {method.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* G. THE OFFER */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Content */}
            <div className="space-y-12">
              {/* Header */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {offer.headline}
                </h2>
                <p className="text-xl text-gray-700">
                  {offer.intro}
                </p>
              </div>

              {/* Offerings */}
              <div className="grid grid-cols-1 gap-6">
                {offer.offerings.map((offering, idx) => (
                  <div 
                    key={idx}
                    className="p-6 bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-30 hover:border-[#5E8AA8] hover:border-opacity-50 transition-all"
                  >
                    <h3 className="text-lg font-bold text-[#0B1D2A] mb-2">
                      {offering.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Offer CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  href={routes.bookDiscovery} 
                  size="lg" 
                  className="bg-[#D97742] hover:bg-[#c86a37] text-white font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {offer.cta}
                </Button>
                <Button 
                  href={routes.programs}
                  size="lg"
                  className="bg-[#5E8AA8] hover:bg-[#4a7089] text-white font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {offer.secondaryCta}
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full h-auto">
              <Image
                src="/images/Workshop.png"
                alt="Performance Rhythm Workshop in session"
                width={500}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* H. ENGAGEMENT PATH */}
      <section className="py-20 lg:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent text-center">
              {engagement.headline}
            </h2>

            {/* Four steps */}
            <div className="space-y-6">
              {engagement.steps.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#D97742] text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#0B1D2A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* J. FOUNDER CREDIBILITY */}
      <section className="py-20 lg:py-32 bg-[#FAFAF8]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image with Overlay Card */}
            <div className="relative w-full">
              <div className="relative w-full h-auto">
                <Image
                  src="/images/Shane-Curtis-Portrait.webp"
                  alt="Shane Curtis, Co-Founder of Performance Rhythm"
                  width={400}
                  height={500}
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Experience Card Overlay - Transparent - Bottom of Image */}
                <div className="absolute bottom-0 left-4 right-4 bg-black bg-opacity-30 backdrop-blur-md rounded-lg border border-white border-opacity-20 p-8 space-y-6">
                  {/* Years & Title */}
                  <div className="space-y-2">
                    <h2 className="text-5xl lg:text-6xl font-bold text-white">
                      17+
                    </h2>
                    <p className="text-xl font-bold text-white">
                      Years Leading Teams
                    </p>
                    <p className="text-sm font-bold uppercase tracking-wide text-white text-opacity-90">
                      Healthcare Technology Leadership
                    </p>
                  </div>

                  {/* Expertise Badges */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {['Sales', 'Marketing', 'Customer Success'].map((badge) => (
                        <div
                          key={badge}
                          className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-full text-sm font-bold text-white backdrop-blur-sm"
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Support', 'Implementation'].map((badge) => (
                        <div
                          key={badge}
                          className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-full text-sm font-bold text-white backdrop-blur-sm"
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Repeated Pattern Box - Below Image */}
              <div className="mt-6 bg-[#0B1D2A] rounded-lg p-8 space-y-3 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D97742]">
                  Repeated Pattern
                </p>
                <p className="text-lg font-bold leading-relaxed">
                  Stress was quietly undermining talented, capable, motivated people.
                </p>
              </div>
            </div>

              {/* Content */}
            <div className="space-y-8">
              {/* Main Content */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                  Founder Story: Why Shane Built Performance Rhythm
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {founder.bio}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 border-l-4 border-[#D97742] pl-6 py-4">
                <div className="flex gap-3">
                  <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                  <p className="text-gray-700">17+ years in healthcare technology leadership</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                  <p className="text-gray-700">Led sales, marketing, implementation, support, and customer success teams</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                  <p className="text-gray-700">Observed stress undermining talented leaders and employees</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#D97742] font-bold flex-shrink-0">•</span>
                  <p className="text-gray-700">Built Performance Rhythm around human capacity as a missing performance variable</p>
                </div>
              </div>

              <Button 
                href={routes.bookDiscovery} 
                size="lg" 
                className="bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold shadow-md hover:shadow-lg transition-all inline-block"
              >
                {founder.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* K. FINAL CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
              {finalCta.headline}
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed">
              {finalCta.body}
            </p>

            <div className="pt-4">
              <Button 
                href={routes.bookDiscovery} 
                size="lg" 
                className="bg-[#D97742] hover:bg-[#c86a37] text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                {finalCta.cta}
              </Button>
            </div>

            <p className="text-sm text-gray-600 pt-4">
              {finalCta.supportingText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
