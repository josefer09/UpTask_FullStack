import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslation } from "@/locales/en";
import DropTask from "./DropTask";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTask = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusColors: {[key: string]: string} = {
    pending: 'border-gray-500',
    onHold: 'border-red-500',
    inProgress: 'border-sky-500',
    underReview: 'border-yellow-500',
    completed: 'border-green-500',
  };

export default function TaskList({ tasks, canEdit, }: TaskListProps) {
  console.log(tasks);
  /**
   * Metodo que se encarga de organizar y agrupar las tareas por el status
   */
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  console.log(groupedTasks);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 
            className={`capitalize text-xl font-light border
                    bg-white p-3 border-t-8 ${statusColors[status]}`}>{statusTranslation[status]}</h3>
                    <DropTask/>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Tasks</li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} 
                canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
