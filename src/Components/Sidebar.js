import "./Sidebar.scss";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import AwaitingTracking from "../AwaitingTracking";
import Dropdown from "../Dropdown";
import { useRef } from "react";

const Sidebar = ({
  sidebarVisible,
  setSidebarVisible,
  closeSidebar,
  layout,
  setExtended,
  setCondensed,
  toOrderVisible,
  orderedVisible,
  awaitingTrackingVisible,
  inboundVisible,
  column5Visible,
  column6Visible,
  column7Visible,
  column8Visible,
  defaultDepartment,
  globalTradeDepartment,
  customerSupportDepartment,
  dropdownLabel,
  department,
  setDepartment,
}) => {
  const sidebarRef = useRef(null);

  const closeSidebarOutsideClick = (e) => {
    if (
      sidebarVisible &&
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setSidebarVisible(false);
    }
  };

  document.onmousedown = (e) => {
    closeSidebarOutsideClick(e);
  };

  return (
    <>
      <div
        className={`Sidebar ${sidebarVisible ? "slideIn" : "slideOut"}`}
        style={{
          display: sidebarVisible,
        }}
        ref={sidebarRef}
      >
        <p onClick={closeSidebar} className="close">
          close
        </p>

        <div className="filters">
          <Dropdown
            placeholder={department}
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
            dropdownLabel="Department"
            menuItem={
              <>
                <span className="menu-item light" onClick={defaultDepartment}>
                  Default
                </span>
                <span className="menu-item light" onClick={customerSupportDepartment}>
                  Customer Support
                </span>

                <span className="menu-item light" onClick={globalTradeDepartment}>
                  Global Trade
                </span>
              </>
            }
          />

          <Dropdown
            placeholder="Zone"
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
          />

          <Dropdown
            placeholder="Trader"
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
          />

          <Dropdown
            placeholder="Purchasing"
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
          />

          <Dropdown
            placeholder="CEX"
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
          />
        </div>

        <div className="toggle-container">
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={toOrderVisible} />
            <span className="toggle-text medium">To Order</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={orderedVisible} />
            <span className="toggle-text medium">Ordered</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={awaitingTrackingVisible} />
            <span className="toggle-text medium">Awaiting Tracking</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={inboundVisible} />
            <span className="toggle-text medium">Inbound</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={column5Visible} />
            <span className="toggle-text medium">Column 5</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={column6Visible} />
            <span className="toggle-text medium">Column 6</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={column7Visible} />
            <span className="toggle-text medium">Column 7</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={column8Visible} />
            <span className="toggle-text medium">Column 8</span>
          </div>
        </div>

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
            className="medium"
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
            className="medium"
            style={{
              color: layout === "condensed" && "#428bca",
            }}
          >
            Condensed
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
