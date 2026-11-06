'use client';

import { Fragment, type ReactNode } from 'react';
import Image from 'next/image';
import { METHOD_CONTENT } from '@/content/method';
import { Button } from '@/components/ui/Button';
import { routes } from '@/lib/routes';

function renderInlineFormatting(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-bold text-[#0B1D2A]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

function FormattedScienceText({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;

    const text = paragraph.join(' ');
    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="leading-relaxed">
        {renderInlineFormatting(text, `paragraph-${blocks.length}`)}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (list.length === 0) return;

    blocks.push(
      <ul key={`list-${blocks.length}`} className="space-y-2 pl-5 list-disc marker:text-[#5E8AA8]">
        {list.map((item, idx) => (
          <li key={idx} className="leading-relaxed pl-1">
            {renderInlineFormatting(item, `list-${blocks.length}-${idx}`)}
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  content.trim().split('\n').forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
    } else if (line.startsWith('- ')) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      flushList();
      paragraph.push(line);
    }
  });

  flushParagraph();
  flushList();

  return <div className="space-y-4">{blocks}</div>;
}

export default function MethodPage() {
  const {
    hero,
    openingContext,
    step1Notice,
    step2Reset,
    step3Strengthen,
    step4Repeat,
    outcomes,
    scienceSection,
    finalCta
  } = METHOD_CONTENT;

  return (
    <div className="bg-white">
      {/* IMMERSIVE HERO SECTION - Full Screen */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAF8] via-white to-[#FAFAF8]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #D97742 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-6xl text-center space-y-8">
          {/* Eyebrow */}
          <div className="space-y-2">
            <p className="text-[19px] leading-snug font-bold tracking-widest text-accent uppercase">
              {hero.eyebrow}
            </p>
          </div>

          {/* Main Headline - Orange to Blue Gradient - Each on Own Line */}
          <h1 className="flex flex-col items-center justify-center gap-2 lg:gap-4">
            {['Notice.', 'Reset.', 'Strengthen.', 'Repeat.'].map((word, idx) => (
              <span key={idx} className="text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight bg-gradient-to-r from-[#D97742] via-[#E5A464] to-[#5E8AA8] bg-clip-text text-transparent">
                {word}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-normal">
            {hero.intro}
          </p>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-muted italic max-w-2xl mx-auto">
            {hero.subheadline}
          </p>

          {/* CTA */}
          <div className="pt-8">
            <Button 
              href={routes.bookDiscovery}
              size="lg"
              className="bg-[#D97742] hover:bg-[#C86A37] text-[#0B1D2A] font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {hero.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* UNIVERSAL APPLICABILITY SECTION */}
      <section className="py-24 bg-white border-t border-b border-[#A7BBC6] border-opacity-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D2A] leading-tight">
                {openingContext.headline}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mx-auto max-w-3xl">
                {openingContext.intro}
              </p>
            </div>

            {/* Role Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {openingContext.roles.map((role, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#FAFAF8] transition-colors">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[#D97742] to-[#5E8AA8]" />
                  <p className="text-gray-700 font-normal">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEP 1: NOTICE */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            {/* Step Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[19px] leading-snug font-bold tracking-widest text-accent uppercase">
                  {step1Notice.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {step1Notice.title}
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {step1Notice.description}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {step1Notice.images.map((image, idx) => (
                <div key={idx} className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[#A7BBC6]/20 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D2A]/10 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Scientific Explanation */}
            <div className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">The Science Behind Notice</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <FormattedScienceText content={step1Notice.scientificExplanation} />
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-white rounded-lg border-l-4 border-[#D97742] p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">In Your Work: {step1Notice.practicalExample.time}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">The Moment</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step1Notice.practicalExample.scenario}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">What Notice Means</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step1Notice.practicalExample.whatNoticeMeans}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Why It Matters</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step1Notice.practicalExample.whyItMatters}</p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] rounded-lg p-8 lg:p-12">
              <p className="text-[#0B1D2A] text-xl lg:text-2xl font-bold leading-relaxed">
                💡 {step1Notice.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2: RESET */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            {/* Step Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[19px] leading-snug font-bold tracking-widest text-accent uppercase">
                  {step2Reset.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {step2Reset.title}
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {step2Reset.description}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {step2Reset.images.map((image, idx) => (
                <div key={idx} className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[#A7BBC6]/20 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D2A]/10 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Scientific Explanation */}
            <div className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">The Science Behind Reset</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <FormattedScienceText content={step2Reset.scientificExplanation} />
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-[#FAFAF8] rounded-lg border-l-4 border-[#5E8AA8] p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">In Your Work: {step2Reset.practicalExample.time}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">The Moment</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step2Reset.practicalExample.scenario}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">What Reset Means</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step2Reset.practicalExample.whatResetMeans}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Why It Matters</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step2Reset.practicalExample.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Critical Note</p>
                  <p className="text-lg text-gray-700 leading-relaxed italic">{step2Reset.practicalExample.timing}</p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] rounded-lg p-8 lg:p-12">
              <p className="text-[#0B1D2A] text-xl lg:text-2xl font-bold leading-relaxed">
                💡 {step2Reset.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3: STRENGTHEN */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            {/* Step Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[19px] leading-snug font-bold tracking-widest text-accent uppercase">
                  {step3Strengthen.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {step3Strengthen.title}
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {step3Strengthen.description}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {step3Strengthen.images.map((image, idx) => (
                <div key={idx} className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[#A7BBC6]/20 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D2A]/10 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Scientific Explanation */}
            <div className="bg-white rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">The Science Behind Strengthen</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <FormattedScienceText content={step3Strengthen.scientificExplanation} />
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-white rounded-lg border-l-4 border-[#D97742] p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">In Your Work: {step3Strengthen.practicalExample.time}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">The Moment</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step3Strengthen.practicalExample.scenario}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">What Strengthen Means</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step3Strengthen.practicalExample.whatStrengthenMeans}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Why It Matters</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step3Strengthen.practicalExample.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Your Flexibility</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step3Strengthen.practicalExample.practiceType}</p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] rounded-lg p-8 lg:p-12">
              <p className="text-[#0B1D2A] text-xl lg:text-2xl font-bold leading-relaxed">
                💡 {step3Strengthen.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 4: REPEAT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-12">
            {/* Step Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-[19px] leading-snug font-bold tracking-widest text-accent uppercase">
                  {step4Repeat.eyebrow}
                </p>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent">
                  {step4Repeat.title}
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {step4Repeat.description}
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {step4Repeat.images.map((image, idx) => (
                <div key={idx} className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[#A7BBC6]/20 bg-white shadow-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1D2A]/10 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Scientific Explanation */}
            <div className="bg-[#FAFAF8] rounded-lg border border-[#A7BBC6] border-opacity-20 p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">The Science Behind Repeat</h3>
              <div className="prose prose-sm max-w-none text-gray-700">
                <FormattedScienceText content={step4Repeat.scientificExplanation} />
              </div>
            </div>

            {/* Practical Example */}
            <div className="bg-[#FAFAF8] rounded-lg border-l-4 border-[#5E8AA8] p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-[#0B1D2A] mb-6">In Your Work: {step4Repeat.practicalExample.time}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">The Moment</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step4Repeat.practicalExample.scenario}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">What Repeat Means</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step4Repeat.practicalExample.whatRepeatMeans}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">Why It Matters</p>
                  <p className="text-lg text-gray-700 leading-relaxed">{step4Repeat.practicalExample.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-[19px] leading-snug font-bold text-accent uppercase tracking-wide mb-2">The Ripple</p>
                  <p className="text-lg text-gray-700 leading-relaxed italic">{step4Repeat.practicalExample.rippleEffect}</p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] rounded-lg p-8 lg:p-12">
              <p className="text-[#0B1D2A] text-xl lg:text-2xl font-bold leading-relaxed">
                💡 {step4Repeat.keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D2A] leading-tight">
                {outcomes.headline}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {outcomes.intro}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {outcomes.results.map((category, idx) => (
                <div key={idx} className="bg-white rounded-lg p-8 border border-[#A7BBC6] border-opacity-20 hover:border-opacity-40 transition-colors">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#D97742] to-[#5E8AA8] bg-clip-text text-transparent mb-6">{category.category}</h3>
                  <ul className="space-y-4">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3">
                        <span className="text-[#D97742] font-bold flex-shrink-0">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D2A] leading-tight">
                {scienceSection.headline}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {scienceSection.intro}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {scienceSection.frameworks.map((framework, idx) => (
                <div key={idx} className="bg-[#FAFAF8] rounded-lg p-8 border border-[#A7BBC6] border-opacity-20">
                  <h3 className="text-xl font-bold text-[#0B1D2A] mb-3">{framework.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{framework.description}</p>
                  <p className="text-sm text-[#0B1D2A] font-normal italic">{framework.source}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#D97742] to-[#5E8AA8] rounded-lg p-8 lg:p-12">
              <p className="text-[#0B1D2A] text-lg lg:text-xl font-bold leading-relaxed">
                {scienceSection.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1D2A] leading-tight">
              {finalCta.headline}
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {finalCta.body}
            </p>

            <div className="pt-4">
              <Button 
                href={routes.bookDiscovery}
                size="lg"
                className="bg-[#D97742] hover:bg-[#C86A37] text-[#0B1D2A] font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {finalCta.cta}
              </Button>
            </div>

            <p className="text-sm text-muted italic">
              {finalCta.subtext}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
