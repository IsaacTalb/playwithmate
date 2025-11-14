import { useState } from 'react'
import AdSlot from '../../src/components/AdSlot'


const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]


export default function TicTacToe(){
const [board,setBoard]=useState(Array(9).fill(null))
const [xNext,setXNext]=useState(true)


const winner = (()=>{
for(const [a,b,c] of lines){
if(board[a] && board[a]===board[b] && board[a]===board[c]) return board[a]
}
return null
})()


const play = (i)=>{
if(board[i] || winner) return
const b = board.slice(); b[i]= xNext? 'X':'O'
setBoard(b); setXNext(!xNext)
}


const reset = ()=>{ setBoard(Array(9).fill(null)); setXNext(true) }


return (
    <div className="p-4 max-w-md mx-auto">
        <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
                <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                    <span>🏠</span>
                    Back to Home
                </a>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4 ">
            {board.map((v,i)=> (
            <button key={i} onClick={()=>play(i)} className="w-20 h-20 bg-white border-blue-400 border-4 rounded text-2xl">{v}</button>
            ))}
        </div>
        <div className="mt-4 flex gap-2">
        <div className="flex-1 p-3 bg-gray-200 rounded">{winner? `Winner: ${winner}`: `Turn: ${xNext? 'X':'O'}`}</div>
            <button onClick={reset} className="p-3 bg-red-500 text-white rounded">Reset</button>
        </div>
        <div className="mt-4"><AdSlot /></div>
    </div>
)
}