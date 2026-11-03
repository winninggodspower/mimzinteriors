import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import cloudinary, { ensureCloudinaryEnv } from "@/lib/cloudinary"

const FOLDERS = new Set([
  "mimzinteriors/projects",
  "mimzinteriors/apartments",
  "mimzinteriors/accessories",
])

export async function POST(request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { folder } = await request.json()

  if (!FOLDERS.has(folder)) {
    return NextResponse.json({ message: "Invalid upload folder" }, { status: 400 })
  }

  ensureCloudinaryEnv()
  const timestamp = Math.round(Date.now() / 1000)
  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, process.env.CLOUDINARY_API_SECRET)

  return NextResponse.json({
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    signature,
    timestamp,
  })
}
