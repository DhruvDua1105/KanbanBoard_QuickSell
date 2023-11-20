import React from 'react';
import './Navbar.css'

const Navbar = ({ onSelectDisplayOption, onSort }) => {
  const handleGrouping = (e) => {
    const selectedOption = e.target.value;
    localStorage.setItem("group", selectedOption);
    onSelectDisplayOption(selectedOption);
  };
  const handleSorting = (e) => {
    const selectedOption = e.target.value;
    localStorage.setItem("sort", selectedOption);
    onSort(selectedOption);
  };
  const clearFilters = ()=>{
    localStorage.clear();
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div>
        <label htmlFor="displayOption">Display Option:</label>
        <select id="displayOption" onChange={handleGrouping}>
          <option selected={localStorage.getItem("group")==="status"} value="status">Status</option>
          <option selected={localStorage.getItem("group")==="priority"} value="priority">Priority</option>
          <option selected={localStorage.getItem("group")==="userId"} value="userId">User</option>
        </select>
      </div>
      <div>
        <select id="sortOption" onChange={handleSorting}>
          <option value="">Sort by</option>
          <option selected={localStorage.getItem("sort")==="sortPriority"} value="sortPriority">Priority</option>
          <option selected={localStorage.getItem("sort")==="sortTitle"} value="sortTitle">Title</option>
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
    </nav>
  );
};

export default Navbar;
