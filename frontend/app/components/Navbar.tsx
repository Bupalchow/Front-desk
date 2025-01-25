'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition-colors"
            >
              <span className="mr-2">🏥</span>
              Front desk
            </Link>
            <div className="hidden md:flex items-center space-x-1 ml-8">
              {[
                { href: '/doctors', label: 'Doctors' },
                { href: '/appointments', label: 'Appointments' },
                { href: '/', label: 'Queue' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive(href)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}