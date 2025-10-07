import { useSelector } from 'react-redux'
import CompanyTable from './CompanyTable'
import CompanyCards from './CompanyCards'
import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'
import Pagination from './Pagination'

const CompanyList = () => {
  const { paginatedCompanies, filteredCompanies, loading, error, viewMode } = useSelector(state => state.companies)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">Error loading companies: {error}</p>
      </div>
    )
  }

  if (filteredCompanies.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {viewMode === 'table' ? (
        <CompanyTable companies={paginatedCompanies} />
      ) : (
        <CompanyCards companies={paginatedCompanies} />
      )}
      <Pagination />
    </div>
  )
}

export default CompanyList
