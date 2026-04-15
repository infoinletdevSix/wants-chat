import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OSS } from '../../config/oss';

const DualCTA: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-950 py-24 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-8">
            <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">{t('oss.dualCta.hostedBadge')}</div>
            <h3 className="text-2xl font-bold text-white">{t('oss.dualCta.hostedTitle')}</h3>
            <p className="mt-3 text-gray-400">{t('oss.dualCta.hostedBody')}</p>
            <a
              href={OSS.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 transition"
            >
              {t('oss.dualCta.hostedCta')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-2xl border border-oss-accent/40 bg-gradient-to-br from-oss-accent/10 to-oss-mist/5 p-8">
            <div className="text-xs font-semibold tracking-wider text-oss-mist uppercase mb-3">{t('oss.dualCta.selfBadge')}</div>
            <h3 className="text-2xl font-bold text-white">{t('oss.dualCta.selfTitle')}</h3>
            <p className="mt-3 text-gray-300">{t('oss.dualCta.selfBody')}</p>
            <a
              href={OSS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-gray-100 transition"
            >
              <Github className="h-4 w-4" />
              {t('oss.dualCta.selfCta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
