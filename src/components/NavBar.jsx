import React from "react";
import "../css/navMenu.css";

function Navbar(props) {
  const complexities = {
    "Insertion": "O(n^2)",
    "Merge": "O(nlogn)",
    "Heap": "O(nlogn)",
    "Quick": "O(nlogn)"

  }
  return (
    <nav className="navbar">
      <h2 className="sortingTitle">{`${props.title} Sort: ${complexities[props.title]}`}</h2>
     
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export default Navbar;
