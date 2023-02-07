import "./App.scss";
import "./Toggle.scss";
import { useEffect, useState, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faThumbTack
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

const App = () => {
  const [showLateJobs, setShowLateJobs] = useState(true);
  const [user, setUser] = useState("default");
  const [carouselView, setCarouselView] = useState(0);

  const [layout, setLayout] = useState("extended");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [toOrderExtended, setToOrderExtended] = useState(false);
  const [orderedExtended, setOrderedExtended] = useState(false);

  const [columns, setColumns] = useState({
    pinned: { visible: true, extended: true },
    to_order: { visible: true, extended: true },
    commercial_invoice_req: { visible: true, extended: true },
    export_docs_req: { visible: true, extended: true },
    ior_required: { visible: true, extended: true },
    awaiting_confirmation: { visible: true, extended: true },
    awaiting_tracking_number: { visible: true, extended: true },
    due_into_warehouse: { visible: true, extended: true },
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

  const [jobs, setJobs] = useState(user === "default" ? [...AllJobs] : [...AllJobs, ...otherUser]);

  const getJobsByCategory = (jobs, category) => {
    return jobs.filter((job) => job.category.includes(category))
  }

  /*const toOrderArray = getJobsByCategory(jobs, "to_order")
  const orderedArray = getJobsByCategory(jobs, "ordered")
  const awaitingTrackingArray = getJobsByCategory(jobs, "awaiting_tracking")
  const inboundArray = getJobsByCategory(jobs, "inbound")*/



  const pinnedArray = jobs.filter(job => job.pinned && (showLateJobs || !job.late));

  const [toOrderArray, setToOrderArray] = useState(getJobsByCategory(jobs, "to_order"))
  const [commercialInvoiceReqArray, setCommercialInvoiceReqArray] = useState(getJobsByCategory(jobs, "commerc"))
  const [exportDocsReqArray, setExportDocsReqArray] = useState(getJobsByCategory(jobs, "export_docs_req"))
  const [IORRequiredArray, setIORRequiredArray] = useState(getJobsByCategory(jobs, "ior_required_array"))
  const [awaitingConfirmationArray, setAwaitingConfirmationArray] = useState(getJobsByCategory(jobs, "awaiting_confirmation"))
  const [awaitingTrackingNumberArray, setAwaitingTrackingNumberArray] = useState(getJobsByCategory(jobs, "awaiting_tracking_number"))
  const [dueIntoWarehouseArray, setDueIntoWarehouseaRRAY] = useState(getJobsByCategory(jobs, "due_into_warehouse"))
  const [arrivedArray, setArrivedArray] = useState(getJobsByCategory(jobs, "arrived"))
  const [inboundArray, setInboundArray] = useState(getJobsByCategory(jobs, "inbound"))
  const [awaitingPartsArray, setAwaitingPartsArray] = useState(getJobsByCategory(jobs, "awaiting_parts"))
  const [transitPalletArray, setTransitPalletArray] = useState(getJobsByCategory(jobs, "transit_pallet"))
  const [problemShelfArray, setProblemShelfArray] = useState(getJobsByCategory(jobs, "problem_shelf"))
  const [preparingToShipArray, setPreparingToShipArray] = useState(getJobsByCategory(jobs, "preparing_to_ship"))
  const [buyShippingLabelArray, setBuyShippingLabelArray] = useState(getJobsByCategory(jobs, "buy_shipping_label"))
  const [customerCollectionArray, setCustomerCollectionArray] = useState(getJobsByCategory(jobs, "customer_collection"))
  const [packAndHoldArray, setPackAndHoldArray] = useState(getJobsByCategory(jobs, "pack_and_hold"))
  const [toSendTrackingArray, setToSendTrackingArray] = useState(getJobsByCategory(jobs, "to_send_tracking"))
  const [inTransitArray, setInTransitArray] = useState(getJobsByCategory(jobs, "in_transit"))
  const [nonTrackableCourierArray, setNonTrackableCourierArray] = useState(getJobsByCategory(jobs, "non_trackable_courier"))
  const [exceptionArray, setExceptionArray] = useState(getJobsByCategory(jobs, "exception"))
  const [toSendPODArray, setToSendPODArray] = useState(getJobsByCategory(jobs, "to_send_pod"))
  const [stillToActionArray, setStillToActionArray] = useState(getJobsByCategory(jobs, "still_to_action"))
  const [lastColumnArray, setLastColumnArray] = useState(getJobsByCategory(jobs, "last_column"))



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





  /*const togglePin = (jobNumber, setArray) => {
    setArray((prevArray) => {
      return prevArray.map((job) => {
        if (job.jobNumber === jobNumber) {
          return { ...job, pinned: !job.pinned };
        }
        return job;
      });
    });
  };*/

 
const togglePin = (jobNumber) => {
  setJobs(prevArray => {
    return prevArray.map(job => {
      if (job.jobNumber === jobNumber) {
        return { ...job, pinned: !job.pinned };
      }
      return job;
    });
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
            jobs={jobs}
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
            <div className="carousel-container">
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

                      {columns.pinned.visible && (
                        <Column
                          category="Pinned"
                          borderTopColor="#DC6942"
                          amount_in_category={pinnedArray.length}
                          width={!columns.to_order.extended && "79px"}
                          extendedContent={columns.to_order.extended ? "flex" : "none"}
                          changeSize={() => toggleColumnSize("to_order")}
                          writingMode={
                            !columns.to_order.extended && "vertical-rl"
                          }
                          pinDisplay={true}

                        >
                          <>
                            {pinnedArray.map((job, index) => (
                              <JobCard
                                job_number={job.jobNumber}
                                time={job.time}
                                cardHeight="70px"
                                width="70px"
                                layout={layout}
                                backgroundColor={job.late && "#D64045"}
                                displayLateIcon={job.late && "block"}
                                statusColor={job.late ? "white" : "#83E884"}
                                cetaDisplay="none"
                                circleBackground={ job.pinned && "red"}
                                circleOnClick={() => togglePin(job.jobNumber)}
                                displayCircle="none"
                                titleFontSize="12px"
                                displayContent="none"
                              />
                            ))}
                          </>
                        </Column>
                      )}











                      {columns.to_order.visible &&
                        (department == "all" ||
                          department == "order_fulfilment") && (
                          <Column
                            category="To Order"
                            borderTopColor="#DC6942"
                            amount_in_category={toOrderArray.length}
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

                              {toOrderArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleBackground={ job.pinned && "red"}
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                            opacity={commercialInvoiceReqArray.length === 0 && "0.5"}
                            amount_in_category={commercialInvoiceReqArray.length}
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
                              {commercialInvoiceReqArray.length == 0 && (
                                <p className="no-jobs light">No jobs to show</p>
                              )}

                              {commercialInvoiceReqArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}

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
                            amount_in_category={awaitingTrackingNumberArray.length}
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
                              
                              {exportDocsReqArray.filter(job => !job.pinned).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>

                    <div className="column-container">

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
                              {IORRequiredArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {awaitingConfirmationArray.map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {awaitingTrackingNumberArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}

                      {columns.due_into_warehouse.visible &&
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
                              {dueIntoWarehouseArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>

                    <div className="column-container">

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
                              {arrivedArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {inboundArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {awaitingPartsArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {transitPalletArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>

                    <div className="column-container">

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
                              {problemShelfArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {preparingToShipArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {buyShippingLabelArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {customerCollectionArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>

                    <div className="column-container">
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
                              {packAndHoldArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {toSendTrackingArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                            {inTransitArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                circleOnClick={() => togglePin(job.jobNumber)}
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
                              {nonTrackableCourierArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
                                />
                              ))}
                            </>
                          </Column>
                        )}
                    </div>


                    <div className="column-container">

                      {columns.exception.visible &&
                        (department === "all" ||
                          department === "global_trade") && (
                          <Column
                            category="Exception"
                            borderTopColor="#77C135"
                            amount_in_category={inboundArray.length}
                          >
                            <>
                              {exceptionArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                            {toSendPODArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                circleOnClick={() => togglePin(job.jobNumber)}
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
                              {stillToActionArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
                              {lastColumnArray.filter(job => (showLateJobs || !job.late)).map((job, index) => (
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
                                  circleOnClick={() => togglePin(job.jobNumber)}
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
