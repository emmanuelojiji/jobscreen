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
  background
}) => {
  return (
    <div
      className={`Column`}
      style={{ borderTopColor: borderTopColor, opacity: opacity, width: width, background: background }}
      onClick={changeSize}
    >
      <div className="column-header bold" style={{ writingMode: writingMode }}>
        <div className="title-container">
          <span className="category-title">{category}</span>
          {pinDisplay && (<FontAwesomeIcon icon={faThumbTack} />)}
        </div>
        <span>{amount_in_category}</span>
      </div>
      <div className="column-content" style={{ display: extendedContent }}>
        {children}
      </div>
    </div>
  );
};

export default Column;
