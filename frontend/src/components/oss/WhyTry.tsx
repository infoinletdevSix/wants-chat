import React from 'react';
import { Target, Key, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const reasons = [
  { key: 'r1', icon: Target },
  { key: 'r2', icon: Key },
  { key: 'r3', icon: Shield },
  { key: 'r4', icon: Zap },
] as const;

const WhyTry: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-oss-mist uppercase">{t('oss.whyTry.eyebrow')}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">{t('oss.whyTry.title')}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.key}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-oss-accent/30 hover:bg-gray-900/60 transition"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-oss-accent/10 border border-oss-accent/20 mb-4">
                <r.icon className="h-5 w-5 text-oss-mist" />
              </div>
              <h3 className="text-lg font-semibold text-white">{t(`oss.whyTry.${r.key}.title`)}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{t(`oss.whyTry.${r.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTry;
