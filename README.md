
** Info: 
        Testeamos distintas implementaciones de forms en nextjs15 con serverActions. 
      
** Utilizamos:
        zod como validacion y tipo.
        toast para mostrar resultado.
        useState para mostrar errores o conservar los valores del input luego de llamar a la accion del form.
        React Hook Form.
        useActionState.


** 01 - Simple Action form
==========================

    ...

    const [inputFields, ...] = useState()
    const [errors, ...] = useState()
    const [serverResponse, ...] = useState()

    const formAction = async(formData: FormData) => {

      const title = formData.get("title") as string
      const content = formData.get("content") as string
      setInputFields({ title, content })
      const newTodo = { title, content }

      //client validation
      const { success, data, error } = todoSchema.safeParse(newTodo)
      if (!success) {
        const { title: titleError, content: contentError } = error.flatten().fieldErrors
        // aca coloco en el useState `errors` y muestro en toast
      }

      //server action and validation
      const serverResponse = await addTodo(data)
      if (!serverResponse.success) {
        // aca coloco en el useState `serverResponse` y muestro en toast
      }

      //si todo salio bien, toast, muestro `serverResponse` y reset de `inputFields`

    }

    return (
      <form action={formAction}>
        <Input label="title" defaultValue={inputFields.title} error={errors.title} />
        <SubmitBtn>   // useFormState
        {
          serverResponse?.message ...
        }
      </form>
    )

** 02 - RHF + ServerAction
===========================

    ...
    const [serverResponse, ...] = useState()
    const {...} = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

    const onSubmit: SubmitHandler<TodoType> = async (data) => {

      // la validacion del cliente la hace RHF + zod

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
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} >
        <InputRHF label={"title"} error={errors?.title?.message || ""} register={register} />
        <button ... isSubmitting>
        {
          serverResponse?.message ...
        }
      </form>
    )

** 03 - useActionState
=======================

    const [formState, formAction, isPending] = useFormHook()

    return (
      <form action={formAction} >
        <Input label='title' defaultValue={formState?.prevState?.title || ""} error={formState?.errors?.title || ""} />
        <button ... isPending>
        {
          serverResponse?.message ...
        }
      </form>
    )

    export type ResType = {
    success: boolean;
    prevState: Record<string, string>,
    errors: Record<string, string>,
    server?: string,
    } | null

    const useFormHook = () => {

      const [formState, formAction, isPending] = useActionState(async (prevState: ResType, formData: FormData): Promise<ResType> => {
    
        const newTodo = Object.fromEntries(formData.entries())
        const responseObj = {
          success: false,
          prevState: newTodo as TodoType,
          errors: { title: "", content: "" },
          server: ""
        }

        // client validation
        const { success, data, error } = todoSchema.safeParse(newTodo)
        if (!success) {
          responseObj.errors =
          toast.error("Error Cliente")
          return responseObj
        }

        // server validation ...

        // si todo va bien
        toast.success("Todo añadido")
        responseObj.success = true
        responseObj.server = message
        responseObj.prevState = { title: "", content: "" }
        return responseObj

      }, null)

      return [formState, formAction, isPending] as const
    }

** 04 - RHF + useActionState 
=============================
(mucha mezcla)

    ...
    const { register, reset, formState: { errors }, handleSubmit } = useForm<TodoType>({ resolver: zodResolver(todoSchema) })

    const [formState, formAction, isPending] = useFormHookOnlyServer(reset);
    
    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      handleSubmit(() => {
        startTransition(() => formAction(new FormData(formRef.current!)))
      })(evt);
    }

    return (
      <form ref={formRef} action={formAction} onSubmit={onSubmit}>
        <InputRHF label={"title"} defaultValue={""} error={errors?.title?.message || ""} register={register} />
        <button ... isPending>
        {
          serverResponse?.message ...
        }

      </form>
    )