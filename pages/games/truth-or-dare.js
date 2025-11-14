import { useState } from 'react'
import data from '../../src/data/truth_dare.json'
import AdSlot from '../../src/components/AdSlot'


export default function TruthOrDare(){
    const [mode, setMode] = useState('truth')
    const [item, setItem] = useState(null) // { type, text }

    // Custom prompts state
    const [useMyTruths, setUseMyTruths] = useState(false)
    const [useMyDares, setUseMyDares] = useState(false)
    const [customTruths, setCustomTruths] = useState([])
    const [customDares, setCustomDares] = useState([])
    const [truthInput, setTruthInput] = useState('')
    const [dareInput, setDareInput] = useState('')

        const pick = () => {
                let pool = []
                if (mode === 'truth'){
                    if (useMyTruths) pool = customTruths
                    else pool = Array.isArray(data.truths) ? data.truths : []
                } else {
                    if (useMyDares) pool = customDares
                    else pool = Array.isArray(data.dares) ? data.dares : []
                }

                if (!pool || pool.length === 0) {
                        setItem({ type: mode, text: 'No prompts available for this mode. Add some custom prompts or disable the "use mine only" option.' })
                        return
                }
                const text = pool[Math.floor(Math.random() * pool.length)]
                setItem({ type: mode, text })
        }

        function addTruth(){
            const t = truthInput.trim()
            if (!t) return
            setCustomTruths(prev => [...prev, t])
            setTruthInput('')
            setUseMyTruths(true)
        }

        function addDare(){
            const d = dareInput.trim()
            if (!d) return
            setCustomDares(prev => [...prev, d])
            setDareInput('')
            setUseMyDares(true)
        }

        function removeCustomTruth(idx){ setCustomTruths(prev => prev.filter((_,i) => i !== idx)) }
        function removeCustomDare(idx){ setCustomDares(prev => prev.filter((_,i) => i !== idx)) }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Truth or Dare</h1>
                <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                    <span>🏠</span>
                    Back to Home
                </a>
            </div>

            {/* Rules / Fun gameplay suggestions */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="font-semibold">Rules & Fun Variations</h2>
                <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>Choose <strong>Truth</strong> or <strong>Dare</strong> and press <em>Pick</em>.</li>
                    <li>If a player refuses a dare, they take a small penalty (sing a line, do 5 push-ups, or lose a point).</li>
                    <li>Variation: assign a timer — complete the dare within 30 seconds or accept the penalty.</li>
                    <li>Team mode: split into teams. A correct truth answer or successful dare scores a point for your team.</li>
                    <li>Example: For the statement "Have you ever lied to your best friend?" — answer truthfully or take a dare.</li>
                </ul>
            </div>

            <div className="mt-3 flex gap-2">
                <button onClick={() => setMode('truth')} className={`flex-1 p-3 rounded ${mode==='truth'? 'bg-blue-500 text-white':'bg-white'}`}>Truth</button>
                <button onClick={() => setMode('dare')} className={`flex-1 p-3 rounded ${mode==='dare'? 'bg-pink-500 text-white':'bg-white'}`}>Dare</button>
            </div>

                        {/* Custom prompts controls */}
                        <div className="mt-4 grid grid-cols-1 gap-4">
                            <div className="bg-white p-3 rounded shadow">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={useMyTruths} onChange={() => setUseMyTruths(v => !v)} />
                                    <span className="text-sm">Use my truths only</span>
                                </label>

                                <div className="mt-3 flex gap-2">
                                    <input value={truthInput} onChange={e => setTruthInput(e.target.value)} placeholder="Add custom truth" className="flex-1 px-3 py-2 border rounded" />
                                    <button onClick={addTruth} className="px-3 py-2 bg-blue-500 text-white rounded">Add</button>
                                </div>

                                {customTruths.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {customTruths.map((t, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2">
                                                <span className="text-sm">{t}</span>
                                                <button onClick={() => removeCustomTruth(idx)} className="text-red-500 text-xs">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white p-3 rounded shadow">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={useMyDares} onChange={() => setUseMyDares(v => !v)} />
                                    <span className="text-sm">Use my dares only</span>
                                </label>

                                <div className="mt-3 flex gap-2">
                                    <input value={dareInput} onChange={e => setDareInput(e.target.value)} placeholder="Add custom dare" className="flex-1 px-3 py-2 border rounded" />
                                    <button onClick={addDare} className="px-3 py-2 bg-pink-500 text-white rounded">Add</button>
                                </div>

                                {customDares.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {customDares.map((d, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2">
                                                <span className="text-sm">{d}</span>
                                                <button onClick={() => removeCustomDare(idx)} className="text-red-500 text-xs">✕</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    onClick={pick}
                                    disabled={ (mode==='truth' && useMyTruths && customTruths.length===0) || (mode==='dare' && useMyDares && customDares.length===0) }
                                    className="w-full p-3 bg-green-500 text-white rounded disabled:opacity-50"
                                >
                                    Pick {mode}
                                </button>
                            </div>
                        </div>

            {item && (
                <div className="mt-4 p-4 bg-white rounded shadow">
                    <p className="text-sm text-gray-600">{item.type === 'truth' ? 'Truth' : 'Dare'}</p>
                    <p className="mt-2 text-lg font-semibold">{item.text}</p>
                </div>
            )}

            <div className="mt-4"><AdSlot /></div>
        </div>
    )
}