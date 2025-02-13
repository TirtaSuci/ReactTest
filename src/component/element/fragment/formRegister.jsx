import Index from "../input";
import Button from "../button";
import { useEffect, useRef } from "react";

const FormRegister = () => {
  const HandleRegister = () => {
    console.log("Register");
  };
  const fullName = useRef(null);
  useEffect(() => {
    fullName.current.focus();
  });
  return (
    <form action="">
      <Index
        childern="Fullname"
        type="text"
        placeholder="insert your name here"
        ref={fullName}
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
