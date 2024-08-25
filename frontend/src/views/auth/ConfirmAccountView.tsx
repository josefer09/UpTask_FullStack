import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>("");

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  }

  const handleComplete = (token: ConfirmToken['token']) => {
    mutate(token);
  }

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.msg);
      navigate('/auth/login');
    }
  })

  return (
    <>
      <h1 className="text-5xl font-black text-black">Confirm your account</h1>
      <p className="text-2xl font-light text-black mt-5">
        Enter the code you received {""}
        <span className=" text-sky-500 font-bold"> via email</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          6-Digits Code
        </label>

        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center text-sky-400 font-normal"
        >
          Request new code
        </Link>
      </nav>
    </>
  );
}
