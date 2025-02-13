import Index from "../input";
import Button from "../button";
import { useEffect, useRef, useState } from "react";
import { login } from "../../../services/auth.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const HandleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/product";
      } else {
        setLoginFailed(res.response.data);
        console.log(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  })
  return (
    <form onSubmit={HandleLogin}>
      {loginFailed && <p className="text-red-500 text-center font-bold">{loginFailed}</p>}
      <Index
        childern="Username"
        type="text"
        placeholder="John Doe"
        name="username"
        ref={usernameRef}
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
