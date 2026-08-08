'use client';

import { PRIVACY_CONTENT } from '@/content/privacy';

export default function PrivacyPage() {
  const { hero, sections, finalNote } = PRIVACY_CONTENT;

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#FAFAF8] via-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold text-[#0B1D2A]">
            {hero.headline}
          </h1>
          <p className="text-sm font-bold text-[#5E8AA8] uppercase tracking-wide">
            Last Updated: {hero.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-16">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                {/* Section Title */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {section.title}
                </h2>

                {/* Simple Content */}
                {section.content && !section.subsections && (
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-8">
                    {section.subsections.map((subsection, sIdx) => (
                      <div key={sIdx} className="space-y-4">
                        <h3 className="text-xl font-bold text-[#0B1D2A]">
                          {subsection.subtitle}
                        </h3>
                        <div className="space-y-3">
                          {subsection.content.map((item, iIdx) => (
                            <p key={iIdx} className="text-gray-700 leading-relaxed">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Note */}
      <section className="py-16 bg-[#FAFAF8] border-t border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            {finalNote}
          </p>
        </div>
      </section>
    </main>
  );
}
