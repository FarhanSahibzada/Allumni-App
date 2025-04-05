import { GraduationCap, Users, Calendar, BookOpen, Award, Globe } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="events" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-white">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter text-alumni-blue md:text-4xl">Everything You Need</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to stay connected with your alma mater and fellow alumni.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-green-50">
            <div className="rounded-full bg-alumni-green-100 p-4">
              <Users className="h-6 w-6 text-alumni-green" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Alumni Directory</h3>
            <p className="text-center text-gray-600">
              Find and connect with fellow graduates from your class and beyond.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-green-50">
            <div className="rounded-full bg-alumni-blue-100 p-4">
              <Calendar className="h-6 w-6 text-alumni-blue" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Events & Reunions</h3>
            <p className="text-center text-gray-600">
              Stay updated on upcoming reunions, networking events, and campus activities.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-green-50">
            <div className="rounded-full bg-alumni-green-100 p-4">
              <BookOpen className="h-6 w-6 text-alumni-green" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Mentorship Programs</h3>
            <p className="text-center text-gray-600">
              Share your expertise or find a mentor to guide your career journey.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-blue-50">
            <div className="rounded-full bg-alumni-blue-100 p-4">
              <Award className="h-6 w-6 text-alumni-blue" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Alumni Achievements</h3>
            <p className="text-center text-gray-600">
              Celebrate and showcase the accomplishments of our distinguished alumni.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-green-50">
            <div className="rounded-full bg-alumni-green-100 p-4">
              <Globe className="h-6 w-6 text-alumni-green" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Global Network</h3>
            <p className="text-center text-gray-600">
              Connect with alumni across the globe and expand your professional network.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 transition-all hover:shadow-md hover:bg-blue-50">
            <div className="rounded-full bg-alumni-blue-100 p-4">
              <GraduationCap className="h-6 w-6 text-alumni-blue" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-alumni-blue">Career Resources</h3>
            <p className="text-center text-gray-600">
              Access exclusive job boards, career advice, and professional development resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

