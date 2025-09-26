"use client"

import { useSearchParams, useRouter, notFound } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"
import { parseArray, parseString } from "../../parseString"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const id = searchParams?.get("id")
  const router = useRouter()

  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState([])
  const [location, setLocation] = useState("")

  const [temp_bio, setTempBio] = useState("")
  const [temp_interests, setTempInterests] = useState("")
  const [temp_location, setTempLocation] = useState("")

  const [errorCode, setErrorCode] = useState("")

  useEffect(() => {
    if (!id) return notFound()
    console.log(id)
    fetch(`api/profile/${id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
  }, [id])

  useEffect(() => {
    if (profile) {
      setBio(profile.bio)
      setInterests(profile.interests)
      setLocation(profile.location)
      setTempBio(profile.bio)
      setTempInterests(parseArray(profile.interests))
      setTempLocation(profile.location)
    }
  }, [profile])

  if (!profile) return <div className="flex items-center">Loading...</div>

  // console.log(profile)
  if (profile.error) return notFound()

  const saveEdit = async () => {
    const interestArray = parseString(temp_interests)
    setBio(temp_bio)
    setInterests(interestArray)
    setLocation(temp_location)

    const res = await fetch(`/api/profile/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio: temp_bio,
        interests: interestArray,
        location: temp_location,
      }),
    })
    if (!res.ok) {
      throw new Error("Failed to update profile")
    }
    const data = await res.json()
    console.log("Profile update success:", data)
    setIsEditing(false)
  }

  const interestChip = (data) => {
    return <div className="flex text-xs rounded-full border-1 p-1 px-2">{data}</div>
  }

  return (
    <Suspense fallback={<div className="flex items-center">Loading...</div>}>
      <div className="font-sans">
        <button
          className="relative top-3 left-3 rounded-full border border-solid border-transparent transition-colors bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto "
          onClick={() => (!isEditing ? router.push("/") : setIsEditing(false))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Back"}
        </button>
        <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
            <img className="flex m-5" src={profile.avatarUrl} alt="Image" />
            <div className="flex flex-row gap-1">
              <p>Username: </p>
              <p>{profile.username}</p>
            </div>
            <div className="flex flex-row gap-1">
              <p>Email: </p>
              <p>{profile.email}</p>
            </div>
            <div className="flex flex-row gap-1">
              <p>Bio: </p>
              {!isEditing ? <p>{bio}</p> : <input className="flex border-1 p-1" value={temp_bio} onChange={(e) => setTempBio(e.target.value)} />}
            </div>
            <div className="flex flex-row gap-1">
              <p>Interests: </p>
              {!isEditing ? (
                interests.map((interest, index) => <div key={index}>{interestChip(interest)}</div>)
              ) : (
                <input className="flex border-1 p-1" value={temp_interests} onChange={(e) => setTempInterests(e.target.value)} />
              )}
            </div>
            <div className="flex flex-row gap-1">
              <p>Location: </p>
              {!isEditing ? (
                <p>{location}</p>
              ) : (
                <input className="flex border-1 p-1" value={temp_location} onChange={(e) => setTempLocation(e.target.value)} />
              )}
            </div>
            <p className="flex text-xs text-red-500">{errorCode}</p>
            <button
              className="flex rounded-full border border-solid border-transparent transition-colors items-center justify-center bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              onClick={() => (!isEditing ? setIsEditing(true) : saveEdit())}
              target="_blank"
              type="submit"
              rel="noopener noreferrer"
            >
              {!isEditing ? "Edit Profile" : "Save"}
            </button>
          </main>
        </div>
      </div>
    </Suspense>
  )
}
