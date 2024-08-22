import LogoV2 from '@/components/LogoV2';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
    // El Outlet va a renderizar el contenido de cada uno de los componentes
  return (
    <>
    <div className=' bg-gray-200 min-h-screen'>
        <div className=' py-10 lg:py-20 mx-auto w-[450px]'>
            <LogoV2/>
            <div className=' mt-10'>
            <Outlet/>
            </div>
        </div>
    </div>

    <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
    </>
  )
}
