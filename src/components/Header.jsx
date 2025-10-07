import { Building2, Users, TrendingUp } from 'lucide-react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { companies, filteredCompanies } = useSelector(state => state.companies)
  
  const totalEmployees = companies.reduce((sum, company) => sum + company.employees, 0)
  const averageRevenue = companies.length > 0 
    ? companies.reduce((sum, company) => {
        const revenue = parseFloat(company.revenue.replace(/[$M]/g, ''))
        return sum + revenue
      }, 0) / companies.length
    : 0

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              <span className="hidden sm:inline">Companies Directory</span>
              <span className="sm:hidden">Companies</span>
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Discover and explore companies across various industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full md:w-auto">
            <div className="bg-primary-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                <div>
                  <p className="text-xs sm:text-sm text-primary-600 font-medium">Companies</p>
                  <p className="text-lg sm:text-xl font-bold text-primary-700">
                    {filteredCompanies.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <div>
                  <p className="text-xs sm:text-sm text-green-600 font-medium">Employees</p>
                  <p className="text-lg sm:text-xl font-bold text-green-700">
                    {totalEmployees.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <div>
                  <p className="text-xs sm:text-sm text-orange-600 font-medium">Avg Revenue</p>
                  <p className="text-lg sm:text-xl font-bold text-orange-700">
                    ${averageRevenue.toFixed(0)}M
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
