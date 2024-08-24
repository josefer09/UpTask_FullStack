import { Link } from "react-router-dom";
import NavPublic from "./NavPublic";
import LogoHeaderPublic from "./LogoHeaderPublic";


export default function HeaderPublic() {
  return (
    <>
    <header className="bg-gray-50 py-5">
      <div className="max-w-screen-xl mx-auto flex flex-col xl:flex-row justify-between items-center">
        <div className=" w-56">
          <Link to="/">
            <LogoHeaderPublic/>
          </Link>
        </div>
          <NavPublic/>
      </div>
    </header>
    </>
  )
}
