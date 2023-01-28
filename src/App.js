import Toggle from "react-toggle";
import "./App.scss";
import Column from "./Components/Column";
import JobCard from "./Components/JobCard";
import "./Toggle.scss";
import { useEffect, useState, useRef, useMemo } from "react";
import Dropdown from "./Dropdown";
import AllJobs from "./AllJobs";
import otherUser from "./otherUser";
import Sidebar from "./Components/Sidebar";
import avatar from "./avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./Components/Search";
import SwitchModal from "./Components/SwitchModal";

const DEFAULT_USER = "default";
const CATEGORY_FILTER = "to_order";
const multipleUsersArray = [...otherUser, ...AllJobs];

function App() {

  useEffect(() => {
 console.log(carouselView)
  })

  const [showLateJobs, setShowLateJobs] = useState(true);
  const [user, setUser] = useState(DEFAULT_USER);

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

  const [toOrderVisible, setToOrderVisible] = useState(true);
  const [orderedVisible, setOrderedVisible] = useState(true);
  const [awaitingTrackingVisible, setAwaitingTrackingVisible] = useState(true);
  const [inboundVisible, setInboundVisible] = useState(true);
  const [column5Visible, setColumn5Visible] = useState(true);
  const [column6Visible, setColumn6Visible] = useState(true);
  const [column7Visible, setColumn7Visible] = useState(true);
  const [column8Visible, setColumn8Visible] = useState(true);
  const [column9Visible, setColumn9Visible] = useState(true);
  const [column10Visible, setColumn10Visible] = useState(true);
  const [column11Visible, setColumn11Visible] = useState(true);
  const [column12Visible, setColumn12Visible] = useState(true);
  const [column13Visible, setColumn13Visible] = useState(true);
  const [column14Visible, setColumn14Visible] = useState(true);
  const [column15Visible, setColumn15Visible] = useState(true);
  const [column16Visible, setColumn16Visible] = useState(true);
  const [column17Visible, setColumn17Visible] = useState(true);
  const [column18Visible, setColumn18Visible] = useState(true);
  const [column19Visible, setColumn19Visible] = useState(true);
  const [column20Visible, setColumn20Visible] = useState(true);

  const [noJobs, setNoJobs] = useState(false);

  const [department, setDepartment] = useState("Default");

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);

  const [carouselView, setCarouselView] = useState(0);

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
        toOrderVisible={() => {
          if (toOrderVisible) {
            setToOrderVisible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setToOrderVisible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        orderedVisible={() => {
          if (orderedVisible) {
            setOrderedVisible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setOrderedVisible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        awaitingTrackingVisible={() => {
          if (awaitingTrackingVisible) {
            setAwaitingTrackingVisible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setAwaitingTrackingVisible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        inboundVisible={() => {
          if (inboundVisible) {
            setInboundVisible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setInboundVisible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        column5Visible={() => {
          if (column5Visible) {
            setColumn5Visible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setColumn5Visible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        column6Visible={() => {
          if (column6Visible) {
            setColumn6Visible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setVisibleColumns(visibleColumns + 1);
            setColumn6Visible(true);
          }
        }}
        column7Visible={() => {
          if (column7Visible) {
            setColumn7Visible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setColumn7Visible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        column8Visible={() => {
          if (column8Visible) {
            setColumn8Visible(false);
            setVisibleColumns(visibleColumns - 1);
            console.log("hey");
          } else {
            setColumn8Visible(true);
            setVisibleColumns(visibleColumns + 1);
          }
        }}
        customerSupportDepartment={() => setDepartment("Customer Support")}
        defaultDepartment={() => setDepartment("Default")}
        globalTradeDepartment={() => setDepartment("Global Trade")}
        department={department}
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
          {visibleColumns === 0 && (
            <div className="no-jobs medium">There are no jobs available</div>
          )}
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
              {visibleColumns > 4 && carouselView > -400 && (
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
                      {toOrderVisible && department != "Customer Support" && (
                        <Column
                          category="To Order"
                          borderTopColor="#DC6942"
                          amount_in_category={toOrderState.length}
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
                              />
                            ))}
                          </>
                        </Column>
                      )}

                      {orderedVisible && (
                        <Column
                          category="Ordered"
                          borderTopColor="#1B90E6"
                          opacity={orderedState.length === 0 && "0.5"}
                          amount_in_category={orderedState.length}
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
                                fraction="3/6"
                                suffix="Ordered"
                              />
                            ))}
                          </>
                        </Column>
                      )}

                      {awaitingTrackingVisible && (
                        <Column
                          category="Awaiting Tracking Number"
                          borderTopColor="#1B90E6"
                          amount_in_category={awaitingTrackingState.length}
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
                                statusColor={job.late ? "white" : "#83E884"}
                                fraction="1/6"
                                suffix="TRACKING NOS. RECEIVED"
                              />
                            ))}
                          </>
                        </Column>
                      )}
                      {inboundVisible && (
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
                                statusColor={job.late ? "white" : "#83E884"}
                                fraction="3/6"
                                suffix="ARRIVED"
                              />
                            ))}
                          </>
                        </Column>
                      )}
                    </div>

                    <div className="column-container">
                      {column5Visible && (
                        <Column
                          category="Column 5"
                          borderTopColor="#1B90E6"
                          amount_in_category={toOrderState.length}
                        ></Column>
                      )}
                      {column6Visible && (
                        <Column
                          category="Column 6"
                          borderTopColor="#1B90E6"
                          opacity={orderedArray.length === 0 && "0.5"}
                          amount_in_category={orderedArray.length}
                        ></Column>
                      )}
                      {column7Visible && (
                        <Column
                          category="Column 7"
                          borderTopColor="#1B90E6"
                          amount_in_category={AwaitingTrackingArray.length}
                        ></Column>
                      )}

                      {column8Visible && (
                        <Column
                          category="Column 8"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                    </div>

                    <div className="column-container">
                      {column9Visible && (
                        <Column
                          category="Column 9"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column10Visible && (
                        <Column
                          category="Column 10"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column11Visible && (
                        <Column
                          category="Column 11"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column12Visible && (
                        <Column
                          category="Column 12"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                    </div>

                    <div className="column-container">
                      {column13Visible && (
                        <Column
                          category="Column 13"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column14Visible && (
                        <Column
                          category="Column 14"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column15Visible && (
                        <Column
                          category="Column 15"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column16Visible && (
                        <Column
                          category="Column 16"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                    </div>

                    <div className="column-container">
                      {column17Visible && (
                        <Column
                          category="Column 17"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column18Visible && (
                        <Column
                          category="Column 18"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column19Visible && (
                        <Column
                          category="Column 19"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
                      )}
                      {column20Visible && (
                        <Column
                          category="Column 20"
                          borderTopColor="#1B90E6"
                          amount_in_category={inboundArray.length}
                        ></Column>
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
}

export default App;
