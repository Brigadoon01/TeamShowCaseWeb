import dynamic from "next/dynamic"

// Lazy load the TeamShowcase component
const TeamShowcase = dynamic(() => import("@/components/team-showcase"), {
  loading: () => (
    <div className="w-full max-w-7xl mx-auto p-6 text-center">
      <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  ),
  ssr: true,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <TeamShowcase itemsPerPage={6} />
    </main>
  )
}
