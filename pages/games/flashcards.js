import { useState } from 'react'
import AD from '../../src/components/AdSlot'
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
<h2 className="text-xl font-semibold">Flashcards — {cat}</h2>
<div className="mt-3 flex gap-2">
{categories.map(c=> <button key={c} onClick={()=>{setCat(c); setIdx(0)}} className={`p-2 rounded ${c===cat? 'bg-slate-700 text-white':'bg-white'}`}>{c}</button>)}
</div>


<div onClick={()=>setShowBack(s=>!s)} className="mt-4 bg-white p-6 rounded shadow text-center cursor-pointer min-h-[120px]">
{!showBack? cards[idx].front : cards[idx].back}
</div>


<div className="mt-3 flex gap-2">
<button onClick={()=>setIdx((i)=> i===0?cards.length-1:i-1)} className="flex-1 p-2 rounded bg-gray-200">Prev</button>
<button onClick={next} className="flex-1 p-2 rounded bg-gray-200">Next</button>
</div>


<div className="mt-4"><AD /></div>
</div>
)
}