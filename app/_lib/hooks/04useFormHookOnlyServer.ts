import { useActionState } from "react";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { TodoType } from "../schema/todo.schema";
import { addTodo } from "../../_actions/addTodo.action";

export type ResType = {
  success: boolean;
  // prevState: Record<string, string>;
  message: string;
} | null

export const useFormHookOnlyServer = (reset: UseFormReset<{
  title: string;
  content: string;
}>) => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries()) as TodoType

    const serverResponse = await addTodo(newTodo)
    //server validation
    if (!serverResponse.success) toast.error("Error Servidor")
    else {
      toast.success("Todo añadido")
      reset()
    }
    return serverResponse

  }, null)

  return [formState, formAction, isPending] as const
}
