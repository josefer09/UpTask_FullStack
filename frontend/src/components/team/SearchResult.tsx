import { addUserProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember;
    reset: () => void;
}
export default function SearchResult({ user, reset }: SearchResultProps) {
    console.log(user._id);

    const navigate = useNavigate();

    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();


    const { mutate } = useMutation({
        mutationFn: addUserProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data?.msg);
            reset();
            navigate(location.pathname, { replace: true });
            queryClient.invalidateQueries({
                queryKey: ['projectTeam', projectId],
            });
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id,
        };
        mutate(data);
    }
  return (
    <>
    <p className=" mt-10 text-center font-bold ">Result</p>
    <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
            onClick={handleAddUserToProject}
            className=" text-blue-600 hover:bg-blue-100 px-10 py-3 font-bold cursor-pointer">
            Add Member to Project
        </button>
    </div>
    </>
  )
}
