import { NextResponse } from "next/server"
import admin from "firebase-admin"
import { parseString } from "@/parseString"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.API_PRIV_KEY)),
  })
}

const db = admin.firestore()
const collection = db.collection("profile")

const validateInputs = (profile) => {}

// POST /profile → Create a new traveler profile
export async function POST(req) {
  const { id, username, email, bio, interests, location, avatarUrl } = await req.json()
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!username || !email) {
    return NextResponse.json({ error: "Username or Email is required" }, { status: 400 })
  } else if (!emailRegex.test(String(email).trim())) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
  }

  const ar_interests = interests && typeof interests === "string" ? parseString(interests) : []
  const timeNow = new Date().toISOString()
  const newProfile = {
    username,
    email,
    bio: bio || "",
    interests: ar_interests || [],
    location: location || "",
    avatarUrl: avatarUrl || "",
    createdAt: timeNow,
    updatedAt: timeNow,
  }

  if (id) {
    const profileRef = collection.doc(id)
    const doc = await profileRef.get()
    if (doc.exists) {
      return NextResponse.json({ error: "ID already exists" }, { status: 400 })
    }
    await profileRef.set(newProfile)
    return NextResponse.json({ id, ...newProfile }, { status: 201 })
  } else {
    const docRef = await collection.add(newProfile)
    return NextResponse.json({ id: docRef.id, ...newProfile }, { status: 201 })
  }
}
