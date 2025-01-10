"use client"

import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, TodoType } from "../_lib/schema/todo.schema"
import { addTodo } from "../_actions/addTodo.action"
import { InputRHF } from "../_components/InputRHF"

export default function FormWithUseActionState() {

  const [serverResponse, setServerResponse] = useState({ success: false, message: "" })
  const { register, reset, formState: { errors, isSubmitting }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit: SubmitHandler<TodoType> = async (data) => {

    setServerResponse({ success: false, message: "" })
    const response = await addTodo(data)
    if (!response.success) {
      toast.error("Error en el servidor")
    }
    else {
      toast.success("Todo creado exitosamente")
      reset()
    }
    setServerResponse(response)
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col p-4 border m-4'>

      <code>onSubmit=`{`hanldeSubmit(onSubmit)`}<br />
        1 - verificacion del cliente con RHF<br />
        2 - invoco server action addTodo(newTodo)<br />
        3 - dentro del onSubmit<br />
        NO utlizo useActionState<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>Server Action + RHF 👍</h2>

      <InputRHF label={"title"} error={errors?.title?.message || ""} register={register} />
      <InputRHF label={"content"} error={errors?.content?.message || ""} register={register} />

      <button className='btn btn-primary' type="submit" disabled={isSubmitting}>Crear</button>

      {<p id="server-response" className={`${serverResponse.success ? "text-green-700" : "text-red-700"}`}>{serverResponse?.message && serverResponse.message}</p>}

    </form>
  )
}
