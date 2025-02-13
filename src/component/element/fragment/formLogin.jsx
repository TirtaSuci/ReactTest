import Index from "../input";
import Button from "../button";
import { useEffect, useRef } from "react";

const FormLogin = () => {
  const HandleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("email", event.target.email.value);
    localStorage.setItem("password", event.target.password.value);
    window.location.href = "/product";
  };
  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  })
  return (
    <form onSubmit={HandleLogin}>
      <Index
        childern="Email"
        type="email"
        placeholder="example@mail.com"
        name="email"
        ref={emailRef}
      ></Index>
      <Index
        childern="Password"
        type="password"
        placeholder="******"
        name="password"
      ></Index>
      <Button bgcolor="bg-blue-400 w-full" type="submit">login</Button>
    </form>
  );
};
export default FormLogin;
