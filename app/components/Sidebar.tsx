'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Ana Sayfa',
      href: '/',
      icon: '🏠'
    },
    {
      title: 'Hasta Geçmişi',
      href: '/case-history',
      icon: '📋'
    },
    {
      title: 'Hasta Detayları',
      href: '/patient-details',
      icon: '👤'
    },
    {
      title: 'Sohbet',
      href: '/chat',
      icon: '💬'
    }
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="space-y-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Doktor Asistanı</h2>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                ${pathname === item.href 
                  ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 