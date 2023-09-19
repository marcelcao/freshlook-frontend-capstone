import React, { useState } from 'react';

const Filter2 = () => {
  const [filter, setFilter] = useState('');

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter: </label>
      <select
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      >
        <option value="">-- Please Select --</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
};

export default Filter2;
