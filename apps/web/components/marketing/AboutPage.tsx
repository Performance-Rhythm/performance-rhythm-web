"use client";

import { ABOUT_CONTENT } from "@/content/about";
import { routes } from "@/lib/routes";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAF8] via-white to-[#FAFAF8]">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #D97742 1px, transparent 1px)",
              backgroundSize: "50px 50px"
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 max-w-6xl text-center space-y-8">
          <p className="text-sm lg:text-base font-bold tracking-widest text-[#D97742] uppercase">
            {ABOUT_CONTENT.hero.eyebrow}
          </p>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-[#D97742] via-[#E5A464] to-[#5E8AA8] bg-clip-text text-transparent">
            {ABOUT_CONTENT.hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            {ABOUT_CONTENT.hero.intro}
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.founderStory.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.founderStory.title}
              </h2>
            </div>

            <div className="space-y-12">
              {ABOUT_CONTENT.founderStory.sections.map((section, idx) => (
                <div key={idx} className="space-y-4 max-w-3xl">
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1D2A]">
                    {section.subtitle}
                  </h3>
                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                    {section.content.split("\n\n").map((para, pidx) => (
                      <p key={pidx}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.philosophy.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.philosophy.title}
              </h2>
              <p className="text-2xl font-bold text-[#0B1D2A] leading-relaxed">
                &ldquo;{ABOUT_CONTENT.philosophy.coreStatement}&rdquo;
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {ABOUT_CONTENT.philosophy.principlesGrid.map((principle, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-4">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.theProblem.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.theProblem.title}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {ABOUT_CONTENT.theProblem.description}
              </p>
            </div>

            <div className="space-y-6">
              {ABOUT_CONTENT.theProblem.problems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <h3 className="text-xl lg:text-2xl font-bold text-[#D97742] mb-3">
                    {item.challenge}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.theSolution.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.theSolution.title}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                {ABOUT_CONTENT.theSolution.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {ABOUT_CONTENT.theSolution.approach.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-3xl font-bold text-[#D97742]">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-[#0B1D2A]">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.vision.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.vision.title}
              </h2>
              <p className="text-2xl font-bold text-[#0B1D2A] leading-relaxed">
                {ABOUT_CONTENT.vision.statement}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {ABOUT_CONTENT.vision.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-3">
                    {outcome.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.team.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.team.title}
              </h2>
            </div>

            <div className="max-w-2xl">
              {ABOUT_CONTENT.team.founders.map((founder, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <h3 className="text-3xl font-bold text-[#0B1D2A]">
                    {founder.name}
                  </h3>
                  <p className="text-lg font-bold text-[#D97742] mt-1">
                    {founder.title}
                  </p>
                  <p className="text-sm text-[#5E8AA8] font-bold uppercase tracking-wide mt-2">
                    {founder.focus}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                {ABOUT_CONTENT.values.eyebrow}
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                {ABOUT_CONTENT.values.title}
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {ABOUT_CONTENT.values.values.map((value, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8"
                >
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
            {ABOUT_CONTENT.finalCTA.title}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            {ABOUT_CONTENT.finalCTA.subtitle}
          </p>
          <a
            href={routes.bookDiscovery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[#D97742] text-white shadow-md hover:bg-[#5E8AA8] hover:shadow-lg focus-visible:ring-[#D97742] px-7 py-4 text-base sm:text-lg"
          >
            {ABOUT_CONTENT.finalCTA.buttonText}
          </a>
        </div>
      </section>
    </main>
  );
}
