import "./Column.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faThumbTack
} from "@fortawesome/free-solid-svg-icons";

const Column = ({
  children,
  category,
  borderTopColor,
  opacity,
  width,
  amount_in_category,
  sidebarVisible,
  extendedContent,
  changeSize,
  writingMode,
  pinDisplay,
  background,
  pinFilterDisplay,
  pinClicked
}) => {
  return (
    <div
      className={`Column`}
      style={{ borderTopColor: borderTopColor, opacity: opacity, minWidth: width, background: background }}
      onClick={changeSize}
    >
      <div className="column-header bold" style={{ writingMode: writingMode }}>
        <div className="title-container">
          <span className="category-title">{category}</span>
          {pinDisplay && (<FontAwesomeIcon icon={faThumbTack} onClick={pinClicked}/>)}
        </div>

        <div className="pin-amount-wrap">
          <div className="pin-container" style={{display: pinFilterDisplay}} onClick={pinClicked}>
          <FontAwesomeIcon icon={faThumbTack} />
          </div>
          <span>{amount_in_category}</span>
        </div>
      </div>
      <div className="column-content" style={{ display: extendedContent }}>
        {children}
      </div>
    </div>
  );
};

export default Column;
