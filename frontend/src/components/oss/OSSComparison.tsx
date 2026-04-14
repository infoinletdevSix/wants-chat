import React from 'react';
import { Check, X } from 'lucide-react';

const rows: Array<{ feature: string; cells: (boolean | string)[] }> = [
  { feature: 'Multi-model chat', cells: ['1 family', '1 family', 'Limited', '30+'] },
  { feature: 'Code generation', cells: [true, true, true, true] },
  { feature: 'Contextual UI tools', cells: [false, 'Artifacts', false, '1100+'] },
  { feature: 'No-code app builder', cells: [false, false, false, true] },
  { feature: 'Open source', cells: [false, false, false, 'AGPL-3.0'] },
  { feature: 'Self-hostable', cells: [false, false, false, true] },
  { feature: 'BYO API keys', cells: [false, false, 'Limited', true] },
];

const cols = ['ChatGPT', 'Claude', 'Cursor', 'Wants'];

const renderCell = (v: boolean | string) => {
  if (v === true) return <Check className="h-5 w-5 text-emerald-400 mx-auto" />;
  if (v === false) return <X className="h-5 w-5 text-gray-600 mx-auto" />;
  return <span className="text-sm text-gray-200">{v}</span>;
};

const OSSComparison: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">A category of one</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">Why Wants, side-by-side</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full text-center">
            <thead className="bg-gray-900/60">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                {cols.map((c) => (
                  <th
                    key={c}
                    className={`px-4 py-4 text-sm font-semibold ${
                      c === 'Wants' ? 'text-emerald-300' : 'text-gray-400'
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={`border-t border-gray-800 ${i % 2 ? 'bg-gray-900/20' : ''}`}
                >
                  <td className="text-left px-6 py-4 text-sm text-gray-200">{r.feature}</td>
                  {r.cells.map((v, idx) => (
                    <td
                      key={idx}
                      className={`px-4 py-4 ${idx === cols.length - 1 ? 'bg-emerald-500/5' : ''}`}
                    >
                      {renderCell(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OSSComparison;
