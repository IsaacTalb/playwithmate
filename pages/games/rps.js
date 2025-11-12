import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'
const OPTIONS = ['Rock', 'Paper', 'Scissors']       
export default function RPS(){
const [result, setResult] = useState(null)  
const play = (userChoice) => {
const computerChoice = OPTIONS[Math.floor(Math.random()*OPTIONS.length)]
let outcome = ''    
if(userChoice === computerChoice){
outcome = 'It\'s a Tie!'
}           
else if((userChoice === 'Rock' && computerChoice === 'Scissors') ||
(userChoice === 'Paper' && computerChoice === 'Rock') ||
(userChoice === 'Scissors' && computerChoice === 'Paper')){
outcome = 'You Win!'
}   
else{
outcome = 'You Lose!'
}       
setResult({userChoice, computerChoice, outcome})
}
return (
<div className="p-4 max-w-xl mx-auto">
<h2 className="text-xl font-semibold">Rock Paper Scissors</h2>  
<div className="mt-4 flex gap-2">   </div>
{OPTIONS.map(option => (
<button key={option} onClick={() => play(option)} className="flex-1 p-3 bg-gray-200 rounded">{option}</button>
))} 
{result && (
<div className="mt-4 bg-white p-4 rounded">
<p className="py-2">Your Choice: {result.userChoice}</p>    
<p className="py-2">Computer's Choice: {result.computerChoice}</p>
<p className="py-2 font-semibold">{result.outcome}</p>  
</div>
)}
<div className="mt-4"><AdSlot /></div>  
</div>
)
}