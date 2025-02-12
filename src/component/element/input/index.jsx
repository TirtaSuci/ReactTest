import InputForm from "./input";
import Label from "./label";

const Index = (props) => {
  const { childern, type, placeholder, name } = props;
  return (
    <div className="mb-3">
      <Label childern={childern}></Label>
      <InputForm name={name} type={type} placeholder={placeholder}></InputForm>
    </div>
  );
};
export default Index;
