import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
    // GetProjectId
    const params = useParams();
    const projectId = params.projectId!;

    // GetTaskId
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const taskId = queryParam.get('EditTask')!;

    // Consulta a la api
    const { data, isError} = useQuery({
        queryKey: ["editTask", taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        // enabled, en base alguna condicion ejecuta el codigo o no, y solo acepta true o false
        enabled: !!taskId, // el !! verifica si hay algo, de no haber encontrado algo, return false
        retry: false,
    });

    if (isError) return <Navigate to={"/404"}/>
    if (data) return <EditTaskModal data={data} projectId={projectId} taskId={taskId}/>
}
