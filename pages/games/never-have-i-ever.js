import data from '../../src/data/never_have_i_ever.json'
import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'


export default function NeverHaveIEver(){
    const [item, setItem] = useState('')
    const [mode, setMode] = useState('finger') // 'finger' or 'drink'
    const pick = () => setItem(data[Math.floor(Math.random()*data.length)])

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Never Have I Ever</h1>
                <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                    <span>🏠</span>
                    Back to Home
                </a>
            </div>

            {/* Rules / Explanation */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="font-semibold">How to play</h2>
                <div className="mt-2 text-sm text-gray-700">
                    <li>Everyone raises their left hand with 5 or 10 fingers (choose before the game).</li>
                    <li>The host reads a statement starting with “Never Have I Ever…”</li>
                    <li>If you HAVE done it, you must:
                        Fold one finger, AND
                        Do the fun action for that round (examples below).
                    </li>
                    <li>If you have NEVER done it, you do nothing and keep your fingers up.</li>
                    <li>Special Twist: Every 5th question is a “Dare Round” — anyone who has done it must do a mini dare.</li>
                    <li>The last person with fingers left is the winner.</li>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Action:</span>
                    <button
                        onClick={() => setMode('finger')}
                        className={`px-3 py-1 rounded ${mode === 'finger' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >Put a finger down</button>
                    <button
                        onClick={() => setMode('drink')}
                        className={`px-3 py-1 rounded ${mode === 'drink' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >Take a drink</button>
                </div>

                <div className="mt-3 text-sm text-gray-800">
                    <strong>Example:</strong>
                    <div className="mt-1">Statement: <em>"Had a car accident"</em></div>
                    <div className="mt-1">If you <strong>have</strong> had a car accident → <span className="font-semibold">{mode === 'finger' ? 'put a finger down' : 'take a drink'}</span>.</div>
                    <div className="mt-1">If you <strong>have never</strong> had a car accident → do nothing.</div>
                </div>
            </div>

            <button onClick={pick} className="mt-2 w-full p-3 rounded bg-purple-600 text-white">Pick</button>
            {item && <div className="mt-4 bg-white p-4 rounded">{item}</div>}
            <div className="mt-4"><AdSlot /></div>
        </div>
    )
}