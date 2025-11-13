import { useState } from 'react'
import Layout from '../../src/components/Layout'

export default function RandomChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Random Challenge</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-center mb-8">Here's a random challenge for you:</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-700 text-lg font-semibold">Challenge goes here</p>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Get Another Challenge
          </button>
        </div>
      </div>
    </Layout>
  )
}
