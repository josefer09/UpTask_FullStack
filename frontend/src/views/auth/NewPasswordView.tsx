import NewPasswordToken from '@/components/auth/NewPasswordToken';
import { useState } from 'react'
import NewPasswordForm from '../../components/auth/NewPasswordForm';
import { ConfirmToken } from '@/types/index';

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken['token']>('');

    const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
    <h1 className="text-5xl font-black text-black">Reset Password</h1>
      <p className="text-2xl font-light text-black mt-5">
        Enter the code you received  {""}
        <span className=" text-sky-500 font-bold"> via email</span>
      </p>
      
      {!isValidToken? (<NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>) : (<NewPasswordForm token={token} setToken={setToken}/>)}
    </>
  )
}
