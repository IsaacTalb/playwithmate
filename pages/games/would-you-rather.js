import data from '../../src/data/would_you_rather.json'
import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'


export default function WouldYouRather(){
const [pair, setPair] = useState(null)
const pick = () => setPair(data[Math.floor(Math.random()*data.length)])


return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Would You Rather</h2>
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