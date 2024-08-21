import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { GetProjects } from "@/api/ProjectApi";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

export default function DashboardView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: GetProjects,
  });

  if (isLoading && authLoading) return "Loading...";
  console.log(data);
  console.log(user?._id);

  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">My Projects</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">
          Manage your projects
        </p>

        <nav className=" my-5">
          <Link
            className=" bg-sky-400 hover:bg-sky-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/projects/create"}
          >
            New Project
          </Link>
        </nav>

        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project.id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    { isManager(project.manager, user._id) ?
                    <div className="mb-2">
                      <p className=" font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">Manager</p>
                    </div> :
                    <div>
                    <p className=" font-bold text-xs uppercase bg-indigo-50 text-orange-500 border-2 border-orange-500 rounded-lg inline-block py-1 px-5">Collaborator</p>
                  </div>
                    }
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <MenuItem>
                          <Link
                            to={`/projects/${project.id}`}
                            className="block px-3 py-1 text-sm leading-6 text-sky-500"
                          >
                            View Project
                          </Link>
                        </MenuItem>
                        {isManager(project.manager, user._id) && (
                          <>
                            <MenuItem>
                              <Link
                                to={`/projects/${project.id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-yellow-500"
                              >
                                Edit Project
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type="button"
                                className="block px-3 py-1 text-sm leading-6 text-red-500"
                                onClick={() => navigate(location.pathname + `?deleteProject=${project.id}`)}
                              >
                                Delete Project
                              </button>
                            </MenuItem>
                          </>
                        )}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No Projects yet {""}
            <Link to={"/projects/create"} className="text-sky-500 font-bold">
              Create Project
            </Link>
          </p>
        )}
        <DeleteProjectModal/>
      </>
    );
}
