import "./App.scss";
import "./Toggle.scss";
import { useEffect, useState, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Column from "./Components/Column";
import JobCard from "./Components/JobCard";
import Toggle from "react-toggle";
import Dropdown from "./Dropdown";
import AllJobs from "./AllJobs";
import otherUser from "./otherUser";
import Sidebar from "./Components/Sidebar";
import avatar from "./avatar.jpg";
import Search from "./Components/Search";
import SwitchModal from "./Components/SwitchModal";

const DEFAULT_USER = "default";
const CATEGORY_FILTER = "to_order";
const multipleUsersArray = [...otherUser, ...AllJobs];

const App = () => {
  const [showLateJobs, setShowLateJobs] = useState(true);
  const [user, setUser] = useState(DEFAULT_USER);
  const [carouselView, setCarouselView] = useState(0);

  const toOrderFilter =
    (includeLate) =>
    ({ category, late }) =>
      category === "to_order" && (includeLate || !late);

  const toOrderState = useMemo(
    () =>
      (user === DEFAULT_USER ? AllJobs : multipleUsersArray).filter(
        toOrderFilter(showLateJobs)
      ),
    [user, showLateJobs]
  );

  const orderedFilter =
    (includeLate) =>
    ({ category, late }) =>
      category === "ordered" && (includeLate || !late);

  const orderedState = useMemo(
    () =>
      (user === DEFAULT_USER ? AllJobs : multipleUsersArray).filter(
        orderedFilter(showLateJobs)
      ),
    [user, showLateJobs] // hook dependencies
  );

  const awaitingTrackingFilter =
    (includeLate) =>
    ({ category, late }) =>
      category === "awaiting_tracking" && (includeLate || !late);

  const awaitingTrackingState = useMemo(
    () =>
      (user === DEFAULT_USER ? AllJobs : multipleUsersArray).filter(
        awaitingTrackingFilter(showLateJobs)
      ),
    [user, showLateJobs] // hook dependencies
  );

  const orderedArray =
    user === "default"
      ? AllJobs.filter((job) => job.category === "ordered")
      : multipleUsersArray.filter((job) => job.category === "ordered");

  const AwaitingTrackingArray =
    user === "default"
      ? AllJobs.filter((job) => job.category === "awaiting_tracking")
      : multipleUsersArray.filter(
          (job) => job.category === "awaiting_tracking"
        );

  const inboundArray =
    user === "default"
      ? AllJobs.filter((job) => job.category === "inbound")
      : multipleUsersArray.filter((job) => job.category === "inbound");

  const [layout, setLayout] = useState("extended");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [toOrderExtended, setToOrderExtended] = useState(false);
  const [orderedExtended, setOrderedExtended] = useState(false);

  const [columns, setColumns] = useState({
    to_order: { visible: true, extended: true },
    commercial_invoice_req: { visible: true, extended: true },
    export_docs_req: { visible: true, extended: true },
    ior_required: { visible: true, extended: true },
    awaiting_confirmation: { visible: true, extended: true },
    awaiting_tracking_number: { visible: true, extended: true },
    due_in_to_warehouse: { visible: true, extended: true },
    arrived: { visible: true, extended: true },
    inbounding: { visible: true, extended: true },
    awaiting_parts: { visible: true, extended: true },
    transit_pallet: { visible: true, extended: true },
    problem_shelf: { visible: true, extended: true },
    preparing_to_ship: { visible: true, extended: true },
    buy_shipping_label: { visible: true, extended: true },
    customer_collection: { visible: true, extended: true },
    pack_and_hold: { visible: true, extended: true },
    to_send_tracking_label: { visible: true, extended: true },
    in_transit: { visible: true, extended: true },
    non_trackable_courier: { visible: true, extended: true },
    exception: { visible: true, extended: true },
    to_send_pod: { visible: true, extended: true },
    still_to_action: { visible: true, extended: true },
    last_column: { visible: true, extended: true },
  });

  const changeColumnVisibility = (column) => {
    setColumns((prevState) => {
      return {
        ...prevState,
        [column]: {
          ...(prevState[column] || { visible: true }),
          visible: !(prevState[column] ? prevState[column].visible : true),
        },
      };
    });
  };

  const toggleVisibility = (column) => () => {
    changeColumnVisibility(column);
  };

  const toggleColumnSize = (column) => {
    setColumns((prevState) => {
      return {
        ...prevState,
        [column]: {
          ...(prevState[column] || { extended: true }),
          extended: !(prevState[column] ? prevState[column].extended : true),
        },
      };
    });
  };

  const [noJobs, setNoJobs] = useState(false);

  const [department, setDepartment] = useState("all");

  const [switchModalVisible, setSwitchModalVisible] = useState(false);

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const profileMenuRef = useRef(null);

  const closeProfileMenu = (e) => {
    if (
      profileMenuRef.current &&
      profileMenuVisible &&
      !profileMenuRef.current.contains(e.target)
    ) {
      setProfileMenuVisible(false);
    }
  };
  document.addEventListener("mousedown", closeProfileMenu);

  const [visibleColumns, setVisibleColumns] = useState(8);

  useEffect(() => {
    console.log(visibleColumns);
  });

  return (
    <div className="App">
      <SwitchModal
        user={user}
        setUser={setUser}
        switchModalVisible={switchModalVisible}
        setSwitchModalVisible={setSwitchModalVisible}
      />

      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        closeSidebar={() => setSidebarVisible(false)}
        setExtended={() => setLayout("extended")}
        setCondensed={() => {
          setLayout("condensed");
        }}
        layout={layout}
        toOrderToggle={toggleVisibility("to_order")}
        commercialInvoiceReqToggle={toggleVisibility("commercial_invoice_req")}
        exportDocsToggle={toggleVisibility("export_docs_req")}
        IORToggle={toggleVisibility("ior_required")}
        awaitingConfirmationToggle={toggleVisibility("awaiting_confirmation")}
        awaitingTrackingNumberToggle={toggleVisibility(
          "awaiting_tracking_number"
        )}
        dueInToWarehouseToggle={toggleVisibility("due_in_to_warehouse")}
        arrivedToggle={toggleVisibility("arrived")}
        inboundingToggle={toggleVisibility("inbounding")}
        awaitingPartsToggle={toggleVisibility("awaiting_parts")}
        transitPalletToggle={toggleVisibility("transit_pallet")}
        problemShelfToggle={toggleVisibility("problem_shelf")}
        preparingToShipToggle={toggleVisibility("preparing_to_ship")}
        buyShippingLabelToggle={toggleVisibility("buy_shipping_label")}
        customerCollectionToggle={toggleVisibility("customer_collection")}
        packAndHoldToggle={toggleVisibility("pack_and_hold")}
        toSendTrackingToggle={toggleVisibility("to_send_tracking_label")}
        inTransitToggle={toggleVisibility("in_transit")}
        nonTrackableCourierToggle={toggleVisibility("non_trackable_courier")}
        exceptionToggle={toggleVisibility("exception")}
        toSendPODToggle={toggleVisibility("to_send_pod")}
        stillToActionToggle={toggleVisibility("still_to_action")}
        lastColumnToggle={toggleVisibility("last_column")}
        department={department}
        allDepartments={() => setDepartment("all")}
        orderFulfilmentDepartment={() => setDepartment("all")}
        globalTradeDepartment={() => setDepartment("global_trade")}
        warehouseAllDepartment={() => setDepartment("warehouse_all")}
        warehouseInboundDepartment={() => setDepartment("warehouse_inbound")}
        warehouseOutboundDepartment={() => setDepartment("warehouse_outbound")}
      />

      <header>
        <div className="header-wrap page-width">
          <h2 className="bold">Jobs</h2>

          <div className="profile-menu-container">
            <div
              className="avatar"
              style={{ backgroundImage: `url(${avatar})` }}
              onClick={() => !profileMenuVisible && setProfileMenuVisible(true)}
            ></div>

            {profileMenuVisible && (
              <div
                className="profile-menu"
                ref={profileMenuRef}
                onClick={() => setProfileMenuVisible(false)}
              >
                <span
                  className="light"
                  onClick={() => setSwitchModalVisible(true)}
                >
                  View as
                </span>
                <span className="light">Log out</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="controls-wrap page-width">
          <div className="controls-option-wrap">
            <span className="controls-label normal">Show late jobs</span>
            <label>
              <Toggle
                defaultChecked={true}
                onChange={(e) => {
                  if (e.target.checked) {
                    setShowLateJobs(true);
                  } else {
                    setShowLateJobs(false);
                  }
                }}
              />
            </label>
          </div>

          <div className="controls-option-wrap"></div>
          <Search
            user={user}
            DEFAULT_USER={DEFAULT_USER}
            AllJobs={AllJobs}
            multipleUsersArray={multipleUsersArray}
          />

          <div className="controls-option-wrap">
            <span className="controls-label normal">Sort by</span>
            <Dropdown placeholder="Default" menuMarginTop="15px" />
          </div>
          <button
            className="button-filled"
            onClick={() => {
              if (sidebarVisible) {
                setSidebarVisible(false);
              } else {
                setSidebarVisible(true);
              }
              console.log("clicked");
            }}
          >
            Options
          </button>
        </div>
      </div>

      <main>
        <>
          <div className="overflow-wrap page-width">
            <div className="column-carousel">
              {carouselView < 0 && visibleColumns && (
                <div
                  className="left-button"
                  onClick={() =>
                    carouselView && setCarouselView(carouselView + 100)
                  }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              )}
              {visibleColumns > 4 && carouselView > -500 && (
                <div
                  className="right-button"
                  onClick={() => setCarouselView(carouselView - 100)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              )}
              {!noJobs ? (
                <>
                  <div
                    className="column-slide"
                    style={{ transform: `translateX(${carouselView}%)` }}
                  >
                    <div className="column-container">
                      {columns.to_order.visible &&
                        (department == "all" ||
                          department == "order_fulfilment") && (
                          <Column
                            category="To Order"
                            borderTopColor="#DC6942"
                            amount_in_category={toOrderState.length}
                            width={!columns.to_order.extended && "79px"}
                            extendedContent={
                              !columns.to_order.extended && "none"
                            }
                            changeSize={() => toggleColumnSize("to_order")}
                            writingMode={
                              !columns.to_order.extended && "vertical-rl"
                            }
                          >
                            <>
                              {toOrderState.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  layout={layout}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  statusColor={job.late ? "white" : "#83E884"}
                                  cetaDisplay="none"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.commercial_invoice_req.visible &&
                        (department === "all" ||
                          department === "order_fulfilment" ||
                          department === "global_trade") && (
                          <Column
                            category="Commercial Invoice Required"
                            borderTopColor="#1B90E6"
                            opacity={orderedState.length === 0 && "0.5"}
                            amount_in_category={orderedState.length}
                            width={
                              !columns.commercial_invoice_req.extended && "79px"
                            }
                            extendedContent={
                              !columns.commercial_invoice_req.extended && "none"
                            }
                            changeSize={() =>
                              toggleColumnSize("commercial_invoice_req")
                            }
                            writingMode={
                              !columns.commercial_invoice_req.extended &&
                              "vertical-rl"
                            }
                          >
                            <>
                              {orderedState.length == 0 && (
                                <p className="no-jobs light">No jobs to show</p>
                              )}

                              {orderedState.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  statusColor={job.late ? "white" : "#83E884"}
                                  ceta="12 August 2022"
                                  fraction="3/6"
                                  suffix="Ordered"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.export_docs_req.visible &&
                        (department === "all" ||
                          department === "order_fulfilment" ||
                          department === "global_trade") && (
                          <Column
                            category="Export Docs Required"
                            borderTopColor="#1B90E6"
                            amount_in_category={awaitingTrackingState.length}
                            width={!columns.export_docs_req.extended && "79px"}
                            extendedContent={
                              !columns.export_docs_req.extended && "none"
                            }
                            changeSize={() =>
                              toggleColumnSize("export_docs_req")
                            }
                            writingMode={
                              !columns.export_docs_req.extended && "vertical-rl"
                            }
                          >
                            <>
                              {awaitingTrackingState.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="1/6"
                                  suffix="TRACKING NOS. RECEIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}
                      {columns.ior_required.visible &&
                        (department === "all" ||
                          department === "global_trade") && (
                          <Column
                            category="IOR Required"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                            width={!columns.ior_required.extended && "79px"}
                            extendedContent={
                              !columns.ior_required.extended && "none"
                            }
                            changeSize={() => toggleColumnSize("ior_required")}
                            writingMode={
                              !columns.ior_required.extended && "vertical-rl"
                            }
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.awaiting_confirmation.visible &&
                        department === "all" && (
                          <Column
                            category="Awaiting Confirmation"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.awaiting_tracking_number.visible &&
                        department === "all" && (
                          <Column
                            category="Awaiting Tracking Number"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.due_in_to_warehouse.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_inbound" ||
                          department === "warehouse_problem_resolution") && (
                          <Column
                            category="Due in to Warehouse"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.arrived.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_inbound" ||
                          department === "warehouse_problem_resolution") && (
                          <Column
                            category="Arrived"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}
                 

                      {columns.inbounding.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_inbound" ||
                          department === "warehouse_problem_resolution") && (
                          <Column
                            category="Inbound"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.awaiting_parts.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_inbound") && (
                          <Column
                            category="Awaiting Parts"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.transit_pallet.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_inbound" ||
                          department === "warehouse_outbound") && (
                          <Column
                            category="Transit Pallet"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.problem_shelf.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_outbound") && (
                          <Column
                            category="Problem Shelf"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.preparing_to_ship.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_outbound") && (
                          <Column
                            category="Preparing to ship"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.buy_shipping_label.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_outbound") && (
                          <Column
                            category="Buy Shipping Label"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.customer_collection.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "warehouse_outbound" ||
                          department === "global_trade") && (
                          <Column
                            category="Customer Collection"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.pack_and_hold.visible &&
                        (department === "all" ||
                          department === "warehouse_all" ||
                          department === "global_trade") && (
                          <Column
                            category="Pack and Hold"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}
                 

                
                      {columns.to_send_tracking_label.visible &&
                        department === "all" && (
                          <Column
                            category="To Send Tracking Label"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.in_transit.visible && department === "all" && (
                        <Column
                          category="In Transit"
                          borderTopColor="#77C135"
                          amount_in_category={inboundArray.length}
                        >
                          <>
                            {inboundArray.map((job, index) => (
                              <JobCard
                                job_number={job.jobNumber}
                                time={job.time}
                                backgroundColor={job.late && "#D64045"}
                                displayLateIcon={job.late && "block"}
                                layout={layout}
                                cardHeight={
                                  layout === "extended" ? "150px" : "50px"
                                }
                                ceta="12 August 2022"
                                statusColor={job.late ? "white" : "#83E884"}
                                fraction="3/6"
                                suffix="ARRIVED"
                              />
                            ))}
                          </>
                        </Column>
                      )}

                      {columns.non_trackable_courier.visible &&
                        department === "all" && (
                          <Column
                            category="Non Trackable Courier"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.exception.visible &&
                        (department === "all" ||
                          department === "global_trade") && (
                          <Column
                            category="Exception"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.to_send_pod.visible && department === "all" && (
                        <Column
                          category="To Send POD"
                          borderTopColor="#77C135"
                          amount_in_category={inboundArray.length}
                        >
                          <>
                            {inboundArray.map((job, index) => (
                              <JobCard
                                job_number={job.jobNumber}
                                time={job.time}
                                backgroundColor={job.late && "#D64045"}
                                displayLateIcon={job.late && "block"}
                                layout={layout}
                                cardHeight={
                                  layout === "extended" ? "150px" : "50px"
                                }
                                ceta="12 August 2022"
                                statusColor={job.late ? "white" : "#83E884"}
                                fraction="3/6"
                                suffix="ARRIVED"
                              />
                            ))}
                          </>
                        </Column>
                      )}

                      {columns.still_to_action.visible &&
                        department === "all" && (
                          <Column
                            category="Still to Action"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.last_column.visible &&
                        (department === "all" ||
                          department === "global_trade") && (
                          <Column
                            category="Last Column"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {inboundArray.map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  layout={layout}
                                  cardHeight={
                                    layout === "extended" ? "150px" : "50px"
                                  }
                                  ceta="12 August 2022"
                                  statusColor={job.late ? "white" : "#83E884"}
                                  fraction="3/6"
                                  suffix="ARRIVED"
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <h1>"hey"</h1>
              )}
            </div>
          </div>
        </>
      </main>
    </div>
  );
};

export default App;
