'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
  moodleId: z.string().regex(/^\d{8,}$/, { message: "Moodle ID must be at least 8 digits." }),
  department: z.string().min(1, { message: "Please select a department." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { errors } = formState;
  

  const onSubmit = (data) => {
    setIsSubmitting(true)
    console.log(data)
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Registration successful!')
      reset()
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900">Student Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="fullName" label="Full Name" register={register} errors={errors} />
          <FormField name="phoneNumber" label="Phone Number" register={register} errors={errors} />
          <FormField name="moodleId" label="Moodle ID" register={register} errors={errors} />
          <FormSelectField name="department" label="Department" register={register} errors={errors} />
          <FormField name="email" label="Email" register={register} errors={errors} type="email" />
          <FormField name="password" label="Password" register={register} errors={errors} type="password" />
          <FormField name="confirmPassword" label="Confirm Password" register={register} errors={errors} type="password" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

const FormField = ({ name, label, register, errors, type = 'text' }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      {...register(name)}
      type={type}
      id={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    {errors[name] && (
      <p className="text-sm text-red-600">
        {errors[name].message}
      </p>
    )}
  </div>
)

const FormSelectField = ({ name, label, register, errors }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      {...register(name)}
      id={name}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select a department</option>
      <option value="cs">Computer Science</option>
      <option value="ee">Electrical Engineering</option>
      <option value="me">Mechanical Engineering</option>
      <option value="ce">Civil Engineering</option>
      <option value="be">Biomedical Engineering</option>
    </select>
    {errors[name] && (
      <p className="text-sm text-red-600">
        {errors[name].message}
      </p>
    )}
  </div>
)
