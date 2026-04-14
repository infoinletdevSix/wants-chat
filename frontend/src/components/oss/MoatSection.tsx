import React from 'react';

const MoatSection: React.FC = () => {
  return (
    <section className="bg-gray-950 py-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">The difference</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
            We don't just chat.{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              We render interfaces.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Every AI chatbot replies with text. Wants understands your intent and surfaces the exact
            tool or interface you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
            <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Traditional AI
            </div>
            <div className="rounded-lg bg-black/40 border border-gray-800 p-4 font-mono text-sm text-gray-300 leading-relaxed">
              <span className="text-gray-500">You:</span> What's my BMI if I'm 175cm, 70kg?
              <br />
              <br />
              <span className="text-gray-500">AI:</span> Your BMI is calculated as weight (kg) /
              height (m)². So 70 / (1.75 × 1.75) ≈ <span className="text-gray-400">22.86</span>,
              which falls in the normal range...
            </div>
            <p className="mt-4 text-sm text-gray-500">A wall of text. You re-read to extract the number.</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 p-6">
            <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
              Wants
            </div>
            <div className="rounded-lg bg-black/40 border border-gray-800 p-4">
              <div className="text-sm text-gray-300 mb-3">
                <span className="text-gray-500">You:</span> What's my BMI if I'm 175cm, 70kg?
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Height</span>
                  <span className="font-mono">175 cm</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Weight</span>
                  <span className="font-mono">70 kg</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800 text-emerald-400 font-semibold">
                  <span>BMI</span>
                  <span className="font-mono">22.86 — Normal</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              A live, interactive tool. Edit inputs, share, export, or save to memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoatSection;
