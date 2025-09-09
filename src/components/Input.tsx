import type { ChangeEvent } from "react";

interface InputProps {
  inputName: string;
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  labelClassname?: string;
  inputClassname?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; 
  error?: string;
  name?: string;
}

const Input = ({
  inputName,
  label,
  containerClassName,
  labelClassname,
  inputClassname,
  required,
  type,
  value,
  onChange,
  error,
  name
}: InputProps) => {
  return (
    <div className={`relative w-full ${containerClassName}`}>
      <input
        id={inputName}
        name={name}
        placeholder=" "
        className={`
          block px-2 pt-5 pb-2 w-full text-sm border border-gray-300 rounded-md
          focus:outline-none focus:border-[#00b0c3] focus:ring-0 focus:ring-[#00b0c3]
          peer ${inputClassname}
        `}
        type={type || "text"}
        value={value}
        onChange={onChange}
        required={required}
      />
      {label && (
        <label
          htmlFor={inputName}
          className={`
            absolute left-2 px-1 bg-white text-gray-500
            transition-all duration-150
            -top-2.5 text-sm
            peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
            peer-focus:-top-2.5 peer-focus:text-[#00b0c3] peer-focus:text-sm
            cursor-text ${labelClassname}
          `}
        >
          {label}
        </label>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default Input;
