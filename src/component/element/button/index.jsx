const Button = (props) => {
  const { children, bgcolor,type ="button", onClick = () => { } } = props;
  return (
    <button
      className={`h-10 px-6 ${bgcolor} font-bold rounded-md text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button >
  );
};

export default Button;
