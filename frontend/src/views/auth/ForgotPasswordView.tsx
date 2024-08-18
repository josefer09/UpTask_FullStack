import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
        toast.error(error.message);
    },
    onSuccess: (data) => {
        toast.success(data?.msg);
        reset;
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-black">Forgot Password</h1>
      <p className="text-2xl font-light text-black mt-5">
        Enter your email to receive instructions to {""}
        <span className=" text-sky-500 font-bold"> reset your password</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Send Instructions"
          className="bg-sky-600 hover:bg-sky-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-black font-normal"
        >
          Don't have an account? Creat one here
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-800 font-normal"
        >
          Forgot your password? Reset
        </Link>
      </nav>
    </>
  );
}
