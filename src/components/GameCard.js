export default function GameCard({ title, desc }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm transform transition-transform hover:scale-105 hover:shadow-lg hover:border-gray-300">
      <h3 className="font-semibold text-gray-900 text-lg transition-colors hover:text-blue-600">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}
