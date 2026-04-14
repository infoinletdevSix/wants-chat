import React from 'react';
import { Hammer, Puzzle, Globe2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OSS } from '../../config/oss';

const reasons = [
  { key: 'r1', icon: Hammer },
  { key: 'r2', icon: Puzzle },
  { key: 'r3', icon: Globe2 },
] as const;

const WhyContribute: React.FC = () => {
  const { t } = useTranslation();
  const links = [
    { label: t('oss.whyContribute.links.goodFirst'), url: OSS.goodFirstIssues },
    { label: t('oss.whyContribute.links.guide'), url: OSS.contributing },
    { label: t('oss.whyContribute.links.discussions'), url: OSS.discussions },
  ];
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">{t('oss.whyContribute.eyebrow')}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">{t('oss.whyContribute.title')}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.key}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-cyan-500/30 transition"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <r.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{t(`oss.whyContribute.${r.key}.title`)}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{t(`oss.whyContribute.${r.key}.body`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900/40 px-5 py-2.5 text-sm text-gray-200 hover:border-cyan-500/40 hover:text-white transition"
            >
              {l.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyContribute;
