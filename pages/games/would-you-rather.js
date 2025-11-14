import data from '../../src/data/would_you_rather.json'
import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'


export default function WouldYouRather(){
const [pair, setPair] = useState(null)
const pick = () => setPair(data[Math.floor(Math.random()*data.length)])


return (
    <div className="p-4 max-w-xl mx-auto">
        <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Would you Rather</h1>
                <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                    <span>🏠</span>
                    Back to Home
                </a>
        </div>
        <div className="mt-4">
            <button onClick={pick} className="p-3 bg-indigo-600 text-white w-full rounded">Pick</button>
        </div>


        {pair && (
        <div className="mt-4 bg-white p-4 rounded">
            <p className="py-2">A: {pair.option1}</p>
            <p className="py-2">B: {pair.option2}</p>
        </div>
        )}


        <div className="mt-4"><AdSlot /></div>
    </div>
    )
}