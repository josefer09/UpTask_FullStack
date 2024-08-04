import { GetProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => GetProjectById(projectId),
        retry: false,
    });
    console.log(isLoading);
    console.log(data);

    if( isLoading ) return 'Loading...';
    if( isError ) return <Navigate to="/404" />

  if(data) return <EditProjectForm data={data} projectId={projectId}/>
}
