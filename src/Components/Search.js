import { useState, useRef } from "react";

const Search = ({ user, DEFAULT_USER, AllJobs, multipleUsersArray }) => {
  const [search, setSearch] = useState("");

  const searchQuery =
    user === DEFAULT_USER
      ? AllJobs.filter((query) =>
          query.jobNumber
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        )
      : multipleUsersArray.filter((query) =>
          query.jobNumber
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        );

  const searchRef = useRef(null);

  const closeSearch = (e) => {
    if (searchRef.current && search && !searchRef.current.contains(e.target)) {
      setSearch(false);
    }
  };

  document.addEventListener("mousedown", closeSearch);
  return (
    <>
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
                    <h4 className="job_number bold">{query.jobNumber}</h4>
                    <span className="sub_heading light">Job</span>
                  </div>
                  <span className="country_flag">{query.country_flag}</span>
                </>
              )}
            </div>
          ))}

          {search.length > 0 && searchQuery.length === 0 && (
            <div className="search-result light">No results found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
