import { Input } from "../_components/Input";
import { useFormHook } from "../_lib/hooks/05useFormHookWithModal";

export const ServerForm = ({ inputValues, setInputValues, setShowConfirm, setServerResponse }:
  {
    inputValues: { title: string; content: string; },
    setInputValues: React.Dispatch<React.SetStateAction<{ title: string; content: string; }>>,
    setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>,
    setServerResponse: React.Dispatch<React.SetStateAction<{ success: boolean; message: string; }>>
  }) => {

  const [, formAction, isPending] = useFormHook(setShowConfirm, setServerResponse, setInputValues)

  return (
    <form action={formAction} className='flex gap-4 flex-col p-4 m-4 w-1/4'>

      <div className="text-2xl">
        <h2>¿ Confirma estos datos ?</h2>
        <p>title: {inputValues.title}</p>
        <p>content: {inputValues.content}</p>
      </div>

      <Input label='title' defaultValue={inputValues.title} className="hidden" />
      <Input label='content' defaultValue={inputValues.content} className="hidden" />

      <button type="submit" className="btn btn-primary" disabled={isPending}>{isPending ? <span className="loading loading-dots text-white"></span> : "Confirmar"}</button>
      <button type="button" className="btn btn-error" onClick={() => setShowConfirm(prev => !prev)}>Cancelar</button>

    </form>
  )
}