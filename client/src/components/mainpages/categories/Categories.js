import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [category, setCategory] = useState('');
  const [token] = state.token;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');

  const createCategory = async (e) => {
    e.preventDefault();

    if (onEdit) {
      try {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        setCategory('');
        setOnEdit(false);
      } catch (error) {
        alert(error.response.data.msg);
      }
    } else {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        setCategory('');
      } catch (error) {
        alert(error.response.data.msg);
      }
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/category/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      alert(res.data.msg);
      setCallback(!callback);
      setCategory('');
    } catch (error) {
      console.dir(error);
      // alert(error.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? 'Edit' : 'Create'}</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <button onClick={() => editCategory(category._id, category.name)}>
              Edit
            </button>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
