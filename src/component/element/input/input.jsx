import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholde: opacity-50"
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
      autoComplete="on"
    />
  );
});

export default InputForm;
