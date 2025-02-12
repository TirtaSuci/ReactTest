import { useRouteError } from "react-router";

const PageError = () => {
  const error = useRouteError;
  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-9xl">404</h1>
      <h1 className="text-4xl text-slate-500">Not Found</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default PageError;
