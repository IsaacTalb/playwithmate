export default function GameCard({ title, desc }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  )
}
