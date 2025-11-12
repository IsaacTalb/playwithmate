import { useState, useEffect } from 'react'
import AdSlot from '../../src/components/AdSlot'
const SAMPLE = [
'Sing a song chorus in 30s',
'Do 10 push-ups in 30s',
'Tell a secret in 30s',
'Draw a cat in 30s'
]


export default function QuickChallenge(){
const [challenge, setChallenge] = useState(null)
const [time, setTime] = useState(30)
const [running, setRunning] = useState(false)


useEffect(()=>{
if(!running) return
if(time===0){ setRunning(false); return }
const t = setTimeout(()=> setTime(t=>t-1),1000)
return ()=>clearTimeout(t)
},[running,time])


const start = ()=>{ setChallenge(SAMPLE[Math.floor(Math.random()*SAMPLE.length)]); setTime(30); setRunning(true) }


return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Quick Challenge Timer</h2>
<div className="mt-4">
<button onClick={start} className="w-full p-3 bg-green-600 text-white rounded">Start 30s Challenge</button>
</div>
{challenge && (
<div className="mt-4 bg-white p-4 rounded">
<p>{challenge}</p>
<p className="text-2xl mt-2">{time}s</p>
</div>
)}
<div className="mt-4"><AdSlot /></div>
</div>
)
}