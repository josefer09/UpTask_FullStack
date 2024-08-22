import { Project, TaskProyect, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslation } from "@/locales/en";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskApi";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProyect[];
  canEdit: boolean;
};

type GroupedTask = {
  [key: string]: TaskProyect[];
};

const initialStatusGroups: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusColors: { [key: string]: string } = {
  pending: "border-gray-500",
  onHold: "border-red-500",
  inProgress: "border-sky-500",
  underReview: "border-yellow-500",
  completed: "border-green-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {

  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: () => {
      toast.error("Error, task cannot be updated");
    },
    onSuccess: () => {
      toast.success("Task Status Updated");
      queryClient.invalidateQueries({ queryKey: ["viewProject", projectId] });
      navigate(location.pathname, { replace: true });
    },
  });
  /**
   * Metodo que se encarga de organizar y agrupar las tareas por el status
   */
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  console.log(groupedTasks);

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if(over && over.id) { // Cuando se suelte en un drop valido
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;

      mutate({projectId, taskId, status});

      queryClient.setQueryData(['project', projectId], (prevData: Project) => {
        // Update task manually
        // Actualizacion optimista
        console.log(prevData, 'debug');
        const updatedTask = prevData.tasks.map((task) => {
          if(task._id === taskId) {
            return {
              ...task,
              status // Cambio manualmente el estado de la tarea
            }
          }
          return task
        })

        return {
          ...prevData,
          tasks: updatedTask,
        }
      })
    }
  }

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
              className={`capitalize text-xl font-light border
                    bg-white p-3 border-t-8 ${statusColors[status]}`}
            >
              {statusTranslation[status]}
            </h3>
            <DropTask status={status}/>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Tasks</li>
              ) : (
                tasks.map((task) => (
                  <TaskCard key={task._id} task={task} canEdit={canEdit} />
                ))
              )}
            </ul>
          </div>
        ))}
        </DndContext>
      </div>
    </>
  );
}
