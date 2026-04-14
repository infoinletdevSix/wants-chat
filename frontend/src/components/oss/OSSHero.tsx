import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowDown } from 'lucide-react';
import { OSS } from '../../config/oss';
import HeroDemo from './HeroDemo';

const OSSHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gray-950 pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300 mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          The open-source AI workspace · AGPL-3.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          Your AI{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            command center
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Chat with 30+ models. Generate code. Use 1100+ contextual tools. Build apps without code.
          Self-host, bring your own keys, own your data.
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
            Star on GitHub
          </a>
          <a
            href={OSS.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900/50 text-white px-6 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Try live demo
            <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href="#quick-start"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 text-emerald-300 px-6 py-3 font-semibold hover:bg-emerald-500/10 transition"
          >
            Self-host in 60s
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
            <img src={OSS.starsBadge} alt="GitHub stars" />
          </a>
          <a href={OSS.repo} target="_blank" rel="noopener noreferrer">
            <img src={OSS.forksBadge} alt="GitHub forks" />
          </a>
          <a href={OSS.licenseUrl} target="_blank" rel="noopener noreferrer">
            <img src={OSS.licenseBadge} alt="License AGPL-3.0" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16"
        >
          <HeroDemo />
          <p className="mt-4 text-xs text-gray-500">Live preview — intent becomes interface</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OSSHero;
