import { getFullProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["viewProject", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]); // retorna true o false;

  if (isLoading && authLoading) return "Loading...";
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <h1 className=" text-5xl font-bold">{data.projectName}</h1>
        <p className=" text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className=" bg-sky-400 hover:bg-sky-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate("?newTask=true")}
            >
              Add Task
            </button>

            <Link
              to={"team"}
              className=" bg-indigo-400 hover:bg-indigo-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Collaborators
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails projectId={projectId} />
      </>
    );
}
