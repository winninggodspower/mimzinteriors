
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/api/auth/[...nextauth]/route"
import AdminSidebar from "./sidebar"

export const metadata = {
  title: "Admin Dashboard | Mimz Interiors",
  description: "Mimz Interiors admin area",
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <div className="w-full shrink-0 lg:w-80">
          <AdminSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
