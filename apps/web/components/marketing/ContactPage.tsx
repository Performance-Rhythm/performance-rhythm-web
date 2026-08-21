"use client";

import { CONTACT_CONTENT } from "@/content/contact";
import { routes } from "@/lib/routes";

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAF8] via-white to-[#FAFAF8]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #5E8AA8 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 max-w-6xl text-center space-y-8">
          <p className="text-sm lg:text-base font-bold tracking-widest text-[#5E8AA8] uppercase">
            {CONTACT_CONTENT.hero.eyebrow}
          </p>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-[#D97742] via-[#E5A464] to-[#5E8AA8] bg-clip-text text-transparent">
            {CONTACT_CONTENT.hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            {CONTACT_CONTENT.hero.intro}
          </p>
        </div>
      </section>

      {/* Discovery Call Highlight */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left: What We Cover */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#0B1D2A]">
                {CONTACT_CONTENT.whatWeCover.title}
              </h3>
              <ul className="space-y-3">
                {CONTACT_CONTENT.whatWeCover.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#D97742] font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: Call Details */}
            <div className="bg-gradient-to-br from-[#D97742] to-[#5E8AA8] rounded-lg p-12 text-white space-y-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-bold uppercase tracking-wide opacity-90">
                  Discovery Conversation
                </p>
                <p className="text-4xl font-bold">
                  {CONTACT_CONTENT.discoveryCall.duration}
                </p>
              </div>
              <p className="text-center text-lg opacity-90">
                {CONTACT_CONTENT.discoveryCall.description}
              </p>
              <div className="pt-6 border-t border-white border-opacity-20 space-y-2">
                {CONTACT_CONTENT.discoveryCall.highlights.map((highlight, idx) => (
                  <p key={idx} className="text-sm font-bold text-center opacity-90">
                    {highlight}
                  </p>
                ))}
              </div>
              <div className="pt-6">
                <a
                  href={routes.bookDiscovery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-[#D97742] font-bold py-3 px-6 rounded-full hover:bg-[#ECE7DF] transition duration-200"
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Right: Best Fit For */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#0B1D2A]">
                {CONTACT_CONTENT.bestFit.title}
              </h3>
              <ul className="space-y-3">
                {CONTACT_CONTENT.bestFit.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#5E8AA8] font-bold flex-shrink-0">→</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is NOT */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#0B1D2A] text-center">
              {CONTACT_CONTENT.whatThisIsNot.title}
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {CONTACT_CONTENT.whatThisIsNot.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-6"
                >
                  <p className="text-lg font-bold text-[#D97742]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Framework */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {CONTACT_CONTENT.discoveryFramework.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {CONTACT_CONTENT.discoveryFramework.title}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {CONTACT_CONTENT.discoveryFramework.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D97742] text-white font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-[#0B1D2A]">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {CONTACT_CONTENT.contactOptions.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {CONTACT_CONTENT.contactOptions.title}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {CONTACT_CONTENT.contactOptions.options.map((option, idx) => (
                <a
                  key={idx}
                  href={option.href}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                  rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 hover:border-opacity-40 hover:shadow-md transition-all duration-300 space-y-4 flex flex-col"
                >
                  <div className="text-4xl">{option.icon}</div>
                  <h3 className="text-xl font-bold text-[#0B1D2A]">
                    {option.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">
                    {option.description}
                  </p>
                  <div className="text-[#D97742] font-bold hover:text-[#5E8AA8] transition">
                    {option.cta} →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent text-center">
              Common Questions
            </h2>

            <div className="space-y-4">
              {CONTACT_CONTENT.faq.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-6 cursor-pointer group"
                >
                  <summary className="font-bold text-[#0B1D2A] text-lg flex justify-between items-center">
                    {faq.question}
                    <span className="group-open:rotate-180 transition duration-200">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
            {CONTACT_CONTENT.finalCTA.title}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {CONTACT_CONTENT.finalCTA.subtitle}
          </p>
          <a
            href={CONTACT_CONTENT.finalCTA.buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[#D97742] text-white shadow-md hover:bg-[#5E8AA8] hover:shadow-lg focus-visible:ring-[#D97742] px-7 py-4 text-base sm:text-lg"
          >
            {CONTACT_CONTENT.finalCTA.buttonText}
          </a>
        </div>
      </section>
    </div>
  );
}
