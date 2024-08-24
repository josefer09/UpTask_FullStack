import { Outlet } from "react-router-dom";
import HeaderPublic from "@/components/public_components/HeaderPublic";

export default function PublicLayout() {
  return (
    <>
    <div className=" bg-gray-50">
        <HeaderPublic/>
        <Outlet/>
        <footer className="py-5">
      <p className="text-center">
        Copyrigth {new Date().getFullYear()}
      </p>
    </footer>
    </div>
    </>
  );
}
