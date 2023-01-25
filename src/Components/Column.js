import "./Column.scss";

const Column = ({ children, category, borderTopColor, opacity, amount_in_category, sidebarVisible }) => {
  return (
    <div className={`Column`} style={{ borderTopColor: borderTopColor, opacity: opacity }}>
      
      <div className="column-header">
        <span className="category-title">{category}</span>
        <span>{amount_in_category}</span>
      </div>
      {children}
    </div>
  );
};

export default Column;
