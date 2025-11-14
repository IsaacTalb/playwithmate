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
    <div className="p-4 max-w-xl mx-auto ">
        <div className="flex flex-row items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Rock Paper Scissors</h1>
            <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                <span>🏠</span>
                Back to Home
            </a>
        </div>  
        <div className="mt-4 max-w-xl flex gap-2">   </div>
        {OPTIONS.map(option => (
            <button key={option} onClick={() => play(option)} className="flex-1 p-3 bg-gray-200 mr-4 rounded border border-gray-400 hover:bg-gray-300">
                {option}
            </button>
        ))} 
        {result && (
            <div className="mt-4 bg-white p-4 rounded border border-gray-300">
                <p className="py-2">Your Choice: {result.userChoice}</p>    
                <p className="py-2">Team Choice: {result.computerChoice}</p>
                <p className="py-2 font-semibold">{result.outcome}</p>  
            </div>
        )}
        <div className="mt-4"><AdSlot /></div>  
    </div>
)
}