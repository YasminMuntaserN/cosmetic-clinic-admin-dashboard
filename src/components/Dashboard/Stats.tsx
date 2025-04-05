import { Users, UserRound, Calendar, Package } from 'lucide-react';

const statsInfo = [
  { name: 'Total Doctors', value: '12', icon: Users, change: '+2', changeType: 'increase' },
  { name: 'Active Patients', value: '240', icon: UserRound, change: '+30', changeType: 'increase' },
  { name: 'Appointments Today', value: '18', icon: Calendar, change: '-2', changeType: 'decrease' },
  { name: 'Products in Stock', value: '45', icon: Package, change: '+5', changeType: 'increase' },
];

export function Stats(){
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsInfo.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-secondary p-3">
                <stat.icon className="h-6 w-6 text-basic" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>
  )
}