"use client";
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
import RegisterDialog from '../../components/RegisterDialog'


const emailSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters").max(8, "Password can be at most 8 characters"),
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

const usernameSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "last name must be at least 2 characters"),
})

const NumberSchema = z.object({
  Cnic: z
  .string()
  .min(13, "CNIC must be 13 digits")
  .max(13, "CNIC must be 13 digits")
  .regex(/^\d+$/, "Only numeric values allowed")
  .transform((val) => Number(val)),
  Contact : z
  .string()
  .min(11, "CNIC must be 11 digits")
  .max(13, "CNIC must be 13 digits")
  .regex(/^\d+$/, "Only numeric values allowed")
  .transform((val) => Number(val)),
})

type emailDataType = z.infer<typeof emailSchema>
type nameType = z.infer<typeof usernameSchema>
type numberType = z.infer<typeof NumberSchema>


interface formData {
  name: string,
  email: string,
  password: string
  cnic : number | null,
  contactNo : number | null
}


export default function SignUpPage() {

  const emailPasswordForm = useForm<emailDataType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const nameForm = useForm<nameType>({
    resolver: zodResolver(usernameSchema),
    defaultValues: ({
      firstname: "",
      lastname: ""
    })
  })

  const NumbersForm = useForm<numberType>({
    resolver : zodResolver(NumberSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDialogOpen2 , setIsDialogOpen2] = useState<boolean>(false)
  const [displayNum, setDisplayNum] = useState<number>(0)
  const [formData, setFormData] = useState<formData>({
    name: '',
    contactNo : null,
    cnic : null,
    email: '',
    password:''
  })


  const emailSubmit = (data: emailDataType) => {
    setFormData({
      name: '',
      contactNo : null,
      cnic : null,
      email: data.email,
      password: data.password
    })
    setDisplayNum(1)
    setIsDialogOpen(true)
  }

  const userNameSubmit = (data: nameType) => {
    const fullname = data.firstname + " " + data.lastname;
    setFormData((prev) => ({
      name: fullname,
      email: prev?.email || "",
      password: prev?.password || "",
      contactNo : null,
      cnic : null,
    }));
    setIsDialogOpen(false)
    setIsDialogOpen2(true)
  };

  const NumbersSubmit = (data : numberType)=>{
    const updatedData = {
      ...formData,
      cnic: data.Cnic,
      contactNo: data.Contact
    };
    setFormData(updatedData)
    mainSubmit(updatedData)
  }

  const mainSubmit = async (data: formData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signUp`, data)
      if (response && response.data) {
        toast.success("Successful Register")
        console.log(response.data.data)
        dispatch(login(response.data))
        router.replace("/")
      }
    } catch (error: unknown) {
      toast.success("Error", { description: "SomeThing Went Wrong" })
      throw new Error("error when sending the data", error || undefined);

    }
  }


  return (
    <>
      <Toaster position="top-center" />

      {/* first form */}

      <div className="min-h-screen bg-slate-100/[0.3] flex items-center justify-center p-4">
        <div className="mx-auto max-w-md w-full bg-white p-5 rounded-2xl border-2 border-alumni-green/20 shadow-lg duration-200">
          {displayNum == 0 && (
            <>
              <form onSubmit={emailPasswordForm.handleSubmit(emailSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-center text-alumni-blue">Join Our Alumni Network</div>
                  <div className="text-center text-sm text-neutral-600 ">Enter your information to create an account</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-alumni-blue">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...emailPasswordForm.register("email")}
                    placeholder="john.doe@example.com"
                    className={`border-alumni-blue/20 focus-visible:ring-alumni-green ${emailPasswordForm.formState.errors.email ? "border-red-500" : ""}`}
                  />
                  {emailPasswordForm.formState.errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {emailPasswordForm.formState.errors.email?.message}
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
                      {...emailPasswordForm.register("password")}
                      placeholder="enter your password"
                      className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${emailPasswordForm.formState.errors.email ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {emailPasswordForm.formState.errors.password && (
                    <p id="password-error" className="text-xs text-red-500 mt-1">
                      {emailPasswordForm.formState.errors.password.message}
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
                      {...emailPasswordForm.register("confirmPassword")}
                      placeholder="enter your password"
                      className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${emailPasswordForm.formState.errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                  </div>
                  {emailPasswordForm.formState.errors.confirmPassword && (
                    <p id="confirmPassword-error" className="text-xs text-red-500 mt-1">
                      {emailPasswordForm.formState.errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full  text-white cursor-pointer"
                  disabled={emailPasswordForm.formState.isSubmitting}
                >
                  {emailPasswordForm.formState.isSubmitting ? "Join Now..." : "Join Now"}
                </Button>
              </form>
              <p className="text-center my-4">Or</p>
              <div className="flex flex-col space-y-4 border-t pt-3">
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/Login" className="text-alumni-green font-medium hover:underline">
                    Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div >

    {/* second form */}

      <RegisterDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title="Let's Started With Your Information"
        description="write your first and last name"
      >
        <form onSubmit={nameForm.handleSubmit(userNameSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-alumni-blue">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstname"
              type="text"
              {...nameForm.register('firstname')}
              placeholder="john"
              className={`border-alumni-blue/20 focus-visible:ring-alumni-green ${nameForm.formState.errors.firstname ? "border-red-500" : ""}`}
            />
            {nameForm.formState.errors.firstname && (
              <p className="text-xs text-red-500 mt-1">
                {nameForm.formState.errors.firstname?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-alumni-blue">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="lastname"
                type='text'
                {...nameForm.register("lastname")}
                placeholder="Cena"
                className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${nameForm.formState.errors.lastname ? "border-red-500" : ""}`}
              />
            </div>
            {nameForm.formState.errors.lastname && (
              <p id="password-error" className="text-xs text-red-500 mt-1">
                {nameForm.formState.errors.lastname.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
          <Button
            type="submit"
            className="text-right  text-blue-500 border-2 border-blue-500 cursor-pointer bg-transparent hover:bg-slate-200"
            disabled={nameForm.formState.isSubmitting}
            >
            { nameForm.formState.isSubmitting ? "Submitting..." : "Next" }
          </Button>
            </div>
        </form>
      </RegisterDialog>

      {/* third form */}

      <RegisterDialog
        isDialogOpen={isDialogOpen2}
        setIsDialogOpen={setIsDialogOpen2}
        title="Add More Information"
        description="write your Cnic number and Phone Number"
      >
        <form onSubmit={NumbersForm.handleSubmit(NumbersSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-alumni-blue">
              Cnic No <span className="text-red-500">*</span>
            </Label>
            <Input
              id="Cnic"
              type="text"
              {...NumbersForm.register('Cnic')}
              placeholder="42-501"
              className={`border-alumni-blue/20 focus-visible:ring-alumni-green ${NumbersForm.formState.errors.Cnic ? "border-red-500" : ""}`}
            />
            {NumbersForm.formState.errors.Cnic && (
              <p className="text-xs text-red-500 mt-1">
                {NumbersForm.formState.errors.Cnic.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-alumni-blue">
              Contact No <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="contact no"
                type='text'
                {...NumbersForm.register('Contact')}
                placeholder="+92"
                className={`border-alumni-blue/20 focus-visible:ring-alumni-green pr-10 ${NumbersForm.formState.errors.Contact ? "border-red-500" : ""}`}
              />
            </div>
            {NumbersForm.formState.errors.Contact && (
              <p id="password-error" className="text-xs text-red-500 mt-1">
                {NumbersForm.formState.errors.Contact.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
          <Button
            type="submit"
            className="text-right  text-blue-500 border-2 border-blue-500 cursor-pointer bg-transparent hover:bg-slate-200"
            disabled={NumbersForm.formState.isSubmitting}
            >
            {NumbersForm.formState.isSubmitting ? "Submit..." : "Submit"}
          </Button>
            </div>
        </form>
      </RegisterDialog>
    </>
  )
}

