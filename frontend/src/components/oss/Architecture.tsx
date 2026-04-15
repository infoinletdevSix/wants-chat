import React from 'react';
import { useTranslation } from 'react-i18next';

const nodes = [
  { label: 'React + Vite', subKey: 'frontend', color: 'border-oss-accent/40 text-oss-mist' },
  { label: 'NestJS API', subKey: 'backend', color: 'border-oss-mist/40 text-oss-fog' },
  { label: 'Postgres', subKey: 'data', color: 'border-purple-500/40 text-purple-300' },
  { label: 'Redis', subKey: 'cache', color: 'border-pink-500/40 text-pink-300' },
  { label: 'OpenRouter', subKey: 'models', color: 'border-amber-500/40 text-amber-300' },
] as const;

const Architecture: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">{t('oss.architecture.eyebrow')}</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">{t('oss.architecture.title')}</h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">{t('oss.architecture.subtitle')}</p>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
          {nodes.map((n, i) => (
            <React.Fragment key={n.label}>
              <div
                className={`rounded-xl border bg-gray-900/40 px-5 py-4 min-w-[150px] ${n.color}`}
              >
                <div className="font-semibold">{n.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t(`oss.architecture.nodes.${n.subKey}`)}</div>
              </div>
              {i < nodes.length - 1 && (
                <div className="text-gray-700 hidden md:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
