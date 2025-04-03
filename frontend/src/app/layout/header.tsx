"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from 'framer-motion'


interface NavItem {
    title: string
    href: string
}

const navItems: NavItem[] = [
    { title: "Home", href: "/dashboard", },
    { title: "About", href: "/stats", },
    { title: "Events", href: "/events" },
    { title: "Directory", href: "/directory" },
    { title: "Contact", href: "/contact", },
]

export function SiteHeader() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 w-full  bg-linear-90 from-green-100 to-via-white ">
            <div className="container flex h-16 px-4 items-center justify-between">
                <div>
                    <Image
                        alt="Alumni gathering at a university event"
                        className="h-full w-full object-cover object-center"
                        src={'https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png'}
                        loading='eager'
                        width={120}
                        height={120}
                    />
                </div>
                <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
                    {navItems.map((item) => {
                        const isActive = pathname == item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative hover:text-blue-800 focus-ring rounded-md px-2 py-1",
                                    pathname === item.href ? "text-blue-600" : "text-gray-700",
                                )}
                            >
                                {item.title}
                                {isActive && (
                                    <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 bottom-0  h-[2px] w-full bg-red-500"
                                    transition={{ type: 'spring', stiffness: 50, damping: 10 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/Login">
                        <Button
                            className={`border-blue-600 text-blue-600 bg-slate-200   rounded-2xl focus-ring px-2 py-1.5 text-2xl`}
                            aria-label="Sign in to your account"
                        >
                            Join Now
                        </Button>
                    </Link>
                    <Link href="/Register" className="hidden sm:block">
                        <Button
                            className="bg-green-600 hover:bg-green-700 rounded-2xl text-white focus-ring"
                            aria-label="Create a new account"
                        >
                            Sign Up
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" aria-hidden="true" />
                        ) : (
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        )}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden animate-fade-in">
                    <div className="container py-4 space-y-4 bg-white">
                        <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-blue-800 px-2 py-2 rounded-md",
                                        pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700",
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                    aria-current={pathname === item.href ? "page" : undefined}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <Link href="/Login" className="sm:hidden">
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    aria-label="Create a new account"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}