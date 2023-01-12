import "./Dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
  return (
    <div className="dropdown-closed">
      <span>Default </span>
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
  );
};

export default Dropdown;
