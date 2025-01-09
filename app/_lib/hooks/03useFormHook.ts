import { useActionState } from "react";
import toast from "react-hot-toast";
import { addTodo } from "../../_actions/addTodo.action";
import { todoSchema, TodoType } from "../schema/todo.schema";

export type ResType = {
  success: boolean;
  prevState: Record<string, string>,
  errors: Record<string, string>,
  server?: string,
} | null

export const useFormHook = () => {

  const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    const newTodo = Object.fromEntries(formData.entries())
    console.log("entro")
    const responseObj = {
      success: false,
      prevState: newTodo as TodoType,
      errors: { title: "", content: "" },
      server: ""
    }

    // client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      responseObj.errors = { title: titleError ? titleError[0] : "", content: contentError ? contentError[0] : "" }
      toast.error("Error Cliente")
      return responseObj
    }

    const { success: serverSuccess, message } = await addTodo(data)
    //server validation
    if (!serverSuccess) {
      toast.error("Error Servidor")
      responseObj.server = message
      return responseObj
    }

    toast.success("Todo añadido")
    responseObj.success = true
    responseObj.server = message
    responseObj.prevState = { title: "", content: "" }
    return responseObj

  }, null)

  return [formState, formAction, isPending] as const
}
