import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { OSS } from '../../config/oss';

const DualCTA: React.FC = () => {
  return (
    <section className="bg-gray-950 py-24 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-8">
            <div className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">Hosted</div>
            <h3 className="text-2xl font-bold text-white">Use it now, zero setup</h3>
            <p className="mt-3 text-gray-400">
              Try Wants in seconds at wants.chat. Good for testing, daily use, or sharing with non-technical folks.
            </p>
            <a
              href={OSS.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 transition"
            >
              Try the live demo
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-8">
            <div className="text-xs font-semibold tracking-wider text-emerald-300 uppercase mb-3">Self-host</div>
            <h3 className="text-2xl font-bold text-white">Run it on your own server</h3>
            <p className="mt-3 text-gray-300">
              Own your data, bring your own keys, modify whatever you want. One docker compose away.
            </p>
            <a
              href={OSS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-5 py-3 font-semibold hover:bg-gray-100 transition"
            >
              <Github className="h-4 w-4" />
              Get it on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualCTA;
