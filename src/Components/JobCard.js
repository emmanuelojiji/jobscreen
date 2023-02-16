import { useState } from "react";
import "./JobCard.scss";
import clock from "../snoozed.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";

import avatar from "../job-card-avatar.jpeg"

const JobCard = ({
  layout,
  cardHeight,
  width,
  backgroundColor,
  displayLateIcon,
  tooltipDisplay,
  job_number,
  time,
  ceta,
  cetaDisplay,
  statusColor,
  fraction,
  suffix,
  circleBackground,
  circleOnClick,
  displayCircle,
  titleFontSize,
  displayContent,
  job,
  pinned,
  user_name,
  defaultUser,
  height,
  cardOnClick,
  jobNumberColor
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const [isExpanded, setIsExpanded] = useState(true);


  return (
    <div
      className="JobCard"
      style={{
        backgroundColor: backgroundColor,
        height: isExpanded ? "150px" : "50px",
        width: width
      }}
      onClick={(e) => {
        setIsExpanded(!isExpanded)
        e.stopPropagation();
      }}
    >
      <div
        className="late-icon"
        style={{ display: displayLateIcon }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img src={clock} />
      </div>
      <div className="number-circle-container">
        <div className="number-username-container"><span className="job-number medium" style={{ fontSize: titleFontSize, color: jobNumberColor }}>{job_number}</span> {user_name != defaultUser && (<div className="job-card-avatar" style={{ backgroundImage: `url(${avatar})` }}></div>)}</div>
        <div className="circle" style={{ background: circleBackground, display: displayCircle }} onClick={circleOnClick}></div>
      </div>
      {(layout === "extended") && (
        <div className="job-card-content" style={{ display: isExpanded ? "flex" : "none" }}>
          <span className="time light">{time}</span>

          {ceta && <span className="ceta" style={{ display: cetaDisplay }}>
            CETA <span className="ceta-bold">{ceta}</span>
          </span>}

          <span className="status light" style={{ color: statusColor }}>
            <span>
              {fraction && <span className="fraction bold">{`${fraction}`} </span>}
              {suffix}
            </span>
          </span>
        </div>
      )}

      <div
        className="tooltip"
        style={{ visibility: showTooltip ? "visible" : "hidden" }}
      >
        <p className="normal">
          This job is <span className="bold">2 days</span> and{" "}
          <span className="bold">5 minutes late.</span>
        </p>
      </div>
    </div>
  );
};

JobCard.defaultProps = {
  fraction: "",
  suffix: "",
  ceta: "",
};

export default JobCard;
