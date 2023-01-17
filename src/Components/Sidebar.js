import "./Sidebar.scss";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import AwaitingTracking from "../AwaitingTracking";
import Dropdown from "../Dropdown";

const Sidebar = ({
  sidebarVisible,
  closeSidebar,
  layout,
  setExtended,
  setCondensed,
  toOrderVisible,
  orderedVisible,
  awaitingTrackingVisible,
  inboundVisible,
}) => {
  const [temporaryHide, setTemporaryHide] = useState(true);

  return (
    <>
      <div
        className={`Sidebar ${sidebarVisible ? "slideIn" : "slideOut"}`}
        style={{
          display: sidebarVisible,
          visiblity: temporaryHide ? "hidden" : "visible",
        }}
      >
        <p onClick={closeSidebar} className="close">
          close
        </p>
        <Dropdown marginBottom="15px" />
        <Dropdown marginBottom="15px" />
        <Dropdown marginBottom="15px" />
        <Dropdown marginBottom="15px" />
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
          <Toggle defaultChecked={true} onChange={toOrderVisible} />
          <span>To Order</span>
        </div>
        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={orderedVisible} />
          <span>Ordered</span>
        </div>
        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={awaitingTrackingVisible} />
          <span>Awaiting Tracking</span>
        </div>
        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={inboundVisible} />
          <span>Inbound</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
