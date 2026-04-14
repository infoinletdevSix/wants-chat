import React from 'react';
import { Target, Key, Shield, Zap } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'One workspace for every AI workflow',
    body: 'Chat, code, tools, app builder. Stop juggling ten AI subscriptions and ten browser tabs.',
  },
  {
    icon: Key,
    title: 'Bring your own keys — zero markup',
    body: 'OpenRouter, OpenAI, Anthropic, Google, local Ollama. Pay the providers directly. No middleman pricing.',
  },
  {
    icon: Shield,
    title: 'Self-host, own your data',
    body: 'Your prompts, your history, your secrets — on your server. No third-party training, no tracking.',
  },
  {
    icon: Zap,
    title: '1100+ tools ready on day one',
    body: 'No configuration, no plugin hunt. Ask and the right tool appears — calculators, converters, generators, trackers.',
  },
];

const WhyTry: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">Why try Wants</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">Four reasons it's worth five minutes</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-emerald-500/30 hover:bg-gray-900/60 transition"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <r.icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTry;
