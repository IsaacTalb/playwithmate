import { useState, useEffect } from 'react'
import Layout from '../../src/components/Layout'
import questions from "../../src/data/most_likely.json"
import AdSlot from '../../src/components/AdSlot'

export default function MostLikely() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * questions.length))
  }, [])

  const handleNext = () => {
    setCurrentIndex(Math.floor(Math.random() * questions.length));
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-row items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Most Likely</h1>
            <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
            <span>🏠</span>
            Back to Home
            </a>
        </div>
        <div className="bg-gray-50 border-2 border-gray-300 p-6 rounded-lg shadow">
          <p className="text-lg text-center mb-8">Pick a question and tell why do you think that.</p>
          <span className="block mb-4 text-center text-sm text-gray-500">Question {currentIndex + 1} of {questions.length}</span>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-700 text-lg font-semibold">{questions[currentIndex].question}</p>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleNext}>
            Next
          </button>
        </div>
        <div className="mt-4"><AdSlot /></div>
      </div>
    </Layout>
  )
}
