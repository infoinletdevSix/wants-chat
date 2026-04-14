import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type Step = {
  prompt: string;
  tool: {
    title: string;
    rows: Array<{ label: string; value: string; highlight?: boolean }>;
  };
};

const steps: Step[] = [
  {
    prompt: 'What\'s my BMI if I\'m 175cm and 70kg?',
    tool: {
      title: 'BMI Calculator',
      rows: [
        { label: 'Height', value: '175 cm' },
        { label: 'Weight', value: '70 kg' },
        { label: 'BMI', value: '22.86 — Normal', highlight: true },
      ],
    },
  },
  {
    prompt: 'Convert 250 USD to EUR',
    tool: {
      title: 'Currency Converter',
      rows: [
        { label: 'From', value: '$250.00 USD' },
        { label: 'Rate', value: '1 USD = 0.92 EUR' },
        { label: 'To', value: '€230.00 EUR', highlight: true },
      ],
    },
  },
  {
    prompt: 'Generate a QR code for wants.chat',
    tool: {
      title: 'QR Code Generator',
      rows: [
        { label: 'Content', value: 'https://wants.chat' },
        { label: 'Format', value: 'PNG 512×512' },
        { label: 'Status', value: 'Ready to download', highlight: true },
      ],
    },
  },
  {
    prompt: 'Split a $184.50 bill across 4 people with 18% tip',
    tool: {
      title: 'Tip Splitter',
      rows: [
        { label: 'Subtotal', value: '$184.50' },
        { label: 'Tip (18%)', value: '$33.21' },
        { label: 'Each person pays', value: '$54.43', highlight: true },
      ],
    },
  },
];

const HeroDemo: React.FC = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % steps.length), 3800);
    return () => clearInterval(t);
  }, []);

  const step = steps[i];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur overflow-hidden shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-800 bg-black/40">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-gray-500">wants — chat</span>
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
                {step.prompt}
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
                  <span className="text-sm font-semibold text-white">{step.tool.title}</span>
                </div>
                <div className="space-y-2 text-sm">
                  {step.tool.rows.map((row, idx) => (
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
          {steps.map((_, idx) => (
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
