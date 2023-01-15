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
      <span className="job-number">{job_number}</span>
      {(layout === "extended" || cardOpen) && (
        <span className="time">{time}</span>
      )}
      <div
        className="tooltip"
        style={{ display: showTooltip ? "block" : "none" }}
      >
        <p>
          This job is <span className="tooltip-bold">2 days</span> and{" "}
          <span className="tooltip-bold">5 minutes late.</span>
        </p>
      </div>
    </div>
  );
};

export default JobCard;
