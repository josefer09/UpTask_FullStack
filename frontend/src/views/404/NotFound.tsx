import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
    <h1 className="font-black text-center text-4xl text-black">Page Not Found</h1>
    <p className=" mt-10 text-center text-black">
        Maybe you want to go to projects {" "}
        <Link className=" text-sky-500" to={'/projects'}>Projects</Link>
    </p>
    </>
  )
}
