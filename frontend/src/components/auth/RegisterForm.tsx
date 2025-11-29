import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

const RegisterSchema = z.object({
  FirstName: z.string().min(3),
  LastName: z.string().min(3),
  Email: z.email(),
  Password: z.string().min(12),
  ConfirmPassword: z.string().min(12),
  role: z.enum(["Patient", "Doctor"]),
});

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (

  )
}
