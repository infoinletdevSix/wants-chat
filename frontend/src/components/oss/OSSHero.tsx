import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OSS } from '../../config/oss';
import HeroDemo from './HeroDemo';

const OSSHero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-oss-accent/15 via-transparent to-oss-mist/10" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-oss-accent/40 bg-oss-accent/10 px-4 py-1.5 text-sm text-oss-mist mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-oss-mist animate-pulse" />
          {t('oss.hero.eyebrow')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          {t('oss.hero.headlineStart')}{' '}
          <span className="bg-gradient-to-r from-oss-mist to-oss-paper bg-clip-text text-transparent">
            {t('oss.hero.headlineHighlight')}
          </span>
          {t('oss.hero.headlineEnd')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          {t('oss.hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href={OSS.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-6 py-3 font-semibold hover:bg-gray-100 transition"
          >
            <Github className="h-5 w-5" />
            {t('oss.hero.ctaStar')}
          </a>
          <a
            href={OSS.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 text-white px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            {t('oss.hero.ctaDemo')}
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="#quick-start"
            className="inline-flex items-center gap-2 rounded-xl border border-oss-accent/50 text-oss-mist px-6 py-3 font-semibold hover:bg-oss-accent/10 transition"
          >
            {t('oss.hero.ctaSelfHost')}
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap gap-3 justify-center items-center"
        >
          <a href={OSS.repo} target="_blank" rel="noopener noreferrer">
            <img src={OSS.starsBadge} alt={t('oss.hero.alt.stars')} />
          </a>
          <a href={OSS.repo} target="_blank" rel="noopener noreferrer">
            <img src={OSS.forksBadge} alt={t('oss.hero.alt.forks')} />
          </a>
          <a href={OSS.licenseUrl} target="_blank" rel="noopener noreferrer">
            <img src={OSS.licenseBadge} alt={t('oss.hero.alt.license')} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16"
        >
          <HeroDemo />
          <p className="mt-4 text-xs text-gray-500">{t('oss.hero.demoCaption')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OSSHero;
