import { useState } from 'react'
import Layout from '../../src/components/Layout'
import AdSlot from '../../src/components/AdSlot'

export default function RandomChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Layout>
      <div>
        <div className="flex flex-row items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Random Challenge</h1>
            <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
            <span>🏠</span>
            Back to Home
            </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-center mb-8">Here's a random challenge for you:</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-700 text-lg font-semibold">Challenge goes here</p>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Get Another Challenge
          </button>
        </div>
        <div className="mt-4"><AdSlot /></div>
      </div>
    </Layout>
  )
}
