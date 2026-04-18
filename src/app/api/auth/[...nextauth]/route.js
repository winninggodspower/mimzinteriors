import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    pages: {
        signIn: "/admin/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email
                const password = credentials?.password

                if (!email || !password || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
                    return null
                }

                if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin", email: ADMIN_EMAIL }
                }

                return null
            }
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }