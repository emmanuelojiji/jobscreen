import "./Sidebar.scss";
import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import AwaitingTracking from "../AwaitingTracking";
import Dropdown from "../Dropdown";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  sidebarVisible,
  setSidebarVisible,
  closeSidebar,
  layout,
  setExtended,
  setCondensed,

  toOrderToggle,
  commercialInvoiceReqToggle,
  exportDocsToggle,
  IORToggle,
  awaitingConfirmationToggle,
  awaitingTrackingNumberToggle,
  dueInToWarehouseToggle,
  arrivedToggle,
  inboundingToggle,
  awaitingPartsToggle,
  transitPalletToggle,
  problemShelfToggle,
  preparingToShipToggle,
  buyShippingLabelToggle,
  customerCollectionToggle,
  packAndHoldToggle,
  toSendTrackingToggle,
  inTransitToggle,
  nonTrackableCourierToggle,
  exceptionToggle,
  toSendPODToggle,
  stillToActionToggle,
  lastColumnToggle,

  allDepartments,
  globalTradeDepartment,
  orderFulfilmentDepartment,
  warehouseAllDepartment,
  problemResolutionDepartment,
  warehouseInboundDepartment,
  warehouseOutboundDepartment,
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
        <FontAwesomeIcon
          icon={faXmark}
          onClick={closeSidebar}
          className="close"
        />

        <span className="heading bold">Filters</span>

        <div className="filters">
          <Dropdown
            placeholder={department}
            dropdownMarginBottom="15px"
            dropdownBackground="#1D2131"
            dropdownLabel="Department"
            menuItem={
              <>
                <span className="menu-item light" onClick={allDepartments}>
                  All
                </span>

                <span
                  className="menu-item light"
                  onClick={orderFulfilmentDepartment}
                >
                  Order Fulfilment
                </span>

                <span
                  className="menu-item light"
                  onClick={warehouseAllDepartment}
                >
                  Warehouse
                </span>

                <span
                  className="menu-item light"
                  onClick={problemResolutionDepartment}
                >
                  Warehouse - Problem Resolution
                </span>

                <span
                  className="menu-item light"
                  onClick={warehouseInboundDepartment}
                >
                  Inbound
                </span>

                <span
                  className="menu-item light"
                  onClick={warehouseOutboundDepartment}
                >
                  Outbound
                </span>

                <span
                  className="menu-item light"
                  onClick={globalTradeDepartment}
                >
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

        <span className="heading bold">Layout</span>
        <div className="toggle-container">
          <div className="toggle-wrap">
            <Toggle
              defaultChecked={true}
              onChange={toOrderToggle}
              value="to_order"
            />
            <span className="toggle-text medium">To Order</span>
          </div>
          <div className="toggle-wrap">
            <Toggle
              defaultChecked={true}
              onChange={commercialInvoiceReqToggle}
            />
            <span className="toggle-text medium">
              Commecial Invoice Required
            </span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={exportDocsToggle} />
            <span className="toggle-text medium">Export Docs Required</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={IORToggle} />
            <span className="toggle-text medium">IOR Required</span>
          </div>
          <div className="toggle-wrap">
            <Toggle
              defaultChecked={true}
              onChange={awaitingConfirmationToggle}
            />
            <span className="toggle-text medium">Awaiting Confirmation</span>
          </div>
          <div className="toggle-wrap">
            <Toggle
              defaultChecked={true}
              onChange={awaitingTrackingNumberToggle}
            />
            <span className="toggle-text medium">Awaiting Tracking Number</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={dueInToWarehouseToggle} />
            <span className="toggle-text medium">Due in to Warehouse</span>
          </div>
          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={arrivedToggle} />
            <span className="toggle-text medium">Arrived</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={inboundingToggle} />
            <span className="toggle-text medium">Inbounding</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={awaitingPartsToggle} />
            <span className="toggle-text medium">Awaiting Parts</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={transitPalletToggle} />
            <span className="toggle-text medium">Transit Pallet</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={problemShelfToggle} />
            <span className="toggle-text medium">Problem Shelf</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={preparingToShipToggle} />
            <span className="toggle-text medium">Preparing to Ship</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={buyShippingLabelToggle} />
            <span className="toggle-text medium">Buy Shipping Label</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={customerCollectionToggle} />
            <span className="toggle-text medium">Customer Collection</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={packAndHoldToggle} />
            <span className="toggle-text medium">Pack and Hold</span>
          </div>

          <div className="toggle-wrap">
            <Toggle defaultChecked={true} onChange={toSendTrackingToggle} />
            <span className="toggle-text medium">To Send Tracking</span>
          </div>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={inTransitToggle} />
          <span className="toggle-text medium">In Transit</span>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={nonTrackableCourierToggle} />
          <span className="toggle-text medium">Non-Trackable Courier </span>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={exceptionToggle} />
          <span className="toggle-text medium">Exception</span>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={toSendPODToggle} />
          <span className="toggle-text medium">To Send POD</span>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={stillToActionToggle} />
          <span className="toggle-text medium">Still To Action</span>
        </div>

        <div className="toggle-wrap">
          <Toggle defaultChecked={true} onChange={lastColumnToggle} />
          <span className="toggle-text medium">Last Column</span>
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
            className="extended-text medium"
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
            className="condensed-text medium"
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
