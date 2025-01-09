"use client"

import { useState } from "react"
import { useFormHook } from "../_lib/hooks/05useFormHookWithModal"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputRHF } from "../_components/InputRHF"
import { todoSchema, TodoType } from "../_lib/schema/todo.schema"

export default function FormClient() {

  const [inputValues, setInputValues] = useState({ title: "", content: "" })
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })
  const [formState, formAction, isPending] = useFormHook(setInputValues, setShowConfirm, reset)

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    const title = data?.title || ""
    const content = data?.content || ""
    setShowConfirm(prev => !prev)
    setInputValues({ title, content })
  }

  return (
    <>
      {
        showConfirm
          ? (
            <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/2'>

              <div className="text-2xl">
                <h2>¿ Confirma estos datos ?</h2>
                <p>title: {inputValues.title}</p>
                <p>content: {inputValues.content}</p>
              </div>

              <InputRHF label='title' defaultValue={inputValues.title} error={errors?.title?.message} register={register} className="hidden" />
              <InputRHF label='content' defaultValue={inputValues.content} error={errors?.content?.message} register={register} className="hidden" />

              <button type="submit" className="btn btn-primary" disabled={isPending}>Confirmar</button>
              <button type="button" className="btn btn-error" onClick={() => setShowConfirm(prev => !prev)}>Cancelar</button>

            </form>
          )
          : (
            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

              <h2 className='text-2xl font-bold tracking-wide'>useActionState + RHF + Confirm 👍</h2>

              <InputRHF label='title' defaultValue={inputValues.title} error={errors?.title?.message} register={register} />
              <InputRHF label='content' defaultValue={inputValues.content} error={errors?.content?.message} register={register} />

              <button type="submit" className="btn btn-primary" >Crear</button>

              {
                !formState?.success
                  ? <div className="text-red-500">{formState?.message}</div>
                  : <div className="text-green-500">{formState?.message}</div>
              }

            </form>
          )
      }
    </>
  )
}