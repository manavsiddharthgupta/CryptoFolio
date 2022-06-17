const Tags = (props) => {
  return (
    <span
      className={`p-[0.35rem] tracking-wide rounded-md text-[0.65rem] font-normal ${
        props.className !== undefined
          ? props.className
          : "bg-blue-50 text-grey-700"
      }`}
    >
      {props.children}
    </span>
  );
};
export default Tags;
