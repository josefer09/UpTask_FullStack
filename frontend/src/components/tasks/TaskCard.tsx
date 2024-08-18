import { deleteTask } from "@/api/TaskApi";
import { Task } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

type TaskCardProps = {
  task: Task;
  canEdit: boolean;
};
export default function TaskCard({ task, canEdit }: TaskCardProps) {
  // ProjectId
  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: () => {
      return toast.error("Error: Task not deleted");
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: ["viewProject", projectId] });
      return;
    },
  });

  return (
    <>
      <li className="p-5 bg-white border-slate-300 flex justify-between gap-3">
        <div className=" min-w-0 flex flex-col gap-y-4">
          <button
            className=" text-xl font-bold text-slate-600 text-left"
            type="button"
            onClick={() =>
              navigate(location.pathname + `?viewTask=${task._id}`)
            }
          >
            {task.name}
          </button>
          <p className="text-slate-500">{task.description}</p>
        </div>
        <div>
          <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900"
                      onClick={() =>
                        navigate(location.pathname + `?viewTask=${task._id}`)
                      }
                    >
                      View Task
                    </button>
                  </Menu.Item>

                  {canEdit && (
                    <>
                      <Menu.Item>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-sky-500"
                          onClick={() =>
                            navigate(
                              location.pathname + `?EditTask=${task._id}`
                            )
                          }
                        >
                          Edit Task
                        </button>
                      </Menu.Item>

                      <Menu.Item>
                        <button
                          type="button"
                          className="block px-3 py-1 text-sm leading-6 text-red-500"
                          onClick={() =>
                            mutate({ projectId, taskId: task._id })
                          }
                        >
                          Delete Task
                        </button>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </li>
    </>
  );
}
