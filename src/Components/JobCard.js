import { useState } from "react";
import "./JobCard.scss";
import clock from "../snoozed.svg";

const JobCard = ({
  layout,
  cardHeight,
  backgroundColor,
  displayLateIcon,
  tooltipDisplay,
  job_number,
  time,
  statusColor,
  fraction,
  suffix,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const [cardOpen, setCardOpen] = useState(false);

  return (
    <div
      className="JobCard"
      style={{
        backgroundColor: backgroundColor,
        height: cardOpen ? "150px" : cardHeight,
      }}
      onClick={() => {
        if (!cardOpen && layout === "condensed") {
          setCardOpen(true);
        } else {
          setCardOpen(false);
        }
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
      <span className="job-number medium">{job_number}</span>
      {(layout === "extended" || cardOpen) && (
        <>
          <span className="time light">{time}</span>

          <span className="status light" style={{ color: statusColor }}>
            <span>
              <span className="fraction bold">{`${fraction}`} </span>
              {suffix}
            </span>
          </span>
        </>
      )}

      <div
        className="tooltip"
        style={{ visibility: showTooltip ? "visible" : "hidden" }}
      >
        <p>
          This job is <span className="tooltip-bold">2 days</span> and{" "}
          <span className="tooltip-bold">5 minutes late.</span>
        </p>
      </div>
    </div>
  );
};

JobCard.defaultProps = {
  fraction:"",
  suffix: "",
};

export default JobCard;
