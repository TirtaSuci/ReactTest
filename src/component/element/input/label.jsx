const Label = (props) => {
    const { htmlFor, childern } = props;
    return (
      <label
        htmlFor={htmlFor}
        className="block text-slate-700 text-lg font-bold mb-2"
      >
        {childern}
      </label>
    );
  };
  export default Label;