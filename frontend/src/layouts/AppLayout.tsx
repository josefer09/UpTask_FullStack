import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <>
    <header className="bg-gray-900 py-5">
      <div className="max-w-screen-2xl mx-auto flex flex-col xl:flex-row justify-between items-center">
        <div className=" w-56">
          <Link to="/projects">
            <Logo/>
          </Link>
        </div>
          <NavMenu/>
      </div>
    </header>

    <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
      <Outlet />
    </section>

    <footer className="py-5">
      <p className="text-center">
        Copyrigth {new Date().getFullYear()}
      </p>
    </footer>
    <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
    />
    </>
  );
}
