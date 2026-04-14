import React from 'react';
import { Hammer, Puzzle, Globe2, ArrowRight } from 'lucide-react';
import { OSS } from '../../config/oss';

const reasons = [
  {
    icon: Hammer,
    title: 'Shape the post-chat AI platform',
    body: 'We\'re defining what one-AI-does-everything looks like. Your code ships to thousands.',
  },
  {
    icon: Puzzle,
    title: 'Add a tool in under an hour',
    body: 'Every tool is a single React component. If you can build a form, you can ship a tool.',
  },
  {
    icon: Globe2,
    title: '17 locales, growing community',
    body: 'Devs, designers, translators, prompt engineers — every skill has a place.',
  },
];

const links = [
  { label: 'Good first issues', url: OSS.goodFirstIssues },
  { label: 'Contributor guide', url: OSS.contributing },
  { label: 'Discussions', url: OSS.discussions },
];

const WhyContribute: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">Why contribute</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">Build the workspace you want to use</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 hover:border-cyan-500/30 transition"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <r.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900/40 px-5 py-2.5 text-sm text-gray-200 hover:border-cyan-500/40 hover:text-white transition"
            >
              {l.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyContribute;
