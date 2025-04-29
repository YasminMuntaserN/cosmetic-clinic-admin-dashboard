import {NavLink} from 'react-router-dom';
import {
    Users,
    UserRound,
    Calendar,
    Package,
    Activity,
    Settings,
    Syringe,
    MessageSquareMore,
    LogOut
} from 'lucide-react';
import {cn} from '../../utils/cn';
import {useState} from "react";
import {Logo} from "./Logo.tsx";
import {useUser} from "../../context/UserContext.tsx";

const navigation = [
    {name: 'Dashboard', href: '/', icon: Activity},
    {name: 'Doctors', href: '/doctors', icon: Users},
    {name: 'Patients', href: '/patients', icon: UserRound},
    {name: 'Appointments', href: '/appointments', icon: Calendar},
    {name: 'Products', href: '/products', icon: Package},
    {name: 'Treatments', href: '/treatments', icon: Syringe},
    {name: 'Chat', href: `/chat/67db445d8a68fc0d9c1432e1`, icon: MessageSquareMore},
    {name: 'Settings', href: '/settings', icon: Settings},
];

export function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const {logout} = useUser();

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
    }
    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-basic hover:bg-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-full flex-col">
                    <Logo/>
                    <nav className="flex-1 space-y-3 px-2 py-4">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({isActive}) =>
                                    cn(
                                        'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                        isActive
                                            ? 'bg-gray-200 text-basic'
                                            : 'text-gray-700 hover:bg-secondary hover:text-basic'
                                    )
                                }
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <item.icon
                                    className="mr-3 h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </NavLink>
                        ))}
                        <NavLink
                            key="logout"
                            to="/login"
                            className={({isActive}) =>
                                cn(
                                    'group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                    isActive
                                        ? 'bg-gray-200 text-basic'
                                        : 'text-gray-700 hover:bg-secondary hover:text-basic'
                                )
                            }

                            onClick={() =>handleLogout}>
                            <LogOut
                                className="mr-3 h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                            />
                            Logout
                        </NavLink>
                    </nav>
                </div>
            </div>
        </>
    );
}