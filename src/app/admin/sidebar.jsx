"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, BriefcaseBusiness, Building2, LampDesk, LogOut } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Project", href: "/admin/project", icon: BriefcaseBusiness },
  { label: "Apartment", href: "/admin/apartment", icon: Building2 },
  { label: "Accesories", href: "/admin/accesories", icon: LampDesk },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-full flex-col border-r border-[#B58A2A]/60 bg-black text-[#E8C678] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
      <div className="flex items-center justify-center border-b border-[#B58A2A]/60 px-5 py-7">
        <Image
          src={'/mimz-mascut.png'}
          alt="Mimz Interiors"
          width={84}
          height={84}
          className="h-21 w-21 object-contain"
          priority
        />
      </div>

      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "border-[#CBA14A] bg-[#1A1205] text-[#F4D891]"
                      : "border-transparent text-[#E8C678] hover:border-[#B58A2A]/60 hover:bg-[#120C03]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-[#B58A2A]/60 p-3">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left text-base font-medium text-[#E8C678] transition-all duration-200 hover:border-[#B58A2A]/60 hover:bg-[#120C03]"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
