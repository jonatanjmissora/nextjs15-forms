"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { startTransition, useRef } from "react"
import { useFormHookOnlyServer } from "../_lib/hooks/04useFormHookOnlyServer"
import { InputRHF } from "../_components/InputRHF"
import { todoSchema, TodoType } from "../_lib/schema/todo.schema"

export default function FormClient() {

  const formRef = useRef<HTMLFormElement>(null);
  const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useFormHookOnlyServer(reset);
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleSubmit(() => {
      startTransition(() => formAction(new FormData(formRef.current!)))
    })(evt);
  }

  return (
    <form
      ref={formRef}
      className="flex gap-4 flex-col p-4 m-4 w-1/4"
      action={formAction}
      onSubmit={onSubmit}
    >
      <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF 👍</h2>

      <InputRHF label={"title"} defaultValue={""} error={errors?.title?.message || ""} register={register} />
      <InputRHF label={"content"} defaultValue={""} error={errors?.content?.message || ""} register={register} />

      <button className="btn btn-info" disabled={isPending} type="submit">Submit</button>

      {
        !formState?.success
          ? <div className="text-red-500">{formState?.message}</div>
          : <div className="text-green-500">{formState?.message}</div>
      }

    </form>
  )
}
