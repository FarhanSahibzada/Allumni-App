"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
 const router = useRouter();

  useEffect(()=>{
    const fetchUser = async()=>{
      const response = await localStorage.getItem("token");
      if(response)
      return  router.push("/dashboard")

      return  router.push("/Login")
    }
    fetchUser()
  },[router])

    return (
    <div className='w-full h-full flex justify-center items-center min-h-screen  bg-black/[0.3]'>
        <h1 className='font-bold text-2xl text-white'>Welcome to Home </h1>
    </div>
  )
}
