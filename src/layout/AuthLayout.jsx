import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../component/context/DarkMode";

const AuthLayout = (props) => {
  const { children, Text } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  console.log(isDarkMode);
  return (
    <div
      className={`flex justify-center min-h-screen items-center ${isDarkMode ? "bg-slate-800" : "bg-slate-100"
        }`}
    >
      <div className="w-full max-w-xs">
        <button
          className="bg-blue-600 rounded text-white p-2 absolute top-5 right-5"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Dark" : "Light"}
        </button>
        <h1 className="text-3xl font-bold mb-2 text-blue-400">{Text}</h1>
        <p className="font-medium text-slate-500 mb-3">
          Wellcome, please enter your identity
        </p>
        {children}
        <p className="font-medium text-center mt-5">
          {Text === "Login" ? "Don't have account? " : "Already have account? "}
          {Text === "Login" && (
            <Link to="/Register" className="text-blue-600">
              Register
            </Link>
          )}
          {Text === "Register" && (
            <Link to="/Login" className="text-blue-600">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};
export default AuthLayout;
