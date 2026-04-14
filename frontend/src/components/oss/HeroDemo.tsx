import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const;

const HeroDemo: React.FC = () => {
  const { t } = useTranslation();
  const [i, setI] = useState(0);

  useEffect(() => {
    const tm = setInterval(() => setI((v) => (v + 1) % stepKeys.length), 3800);
    return () => clearInterval(tm);
  }, []);

  const k = stepKeys[i];
  const rows = [
    { label: t(`oss.heroDemo.${k}.row1Label`), value: t(`oss.heroDemo.${k}.row1Value`) },
    { label: t(`oss.heroDemo.${k}.row2Label`), value: t(`oss.heroDemo.${k}.row2Value`) },
    { label: t(`oss.heroDemo.${k}.row3Label`), value: t(`oss.heroDemo.${k}.row3Value`), highlight: true },
  ];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur overflow-hidden shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800 bg-black/40">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-gray-500">{t('oss.heroDemo.window')}</span>
        </div>

        <div className="p-6 space-y-4 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`prompt-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-emerald-500/20 border border-emerald-500/30 px-4 py-2.5 text-sm text-emerald-50">
                {t(`oss.heroDemo.${k}.prompt`)}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`tool-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex justify-start"
            >
              <div className="max-w-[85%] w-full rounded-2xl rounded-tl-sm bg-gray-800/60 border border-gray-700 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">{t(`oss.heroDemo.${k}.tool`)}</span>
                </div>
                <div className="space-y-2 text-sm">
                  {rows.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between ${
                        row.highlight
                          ? 'pt-2 border-t border-gray-700 text-emerald-400 font-semibold'
                          : 'text-gray-300'
                      }`}
                    >
                      <span>{row.label}</span>
                      <span className="font-mono">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1.5 pb-4">
          {stepKeys.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? 'w-6 bg-emerald-400' : 'w-1.5 bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDemo;
