import React from 'react';
import { useTranslation } from 'react-i18next';
import { OSS } from '../../config/oss';

const Contributors: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">{t('oss.contributors.eyebrow')}</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">{t('oss.contributors.title')}</h2>
        <p className="mt-3 text-gray-400">{t('oss.contributors.subtitle')}</p>

        <a
          href={OSS.repo + '/graphs/contributors'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block"
        >
          <img
            src="https://contrib.rocks/image?repo=wants-chat/wants-chat"
            alt="Contributors"
            className="rounded-xl"
          />
        </a>
      </div>
    </section>
  );
};

export default Contributors;
