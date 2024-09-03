import React from "react";

const List = ({ items = [], className = "", itemClassName = "", ...props }) => {
  return (
    <ul className={`custom-list ${className}`} {...props}>
      {items.map((item, index) => (
        <li key={index} className={`custom-list-item ${itemClassName}`}>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
