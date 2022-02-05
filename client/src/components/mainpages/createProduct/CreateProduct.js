import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import ProductsAPI from '../../../api/ProductsAPI';

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'How to do Redux from Context API with refresh & access token ',
  content: 'Welcome hell you motherf***',
  category: '',
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const createProduct = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  console.log(styleUpload);

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        <div id="file_img" style={styleUpload}>
          <img src={images ? images.url : ''} alt="" />
          <span>X</span>
        </div>
      </div>

      <form onSubmit={createProduct}>
        <div className="row">
          <label htmlFor="product_id">Product_id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
          />
        </div>

        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
          />
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            rows="5"
            required
            value={product.description}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            rows="7"
            required
            value={product.content}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select name="category" value={product.category}>
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? 'Edit' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
