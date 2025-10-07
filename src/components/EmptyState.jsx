import { Search, Building2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { clearFilters } from '../store/companiesSlice'

const EmptyState = () => {
  const dispatch = useDispatch()

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-12">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Companies Found
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We couldn't find any companies matching your current filters. 
          Try adjusting your search criteria or clearing all filters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleClearFilters}
            className="btn-primary"
          >
            Clear All Filters
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Refresh Data
          </button>
        </div>
        
        {/* Suggestions */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Search Tips:</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Try broader search terms</li>
            <li>• Check for typos in company names</li>
            <li>• Use different industry or location filters</li>
            <li>• Search by company description keywords</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
