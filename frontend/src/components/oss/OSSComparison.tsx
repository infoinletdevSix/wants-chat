import React from 'react';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Cell = boolean | { kind: 'oneFamily' | 'limited' | 'artifacts' } | { text: string };

const rows: Array<{ rowKey: string; cells: Cell[] }> = [
  { rowKey: 'chat', cells: [{ kind: 'oneFamily' }, { kind: 'oneFamily' }, { kind: 'limited' }, { text: '30+' }] },
  { rowKey: 'code', cells: [true, true, true, true] },
  { rowKey: 'tools', cells: [false, { kind: 'artifacts' }, false, { text: '1100+' }] },
  { rowKey: 'builder', cells: [false, false, false, true] },
  { rowKey: 'opensource', cells: [false, false, false, { text: 'AGPL-3.0' }] },
  { rowKey: 'selfhost', cells: [false, false, false, true] },
  { rowKey: 'byok', cells: [false, false, { kind: 'limited' }, true] },
];

const cols = ['ChatGPT', 'Claude', 'Cursor', 'Wants'];

const OSSComparison: React.FC = () => {
  const { t } = useTranslation();

  const renderCell = (v: Cell) => {
    if (v === true) return <Check className="h-5 w-5 text-emerald-400 mx-auto" />;
    if (v === false) return <X className="h-5 w-5 text-gray-600 mx-auto" />;
    if ('kind' in v) return <span className="text-sm text-gray-200">{t(`oss.comparison.values.${v.kind}`)}</span>;
    return <span className="text-sm text-gray-200">{v.text}</span>;
  };

  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">{t('oss.comparison.eyebrow')}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">{t('oss.comparison.title')}</h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full text-center">
            <thead className="bg-gray-900/60">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">{t('oss.comparison.feature')}</th>
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
                  key={r.rowKey}
                  className={`border-t border-gray-800 ${i % 2 ? 'bg-gray-900/20' : ''}`}
                >
                  <td className="text-left px-6 py-4 text-sm text-gray-200">{t(`oss.comparison.rows.${r.rowKey}`)}</td>
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
