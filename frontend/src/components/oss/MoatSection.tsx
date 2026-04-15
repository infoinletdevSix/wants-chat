import React from 'react';
import { useTranslation } from 'react-i18next';

const MoatSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-oss-mist uppercase">{t('oss.moat.eyebrow')}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
            {t('oss.moat.titleStart')}{' '}
            <span className="bg-gradient-to-r from-oss-mist to-oss-mist bg-clip-text text-transparent">
              {t('oss.moat.titleEnd')}
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">{t('oss.moat.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
            <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">
              {t('oss.moat.traditional')}
            </div>
            <div className="rounded-lg bg-black/40 border border-gray-800 p-4 font-mono text-sm text-gray-300 leading-relaxed">
              <span className="text-gray-500">{t('oss.moat.youLabel')}</span> {t('oss.moat.prompt')}
              <br />
              <br />
              <span className="text-gray-500">{t('oss.moat.aiLabel')}</span> {t('oss.moat.aiResponse')}{' '}
              <span className="text-gray-400">22.86</span>
              {t('oss.moat.aiResponseEnd')}
            </div>
            <p className="mt-4 text-sm text-gray-500">{t('oss.moat.traditionalCaption')}</p>
          </div>

          <div className="rounded-2xl border border-oss-accent/30 bg-gradient-to-br from-oss-accent/5 to-oss-mist/5 p-6">
            <div className="text-xs font-semibold tracking-wider text-oss-mist uppercase mb-3">
              {t('oss.moat.wants')}
            </div>
            <div className="rounded-lg bg-black/40 border border-gray-800 p-4">
              <div className="text-sm text-gray-300 mb-3">
                <span className="text-gray-500">{t('oss.moat.youLabel')}</span> {t('oss.moat.prompt')}
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>{t('oss.heroDemo.step1.row1Label')}</span>
                  <span className="font-mono">{t('oss.heroDemo.step1.row1Value')}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t('oss.heroDemo.step1.row2Label')}</span>
                  <span className="font-mono">{t('oss.heroDemo.step1.row2Value')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800 text-oss-mist font-semibold">
                  <span>{t('oss.heroDemo.step1.row3Label')}</span>
                  <span className="font-mono">{t('oss.heroDemo.step1.row3Value')}</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">{t('oss.moat.wantsCaption')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoatSection;
