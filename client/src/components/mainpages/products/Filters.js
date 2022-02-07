import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';

const Filters = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={category}>
          <option value=""> All Products</option>
          {categories.map((category) => (
            <option value={'category=' + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
