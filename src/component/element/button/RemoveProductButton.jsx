const RemoveProductButton = (props) => {
    const { children,type ="button",className, onClick = () => { } } = props;
    return (
      <button
        className={`h-10 px-6 font-bold rounded-md ${className}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button >
    );
  };
  
  export default RemoveProductButton;