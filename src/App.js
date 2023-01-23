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
import TestArray from "./TestArray";
import Sidebar from "./Components/Sidebar";

function App() {
  const toOrderArray = TestArray.filter((job) => job.category === "to_order");
  const orderedArray = TestArray.filter((job) => job.category === "ordered");
  const AwaitingTrackingArray = TestArray.filter(
    (job) => job.category === "awaiting_tracking"
  );
  const inboundArray = TestArray.filter((job) => job.category === "inbound");

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

  const searchQuery = TestArray.filter((query) =>
    query.jobNumber.toLowerCase().includes(search.toLowerCase())
  );

  const searchRef = useRef(null);

  const closeSearch = (e) => {
    if (searchRef.current && search && !searchRef.current.contains(e.target)) {
      setSearch(false);
    }
  };

  document.addEventListener("mousedown", closeSearch);

  return (
    <div className="App">
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

          <p className="name">Tom Blockley</p>
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
                  if (e.target.checked) {
                    setToOrderArrayCurrent(toOrderArray);
                    setOrderedArrayCurrent(orderedArray);
                  } else {
                    setToOrderArrayCurrent(
                      toOrderArrayCurrent.filter((job) => job.late == false)
                    );
                    setOrderedArrayCurrent(
                      orderedArrayCurrent.filter((job) => job.late == false)
                    );
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
            className="options-button"
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

      <div className="column-container">
        {!noJobs ? (
          <>
            {toOrderVisible && department != "Customer Support" && (
              <Column
                category="To Order"
                borderTopColor="#DC6942"
                amount_in_category={toOrderArrayCurrent.length}
              >
                <>
                  {toOrderArrayCurrent.map((job, index) => (
                    <JobCard
                      job_number={job.jobNumber}
                      time={job.time}
                      cardHeight={layout === "extended" ? "150px" : "50px"}
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
                opacity={orderedArrayCurrent.length === 0 && "0.5"}
                amount_in_category={orderedArrayCurrent.length}
              >
                <>
                  {orderedArrayCurrent.length == 0 && (
                    <p className="no-jobs">No jobs to show</p>
                  )}
                  {orderedArrayCurrent.map((job, index) => (
                    <JobCard
                      job_number={job.jobNumber}
                      time={job.time}
                      backgroundColor={job.late && "#D64045"}
                      displayLateIcon={job.late && "block"}
                      layout={layout}
                      cardHeight={layout === "extended" ? "150px" : "50px"}
                    />
                  ))}
                </>
              </Column>
            )}

            {awaitingTrackingVisible && (
              <Column
                category="Awaiting Tracking Number"
                borderTopColor="#1B90E6"
                amount_in_category={awaitingTrackingArrayCurrent.length}
              >
                <>
                  {awaitingTrackingArrayCurrent.map((job, index) => (
                    <JobCard
                      job_number={job.jobNumber}
                      time={job.time}
                      backgroundColor={job.late && "#D64045"}
                      displayLateIcon={job.late && "block"}
                      layout={layout}
                      cardHeight={layout === "extended" ? "150px" : "50px"}
                    />
                  ))}
                </>
              </Column>
            )}
            {inboundVisible && (
              <Column
                category="Inbound"
                borderTopColor="#77C135"
                amount_in_category={inboundArrayCurrent.length}
              >
                <>
                  {inboundArrayCurrent.map((job, index) => (
                    <JobCard
                      job_number={job.jobNumber}
                      time={job.time}
                      backgroundColor={job.late && "#D64045"}
                      displayLateIcon={job.late && "block"}
                      layout={layout}
                      cardHeight={layout === "extended" ? "150px" : "50px"}
                    />
                  ))}
                </>
              </Column>
            )}
          </>
        ) : (
          <h1>"hey"</h1>
        )}
      </div>
    </div>
  );
}

export default App;
