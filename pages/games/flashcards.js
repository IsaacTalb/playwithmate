import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'
import flash from '../../src/data/flashcards.json'


export default function Flashcards(){
const categories = Object.keys(flash)
const [cat, setCat] = useState(categories[0])
const [idx, setIdx] = useState(0)
const [showBack, setShowBack] = useState(false)


const cards = flash[cat]
const next = ()=>{ setShowBack(false); setIdx((i)=> (i+1)%cards.length) }
return (
<div className="p-4 max-w-xl mx-auto">
    <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Flashcards - {cat}</h1>
        <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
        <span>🏠</span>
        Back to Home
        </a>
    </div>
    <div className="mt-3 flex gap-2">
        {categories.map(c=> <button key={c} onClick={()=>{setCat(c); setIdx(0)}} className={`p-2 rounded ${c===cat? 'bg-slate-700 text-white':'bg-white'}`}>{c}</button>)}
    </div>
    <div onClick={()=>setShowBack(s=>!s)} className="mt-4 bg-gray-50 border-2 border-gray-300 p-6 rounded-lg shadow text-center cursor-pointer min-h-[120px]">
        {!showBack? cards[idx].front : cards[idx].back}
        <span className="block mt-4 text-sm text-gray-500">Click card to {showBack? 'see question':'see answer'}</span>  
    </div>
    <div className="mt-3 flex gap-2">
        <button onClick={()=>setIdx((i)=> i===0?cards.length-1:i-1)} className="flex-1 p-2 rounded bg-gray-200">Prev</button>
        <button onClick={next} className="flex-1 p-2 rounded bg-gray-200">Next</button>
    </div>
    <div className="mt-4"><AdSlot /></div>
</div>
)
}