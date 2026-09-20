

interface FormInputProp {
  id: string;
  type: string;
  name: string;
  label: string;
  placeHolder: string;
  value: string;
  setValue: (newValue: string) => void;
}

const FormInput = ({
  id,
  type,
  label,
  name,
  placeHolder,
  value,
  setValue,
}: FormInputProp) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-text-primary  font-medium text-sm">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeHolder}
        autoComplete="off"
        className="text-text-primary bg-bg-light p-2 rounded-md border border-border text-sm"
      />
    </div>
  );
};

export default FormInput;
