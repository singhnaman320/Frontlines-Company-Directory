import { ExternalLink, MapPin, Users, Calendar, DollarSign } from 'lucide-react'

const CompanyCards = ({ companies }) => {
  return (
    <div className="p-3 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=6b7280&color=ffffff&size=64`
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate h-6 leading-6">
                    {company.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                    {company.industry}
                  </span>
                </div>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 p-1 flex-shrink-0"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            {/* Description */}
            <div className="flex-1 mb-4">
              <p className="text-gray-600 text-sm line-clamp-3 h-[60px] overflow-hidden">
                {company.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 truncate">{company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {company.employees.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">Est. {company.founded}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {company.revenue}
                </span>
              </div>
            </div>

            {/* Footer - Always at bottom */}
            <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Visit Website</span>
                <span className="sm:hidden">Visit</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyCards
