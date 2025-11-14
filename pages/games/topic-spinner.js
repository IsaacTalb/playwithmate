import { useState } from 'react'
import Layout from '../../src/components/Layout'
import AdSlot from '../../src/components/AdSlot'

export default function TopicSpinner() {
  const defaultTopics = ['Sports', 'Movies', 'Travel', 'Food', 'Music', 'Technology', 'Nature', 'History']

  const [topic, setTopic] = useState(null)
  const [spinning, setSpinning] = useState(false)

  // Custom topics state
  const [useCustom, setUseCustom] = useState(false)
  const [customTopics, setCustomTopics] = useState([])
  const [inputTopic, setInputTopic] = useState('')

  const spin = () => {
    setSpinning(true)
    setTopic(null)
    setTimeout(() => {
      const pool = (useCustom && customTopics.length) ? customTopics : defaultTopics
      setTopic(pool[Math.floor(Math.random() * pool.length)])
      setSpinning(false)
    }, 1500)
  }

  function addTopic(){
    const t = inputTopic.trim()
    if (!t) return
    setCustomTopics(prev => [...prev, t])
    setInputTopic('')
    setUseCustom(true)
  }

  function removeCustom(idx){
    setCustomTopics(prev => prev.filter((_,i) => i !== idx))
  }

  function handleKey(e){ if (e.key === 'Enter') addTopic() }

  return (
    <Layout>
      <div>
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Topic Spinner</h1>
          <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
            <span>🏠</span>
            Back to Home
          </a>
        </div>

        {/* Rules / Fun ideas */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold">How to play</h2>
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Press <strong>Spin Topic</strong> to get a random topic.</li>
            <li>If you add custom topics and enable <em>Use my topics only</em>, only your topics will be used.</li>
            <li>Fun rule examples: say a fact about the topic, act it out, or vote who knows it best.</li>
            <li>Optional: if a topic is embarrassing, the spinner can assign a silly penalty (sing, dance, or tell a story).</li>
          </ul>
        </div>

        {/* Custom topics input / toggle */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={useCustom} onChange={() => setUseCustom(v => !v)} />
            <span className="text-sm">Use my topics only</span>
          </label>

          <div className="mt-3 flex gap-2">
            <input
              value={inputTopic}
              onChange={e => setInputTopic(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Add a topic (e.g. 'Ice cream flavors')"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button onClick={addTopic} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
          </div>

          {customTopics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {customTopics.map((t, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2">
                  <span className="text-sm">{t}</span>
                  <button onClick={() => removeCustom(idx)} className="text-red-500 text-xs">✕</button>
                </span>
              ))}
            </div>
          )}

          {useCustom && customTopics.length === 0 && (
            <div className="mt-2 text-sm text-yellow-700">You enabled custom topics but haven't added any yet.</div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-12 rounded-lg text-center mb-6 min-h-32 flex items-center justify-center">
            {topic ? (
              <p className="text-3xl font-bold text-white">{topic}</p>
            ) : (
              <p className="text-gray-200">Spin for a topic</p>
            )}
          </div>
          <button
            onClick={spin}
            disabled={spinning || (useCustom && customTopics.length === 0)}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 font-semibold disabled:bg-gray-400"
          >
            {spinning ? 'Spinning...' : 'Spin Topic'}
          </button>
        </div>
        <div className="mt-4"><AdSlot /></div>
      </div>
    </Layout>
  )
}
