import { useState } from 'react'
import data from '../../src/data/truth_dare.json'
import AdSlot from '../../src/components/AdSlot'


export default function TruthOrDare(){
const [mode, setMode] = useState('truth')
const [item, setItem] = useState('')


const pick = () => {
const list = data[mode]
setItem(list[Math.floor(Math.random()*list.length)])
}


return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Truth or Dare</h2>
<div className="mt-3 flex gap-2">
<button onClick={()=>setMode('truth')} className={`flex-1 p-3 rounded ${mode==='truth'? 'bg-blue-500 text-white':'bg-white'}`}>Truth</button>
<button onClick={()=>setMode('dare')} className={`flex-1 p-3 rounded ${mode==='dare'? 'bg-pink-500 text-white':'bg-white'}`}>Dare</button>
</div>


<div className="mt-4">
<button onClick={pick} className="w-full p-3 bg-green-500 text-white rounded">Pick {mode}</button>
</div>


{item && (
<div className="mt-4 p-4 bg-white rounded shadow">{item}</div>
)}


<div className="mt-4">
<AdSlot />
</div>
</div>
)
}