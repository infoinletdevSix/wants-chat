import React from 'react';
import { useTranslation } from 'react-i18next';
import OSSHero from '../components/oss/OSSHero';
import CapabilityGrid from '../components/oss/CapabilityGrid';
import QuickStart from '../components/oss/QuickStart';
import MoatSection from '../components/oss/MoatSection';
import WhyTry from '../components/oss/WhyTry';
import AIModelsSection from '../components/landing/AIModelsSection';
import WhyContribute from '../components/oss/WhyContribute';
import Architecture from '../components/oss/Architecture';
import TechStack from '../components/oss/TechStack';
import Contributors from '../components/oss/Contributors';
import OSSComparison from '../components/oss/OSSComparison';
import DualCTA from '../components/oss/DualCTA';
import { SEO } from '../components/SEO';

const OSSLandingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('oss.seo.title')}
        description={t('oss.seo.description')}
        url="/"
      />
      <div className="bg-gray-950 min-h-screen">
        <OSSHero />
        <CapabilityGrid />
        <MoatSection />
        <OSSComparison />
        <QuickStart />
        <WhyTry />
        <AIModelsSection />
        <WhyContribute />
        <Architecture />
        <TechStack />
        <Contributors />
        <DualCTA />
      </div>
    </>
  );
};

export default OSSLandingPage;
