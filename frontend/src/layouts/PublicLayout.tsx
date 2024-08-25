import { Outlet } from "react-router-dom";
import HeaderPublic from "@/components/public_components/HeaderPublic";
import FooterPublic from "@/components/public_components/FooterPublic";

export default function PublicLayout() {
  return (
    <>
      <div className=" bg-gray-50">
        <HeaderPublic />
        <Outlet />
        <FooterPublic />
      </div>
    </>
  );
}
