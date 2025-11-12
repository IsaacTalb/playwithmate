import { useState } from 'react'
import Layout from '../../src/components/Layout'

export default function TopicSpinner() {
  const [topic, setTopic] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const topics = ['Sports', 'Movies', 'Travel', 'Food', 'Music', 'Technology', 'Nature', 'History']

  const spin = () => {
    setSpinning(true)
    setTopic(null)
    setTimeout(() => {
      setTopic(topics[Math.floor(Math.random() * topics.length)])
      setSpinning(false)
    }, 1500)
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Topic Spinner</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-12 rounded-lg text-center mb-6 min-h-32 flex items-center justify-center">
            {topic ? (
              <p className="text-3xl font-bold text-white">{topic}</p>
            ) : (
              <p className="text-gray-200">Spin for a topic</p>
            )}
          </div>
          <button
            onClick={spin}
            disabled={spinning}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 font-semibold disabled:bg-gray-400"
          >
            {spinning ? 'Spinning...' : 'Spin Topic'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
