import Toggle from "react-toggle";
import "./App.scss";
import Column from "./Components/Column";
import JobCard from "./Components/JobCard";
import "./Toggle.scss";
import { useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";
import ToOrder from "./ToOrder.js";
import Ordered from "./Ordered";
import AwaitingTracking from "./AwaitingTracking";
import Inbound from "./Inbound";
import AllJobs from "./AllJobs";
import otherUser from "./otherUser";
import Sidebar from "./Components/Sidebar";

function App() {
  const [showLateJobs, setShowLateJobs] = useState(true);
  const [user, setUser] = useState("default");
  const multipleUsersArray = [...otherUser, ...AllJobs];

  useEffect(() => {
    console.log(toOrderArray);
  });

  let toOrderArray =
    user === "default"
      ? AllJobs.filter((job) => job.category === "to_order")
      : multipleUsersArray.filter((job) => job.category === "to_order");

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

  const [toOrderArrayCurrent, setToOrderArrayCurrent] = useState(toOrderArray);
  const [orderedArrayCurrent, setOrderedArrayCurrent] = useState(orderedArray);
  const [awaitingTrackingArrayCurrent, setAwaitingTrackingArrayCurrent] =
    useState(AwaitingTrackingArray);
  const [inboundArrayCurrent, setInboundCurrent] = useState(inboundArray);

  const [layout, setLayout] = useState("extended");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [toOrderVisible, setToOrderVisible] = useState(true);
  const [orderedVisible, setOrderedVisible] = useState(true);
  const [awaitingTrackingVisible, setAwaitingTrackingVisible] = useState(true);
  const [inboundVisible, setInboundVisible] = useState(true);

  const [noJobs, setNoJobs] = useState(false);

  const [department, setDepartment] = useState("Default");

  const [search, setSearch] = useState("");

  const searchQuery = AllJobs.filter((query) =>
    query.jobNumber.toLowerCase().includes(search.toLowerCase())
  );

  const searchRef = useRef(null);

  const closeSearch = (e) => {
    if (searchRef.current && search && !searchRef.current.contains(e.target)) {
      setSearch(false);
    }
  };

  document.addEventListener("mousedown", closeSearch);

  const [switchModalVisible, setSwitchModalVisible] = useState(false);

  const switchModalRef = useRef(null);
  const closeSwitchModal = (e) => {
    if (
      switchModalRef.current &&
      switchModalVisible &&
      !switchModalRef.current.contains(e.target)
    ) {
      setSwitchModalVisible(false);
    }
  };

  document.addEventListener("mousedown", closeSwitchModal);

  const [carouselView, setCarouselView] = useState(0);

  return (
    <div className="App">
      {switchModalVisible && (
        <div className="switch_modal_container">
          <div className="switch_modal" ref={switchModalRef}>
            <h1>View as</h1>
            <p>You are currently logged in as Tom Blockley </p>
            <Dropdown
              placeholder={user === "default" ? "Default" : user}
              menuItem={
                <>
                  <span
                    className="menu-item"
                    onClick={() => setUser("Jack Smith")}
                  >
                    Default
                  </span>
                  <span
                    className="menu-item"
                    onClick={() => setUser("Jack Smith")}
                  >
                    Jack Smith
                  </span>
                  <span
                    className="menu-item"
                    onClick={() => setUser("Holly Jones")}
                  >
                    Holly Jones
                  </span>
                </>
              }
            />
            <div className="button-container">
              <button className="button-transparent">Cancel</button>
              <button className="button-filled" onClick={() => setUser("yaya")}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <Sidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        closeSidebar={() => setSidebarVisible(false)}
        setExtended={() => setLayout("extended")}
        setCondensed={() => {
          setLayout("condensed");
        }}
        layout={layout}
        toOrderVisible={() =>
          toOrderVisible ? setToOrderVisible(false) : setToOrderVisible(true)
        }
        orderedVisible={() =>
          orderedVisible ? setOrderedVisible(false) : setOrderedVisible(true)
        }
        awaitingTrackingVisible={() =>
          awaitingTrackingVisible
            ? setAwaitingTrackingVisible(false)
            : setAwaitingTrackingVisible(true)
        }
        inboundVisible={() =>
          inboundVisible ? setInboundVisible(false) : setInboundVisible(true)
        }
        customerSupportDepartment={() => setDepartment("Customer Support")}
        defaultDepartment={() => setDepartment("Default")}
        globalTradeDepartment={() => setDepartment("Global Trade")}
        department={department}
      />
      <header>
        <div className="header-wrap page-width">
          <h2>Jobs</h2>
          <div className="profile-menu-container">
            <div className="avatar"></div>

            <div className="profile-menu">
              <span onClick={() => setSwitchModalVisible(true)}>
                Switch account
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="controls-wrap page-width">
          <div className="controls-option-wrap">
            <span className="controls-label">Show late jobs</span>
            <label>
              <Toggle
                defaultChecked={true}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setShowLateJobs(false);
                  } else {
                    setShowLateJobs(true);
                  }
                }}
              />
            </label>
          </div>

          <div className="controls-option-wrap"></div>
          <div className="search-container">
            <input
              type="text"
              className="search"
              placeholder="Search for job.."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>

            <div
              className="search-results-container"
              style={{
                display: search ? "flex" : "none",
              }}
              ref={searchRef}
            >
              {searchQuery.map((query) => (
                <div className="search-result">
                  {searchQuery.length >= 1 && (
                    <>
                      <div>
                        <h4 className="job_number">{query.jobNumber}</h4>
                        <span className="sub_heading">Job</span>
                      </div>
                      <span className="country_flag">{query.country_flag}</span>
                    </>
                  )}
                </div>
              ))}

              {search.length > 0 && searchQuery.length === 0 && (
                <div className="search-result">No results found</div>
              )}
            </div>
          </div>

          <div className="controls-option-wrap">
            <span className="controls-label">Sort by</span>
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
        <div className="overflow-wrap page-width">
          <div className="column-carousel">
            <div
              className="left-button"
              onClick={() =>
                carouselView && setCarouselView(carouselView + 100)
              }
            ></div>
            <div
              className="right-button"
              onClick={() =>
                !carouselView && setCarouselView(carouselView - 100)
              }
            ></div>
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
                        amount_in_category={toOrderArray.length}
                      >
                        <>
                          {toOrderArray.map((job, index) => (
                            <JobCard
                              job_number={job.jobNumber}
                              time={job.time}
                              cardHeight={
                                layout === "extended" ? "150px" : "50px"
                              }
                              layout={layout}
                              backgroundColor={job.late && "#D64045"}
                              displayLateIcon={job.late && "block"}
                            />
                          ))}
                        </>
                      </Column>
                    )}

                    {orderedVisible && (
                      <Column
                        category="Ordered"
                        borderTopColor="#1B90E6"
                        opacity={orderedArray.length === 0 && "0.5"}
                        amount_in_category={orderedArray.length}
                      >
                        <>
                          {orderedArray.length == 0 && (
                            <p className="no-jobs">No jobs to show</p>
                          )}
                          {orderedArray.map((job, index) => (
                            <JobCard
                              job_number={job.jobNumber}
                              time={job.time}
                              backgroundColor={job.late && "#D64045"}
                              displayLateIcon={job.late && "block"}
                              layout={layout}
                              cardHeight={
                                layout === "extended" ? "150px" : "50px"
                              }
                            />
                          ))}
                        </>
                      </Column>
                    )}

                    {awaitingTrackingVisible && (
                      <Column
                        category="Awaiting Tracking Number"
                        borderTopColor="#1B90E6"
                        amount_in_category={AwaitingTrackingArray.length}
                      >
                        <>
                          {AwaitingTrackingArray.map((job, index) => (
                            <JobCard
                              job_number={job.jobNumber}
                              time={job.time}
                              backgroundColor={job.late && "#D64045"}
                              displayLateIcon={job.late && "block"}
                              layout={layout}
                              cardHeight={
                                layout === "extended" ? "150px" : "50px"
                              }
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
                            />
                          ))}
                        </>
                      </Column>
                    )}
                  </div>

                  <div className="column-container">
                    {toOrderVisible && department != "Customer Support" && (
                      <Column
                        category="To Order"
                        borderTopColor="#DC6942"
                        amount_in_category={toOrderArray.length}
                      ></Column>
                    )}

                    {orderedVisible && (
                      <Column
                        category="Ordered"
                        borderTopColor="#1B90E6"
                        opacity={orderedArray.length === 0 && "0.5"}
                        amount_in_category={orderedArray.length}
                      ></Column>
                    )}

                    {awaitingTrackingVisible && (
                      <Column
                        category="Awaiting Tracking Number"
                        borderTopColor="#1B90E6"
                        amount_in_category={AwaitingTrackingArray.length}
                      ></Column>
                    )}
                    {inboundVisible && (
                      <Column
                        category="Inbound"
                        borderTopColor="#77C135"
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
      </main>
    </div>
  );
}

export default App;
