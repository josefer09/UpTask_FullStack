import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestNewConfirmationCode } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { mutate } = useMutation({
        mutationFn: requestNewConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data?.msg);
            reset();
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData);

    return (
        <>
            <h1 className="text-5xl font-black text-black">Request confirmation code</h1>
            <p className="text-2xl font-light text-black mt-5">
                Enter your email to receive {''}
                <span className=" text-sky-500 font-bold"> a new code</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Register Email"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Send Code'
                    className="bg-sky-500 hover:bg-sky-600 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-sky-400 font-normal"
                >
                    Alredy have an account? Sign in here
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-800 font-normal"
                >
                    Forgot your password? Reset
                </Link>
            </nav>
        </>
    )
}