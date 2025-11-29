import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z
  .object({
    FirstName: z.string().min(2, "First name must be at least 2 characters"),
    LastName: z.string().min(2, "Last name must be at least 2 characters"),
    Email: z.email("Enter a valid email address"),
    Password: z.string().min(12, "Password must be atleast 12 characters"),
    ConfirmPassword: z
      .string()
      .min(12, "Password must be atleast 12 characters"),
    role: z.enum(["Patient", "Doctor"]),
  })
  .required();

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            {...register("FirstName")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.FirstName?.message}
          </p>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            {...register("LastName")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.LastName?.message}
          </p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Role</label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("Email")}
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-red-600 text-sm mt-1">{errors.Email?.message}</p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("Password")}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.Password?.message}
          </p>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            {...register("ConfirmPassword")}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <p className="text-red-600 text-sm mt-1">
            {errors.ConfirmPassword?.message}
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
