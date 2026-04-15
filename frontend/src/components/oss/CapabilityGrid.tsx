import React from 'react';
import { MessageSquare, Code2, Wrench, Blocks } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const items = [
  { key: 'chat', icon: MessageSquare, accent: 'from-oss-accent/20 to-oss-accent/0' },
  { key: 'code', icon: Code2, accent: 'from-oss-mist/20 to-oss-mist/0' },
  { key: 'tools', icon: Wrench, accent: 'from-purple-500/20 to-purple-500/0' },
  { key: 'builder', icon: Blocks, accent: 'from-pink-500/20 to-pink-500/0' },
] as const;

const CapabilityGrid: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white">{t('oss.capability.title')}</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">{t('oss.capability.subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
            <div
              key={c.key}
              className={`rounded-2xl border border-gray-800 bg-gradient-to-br ${c.accent} p-6 hover:border-gray-700 transition`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{t(`oss.capability.${c.key}.title`)}</h3>
              <p className="mt-2 text-sm text-gray-400">{t(`oss.capability.${c.key}.benefit`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityGrid;
