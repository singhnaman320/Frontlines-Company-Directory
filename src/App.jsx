import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from './store/companiesSlice'
import Header from './components/Header'
import FilterPanel from './components/FilterPanel'
import CompanyList from './components/CompanyList'
import companiesData from './data/companies.json'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Simulate loading companies from API
    const loadData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        dispatch(setCompanies(companiesData))
      } catch (error) {
        console.error('Error loading companies:', error)
      }
    }
    
    loadData()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          <FilterPanel />
          <CompanyList />
        </div>
      </main>
    </div>
  )
}

export default App
