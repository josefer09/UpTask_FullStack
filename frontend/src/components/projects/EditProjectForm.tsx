import { Project, ProjectFormData } from "@/types/index";
import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {

    const navigate = useNavigate();
  /**
   * Register sirve para registrar cada input
   * handleSubmit se ejecuta para ver si pasamos la validacion
   * formState porque ahi estan los errores de validacion
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: UpdateProject,
    onError: () => {
        toast.error("Project Editing Failed");
    },
    onSuccess: (data) => {
      // Esta es la forma para invalidar la informacion cachada y volver a consultar
      queryClient.invalidateQueries({ queryKey: ['projects']});
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId]});
      toast.success(data.msg);
      console.log(data);
      navigate("/projects");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    mutate({ formData, projectId });
  };

  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Edit Project</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">
          Fill out the following form
        </p>

        <nav className=" my-5">
          <Link
            className=" bg-sky-400 hover:bg-sky-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/projects"}
          >
            Return to projects
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Save Project"
            className=" bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
