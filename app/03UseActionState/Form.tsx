"use client"

import { Input } from "../_components/Input"
import { useFormHook } from "../_lib/hooks/03useFormHook"

export default function FormWithUseActionState() {

  const [formState, formAction, isPending] = useFormHook()

  return (
    <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

      <code>useActionState<br />
        - utilizo un hook para usar el useStateAction<br />
        NO utlizo RHF<br />
      </code>

      <h2 className='text-2xl font-bold tracking-wide'>useActionState 👍</h2>

      <Input label='title' defaultValue={formState?.prevState?.title || ""} error={formState?.errors?.title || ""} />

      <Input label='content' defaultValue={formState?.prevState?.content || ""} error={formState?.errors?.content || ""} />

      <button className='btn btn-primary' type="submit" disabled={isPending}>{isPending ? "..." : "Crear"}</button>

      {<p id="server-response" className={`${formState?.success ? "text-green-700" : "text-red-700"}`}>{formState?.server && formState?.server}</p>}

    </form>
  )
}

