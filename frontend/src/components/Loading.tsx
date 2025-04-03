"use client"

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white/[0.12]">
    <div className="flex flex-col items-center animate-spin duration-1000">
      <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse delay-0"></div>
      <div className="flex gap-6 mt-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse delay-300"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse delay-600"></div>
      </div>
    </div>
  </div>
  )
}