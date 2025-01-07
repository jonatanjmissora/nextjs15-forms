"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import SubmitBtn from './SubmitBtn'
import { todoSchema } from '../_lib/schema/todo.schema'
import { addTodo } from '../_actions/addTodo.action'
import { Input } from '../_components/Input'

const defaultErrors = { title: "", content: "" }

export default function Form() {

  const [inputFields, setInputFields] = useState(defaultErrors)
  const [errors, setErrors] = useState(defaultErrors)
  const [serverResponse, setServerResponse] = useState({ success: false, message: "" })

  const clientAction = async (formData: FormData) => {
    setErrors(defaultErrors)
    setServerResponse({ success: false, message: "" })
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    setInputFields({ title, content })
    const newTodo = { title, content }

    //client validation
    const { success, data, error } = todoSchema.safeParse(newTodo)
    if (!success) {
      const { title: titleError, content: contentError } = error.flatten().fieldErrors
      if (titleError) setErrors(prev => ({ ...prev, title: titleError[0] }))
      if (contentError) setErrors(prev => ({ ...prev, content: contentError[0] }))
      toast.error("Error en el cliente")
      return
    }

    const serverResponse = await addTodo(data)
    // server validation
    if (!serverResponse.success) {
      setServerResponse({ success: false, message: serverResponse.message })
      toast.error("Error en el server")
      return
    }

    toast.success("Todo creado")
    setInputFields(defaultErrors)
    setServerResponse({ success: true, message: "Todo creado exitosamente" })
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col p-4 border m-4'>

      <code>action=`{`clientAction`}`<br />
        1 - invoco clientAction(formData)<br />
        2 - verificacion del cliente, puedo usar toast<br />
        3 - invoco server action addTodo(newTodo)<br />
        4 - verificacion del servidor, accion en la DB<br />
        5 - puedo usar la respuesta del servidor<br />
        NO utlizo useActionState ni RHF, si utilizo useState<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>Simple Client Action</h2>

      <Input label="title" defaultValue={inputFields.title} error={errors.title} />
      <Input label="content" defaultValue={inputFields.content} error={errors.content} />

      <SubmitBtn />

      {
        !serverResponse.success
          ? <div className="text-red-500">{serverResponse?.message}</div>
          : <div className="text-green-500">{serverResponse?.message}</div>
      }

    </form>
  )
}


