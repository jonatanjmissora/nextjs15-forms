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
      toast.error("Error en el servidor")
      return
    }

    toast.success("Todo creado")
    setInputFields(defaultErrors)
    setServerResponse({ success: true, message: "Todo creado exitosamente" })
  }

  return (
    <form action={clientAction} className='flex gap-4 flex-col p-4 border m-4'>

      <code>form action=`{`clientAction`}`<br />
        - invoco clientAction(formData)<br />
        - lo del formData lo paso a los useState `inputFields``
        - verificacion del cliente (zod), puedo usar toast<br />
        - utilizo el useState `error` si hay error de validacion<br />
        - invoco server action addTodo(newTodo), y verifico<br />
        - puedo usar la respuesta del servidor para el toast<br />
        - o para mostrarlo con el useState `serverResponse`<br />
        NO utlizo useActionState ni RHF, si utilizo useState<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>Simple Client Action</h2>

      <Input label="title" defaultValue={inputFields.title} error={errors.title} />
      <Input label="content" defaultValue={inputFields.content} error={errors.content} />

      <SubmitBtn />

      {
        serverResponse?.message &&
        <p id="server-response" className={`${serverResponse.success ? "text-green-700" : "text-red-700"}`}>{serverResponse.message}</p>
      }

    </form>
  )
}


