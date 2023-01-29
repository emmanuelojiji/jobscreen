import "./Column.scss";

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
}) => {
  return (
    <div
      className={`Column`}
      style={{ borderTopColor: borderTopColor, opacity: opacity, width: width }}
      onClick={changeSize}
    >
      <div className="column-header bold" style={{ writingMode: writingMode }}>
        <span className="category-title">{category}</span>
        <span>{amount_in_category}</span>
      </div>
      <div className="column-content" style={{ display: extendedContent }}>
        {children}
      </div>
    </div>
  );
};

export default Column;
