import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskApi";

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const showModal = modalTask ? true : false;

  const initialValues: TaskFormData = {
    name: '',
    description: '',
  };

  const projectId = location.pathname.split('/projects/')[1]; // Forma de obtener el id en los params

  // Con register regristramos los campos del formulario a validar, con habldeSubmit, el metodo correspondiente, y con errors cachamos los errores
  const { register, handleSubmit, formState: {errors}, reset} = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['viewProject', projectId]})
      toast.success(data.msg);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: () => {
      toast.error('Failed to create task, action not valid');
    },
  });

  const handleCreateTask = (formData: TaskFormData) => {
    mutate({formData, projectId});
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
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
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    New Task
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Complete the following form to create a {""}
                    <span className="text-sky-600">Task</span>
                  </p>

                  <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                    <TaskForm
                        register={register}
                        errors={errors}
                    />
                    <input
                      type="submit"
                      value="Save Project"
                      className=" bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
