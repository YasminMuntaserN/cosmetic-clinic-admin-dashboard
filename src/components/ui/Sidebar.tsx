import { NavLink } from 'react-router-dom';
import {Users, UserRound, Calendar, Package, Activity, Settings, Syringe, MessageSquareMore} from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Doctors', href: '/doctors', icon: Users },
  { name: 'Patients', href: '/patients', icon: UserRound },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Products', href: '/products', icon: Package }, 
  { name: 'Treatments', href: '/treatments', icon:Syringe },
  { name: 'Chat', href: `/chat/${"67db445d8a68fc0d9c1432e1"}`, icon:MessageSquareMore },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <Logo />
      <nav className="flex-1 space-y-5 px-2">
        {navigation.map((item) => (
          <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            cn(
              'group flex items-center px-4 py-3 text-sm font-medium rounded-md',
              isActive
                ? '  bg-gray-100 text-primary'
                : 'text-gray-700 hover:bg-secondary hover:text-basic'
            )
          }
        >
            <item.icon
              className="mr-3 h-6 w-6 flex-shrink-0 text-primary "
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}