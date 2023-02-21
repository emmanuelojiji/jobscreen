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


const App = () => {

  const [defaultUser, setDefaultUser] = useState("Tom")

  const [showLateJobs, setShowLateJobs] = useState(true);
  const [showPinnedJobs, setShowPinnedJobs] = useState(true);

  const [carouselView, setCarouselView] = useState(0);

  const [layout, setLayout] = useState("extended");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [toOrderExtended, setToOrderExtended] = useState(false);
  const [orderedExtended, setOrderedExtended] = useState(false);

  const [allExpanded, setAllExpanded] = useState(true)

  const handleGlobalToggle = (expanded) => {
    setAllExpanded(!expanded);
  };




  const [columns, setColumns] = useState({
    pinned: { visible: true, extended: true, pinnedFilterActive: false },
    to_order: { visible: true, extended: true, pinnedFilterActive: false },
    commercial_invoice_req: { visible: true, extended: true, pinnedFilterActive: false },
    export_docs_req: { visible: true, extended: true, pinnedFilterActive: false },
    ior_required: { visible: true, extended: true, pinnedFilterActive: false },
    awaiting_confirmation: { visible: true, extended: true, pinnedFilterActive: false },
    awaiting_tracking_number: { visible: true, extended: true, pinnedFilterActive: false },
    due_into_warehouse: { visible: true, extended: true, pinnedFilterActive: false },
    arrived: { visible: true, extended: true, pinnedFilterActive: false },
    inbounding: { visible: true, extended: true, pinnedFilterActive: false },
    awaiting_parts: { visible: true, extended: true, pinnedFilterActive: false },
    transit_pallet: { visible: true, extended: true, pinnedFilterActive: false },
    problem_shelf: { visible: true, extended: true, pinnedFilterActive: false },
    preparing_to_ship: { visible: true, extended: true, pinnedFilterActive: false },
    buy_shipping_label: { visible: true, extended: true, pinnedFilterActive: false },
    customer_collection: { visible: true, extended: true, pinnedFilterActive: false },
    pack_and_hold: { visible: true, extended: true, pinnedFilterActive: false },
    to_send_tracking_label: { visible: true, extended: true, pinnedFilterActive: false },
    in_transit: { visible: true, extended: true, pinnedFilterActive: false },
    non_trackable_courier: { visible: true, extended: true, pinnedFilterActive: false },
    exception: { visible: true, extended: true, pinnedFilterActive: false },
    to_send_pod: { visible: true, extended: true, pinnedFilterActive: false },
    still_to_action: { visible: true, extended: true, pinnedFilterActive: false },
    last_column: { visible: true, extended: true, pinnedFilterActive: false },
  });

  const allPinnedFilterActiveAreFalse = Object.values(columns).every(column => column.pinnedFilterActive === false);

  const filteredColumns = Object.keys(columns).filter((column) => {
    return columns[column].pinnedFilterActive;
  });

  const numberOfActivePinnedFilters = filteredColumns.length;




  const [user, setUser] = useState("default");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(user === "default" ? [...AllJobs] : [...AllJobs, ...otherUser]);
  }, [user]);


  const getJobsByCategory = (jobs, category) => {
    return jobs.filter((job) => job.category.includes(category))
  }

  useEffect(() => {
    setPinnedJobs(jobs.filter(job => job.pinned && (showLateJobs || !job.late)));
  }, [jobs, showLateJobs]);



  const togglePin = (jobNumber) => {
    setJobs(prevArray => {
      return prevArray.map(job => {
        if (job.jobNumber === jobNumber) {
          return { ...job, pinned: !job.pinned };
        }
        return job;
      });
    });

    setPinnedJobs(prevPinnedJobs => {
      const updatedPinnedJobs = [...prevPinnedJobs];
      const jobIndex = updatedPinnedJobs.findIndex(job => job.jobNumber === jobNumber);
      if (jobIndex > -1) {
        updatedPinnedJobs.splice(jobIndex, 1);
      } else {
        const newJob = jobs.find(job => job.jobNumber === jobNumber);
        if (newJob.pinned && (showLateJobs || !newJob.late)) {
          updatedPinnedJobs.push(newJob);
        }
      }
      return updatedPinnedJobs;
    });
  };


  const pinnedArray = jobs.filter(job => job.pinned && (showLateJobs || !job.late));

  const [pinnedJobs, setPinnedJobs] = useState([])


  const allPinnedJobs = jobs.filter(job => job.pinned && (showLateJobs || !job.late))


  const filterPinnedJobs = (array) => {
    let pinnedJobsForColumn = [];

    if (numberOfActivePinnedFilters === 0) {
      pinnedJobsForColumn = allPinnedJobs;
    } else {
      pinnedJobsForColumn = array.filter(job => job.pinned);
      if (numberOfActivePinnedFilters > 1) {
        pinnedJobsForColumn = [...pinnedJobsForColumn, ...allPinnedJobs.filter(job => !pinnedJobsForColumn.includes(job))];
      }
    }

    setPinnedJobs(prevPinnedJobs => {
      const newPinnedJobs = [
        ...prevPinnedJobs.filter(job => !pinnedJobsForColumn.includes(job)),
        ...pinnedJobsForColumn
      ];
      return newPinnedJobs;
    });
  };


  const pinFilterClicked = (columnName) => {
    setColumns((prevColumns) => {
      const updatedColumns = {
        ...prevColumns,
        [columnName]: {
          ...prevColumns[columnName],
          pinnedFilterActive: !prevColumns[columnName].pinnedFilterActive,
        },
      };
      return updatedColumns;
    });
  }





  /*  // Add pinned jobs for this column
  const pinnedJobsForColumn = array.filter(job => job.pinned);
  setPinnedJobs((prevPinnedJobs) => [...prevPinnedJobs, ...pinnedJobsForColumn]); */





  const toOrderArray = getJobsByCategory(jobs, "to_order")
  const commercialInvoiceReqArray = getJobsByCategory(jobs, "commercial_invoice_req")
  const exportDocsReqArray = getJobsByCategory(jobs, "export_docs_req")
  const IORRequiredArray = getJobsByCategory(jobs, "ior_required")
  const awaitingConfirmationArray = getJobsByCategory(jobs, "awaiting_confirmation")
  const awaitingTrackingNumberArray = getJobsByCategory(jobs, "awaiting_tracking_number")
  const dueIntoWarehouseArray = getJobsByCategory(jobs, "due_into_warehouse")
  const arrivedArray = getJobsByCategory(jobs, "arrived")
  const inboundArray = getJobsByCategory(jobs, "inbound")
  const awaitingPartsArray = getJobsByCategory(jobs, "awaiting_parts")
  const transitPalletArray = getJobsByCategory(jobs, "transit_pallet")
  const problemShelfArray = getJobsByCategory(jobs, "problem_shelf")
  const preparingToShipArray = getJobsByCategory(jobs, "preparing_to_ship")
  const buyShippingLabelArray = getJobsByCategory(jobs, "buy_shipping_label")
  const customerCollectionArray = getJobsByCategory(jobs, "customer_collection")
  const packAndHoldArray = getJobsByCategory(jobs, "pack_and_hold")
  const toSendTrackingArray = getJobsByCategory(jobs, "to_send_tracking")
  const inTransitArray = getJobsByCategory(jobs, "in_transit")
  const nonTrackableCourierArray = getJobsByCategory(jobs, "non_trackable_courier")
  const exceptionArray = getJobsByCategory(jobs, "exception")
  const toSendPODArray = getJobsByCategory(jobs, "to_send_pod")
  const stillToActionArray = getJobsByCategory(jobs, "still_to_action")
  const lastColumnArray = getJobsByCategory(jobs, "last_column")

  let array = []

  useEffect(() => {
    filterPinnedJobs(array);
  }, [columns, array, filterPinnedJobs]);



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
    console.log(numberOfActivePinnedFilters);
  });

  const calculateColumnAmount = (array, showPinnedJobs, showLateJobs) => {
    let amount = array.length;

    if (!showPinnedJobs) {
      amount -= array.filter(job => job.pinned).length;
    }

    if (!showLateJobs) {
      amount -= array.filter(job => job.late).length;
    }

    return amount;
  }

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
        globalToggle={handleGlobalToggle}
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

          <div className="controls-option-wrap">
            <span className="controls-label normal">Show pinned</span>
            <label>
              <Toggle
                defaultChecked={true}
                onChange={(e) => {
                  if (e.target.checked) {
                    setShowPinnedJobs(true);
                  } else {
                    setShowPinnedJobs(false);
                  }
                }}
              />
            </label>
          </div>

          <div className="controls-option-wrap"></div>
          <Search
            user={user}

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


                    {columns.pinned.visible && (
                      <Column
                        category="Pinned"
                        borderTopColor="#d3d347"
                        opacity={pinnedJobs.length === 0 && "0.5"}
                        amount_in_category={pinnedJobs.length}
                        writingMode={
                          !columns.pinned.extended && "vertical-rl"
                        }
                        pinDisplay={columns.pinned.extended && "none"}
                        pinFilterDisplay="none"



                      >
                        {pinnedJobs.length < 1 && (<p className="no-jobs light">No jobs to show</p>)}
                        <>
                          {pinnedJobs.map((job, index) => (
                            <JobCard

                              job_number={job.jobNumber}
                              time={job.time}
                              layout={layout}
                              backgroundColor={job.late && "#D64045"}
                              displayLateIcon={job.late && "block"}
                              statusColor={job.late ? "white" : "#83E884"}
                              circleBackground={job.pinned && "gold"}
                              circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                              job={job}
                              pinned={job.pinned}
                              user_name={job.user_name}
                              defaultUser={defaultUser}
                              jobNumberColor={job.late && "white"}
                              displayTime="none"
                              category={job.category_display}

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
                          amount_in_category={
                            calculateColumnAmount(toOrderArray, showPinnedJobs, showLateJobs)
                          }
                          width={!columns.to_order.extended && "79px"}
                          extendedContent={
                            !columns.to_order.extended && "none"
                          }
                          changeSize={() => toggleColumnSize("to_order")}
                          writingMode={
                            !columns.to_order.extended && "vertical-rl"
                          }
                          pinFilterDisplay={!columns.to_order.extended && "none"}
                          pinClicked={(e) => { pinFilterClicked('to_order'); filterPinnedJobs(toOrderArray); e.stopPropagation() }}
                          pinFilterBackground={columns.to_order.pinnedFilterActive && "#407ceb"}
                        >
                          <>
                            {showPinnedJobs && <div className="pinned-container">
                              {toOrderArray.filter(job => (showLateJobs || !job.late) && (job.pinned)).map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  layout={layout}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  statusColor={job.late ? "white" : "#83E884"}
                                  ceta={job.ceta && job.ceta}
                                  circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                  circleBackground={job.pinned && "gold"}
                                  user_name={job.user_name}
                                  defaultUser={defaultUser}
                                  displayContent={layout === "extended" ? "flex" : "none"}
                                  jobNumberColor={job.late && "white"}
                                  circleBorder={job.late && "solid 1px white"}



                                />
                              ))}
                            </div>}



                            {toOrderArray.filter(job => (showLateJobs || !job.late) && !job.pinned).map((job, index) => (
                              <JobCard
                                job_number={job.jobNumber}
                                time={job.time}
                                cardHeight={
                                  layout === "extended" ? "150px" : "50px"
                                }
                                height={layout === "extended" ? "150px" : "50px"}
                                layout={layout}
                                backgroundColor={job.late && "#D64045"}
                                displayLateIcon={job.late && "block"}
                                statusColor={job.late ? "white" : "#83E884"}
                                cetaDisplay="none"
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                                displayContent={layout === "extended" ? "flex" : "none"}
                                jobNumberColor={job.late && "white"}
                                circleBorder={job.late && "solid 1px white"}
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
                          opacity={commercialInvoiceReqArray.length == 0 || (commercialInvoiceReqArray.length == 1 && !showLateJobs) && "0.5"}
                          amount_in_category={
                            calculateColumnAmount(commercialInvoiceReqArray, showPinnedJobs, showLateJobs)
                          }
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
                          pinFilterDisplay={!columns.commercial_invoice_req.extended && "none"}

                          pinFilterBackground={columns.commercial_invoice_req.pinnedFilterActive && "#407ceb"}
                          pinClicked={(e) => { pinFilterClicked('commercial_invoice_req'); filterPinnedJobs(commercialInvoiceReqArray); e.stopPropagation() }}
                        >

                          {showPinnedJobs && <div className="pinned-container">
                            {commercialInvoiceReqArray.filter(job => (showLateJobs || !job.late) && (job.pinned)).map((job, index) => (
                              <JobCard
                                job_number={job.jobNumber}
                                time={job.time}
                                layout={layout}
                                backgroundColor={job.late && "#D64045"}
                                displayLateIcon={job.late && "block"}
                                statusColor={job.late ? "white" : "#83E884"}
                                ceta={job.ceta && job.ceta}
                                fraction="3/6"
                                suffix="Ordered"
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                                displayContent={layout === "extended" ? "flex" : "none"}
                                jobNumberColor={job.late && "white"}
                                circleBorder={job.late && "solid 1px white"}



                              />
                            ))}
                          </div>}
                          <>
                            {commercialInvoiceReqArray.length == 0 || (commercialInvoiceReqArray.length == 1 && !showLateJobs) && (
                              <p className="no-jobs light">No jobs to show</p>
                            )}

                            {commercialInvoiceReqArray.filter(job => (showLateJobs || !job.late) && !job.pinned).map((job, index) => (
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
                                ceta={job.ceta && job.ceta}
                                fraction="3/6"
                                suffix="Ordered"
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                                jobNumberColor={job.late && "white"}
                                circleBorder={job.late && "solid 1px white"}

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
                          amount_in_category={exportDocsReqArray.length}
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
                          pinFilterDisplay={!columns.export_docs_req.extended && "none"}
                        >
                          <>

                            {showPinnedJobs && <div className="pinned-container">
                              {exportDocsReqArray.filter(job => (showLateJobs || !job.late) && (job.pinned)).map((job, index) => (
                                <JobCard
                                  job_number={job.jobNumber}
                                  time={job.time}
                                  layout={layout}
                                  backgroundColor={job.late && "#D64045"}
                                  displayLateIcon={job.late && "block"}
                                  statusColor={job.late ? "white" : "#83E884"}
                                  ceta={job.ceta && job.ceta}
                                  fraction="1/6"
                                  suffix="TRACKING NOS. RECEIVED"
                                  circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                  circleBackground={job.pinned && "gold"}
                                  user_name={job.user_name}
                                  defaultUser={defaultUser}
                                  displayContent={layout === "extended" ? "flex" : "none"}

                                />
                              ))}
                            </div>}

                            {exportDocsReqArray.filter(job => (showLateJobs || !job.late) && (!job.pinned)).map((job, index) => (
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={IORRequiredArray.length}
                          width={!columns.ior_required.extended && "79px"}
                          extendedContent={
                            !columns.ior_required.extended && "none"
                          }
                          changeSize={() => toggleColumnSize("ior_required")}
                          writingMode={
                            !columns.ior_required.extended && "vertical-rl"
                          }
                          pinFilterDisplay={!columns.ior_required.extended && "none"}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          width={
                            !columns.awaiting_confirmation.extended && "79px"
                          }
                          extendedContent={
                            !columns.awaiting_confirmation.extended && "none"
                          }
                          changeSize={() =>
                            toggleColumnSize("awaiting_confirmation")
                          }
                          writingMode={
                            !columns.awaiting_confirmation.extended &&
                            "vertical-rl"
                          }
                          pinFilterDisplay={!columns.awaiting_confirmation.extended && "none"}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={awaitingTrackingNumberArray.length}

                          width={
                            !columns.awaiting_tracking_number.extended && "79px"
                          }
                          extendedContent={
                            !columns.awaiting_tracking_number.extended && "none"
                          }
                          changeSize={() =>
                            toggleColumnSize("awaiting_tracking_number")
                          }
                          writingMode={
                            !columns.awaiting_tracking_number.extended &&
                            "vertical-rl"
                          }
                          pinFilterDisplay={!columns.awaiting_tracking_number.extended && "none"}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={dueIntoWarehouseArray.length}

                          width={
                            !columns.due_into_warehouse.extended && "79px"
                          }
                          extendedContent={
                            !columns.due_into_warehouse.extended && "none"
                          }
                          changeSize={() =>
                            toggleColumnSize("due_into_warehouse")
                          }
                          writingMode={
                            !columns.due_into_warehouse.extended &&
                            "vertical-rl"
                          }
                          pinFilterDisplay={!columns.due_into_warehouse.extended && "none"}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={arrivedArray.length}

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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={awaitingPartsArray.length}
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
                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={transitPalletArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={problemShelfArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={preparingToShipArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={buyShippingLabelArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={customerCollectionArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={packAndHoldArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={toSendTrackingArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                              />
                            ))}
                          </>
                        </Column>
                      )}

                    {columns.in_transit.visible && department === "all" && (
                      <Column
                        category="In Transit"
                        borderTopColor="#77C135"
                        amount_in_category={inTransitArray.length}
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

                              circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                              circleBackground={job.pinned && "gold"}
                              user_name={job.user_name}
                              defaultUser={defaultUser}
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
                          amount_in_category={nonTrackableCourierArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={exceptionArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                              />
                            ))}
                          </>
                        </Column>
                      )}



                    {columns.to_send_pod.visible && department === "all" && (
                      <Column
                        category="To Send POD"
                        borderTopColor="#77C135"
                        amount_in_category={toSendPODArray.length}
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

                              circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                              circleBackground={job.pinned && "gold"}
                              user_name={job.user_name}
                              defaultUser={defaultUser}
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
                          amount_in_category={stillToActionArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
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
                          amount_in_category={lastColumnArray.length}
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

                                circleOnClick={(e) => { togglePin(job.jobNumber); e.stopPropagation() }}
                                circleBackground={job.pinned && "gold"}
                                user_name={job.user_name}
                                defaultUser={defaultUser}
                              />
                            ))}
                          </>
                        </Column>
                      )}

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
