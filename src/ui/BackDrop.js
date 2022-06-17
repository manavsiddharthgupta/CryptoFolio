const BackDrop = (props) => {
  return (
    <div
      className="bg-black opacity-90 fixed top-0 left-0 w-full h-full z-[1]"
      onClick={props.onClick}
    ></div>
  );
};

export default BackDrop; 