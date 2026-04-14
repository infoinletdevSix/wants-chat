import React from 'react';
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
  return (
    <>
      <SEO
        title="Wants — Open-source AI workspace"
        description="Chat with 30+ models, generate code, use 1100+ contextual tools, build apps without code. Self-hostable and AGPL-3.0."
        url="/oss"
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
