import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
const Button = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="px-[0.5rem] py-[0.35rem] tracking-wide rounded-md text-[0.65rem] font-medium bg-blue-50 text-black cursor-pointer hover:bg-blue-grey-600 hover:text-white"
    >
      {props.children}
      <FontAwesomeIcon className="ml-1" icon={faArrowUpRightFromSquare} />
    </a>
  );
};
export default Button;
