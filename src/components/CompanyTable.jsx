import { ExternalLink, MapPin, Users, Calendar, DollarSign } from 'lucide-react'

const CompanyTable = ({ companies }) => {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Company</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Industry</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Employees</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Founded</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Revenue</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6b7280&color=ffffff&size=64`
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600 max-w-xs truncate">
                        {company.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {company.industry}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{company.employees.toLocaleString()}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{company.founded}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">{company.revenue}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {companies.map((company) => (
          <div key={company.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6b7280&color=ffffff&size=64`
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      {company.industry}
                    </span>
                  </div>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 p-1 flex-shrink-0"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {company.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 truncate">{company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600">{company.employees.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600">Est. {company.founded}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 font-medium">{company.revenue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CompanyTable
