import { useRef, useState } from 'react'
import AdSlot from '../../src/components/AdSlot'

import truthData from '../../src/data/truth_dare.json'
import challenges from '../../src/data/challenges.json'
import neverHave from '../../src/data/never_have_i_ever.json'
import mostLikely from '../../src/data/most_likely.json'
import wouldYouRather from '../../src/data/would_you_rather.json'
import emojiGuesses from '../../src/data/emoji_guesses.json'

// Number of segments on the wheel. Change this to add/remove numbered segments.
const SEGMENTS = 8

function makeColors(n) {
  const base = ["#FB923C", "#F97316", "#F59E0B", "#84CC16", "#10B981", "#06B6D4", "#3B82F6", "#8B5CF6", "#EC4899", "#F43F5E"]
  return Array.from({ length: n }, (_, i) => base[i % base.length])
}

  // Map each segment to a type/label so we can show meaningful prompts.
  // Keep this length equal to SEGMENTS (or it will wrap using mod).
  const SEGMENT_CONFIGS = [
    { label: 'Truth', type: 'truth' },
    { label: 'Dare', type: 'dare' },
    { label: 'Challenge', type: 'challenge' },
    { label: 'Never Have I Ever', type: 'never' },
    { label: 'Would You Rather', type: 'would' },
    { label: 'Most Likely', type: 'mostlikely' },
    { label: 'Emoji Guess', type: 'emoji' },
    { label: 'Spin Again', type: 'spin_again' }
  ]

  function sample(array){
    if (!array || array.length === 0) return ''
    return array[Math.floor(Math.random() * array.length)]
  }

  function samplePromptForConfig(cfg){
    switch (cfg.type){
      case 'truth':
        return sample(truthData.truths)
      case 'dare':
        return sample(truthData.dares)
      case 'challenge':
        return sample(challenges)
      case 'never':
        return sample(neverHave)
      case 'would': {
        const pick = sample(wouldYouRather)
        return pick ? `Would you rather: ${pick.option1} OR ${pick.option2}?` : ''
      }
      case 'mostlikely': {
        const pick = sample(mostLikely)
        return pick ? pick.question || JSON.stringify(pick) : ''
      }
      case 'emoji':
        return sample(emojiGuesses)
      case 'spin_again':
        return 'Spin again!'
      default:
        return ''
    }
  }

export default function SpinWheel(){
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null) // { index, label, prompt }
  const wheelRef = useRef(null)

  const segments = SEGMENTS
  const angle = 360 / segments
  const colors = makeColors(segments)

  const spin = () => {
    if (spinning) return
    setResult(null)
    setSpinning(true)

    const chosen = Math.floor(Math.random() * segments)
    const segmentCenter = chosen * angle + angle / 2
    const spins = 5 + Math.floor(Math.random() * 3) // 5-7 full spins
    const target = spins * 360 + (-90 - segmentCenter)

    setRotation(target)

    setTimeout(() => {
      setSpinning(false)

      // Determine the mapped result (label + prompt)
      const config = SEGMENT_CONFIGS[chosen % SEGMENT_CONFIGS.length]
      const prompt = samplePromptForConfig(config)

      setResult({ index: chosen + 1, label: config.label, prompt })
    }, 4200)
  }

  const gradient = colors.map((c, i) => {
    const start = i * angle
    const end = start + angle
    return `${c} ${start}deg ${end}deg`
  }).join(', ')

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Spin the Wheel</h1>
        <a href="/" className="flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50">
          <span>🏠</span>
          Back to Home
        </a>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Pointer */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-20">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-500" />
          </div>

          <div
            ref={wheelRef}
            className="w-72 h-72 rounded-full shadow-lg flex items-center justify-center"
            style={{
              background: `conic-gradient(${gradient})`,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(.08,.82,.17,1)' : 'transform 0.6s ease-out'
            }}
          >
            {Array.from({ length: segments }).map((_, i) => {
              const labelAngle = i * angle + angle / 2
              return (
                <div
                  key={i}
                  className="absolute text-sm w-8 text-center"
                  style={{
                    transform: `rotate(${labelAngle}deg) translateY(-120px) rotate(${-labelAngle}deg)`
                  }}
                >
                  <span className="block text-white font-bold">{i + 1}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 w-full max-w-sm">
          <button
            onClick={spin}
            disabled={spinning}
            className={`flex-1 py-3 rounded font-semibold text-white ${spinning ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'}`}
          >
            {spinning ? 'Spinning…' : 'Spin'}
          </button>
          <button
            onClick={() => { setResult(null); setRotation(0) }}
            className="py-3 px-4 rounded border border-gray-300"
          >Reset</button>
        </div>

        {result && (
          <div className="mt-4 bg-white p-4 rounded shadow w-full text-center">
            <p className="text-xl font-semibold">Segment #{result.index} — {result.label}</p>
            <p className="mt-2 text-lg">{result.prompt}</p>
          </div>
        )}
      </div>

      <div className="mt-6"><AdSlot /></div>
    </div>
  )
}
