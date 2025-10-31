export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-96 lg:h-[500px] bg-muted rounded-lg"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-48 mb-4"></div>
                <div className="h-8 bg-muted rounded w-40 mb-6"></div>
              </div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
