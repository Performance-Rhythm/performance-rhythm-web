"use client";

import { RESEARCH_CONTENT } from "@/content/research";
import { routes } from "@/lib/routes";

export default function ResearchPage() {
  return (
    <main className="bg-white">
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
            {RESEARCH_CONTENT.hero.eyebrow}
          </p>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-[#D97742] via-[#E5A464] to-[#5E8AA8] bg-clip-text text-transparent">
            {RESEARCH_CONTENT.hero.title}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            {RESEARCH_CONTENT.hero.intro}
          </p>
        </div>
      </section>

      {/* Research Sections */}
      {RESEARCH_CONTENT.sections.map((section, idx) => (
        <section
          key={section.id}
          className={`py-24 ${
            idx % 2 === 0 ? "bg-[#FAFAF8]" : "bg-white"
          } border-b border-[#A7BBC6] border-opacity-20`}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="space-y-12">
              {/* Section Header */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-bold tracking-widest text-[#D97742] uppercase">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                  {section.description}
                </p>
              </div>

              {/* Articles Grid */}
              <div className="space-y-6">
                {section.articles.map((article, articleIdx) => (
                  <div
                    key={articleIdx}
                    className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 hover:border-opacity-40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group"
                            >
                              <h3 className="text-xl lg:text-2xl font-bold text-[#0B1D2A] group-hover:text-[#D97742] transition duration-200">
                                {article.title}
                              </h3>
                            </a>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end">
                            <span className="px-3 py-1 bg-[#D97742] bg-opacity-10 rounded-full text-xs font-bold text-[#D97742] uppercase tracking-wide">
                              {article.credibility === "peer-reviewed"
                                ? "Peer-Reviewed"
                                : article.credibility === "institutional"
                                ? "Institutional"
                                : article.credibility === "nonprofit"
                                ? "Nonprofit"
                                : "Expert"}
                            </span>
                          </div>
                        </div>

                        {/* Source & Year */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="font-semibold text-[#0B1D2A]">
                            {article.source}
                          </span>
                          {article.year && (
                            <>
                              <span>•</span>
                              <span>{article.year}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {article.description}
                      </p>

                      {/* Footer: Type & Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#A7BBC6] border-opacity-20">
                        <span className="text-xs font-bold text-[#5E8AA8] uppercase tracking-wide">
                          {article.type === "peer-reviewed"
                            ? "Research Study"
                            : article.type === "article"
                            ? "Educational Article"
                            : article.type === "report"
                            ? "Report"
                            : "Research"}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-bold text-[#D97742] hover:text-[#5E8AA8] transition duration-200"
                        >
                          Read Full Resource →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Future Section */}
      <section className="py-24 bg-gradient-to-r from-[#D97742] to-[#5E8AA8]">
        <div className="container mx-auto px-6 max-w-5xl text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              {RESEARCH_CONTENT.futureSection.title}
            </h2>
            <p className="text-xl text-white text-opacity-90 leading-relaxed max-w-3xl mx-auto">
              {RESEARCH_CONTENT.futureSection.description}
            </p>
          </div>
          <a
            href={routes.bookDiscovery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[#D97742] text-white shadow-md hover:bg-[#5E8AA8] hover:shadow-lg focus-visible:ring-[#D97742] px-7 py-4 text-base sm:text-lg bg-white hover:bg-[#ECE7DF] text-[#D97742] font-bold shadow-lg"
          >
            Schedule a Conversation
          </a>
        </div>
      </section>

      {/* Research Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
                Why This Research Matters
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                The research is clear: nervous system regulation, resilience training, and recovery practices directly improve leadership, team culture, and organizational performance.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0B1D2A]">
                  🧠 Neuroscience
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The nervous system isn&apos;t mysterious. We understand how stress activates it, how regulation tools calm it, and how consistent practice rewires it.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0B1D2A]">
                  📊 Organizational Data
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Companies investing in resilience training see measurable improvements in retention, engagement, performance, and psychological safety.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0B1D2A]">
                  ⚡ Practical Application
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The science informs our method. Everything we teach is grounded in evidence and designed to work in real workplace environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent leading-tight">
            Ready to Bring Science-Backed Resilience to Your Organization?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Let&apos;s discuss how Performance Rhythm&apos;s evidence-informed approach can develop the human capacity your organization needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={routes.bookDiscovery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[#D97742] text-white shadow-md hover:bg-[#5E8AA8] hover:shadow-lg focus-visible:ring-[#D97742] px-7 py-4 text-base sm:text-lg bg-[#D97742] hover:bg-[#5E8AA8] text-white font-bold"
            >
              Book A Discovery Conversation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
