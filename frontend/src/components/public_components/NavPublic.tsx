import { Link } from "react-router-dom";

export default function NavPublic() {
  return (
    <>
    <nav className="bg-gray-50 p-4">
        <ul className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <li>
            <Link to={'/'} className="text-black hover:text-gray-400 text-xl">Home</Link>
          </li>
          <li>
            <a href="https://github.com/josefer09/UpTask_FullStack" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400 text-xl">
              Repository
            </a>
          </li>
          <li>
            <a href="https://documenter.getpostman.com/view/32058825/2sAXjF8F16" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400 text-xl">
              APIDoc
            </a>
          </li>
          
          <li>
            <Link to={'/auth/login'} className="text-black hover:text-gray-400 text-xl">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
