import React from 'react';
import { useTranslation } from 'react-i18next';

const stack = [
  'React',
  'TypeScript',
  'Vite',
  'TailwindCSS',
  'NestJS',
  'PostgreSQL',
  'Redis',
  'Socket.io',
  'OpenRouter',
  'Docker',
];

const TechStack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-14 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-gray-500 mb-6">{t('oss.techStack.label')}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-gray-800 bg-gray-900/40 px-4 py-1.5 text-sm text-gray-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
