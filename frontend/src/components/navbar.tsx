'use client'

import React, { FC, useMemo, useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface NavItem {
    href: string
    label: string
    icon: React.ReactNode
}

const NavBar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const navItems = useMemo<NavItem[]>(
        () => [
            {
                href: '/',
                label: 'Главная',
                icon: (
                    <img src="/images/icon/home.svg" alt="Home" className="w-6 h-6" />
                ),
            },
            {
                href: '/auth/login',
                label: 'Вход',
                icon: (
                    <img src="/images/icon/account.svg" alt="Account" className="w-6 h-6" />
                ),
            },
            {
                href: '/info/faq',
                label: 'F.A.Q.',
                icon: <img src="/images/icon/faq.svg" alt="FAQ" className="w-6 h-6" />,
            },
            {
                href: '/info/about',
                label: 'О нас',
                icon: (
                    <img src="/images/icon/about.svg" alt="About" className="w-6 h-6" />
                ),
            },
        ],
        [],
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header className="sticky top-0 bg-orange-600 p-2 z-20 shadow-lg">
            <nav className="flex justify-center">

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <ul className="flex space-x-2 md:space-x-4 w-full justify-start md:justify-center px-2">
                        {navItems.map((item) => (
                            <li key={item.href} className="flex-shrink-0">
                                <Link
                                    href={item.href}
                                    className="group flex items-center p-2 text-white hover:text-black hover:bg-white rounded-lg"
                                >
                                    <span className="group-hover:invert">{item.icon}</span>
                                    <span className="text-xl whitespace-nowrap ml-1">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Navigation */}
                <div
                    className="md:hidden w-full flex items-center justify-between"
                    ref={menuRef}
                >
                    <div className="text-white text-xl font-bold ml-2">Voicee</div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white p-2 hover:bg-white hover:text-black rounded-lg transition-colors duration-200"
                    >
                        <img
                            src="/images/icon/menu.svg"
                            alt="Menu"
                            className="w-6 h-6 group-hover:invert"
                        />
                    </button>

                    {isMenuOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                            <div className="relative bg-orange-600 w-full h-full p-4 flex flex-col items-center justify-center">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:text-black rounded-lg"
                                >
                                    <img
                                        src="/images/icon/close.svg"
                                        alt="Close"
                                        className="w-6 h-6 group-hover:invert"
                                    />
                                </button>

                                <ul className="w-full max-w-xs space-y-6">
                                    {navItems.map((item) => (
                                        <li key={item.href} className="w-full">
                                            <Link
                                                href={item.href}
                                                className="group flex items-center p-3 text-white hover:text-black hover:bg-white rounded-lg transition-colors duration-200"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {React.cloneElement(
                                                    item.icon as React.ReactElement<{
                                                        className?: string
                                                    }>,
                                                    {
                                                        className: 'w-8 h-8 mr-3 group-hover:invert',
                                                    },
                                                )}{' '}
                                                <span className="text-2xl">{item.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default NavBar
