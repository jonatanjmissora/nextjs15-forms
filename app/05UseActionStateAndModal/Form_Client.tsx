import { SubmitHandler, useForm } from "react-hook-form";
import { todoSchema, TodoType } from "../_lib/schema/todo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputRHF } from "../_components/InputRHF";

export const ClientForm = ({ inputValues, setInputValues, setShowConfirm, serverResponse }:
  {
    inputValues: { title: string; content: string; },
    setInputValues: React.Dispatch<React.SetStateAction<{ title: string; content: string; }>>,
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>,
    serverResponse: { success: boolean, message: string }
  }) => {

  const { register, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    const title = data?.title || ""
    const content = data?.content || ""
    setShowConfirm(prev => !prev)
    setInputValues({ title, content })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

      <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF + Confirm 👍</h2>

      <InputRHF label='title' defaultValue={inputValues.title} error={errors?.title?.message} register={register} />
      <InputRHF label='content' defaultValue={inputValues.content} error={errors?.content?.message} register={register} />

      <button type="submit" className="btn btn-primary" >Crear</button>

      {
        !serverResponse?.success
          ? <p id="server-error" className="text-red-500">{serverResponse?.message}</p>
          : <p id="server-success" className="text-green-500">{serverResponse?.message}</p>
      }

    </form>
  )
}