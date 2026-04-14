import React from 'react';

const nodes = [
  { label: 'React + Vite', sub: 'Frontend', color: 'border-emerald-500/40 text-emerald-300' },
  { label: 'NestJS API', sub: 'Backend', color: 'border-cyan-500/40 text-cyan-300' },
  { label: 'Postgres', sub: 'Data', color: 'border-purple-500/40 text-purple-300' },
  { label: 'Redis', sub: 'Cache + queue', color: 'border-pink-500/40 text-pink-300' },
  { label: 'OpenRouter', sub: '30+ AI models', color: 'border-amber-500/40 text-amber-300' },
];

const Architecture: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Under the hood</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Clean, composable architecture</h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          No black boxes. Standard stack you already know — easy to deploy, easy to extend.
        </p>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
          {nodes.map((n, i) => (
            <React.Fragment key={n.label}>
              <div
                className={`rounded-xl border bg-gray-900/40 px-5 py-4 min-w-[150px] ${n.color}`}
              >
                <div className="font-semibold">{n.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{n.sub}</div>
              </div>
              {i < nodes.length - 1 && (
                <div className="text-gray-700 hidden md:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
