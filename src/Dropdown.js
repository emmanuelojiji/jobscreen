import "./Dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Dropdown = ({
  dropdownLabel,
  marginBottom,
  menuItem,
  dropdownState,
  menuMarginTop,
  dropdownMarginBottom,
  dropdownBackground,
  placeholder,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <div className="dropdown-container">
        <div
          className="dropdown-closed"
          style={{
            border: dropdownOpen && "solid 1px #3378CD",
            marginBottom: dropdownMarginBottom,
            background: dropdownBackground,
          }}
          onClick={() =>
            dropdownOpen ? setDropdownOpen(false) : setDropdownOpen(true)
          }
        >
          <span>{placeholder}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>

        <div
          className="dropdown-menu"
          style={{
            display: dropdownOpen ? "block" : "none",
            marginTop: menuMarginTop,
          }}
          onClick={() => setDropdownOpen(false)}
        >
          {menuItem}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
