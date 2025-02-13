import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full border-gray-400 py-2 px-3 text-slate-700"
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
      autoComplete="on"
    />
  );
});

export default InputForm;
