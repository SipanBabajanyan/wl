'use client'

import Link from 'next/link'
import { Home, ShoppingCart, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useHydration } from '@/hooks/useHydration'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const isHydrated = useHydration()
  const { getTotalItems } = useCart()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    { href: '/', label: 'Главная', icon: Home },
    { href: '/cart', label: 'Корзина', icon: ShoppingCart, showBadge: true },
    { href: '/profile', label: 'Профиль', icon: User },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 shadow-2xl">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 px-4 rounded-2xl transition-all duration-300 relative ${
                active
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              <div className="relative">
                <Icon className={`h-6 w-6 transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
                {item.showBadge && isHydrated && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className={`text-xs font-semibold mt-1 transition-all duration-300 ${active ? 'text-orange-600' : ''}`}>{item.label}</span>
              
              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-full shadow-lg"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
