import Carousel from "@/components/public_components/Carousel";
import InfoCards from "@/components/public_components/InfoCards";
import ProfilePublic from "@/components/public_components/ProfilePublic";
import { Link } from "react-router-dom";

export default function HomePageView() {
  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 mt-5 p-4">
        <div className=" mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Streamline Your Workflow <br className="hidden sm:block" /> with{" "}
            <span className="text-sky-500">Uptask</span>
          </h1>
          <p className="text-lg sm:text-2xl text-gray-700 mb-6 sm:mb-8 text-center max-w-xl sm:max-w-4xl">
            Manage your tasks and projects effortlessly with Uptask.
            Collaborate, organize, and track progress all in one place. Get
            started today and elevate your productivity.
          </p>
        </div>

        <div className=" mb-8 mt-2">
          <Link to={'/auth/register'} className="bg-sky-500 text-white font-bold text-2xl px-6 py-3 rounded-lg shadow hover:bg-sky-600 transition-colors">Get Started</Link>
        </div>

        {/* Imagen debajo del párrafo */}
        <div className=" mt-5 px-8">
          <img
            src="/uptask/uptask_main.png"
            alt="Uptask Main"
            className="w-max max-w-full mb-8 rounded-xl"
          />
        </div>

        <Carousel />
        <InfoCards />
        <ProfilePublic />
      </div>
    </>
  );
}
