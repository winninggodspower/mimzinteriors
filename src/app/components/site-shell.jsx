"use client"

import { Icon } from "@iconify/react"
import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")
  const whatsappLink = "https://wa.me/2347084337763"

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mimz Interiors on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1da851] focus-visible:ring-offset-2"
      >
        <Icon icon="mdi:whatsapp" className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  )
}
