import { Users, GraduationCap, Globe, Award } from "lucide-react";
import {useInView} from 'framer-motion'
import AnimationCounter from "./AnimationCounter";

export function StatsSection() {

  

  return (
    <section id="about" className="w-full py-12 md:py-24 bg-white border-y border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter text-blue-600 md:text-4xl">Our Alumni Community</h2>
            <p className="text-gray-600 md:text-xl">
              Join a global network of successful graduates making an impact across industries and continents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
          <div className="flex flex-col  items-center space-y-2 text-center">
            <div className="rounded-full bg-green-100 p-4">
              <Users className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-blue-600 md:text-3xl"><AnimationCounter from={0} to={50} />K</h3>
              <p className="text-sm text-gray-600 md:text-base">Active Alumni</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center ">
            <div className="rounded-full bg-blue-100 p-4">
              <GraduationCap className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="space-y-1 ">
              <h3 className="text-2xl font-bold text-blue-600 md:text-3xl"><AnimationCounter from={0} to={75} />+</h3>
              <p className="text-sm text-gray-600 md:text-base">Years of Excellence</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-green-100 p-4">
              <Globe className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-blue-600 md:text-3xl"><AnimationCounter from={0} to={120} />+</h3>
              <p className="text-sm text-gray-600 md:text-base">Countries Represented</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="rounded-full bg-blue-100 p-4">
              <Award className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-blue-600 md:text-3xl"><AnimationCounter from={0} to={500} />+</h3>
              <p className="text-sm text-gray-600 md:text-base">Distinguished Alumni</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}