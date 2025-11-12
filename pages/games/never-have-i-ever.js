import data from '../../src/data/never_have_i_ever.json'
import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'


export default function NeverHaveIEver(){
const [item, setItem] = useState('')
const pick = () => setItem(data[Math.floor(Math.random()*data.length)])
return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Never Have I Ever</h2>
<button onClick={pick} className="mt-4 w-full p-3 rounded bg-purple-600 text-white">Pick</button>
{item && <div className="mt-4 bg-white p-4 rounded">{item}</div>}
<div className="mt-4"><AdSlot /></div>
</div>
)
}