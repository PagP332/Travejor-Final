import { NextResponse } from "next/server"
import admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.API_PRIV_KEY)),
  })
}

const db = admin.firestore()
const collection = db.collection("profile")

// GET /profile/:id → Retrieve a traveler profile
export async function GET(req, { params }) {
  const doc = await collection.doc(params.id).get()
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 200 })
}

// PUT /profile/:id → Update a traveler profile
export async function PUT(req, { params }) {
  const body = await req.json()
  const updates = {
    ...(body.bio && { bio: body.bio }),
    ...(body.interests && { interests: body.interests }),
    ...(body.location && { location: body.location }),
    updatedAt: new Date().toISOString(),
  }
  const docRef = collection.doc(params.id)
  const doc = await docRef.get()
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await docRef.update(updates)
  return NextResponse.json({ id: doc.id, ...doc.data(), ...updates }, { status: 200 })
}
