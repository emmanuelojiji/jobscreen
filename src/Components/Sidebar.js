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
  defaultDepartment,
  globalTradeDepartment,
  customerSupportDepartment,
  dropdownLabel,
  department,
  setDepartment
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

        <div className="filters">
          <Dropdown
            placeholder={department}
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
            dropdownLabel="Department"
            menuItem={
              <>
                <span className="menu-item" onClick={defaultDepartment}>
                  Default
                </span>
                <span className="menu-item" onClick={customerSupportDepartment}>
                  Customer Support
                </span>

                <span className="menu-item" onClick={globalTradeDepartment}>
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
      </div>
    </>
  );
};

export default Sidebar;
