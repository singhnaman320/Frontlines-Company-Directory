import { Loader2 } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-12">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary-600 animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Companies</h3>
        <p className="text-gray-600 text-center">
          Please wait while we fetch the latest company data...
        </p>
        
        {/* Loading skeleton */}
        <div className="w-full max-w-4xl mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
