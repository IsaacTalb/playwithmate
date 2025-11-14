import Link from 'next/link'
import GameCard from '../src/components/GameCard'
import { GAMES } from '../src/utils/catalog'

export default function Home() {
  return (
    <>
      <header className="py-8">
        <div className="flex items-center justify-center gap-4">
          <img src="/assets/android-chrome-512x512.png" alt="PlayWithMate" className="w-14 h-14" />
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold">PlayWithMate</h1>
            <p className="mt-1 text-sm text-gray-600">Quick party games, icebreakers, trivia and more — for couples, friends & family</p>
          </div>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-r from-teal-100 to-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-700">Welcome! Choose a game below to get started. Tap any card to open the game page.</p>
          <div className="mt-3 flex gap-2">
            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold">Free</span>
            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold">No sign-in</span>
            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold">Play anywhere</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {GAMES.map(g => (
            <Link key={g.slug} href={`/games/${g.slug}`}>
              <GameCard title={g.name} desc={g.description} />
            </Link>
          ))}
        </div>

        <div className="mt-2 p-3 text-xs text-gray-500">
          <p>
            Tip: Use the <strong>Exit</strong> button on game pages to return here quickly. Want a new game added? Open an issue on the repo.
          </p>
        </div>
      </section>

      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>Enter passcode to hide most ads: <strong>playwithmate.online</strong></p>
      </footer>
    </>
  )
}