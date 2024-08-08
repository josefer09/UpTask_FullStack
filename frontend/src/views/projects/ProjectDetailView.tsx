import { GetProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom"


export default function ProjectDetailView() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["viewProject", projectId],
    queryFn: () => GetProjectById(projectId),
    retry: false,
  });

  if (isLoading) return "Loading...";
  if (isError) return <Navigate to="/404" />;
  if (data) return (
    <>
    <h1 className=" text-5xl font-bold">{data.projectName}</h1>
    <p className=" text-2xl font-light text-gray-500 mt-5">{data.description}</p>

    <nav className="my-5 flex gap-3">
      <button
        type="button"
        className=" bg-sky-400 hover:bg-sky-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        onClick={ () => navigate('?newTask=true')}
      >
        Add Task</button>
    </nav>
    <TaskList tasks={data.tasks}/>
    <AddTaskModal/>
    <EditTaskData/>
    <TaskModalDetails projectId={projectId}/>
    </>
  );
}
