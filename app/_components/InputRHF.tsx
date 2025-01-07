import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: "title" | "content";
  type?: "text" | "number" | "submit";
  placeholder?: string;
  defaultValue?: string | number;
  error?: string;
  className?: string;
  register: UseFormRegister<{ title: string, content: string }>;
}

export const InputRHF = ({ className, label, register, ...props }: InputProps) => {

  return (
    <>
      <input
        className={`input input-primary text-center text-slate-900 ${props.error && 'input-error'} bg-slate-200 ${className}`}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? label}
        {...register(`${label}`)}
        {...props}
      />
      <p className='text-red-700'>{props.error && props.error}</p>
    </>
  )
}