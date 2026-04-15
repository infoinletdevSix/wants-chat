import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Facebook } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import XIcon from '@mui/icons-material/X';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    // If not on landing page, navigate to it first
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gray-950">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary-500/10 rounded-full blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <img src="/assets/logo.png" alt="Wants" className="h-10 w-10 rounded-lg" />
                <span className="text-2xl font-bold text-white">Wants</span>
                <a
                  href="https://github.com/wants-chat/wants-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open source — AGPL-3.0 — star us on GitHub"
                  className="relative flex items-center gap-1 px-2 py-0.5 bg-oss-accent/15 rounded-full backdrop-blur-sm border border-oss-accent/40 shadow-sm shadow-oss-accent/20 hover:bg-oss-accent/25 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-oss-mist">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span className="text-[9px] font-bold text-oss-mist uppercase tracking-wider pr-0.5">OSS</span>
                </a>
              </div>
              <p className="text-base text-white/70 mb-6 max-w-md leading-relaxed">
                {t('footer.tagline')}
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                <a
                  href="https://x.com/InfoInlet2019"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-primary-500 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700"
                >
                  <XIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/infoinlet-com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-primary-500 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/info-inlet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-primary-500 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/infoinlet"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 rounded-xl bg-gray-800/50 hover:bg-primary-500 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-base mb-6 text-white">{t('footer.product')}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-sm text-white/70 hover:text-primary-400 transition-colors font-medium">
                    {t('common.features')}
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="text-sm text-white/70 hover:text-primary-400 transition-colors font-medium">
                    {t('footer.allTools')}
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-sm text-white/70 hover:text-primary-400 transition-colors font-medium">
                    {t('footer.integrations')}
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="text-sm text-white/70 hover:text-primary-400 transition-colors font-medium">
                    {t('footer.changelog')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-base mb-6 text-white">{t('footer.company')}</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://infoinlet.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-primary-400 transition-colors font-medium"
                  >
                    InfoInlet
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/60 text-center sm:text-left">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>

            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="footer" />
              <button
                onClick={scrollToTop}
                className="p-3 rounded-xl bg-gray-800/50 hover:bg-primary-500 text-white/80 hover:text-white transition-all duration-300 group hover:scale-110 border border-gray-700"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
