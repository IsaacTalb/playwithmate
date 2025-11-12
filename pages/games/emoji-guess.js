import { useState } from 'react'
import Layout from '../../src/components/Layout'
import emojis from '../../src/data/emoji_guesses.json'

export default function EmojiGuess() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const guesses = [
    { emoji: "🎂🐀", answer: "Birthday Rat" },
    { emoji: "🚂🎫", answer: "Train Ticket" },
    { emoji: "🧊👑", answer: "Ice King" },
    { emoji: "🍕🍕🍕", answer: "Three Pizzas" },
    { emoji: "🏃‍♂️👻", answer: "Running from Ghost" }
  ]

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Emoji Guess</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center text-sm text-gray-500 mb-4">{currentIndex + 1} / {guesses.length}</p>
          <p className="text-6xl text-center mb-4 cursor-pointer" onClick={() => setShowAnswer(!showAnswer)}>
            {guesses[currentIndex].emoji}
          </p>
          {showAnswer && (
            <p className="text-lg text-center text-green-600 font-semibold mb-4">
              Answer: {guesses[currentIndex].answer}
            </p>
          )}
          <p className="text-sm text-center text-gray-500 mb-4">Click emoji to reveal answer</p>
          <button 
            onClick={() => {
              setCurrentIndex((currentIndex + 1) % guesses.length)
              setShowAnswer(false)
            }}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}
