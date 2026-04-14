import React from 'react';
import { MessageSquare, Code2, Wrench, Blocks } from 'lucide-react';

const capabilities = [
  {
    icon: MessageSquare,
    title: 'Multi-model chat',
    benefit: 'Talk to GPT, Claude, Gemini, Llama — in one thread',
    accent: 'from-emerald-500/20 to-emerald-500/0',
  },
  {
    icon: Code2,
    title: 'Code generation',
    benefit: 'AI pair programmer, built in',
    accent: 'from-cyan-500/20 to-cyan-500/0',
  },
  {
    icon: Wrench,
    title: '1100+ contextual tools',
    benefit: 'Calculators, generators, trackers — on demand',
    accent: 'from-purple-500/20 to-purple-500/0',
  },
  {
    icon: Blocks,
    title: 'No-code app builder',
    benefit: 'Describe an app, deploy it',
    accent: 'from-pink-500/20 to-pink-500/0',
  },
];

const CapabilityGrid: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Everything you need around AI, in one place
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Stop juggling ten tabs and ten subscriptions. Wants is the workspace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className={`rounded-2xl border border-gray-800 bg-gradient-to-br ${c.accent} p-6 hover:border-gray-700 transition`}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{c.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilityGrid;
