import Index from "../input";
import Button from "../button";

const FormRegister = () => {
  const HandleRegister = () => {
    console.log("Register");
  };
  return (
    <form action="">
      <Index
        childern="Fullname"
        type="text"
        placeholder="insert your name here"
      ></Index>
      <Index
        childern="Email"
        type="text"
        placeholder="example@mail.com"
      ></Index>
      <Index
        childern="Password"
        type="password"
        placeholder="******"
      ></Index>
      <Index
        childern="Confirm Password"
        type="password"
        placeholder="******"
      ></Index>
      <Button bgcolor="bg-red-400 w-full" onClick={() => { HandleRegister(); }}>Register Now</Button>
    </form>
  );
};
export default FormRegister;
