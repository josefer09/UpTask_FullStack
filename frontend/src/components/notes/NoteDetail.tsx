import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const params = useParams();
  const projectId = params.projectId!;

  // Recuperar el id en la url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  console.log(taskId);

  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.msg);
      // Invalidar Queries
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  const handleDeleteNote = (noteId: Note['_id']) => {
    const data = {
        projectId,
        taskId,
        noteId,
    };

    mutate(data);
  }

  if (isLoading) return "Loading...";
  return (
    <>
      <div className=" p-3 flex justify-between items-center">
        <div>
          <p>
            {note.content} by:{" "}
            <span className=" font-bold">{note.createdBy.name}</span>
          </p>
          <p className=" text-xs text-slate-500">{formDate(note.createdAt)}</p>
        </div>
        {canDelete && (
          <button
            onClick={() => handleDeleteNote(note._id)}
            type="button"
            className=" bg-red-400 hover:bg-red-500 text-xs p-2 font-bold text-white cursor-pointer transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
}
