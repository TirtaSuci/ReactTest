import { forwardRef } from "react";
import InputForm from "./input";
import Label from "./label";

const Index = forwardRef((props, ref) => {
  const { childern, type, placeholder, name } = props;
  return (
    <div className="mb-3">
      <Label childern={childern}></Label>
      <InputForm name={name} type={type} placeholder={placeholder} ref={ref}></InputForm>
    </div>
  );
});
export default Index;
