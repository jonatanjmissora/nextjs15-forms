type InputProps = {
  label: string;
  type?: "text" | "number" | "submit";
  placeholder?: string;
  defaultValue?: string | number;
  error?: string;
  className?: string;
}

export const Input = ({ className, label, ...props }: InputProps) => {

  return (
    <>
      <input
        className={`input input-primary text-center text-slate-900 ${props.error && 'input-error'} bg-slate-200 ${className}`}
        name={label}
        type={props.type ?? "text"}
        placeholder={props.placeholder ?? label}
        {...props}
      />
      <p id={`${label}-error`} className='text-red-700'>{props.error && props.error}</p>
    </>
  )
}