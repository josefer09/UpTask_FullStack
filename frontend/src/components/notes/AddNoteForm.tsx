import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {

    const params = useParams();
    const projectId = params.projectId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('viewTask')!;

    const initialValue: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({defaultValues: initialValue});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
            return
        },
        onSuccess: (data) => {
            toast.success(data?.msg);
            reset();
            queryClient.invalidateQueries({
                queryKey: ["task", taskId],
            });
        },
    })

    const handleAddNote = (formData: NoteFormData) => {
        console.log(formData);
        const data = {
            formData,
            taskId,
            projectId,
        };

        mutate(data);
    }
  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
        >
            <div
                className=" flex flex-col gap-2">
                    <label className=" font-bold" htmlFor="content">Create Note</label>
                    <input
                    id="content"
                    type="text"
                    placeholder="Note Content"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', {
                        required: 'Note Content is required'
                    })}
                    />
                    {errors.content && (
                        <ErrorMessage>{errors.content.message}</ErrorMessage>
                    )}
            </div>

            <input
                type="submit"
                value='Create Note'
                className=" bg-sky-500 hover:bg-sky-600 w-full p-2 text-white font-black cursor-pointer"
                />

        </form>
  )
}
