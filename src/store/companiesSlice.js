import { createSlice } from '@reduxjs/toolkit'
import companiesData from '../data/companies.json'

// Helper function to calculate pagination
const calculatePagination = (filteredCompanies, currentPage, itemsPerPage) => {
  const totalItems = filteredCompanies.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex)
  
  return {
    paginatedCompanies,
    totalItems,
    totalPages: totalPages || 1
  }
}

const initialState = {
  companies: [],
  filteredCompanies: [],
  paginatedCompanies: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    industry: '',
    location: '',
    employeeRange: '',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 9, // 9 items per page for better grid layout
    totalItems: 0,
    totalPages: 0
  },
  viewMode: 'table' // 'table' or 'card'
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    loadCompanies: (state) => {
      state.loading = true
      state.error = null
      // Simulate API call delay
      setTimeout(() => {
        state.companies = companiesData
        state.filteredCompanies = companiesData
        state.loading = false
      }, 1000)
    },
    setCompanies: (state, action) => {
      state.companies = action.payload
      state.filteredCompanies = action.payload
      state.loading = false
      
      // Calculate initial pagination
      const paginationResult = calculatePagination(
        action.payload, 
        state.pagination.currentPage, 
        state.pagination.itemsPerPage
      )
      
      state.paginatedCompanies = paginationResult.paginatedCompanies
      state.pagination.totalItems = paginationResult.totalItems
      state.pagination.totalPages = paginationResult.totalPages
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      
      // Apply filters
      let filtered = state.companies
      
      // Search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase()
        filtered = filtered.filter(company =>
          company.name.toLowerCase().includes(searchTerm) ||
          company.description.toLowerCase().includes(searchTerm) ||
          company.location.toLowerCase().includes(searchTerm)
        )
      }
      
      // Industry filter
      if (state.filters.industry) {
        filtered = filtered.filter(company => 
          company.industry === state.filters.industry
        )
      }
      
      // Location filter (by state/city)
      if (state.filters.location) {
        filtered = filtered.filter(company =>
          company.location.toLowerCase().includes(state.filters.location.toLowerCase())
        )
      }
      
      // Employee range filter
      if (state.filters.employeeRange) {
        filtered = filtered.filter(company => {
          const employees = company.employees
          switch (state.filters.employeeRange) {
            case '1-100':
              return employees >= 1 && employees <= 100
            case '101-500':
              return employees >= 101 && employees <= 500
            case '501-1000':
              return employees >= 501 && employees <= 1000
            case '1001-5000':
              return employees >= 1001 && employees <= 5000
            case '5000+':
              return employees > 5000
            default:
              return true
          }
        })
      }
      
      state.filteredCompanies = filtered
      
      // Reset to first page when filters change
      state.pagination.currentPage = 1
      
      // Recalculate pagination
      const paginationResult = calculatePagination(
        filtered, 
        1, 
        state.pagination.itemsPerPage
      )
      
      state.paginatedCompanies = paginationResult.paginatedCompanies
      state.pagination.totalItems = paginationResult.totalItems
      state.pagination.totalPages = paginationResult.totalPages
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        industry: '',
        location: '',
        employeeRange: '',
      }
      state.filteredCompanies = state.companies
      
      // Reset to first page when filters are cleared
      state.pagination.currentPage = 1
      
      // Recalculate pagination
      const paginationResult = calculatePagination(
        state.companies, 
        1, 
        state.pagination.itemsPerPage
      )
      
      state.paginatedCompanies = paginationResult.paginatedCompanies
      state.pagination.totalItems = paginationResult.totalItems
      state.pagination.totalPages = paginationResult.totalPages
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
      
      // Recalculate pagination for new page
      const paginationResult = calculatePagination(
        state.filteredCompanies, 
        action.payload, 
        state.pagination.itemsPerPage
      )
      
      state.paginatedCompanies = paginationResult.paginatedCompanies
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload
      state.pagination.currentPage = 1 // Reset to first page
      
      // Recalculate pagination with new items per page
      const paginationResult = calculatePagination(
        state.filteredCompanies, 
        1, 
        action.payload
      )
      
      state.paginatedCompanies = paginationResult.paginatedCompanies
      state.pagination.totalPages = paginationResult.totalPages
    }
  },
})

export const {
  setLoading,
  setError,
  loadCompanies,
  setCompanies,
  setFilters,
  clearFilters,
  setViewMode,
  setCurrentPage,
  setItemsPerPage
} = companiesSlice.actions

export default companiesSlice.reducer
