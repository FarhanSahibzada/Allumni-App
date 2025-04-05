"use client";

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { Controller, useForm } from 'react-hook-form'
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { toast, Toaster } from "sonner";

// Form validation schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password is minimum 4 characters").max(8, "password is maximum 8 characters"),
  rememberMe: z.boolean().optional(),
})

type FormData = z.infer<typeof signInSchema>

export default function SignInPage() {

  const router = useRouter()
  const dispatch = useDispatch()
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: '',
      rememberMe: false
    }
  })
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: FormData) => {

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, data)
      if (response && response.data) {
        dispatch(login(response.data?.student))
        await localStorage.setItem("token", response.data.token)
        toast.success("Successful Login", { description: "Welcome to the App" })
        router.push("/")
      }
    } catch (error) {
      toast.success("Error", { description: "Invalid email and password" })
      console.log("error sending the data ", error)
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-slate-100/[0.3]  flex items-center justify-center p-4">
        <Card className="mx-auto max-w-sm w-full border-2 border-alumni-blue/20 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-alumni-blue">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to access your alumni account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-alumni-blue">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  className={`border-alumni-blue/20 focus-visible:ring-alumni-blue ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-alumni-blue">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-alumni-green hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`border-alumni-blue/20 focus-visible:ring-alumni-blue pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      onCheckedChange={(checked) => field.onChange(checked)}
                      checked={field.value || false}
                    />
                  )}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                className="w-full text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/Register" className="text-alumni-green font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

