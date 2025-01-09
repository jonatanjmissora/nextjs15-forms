import { useActionState } from "react";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { TodoType } from "../schema/todo.schema";
import { addTodo } from "../../_actions/addTodo.action";

export type ResType = {
  success: boolean;
  prevState: Record<string, string>,
  message: string,
} | null

export const useFormHook = (setInputValues: React.Dispatch<React.SetStateAction<{ title: string, content: string }>>, setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>, reset: UseFormReset<{
  title: string;
  content: string;
}>) => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries()) as TodoType

    const serverResponse = await addTodo(newTodo)
    //server validation
    setShowConfirm(false)
    if (!serverResponse.success) {
      toast.error("Error Servidor")
      return serverResponse
    }

    toast.success("Todo añadido")
    setInputValues({ title: "", content: "" })
    reset()
    return serverResponse

  }, null)

  return [formState, formAction, isPending] as const
}
