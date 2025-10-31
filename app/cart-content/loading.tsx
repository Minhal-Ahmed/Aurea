export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-64 mb-8"></div>
          <div className="h-6 bg-muted rounded w-48 mb-8"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-muted rounded w-64 mb-6"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-border rounded-lg p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-8 bg-muted rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="border border-border rounded-lg p-6">
                <div className="h-6 bg-muted rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
