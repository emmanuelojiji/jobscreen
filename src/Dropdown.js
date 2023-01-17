import "./Dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Dropdown = ({marginBottom}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="dropdown-container">
      <div
        className="dropdown-closed"
        style={{
          border: dropdownOpen && "solid 1px #3378CD",
          marginBottom: marginBottom,
        }}
        onClick={() =>
          dropdownOpen ? setDropdownOpen(false) : setDropdownOpen(true)
        }
      >
        <span>Default </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      <div
        className="dropdown-menu"
        style={{ display: dropdownOpen ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default Dropdown;
