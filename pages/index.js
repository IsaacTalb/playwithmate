import Link from 'next/link'
import GameCard from '../src/components/GameCard'
import { GAMES } from '../src/utils/catalog'


export default function Home() {
return (
<div className="max-w-xl mx-auto p-4">
<header className="text-center py-6">
<h1 className="text-3xl font-bold">PlayWithMate 🎲</h1>
<p className="mt-2 text-sm text-gray-600">Games for couples, friends, family & homies</p>
</header>


<div className="grid grid-cols-2 gap-3">
{GAMES.map(g => (
<Link key={g.slug} href={`/games/${g.slug}`}>
<GameCard title={g.name} desc={g.description} />
</Link>
))}
</div>


<footer className="mt-6 text-center text-xs text-gray-500">
<p>Enter passcode to hide most ads: <strong>playwithmate.online</strong></p>
</footer>
</div>
)
}