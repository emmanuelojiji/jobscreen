import { useState } from "react";
import "./JobCard.scss";
import clock from "../snoozed.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";

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
  defaultUser
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const [cardOpen, setCardOpen] = useState(false);

  const [pinnedCardOpen, setPinnedCardOpen] = useState(false)

  return (
    <div
      className="JobCard"
      style={{
        backgroundColor: backgroundColor,
        height: cardOpen ? "150px" : cardHeight,
        width: width
      }}
      onClick={(e) => {
        if (!cardOpen && layout === "condensed") {
          setCardOpen(true);
        } else {
          setCardOpen(false);
        }

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
        <div className="number-username-container"><span className="job-number medium" style={{ fontSize: titleFontSize }}>{job_number}</span> {user_name != defaultUser && (<span className="username-container"><FontAwesomeIcon icon={faUser} />{user_name}</span>)}</div>
        <div className="circle" style={{ background: circleBackground, display: displayCircle }} onClick={circleOnClick}></div>
      </div>
      {(layout === "extended" || cardOpen) && (
        <div className="job-card-content" style={{ display: displayContent }}>
          <span className="time light">{time}</span>

          <span className="ceta" style={{ display: cetaDisplay }}>
            CETA <span className="ceta-bold">{ceta}</span>
          </span>

          <span className="status light" style={{ color: statusColor }}>
            <span>
              <span className="fraction bold">{`${fraction}`} </span>
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
};

export default JobCard;
