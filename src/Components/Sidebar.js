import "./Sidebar.scss";
import { useEffect, useState } from "react";

const Sidebar = ({ sidebarVisible }) => {
  const [temporaryHide, setTemporaryHide] = useState(true);

  return (
    <div
      className={`Sidebar ${sidebarVisible ? "slideIn" : "slideOut"}`}
      style={{
        display: sidebarVisible,
        visiblity: temporaryHide ? "hidden" : "visible",
      }}
    ></div>
  );
};

export default Sidebar;
