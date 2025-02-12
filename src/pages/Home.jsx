import Button from "../component/element/button";

const Home = () => {
  const HandleLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="font-bold text-3xl pb-20">Home Page</h1>
      <Button bgcolor="bg-blue-600" onClick={HandleLogin}>Login</Button>
    </div>
  );
};

export default Home;
