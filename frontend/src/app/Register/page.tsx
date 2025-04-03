"use client";
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../Store/authSlice"
import { toast, Toaster } from "sonner";


const signUpSchema = z
  .object({
    username: z.string().min(2, "First name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters").max(8, "password is maximum 8 password"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password != data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "password not match",
        path: ['confirmPassword']
      })
    }
  })

type FormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
        name: data.username,
        email: data.email,
        password: data.password
      })
      if (response && response.data) {
        toast.success("Successful Register")
        console.log(response.data.data)
        dispatch(login(response.data))
        router.replace("/")
      }
    } catch (error: unknown) {
      toast.success("Error", {description : "Invalid email and password"})
      throw new Error("error when sending the data", error || undefined);

    }
  }

  return (
    <>
      <Toaster position="top-center" />
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4">
      <Card className="mx-auto max-w-md w-full border-2 border-alumni-green/20 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-alumni-blue">Join Our Alumni Network</CardTitle>
          <CardDescription className="text-center">Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-alumni-blue">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                placeholder="John"
                {...register("username")}
                className={`border-alumni-blue/20 focus-visible:ring-alumni-green ${errors.username ? "border-red-500" : ""}`}
              />
              {errors.username && (
                <p id="firstName-error" className="text-xs text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-alumni-blue">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john.doe@example.com"
                className={`border-alumni-blue/20 focus-visible:ring-alumni-green ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-alumni-blue">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="enter your password"
                  className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${errors.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-gray-500">Password must be at least 4 characters long</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-alumni-blue">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="enter your password"
                  className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
              </div>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full  text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <p className="text-center my-4">Or</p>
          <Button
            className="w-full text-white"
          >
            Sign with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-2">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/Login" className="text-alumni-green font-medium hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

