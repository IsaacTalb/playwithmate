import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto p-4">
        
        {children}
      </div>
    </div>
  )
}
