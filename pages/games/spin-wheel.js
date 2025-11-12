import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'
const OPTIONS = ['Truth','Dare','Quiz','Mystery']


export default function SpinWheel(){
const [result, setResult] = useState(null)
const spin = () => {
const pick = OPTIONS[Math.floor(Math.random()*OPTIONS.length)]
setResult(pick)
}
return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Spin the Wheel</h2>
<div className="mt-4 flex gap-2">
<button onClick={spin} className="flex-1 p-3 bg-yellow-500 rounded">Spin</button>
</div>
{result && <div className="mt-4 bg-white p-4 rounded">Result: {result}</div>}
<div className="mt-4"><AdSlot /></div>
</div>
)
}