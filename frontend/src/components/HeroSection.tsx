"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import aluminiImage from "../assests/alumini.png";
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section data-scroll-container className="w-[100vw] flex justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-100 via-white to-blue-300">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-500 px-3 py-1 font-bold text-sm text-white">
                Welcome Alumni
              </div>
              <h1  className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-5xl xl:text-6xl/none">
                Connect with your Alumni Network
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Join thousands of graduates who are already part of our thriving
                community. Reconnect, network, and grow together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  aria-label="Join our alumni network"
                >
                  Join Now
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-100"
                  aria-label="Learn more about our alumni network"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[310px] w-full max-w-[550px] overflow-hidden rounded-xl shadow-xl">
              <Image
                alt="Alumni gathering at a university event"
                className="h-full w-full object-cover object-center"
                src={aluminiImage}
                loading="eager"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('about');
              if (section) {
                section.scrollIntoView({
                  behavior: "smooth"
                })
              }
            }}
            className="flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors focus-ring rounded-md px-2 py-1 cursor-pointer"
            animate={{ y: [0, -10, 0], opacity: [1, 0.8, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <span>Discover our impact</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
