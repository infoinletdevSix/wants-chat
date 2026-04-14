import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { OSS } from '../../config/oss';

const CMD = `git clone ${OSS.repo}
cd wants-chat
docker compose up`;

const QuickStart: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="quick-start" className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 mb-4">
          <Terminal className="h-3.5 w-3.5" />
          Running in 60 seconds
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Self-host in three commands</h2>
        <p className="mt-3 text-gray-400">Postgres, Redis, backend, frontend — all up with Docker Compose.</p>

        <div className="mt-8 text-left relative rounded-2xl border border-gray-800 bg-black/60 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-5 text-sm text-gray-200 overflow-x-auto font-mono leading-relaxed">
{CMD}
          </pre>
        </div>

        <a
          href={OSS.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-emerald-400 hover:text-emerald-300 text-sm"
        >
          View full setup docs →
        </a>
      </div>
    </section>
  );
};

export default QuickStart;
