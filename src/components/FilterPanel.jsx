import { Search, Filter, X, Grid, List } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters, clearFilters, setViewMode } from '../store/companiesSlice'

const FilterPanel = () => {
  const dispatch = useDispatch()
  const { filters, companies, filteredCompanies, viewMode, pagination } = useSelector(state => state.companies)
  
  // Get unique industries and locations for filter dropdowns
  const industries = [...new Set(companies.map(company => company.industry))].sort()
  const locations = [...new Set(companies.map(company => {
    const parts = company.location.split(', ')
    return parts[parts.length - 1] // Get state/country part
  }))].sort()

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Companies</h2>
            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
              {filteredCompanies.length} results
              {pagination.totalPages > 1 && (
                <span className="hidden sm:inline"> • Page {pagination.currentPage} of {pagination.totalPages}</span>
              )}
            </span>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Filters</span>
                <span className="sm:hidden">Clear</span>
              </button>
            )}
            
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => dispatch(setViewMode('table'))}
                className={`p-2 rounded ${viewMode === 'table' 
                  ? 'bg-white shadow-sm text-primary-600' 
                  : 'text-gray-600 hover:text-gray-800'
                }`}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => dispatch(setViewMode('card'))}
                className={`p-2 rounded ${viewMode === 'card' 
                  ? 'bg-white shadow-sm text-primary-600' 
                  : 'text-gray-600 hover:text-gray-800'
                }`}
                title="Card View"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Industry Filter */}
        <div>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="select-field"
          >
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="select-field"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Employee Range Filter */}
        <div>
          <select
            value={filters.employeeRange}
            onChange={(e) => handleFilterChange('employeeRange', e.target.value)}
            className="select-field"
          >
            <option value="">All Sizes</option>
            <option value="1-100">1-100 employees</option>
            <option value="101-500">101-500 employees</option>
            <option value="501-1000">501-1,000 employees</option>
            <option value="1001-5000">1,001-5,000 employees</option>
            <option value="5000+">5,000+ employees</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
