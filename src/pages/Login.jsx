import AuthLayout from "../layout/AuthLayout";
import FormLogin from "../component/element/fragment/formLogin";
import { Link } from "react-router";

const Login = () => {
  return (
    <AuthLayout Text="Login" type="Login">
      <FormLogin />
      <p>username: johnd</p>
      <p>password: m38rmF$</p>
    </AuthLayout>
  );
};
export default Login;
