"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import FormInput from "@/components/form-input"
import { Mail, Lock, LogIn, Loader2, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { toast } from "react-toastify"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/admin",
    })

    if (result?.error) {
      setError(
        result.error === "CredentialsSignin"
          ? "Invalid email or password. Please try again."
          : result.error
      )
    } else {
      toast.success("Welcome back! Login successful.")
      router.push("/admin")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#F7F4EE] px-4 py-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#B58A2A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#C28831]/10 blur-3xl" />

      {/* Back to website button */}
      <div className="w-full max-w-md mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-slate-500 hover:text-[#966B16] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to website
        </Link>
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-[#B58A2A]/25 bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(26,18,5,0.06)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
            <Image
              src="/INTERIORS-logo.png"
              alt="Mimz Interiors"
              width={180}
              height={76}
              priority
              className="h-auto w-36 object-contain"
            />
          </Link>

          <span className="mt-4 inline-flex items-center rounded-full border border-[#B58A2A]/30 bg-[#F7F4EE] px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-[#966B16]">
            Admin Portal
          </span>

          <h1 className="mt-3 text-2xl font-serif font-semibold text-[#1A1205]">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage your studio portfolio &amp; projects
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#B58A2A]/25 to-transparent" />

        {/* General Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
            <p className="font-medium leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@mimzinteriors.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4 text-[#B58A2A]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />}
            inputClassName="pl-10 text-sm"
          />

          <div className="relative">
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-[#B58A2A]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              inputClassName="pl-10 pr-10 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-[#1A1205] py-3.5 px-6 font-medium text-[#F4D891] shadow-md transition-all duration-200 hover:bg-[#2A1B08] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-[#B58A2A] focus:ring-offset-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 text-[#F4D891]" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-[#F4D891]" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          Protected studio environment &bull; Mimz Interiors
        </p>
      </div>
    </div>
  )
}
