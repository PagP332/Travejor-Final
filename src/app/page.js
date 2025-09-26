"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
// import { useEffect } from "react";

const doTest = async () => {
  const res = await fetch("api/profile/2uY35IqC3D9HzRHvw3xi")
  const data = await res.json()
  console.log(data)
}

export default function Home() {
  const [input, setInput] = useState("")
  const router = useRouter()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-col">
          <h1 className="flex text-2xl m-5"> Welcome to Home Page </h1>
          <div className="flex flex-col gap-2 items-center">
            <p>Search for user</p>
            <div className="flex flex-row gap-4">
              <input
                className="flex border-1 p-1 text-center rounded-xs"
                value={input}
                placeholder="User ID"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                disabled={!input}
                onClick={() => router.push(`/profile?id=${encodeURIComponent(input)}`)}
              >
                Find
              </button>
            </div>
            <p className="m-5"> OR </p>
            <button
              className="flex rounded-full border border-solid border-transparent transition-colors items-center justify-center bg-[#ff6a00] text-background gap-2 hover:bg-[#c45200] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              onClick={() => router.push("/new")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Create New User
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
