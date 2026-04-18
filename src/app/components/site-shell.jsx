"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}
