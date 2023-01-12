import "./Column.scss";

const Column = ({ children, category, borderTopColor, amount_in_category }) => {
  return (
    <div className="Column" style={{ borderTopColor: borderTopColor }}>
      <div className="column-header">
        <span className="category-title">{category}</span>
        <span>{amount_in_category}</span>
      </div>
      {children}
    </div>
  );
};

export default Column;
