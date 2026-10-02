import type { InputHTMLAttributes } from "react";

interface FormInputProp extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({ label, id, ...inputProps }: FormInputProp) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-text-primary  font-medium text-sm">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        className="text-text-primary bg-bg-light p-2 rounded-md border border-border text-sm"
      />
    </div>
  );
};

export default FormInput;
