import "./Sidebar.scss";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";

const Sidebar = ({ sidebarVisible, layout, setExtended, setCondensed }) => {
  const [temporaryHide, setTemporaryHide] = useState(true);

  

  return (
    <div
      className={`Sidebar ${sidebarVisible ? "slideIn" : "slideOut"}`}
      style={{
        display: sidebarVisible,
        visiblity: temporaryHide ? "hidden" : "visible",
      }}
    >
      <div className="layout-container" onClick={setExtended}>
        <div
          className="extended-container layout-outer"
          style={{
            border: layout === "extended" && "solid 1px #428bca",
          }}
        >
          <div className="extended layout-inner"></div>
        </div>
        <span
          style={{
            color: layout === "extended" && "#428bca",
          }}
        >
          Extended
        </span>
      </div>

      <div className="layout-container" onClick={setCondensed}>
        <div
          className="extended-container layout-outer"
          style={{
            border: layout === "condensed" && "solid 1px #428bca",
          }}
        >
          <div className="condensed-inner layout-inner"></div>
        </div>
        <span
          style={{
            color: layout === "condensed" && "#428bca",
          }}
        >
          Condensed
        </span>
      </div>

      <div className="toggle-wrap">
        <Toggle />
        <span>To Order</span>
      </div>
      <div className="toggle-wrap">
        <Toggle />
        <span>Ordered</span>
      </div>
      <div className="toggle-wrap">
        <Toggle />
        <span>Awaiting Tracking</span>
      </div>
      <div className="toggle-wrap">
        <Toggle />
        <span>Inbound</span>
      </div>
    </div>
  );
};

export default Sidebar;
