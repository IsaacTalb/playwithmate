import { useState } from 'react'

export default function PasscodeModal({ onClose, onSubmit }) {
  const [passcode, setPasscode] = useState('')

  const handleSubmit = () => {
    onSubmit(passcode)
    setPasscode('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Enter Passcode</h2>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter passcode"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
