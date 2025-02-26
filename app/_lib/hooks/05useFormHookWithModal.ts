import { useActionState } from "react";
import toast from "react-hot-toast";
import { TodoType } from "../schema/todo.schema";
import { addTodo } from "../../_actions/addTodo.action";

export type ResType = {
  success: boolean;
  prevState: Record<string, string>,
  message: string,
} | null

export const useFormHook = (setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>, setServerResponse: React.Dispatch<React.SetStateAction<{ success: boolean, message: string }>>, setInputValues: React.Dispatch<React.SetStateAction<{ title: string, content: string }>>) => {

  const [formState, formAction, isPending] = useActionState(async (prevState: unknown, formData: FormData) => {
    const newTodo = Object.fromEntries(formData.entries()) as TodoType

    const serverResponse = await addTodo(newTodo)
    //server validation
    setShowConfirm(false)
    if (!serverResponse.success) {
      toast.error("Error Servidor")
    } else {
      toast.success("Todo añadido")
      setInputValues({ title: "", content: "" })
    }

    setServerResponse(serverResponse)
    return

  }, null)

  return [formState, formAction, isPending] as const
}
