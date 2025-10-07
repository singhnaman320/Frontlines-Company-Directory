import React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setItemsPerPage } from '../store/companiesSlice'

const Pagination = () => {
  const dispatch = useDispatch()
  const { pagination } = useSelector(state => state.companies)
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page))
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    dispatch(setItemsPerPage(newItemsPerPage))
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first few pages
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        // Show current page with context
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (totalPages <= 1) {
    return null // Don't show pagination if only one page
  }

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Info */}
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
          
          {/* Items per page selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-700 hidden sm:block">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center sm:justify-end">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed border-gray-200 bg-gray-50'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border-gray-300 bg-white shadow-sm'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-2">
              {pageNumbers.map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-400 flex items-center justify-center">
                      <MoreHorizontal className="h-4 w-4" />
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] h-10 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 border ${
                        currentPage === page
                          ? 'bg-primary-600 text-white border-primary-600 shadow-md transform scale-105'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border-gray-300 bg-white shadow-sm hover:shadow-md'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed border-gray-200 bg-gray-50'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border-gray-300 bg-white shadow-sm'
              }`}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile-only simplified pagination */}
      <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-gray-200">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed border-gray-200 bg-gray-50'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border-gray-300 bg-white shadow-sm'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Page</span>
          <span className="px-3 py-1 text-sm font-bold text-primary-600 bg-primary-50 rounded-lg border border-primary-200">
            {currentPage}
          </span>
          <span className="text-sm text-gray-500">of {totalPages}</span>
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed border-gray-200 bg-gray-50'
              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border-gray-300 bg-white shadow-sm'
          }`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
