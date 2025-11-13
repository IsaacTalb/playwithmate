import { useState } from 'react'
import Layout from '../../src/components/Layout'
import emojis from '../../src/data/emoji_guesses.json'

export default function EmojiGuess() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const guesses = [
    { emoji: "⚽🏆", answer: "World Cup" },
    { emoji: "🦇👨", answer: "Batman" },
    { emoji: "🕷️👨", answer: "Spiderman" },
    { emoji: "🌭", answer: "Hot Dog" },
    { emoji: "🛸👽", answer: "UFO" },
    { emoji: "👂✨", answer: "Earrings" },
    { emoji: "⚽👟", answer: "Football" },
    { emoji: "🦸‍♂️💛", answer: "Superman" },
    { emoji: "🧙‍♂️🪄", answer: "Wizard" },
    { emoji: "🏀🏀", answer: "Basketball" },
    { emoji: "🐧🕵️", answer: "Penguin Spy" },
    { emoji: "🚀🌙", answer: "Moon Landing" },
    { emoji: "⚡🧑", answer: "Flash" },
    { emoji: "🎸🎵", answer: "Rock Star" },
    { emoji: "🍕🍕", answer: "Pizza Party" },
    { emoji: "⭐💰", answer: "Starbucks" },
    { emoji: "🔥🦊", answer: "Firefox" },
    { emoji: "⬆️🧭😊", answer: "North Face" },
    { emoji: "👨👨👨👨👨", answer: "Five Guys" },
    { emoji: "👛🌊🐷", answer: "Percy Pig" },
    { emoji: "🌮🔔", answer: "Taco Bell" },
    { emoji: "☁️☀️🌧🥄🥄", answer: "Wetherspoons" },
    { emoji: "🚫🔑", answer: "Nokia" },
    { emoji: "🔋🐰", answer: "Energizer" },
    { emoji: "👀📱", answer: "iPhone" },
    { emoji: "🐊", answer: "Crocs" },
    { emoji: "🌽❄️❄️", answer: "Cornflakes" },
    { emoji: "🪁🐱", answer: "KitKat" },
    { emoji: "🧸🫐", answer: "Burberry" },
    { emoji: "👁️🔑", answer: "IKEA" }
  ]

  return (
    <Layout>
      <div>
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Emoji Guess</h1>
          <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
            <span>🏠</span>
            Back to Home
          </a>
        </div>
        
        <div className="bg-gray-50 border-2 border-gray-300 p-6 rounded-lg shadow">
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
