"use client"

import { parseString } from "@/parseString"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function NewUser() {
  const [id, setID] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState("")
  const [location, setLocation] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("https://picsum.photos/200")

  const [errorCode, setErrorCode] = useState("")

  const router = useRouter()

  async function createProfile() {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        username,
        email,
        bio,
        interests,
        location,
        avatarUrl,
      }),
    })

    const contentType = res.headers.get("content-type") || ""
    const body = contentType.includes("application/json") ? await res.json() : await res.text()

    if (!res.ok) {
      const msg = (body && (body.error || body.message)) || body || `${res.status}: ${res.statusText}`
      setErrorCode(`Error - ${msg}`)
      return
    }

    const data = body
    console.log("Profile created:", data)

    alert("Profile created successfully! Redirecting...")
    setTimeout(() => router.push("/"), 500)
  }

  return (
    <div className="font-sans">
      <button
        className="relative top-3 left-3 rounded-full border border-solid border-transparent transition-colors bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto "
        onClick={() => router.push("/")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {"Back"}
      </button>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-col">
            <h1>Create a new user</h1>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">ID</p>
                <input className="flex border-1 p-1" value={id} onChange={(e) => setID(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">Username*</p>
                <input className="flex border-1 p-1" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">Email*</p>
                <input className="flex border-1 p-1" value={email} placeholder="example@123.com" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">Bio</p>
                <input className="flex border-1 p-1" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">Interests</p>
                <input
                  className="flex border-1 p-1"
                  placeholder="Seperate by comma ( , )"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <p className="flex">Location</p>
                <input className="flex border-1 p-1" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <p className="flex text-xs">* - Required Fields</p>
              <p className="flex text-xs text-red-500">{errorCode}</p>
              <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                disabled={!username || !email}
                onClick={async () => await createProfile()}
              >
                Submit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
