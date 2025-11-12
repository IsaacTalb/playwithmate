import { useState, useEffect } from 'react'
import Layout from '../../src/components/Layout'
import trivia from '../../src/data/trivia_samples.json'

export default function Trivia() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)

  const question = trivia[currentIndex]

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    if (answer === question.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < trivia.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    }
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">Trivia</h1>
        <p className="text-gray-600 mb-6">Score: {score}/{trivia.length}</p>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg font-semibold mb-6">{question.question}</p>
          <div className="space-y-2 mb-6">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(answer)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 rounded border-2 text-left font-semibold transition-colors ${
                  selectedAnswer === null
                    ? 'border-gray-300 hover:border-blue-500'
                    : answer === question.correct
                    ? 'border-green-500 bg-green-50'
                    : selectedAnswer === answer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button
              onClick={handleNext}
              disabled={currentIndex === trivia.length - 1}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {currentIndex === trivia.length - 1 ? 'Quiz Complete!' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
