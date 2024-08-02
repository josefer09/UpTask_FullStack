import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index.ts";
import { CreateProject } from "@/api/ProjectApi";
import { toast } from "react-toastify";

export default function CreateProjectView() {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

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
  } = useForm({ defaultValues: initialValues });

  const handleForm = async (formData: ProjectFormData) => {
    const response = await CreateProject(formData);
    if( response?.status !== 200 ) return toast.error('Failed to create Project');
    toast.success('Project Created Succefully');
    navigate('/projects');
  };
  return (
    <>
      <div className=" max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">My Projects</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">
          Fill out the following form
        </p>

        <nav className=" my-5">
          <Link
            className=" bg-sky-400 hover:bg-sky-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/projects"}
          >
            Return to menu
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm
            register={register}
            errors={errors}
          />
          <input
            type="submit"
            value="Create Project"
            className=" bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
