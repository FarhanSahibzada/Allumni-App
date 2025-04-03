"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import  Loading  from "../components/Loading"
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/Stats-section';

export default function Page() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await localStorage.getItem("token");
  //     if (response)  return setLoading(false)

  //     return setLoading(true)
  //   }
  //   fetchUser()
  // }, [router])



 // if (loading) return <Loading />
  
  return(
    <>
    <HeroSection />
    <StatsSection />
    </>
  )
}