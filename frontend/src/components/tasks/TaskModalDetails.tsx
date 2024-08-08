import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Project, TaskStatus } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { formDate } from "@/utils/utils";
import { statusTranslation } from "@/locales/en";

type TaskModalDetailsProps = {
  projectId: Project["_id"];
};

export default function TaskModalDetails({ projectId }: TaskModalDetailsProps) {
  const navigate = useNavigate();
  // Recuperar el id en la url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  console.log(taskId);

  const show = taskId ? true : false; // Si hay algo en taskId, true, si no false

  const { data, isError } = useQuery({
    queryKey: ["task", taskId], // Recordemos que siempre en los useQuery, tenemos que definir una llave
    queryFn: () => getTaskById({ projectId, taskId }),
    retry: false,
    enabled: !!taskId, // Si existe la tarea, ejecuta el query o la funcion
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: () => {
      toast.error("Error, task cannot be updated");
    },
    onSuccess: () => {
      toast.success("Task Status Updated");
      queryClient.invalidateQueries({ queryKey: ["viewProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      navigate(location.pathname, { replace: true });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const data = {
      projectId,
      taskId,
      status,
    };
    console.log(data);
    mutate(data);
  };

  if (isError) {
    toast.error("Task not found", { toastId: "error" }); // El toastId es para no crear duplicado cuando se detecte que ya existe un toast
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Created at: {formDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Last update: {formDate(data.updatedAt)}{" "}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Description: {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Current Status:</label>
                      <select
                        defaultValue={data.status}
                        className="w-full p-3 bg-white border border-gray-300"
                        onChange={(e) => handleChange(e)}
                      >
                        {Object.entries(statusTranslation).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
