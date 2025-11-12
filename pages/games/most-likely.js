import { useState } from 'react'
import Layout from '../../src/components/Layout'

export default function MostLikely() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Most Likely</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg text-center mb-8">Who is most likely to...?</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-700 text-lg font-semibold">Question goes here</p>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}
