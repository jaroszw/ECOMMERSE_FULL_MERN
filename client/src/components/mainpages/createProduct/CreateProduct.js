import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const params = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [token] = state.token;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  const [products] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === params.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [params.id, products]);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) alert('You are not an admin');

      const file = e.target.files[0];

      if (!file) return alert("File doesn't exist");
      if (file.size > 1024 * 1024) return alert('File size is to big');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File format is incorrect');

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );

      setLoading(false);
      setImages(res.data);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('You are not admin');
      if (!images) return alert('No image was uploaded');

      if (onEdit) {
        const res = await axios.put(
          `http://localhost:5000/api/products/${product._id}`,
          {
            ...product,
            images,
          },
          { headers: { Authorization: token } }
        );
        setCallback(!callback);
      } else {
        await axios.post(
          `http://localhost:5000/api/products`,
          {
            ...product,
            images,
          },
          { headers: { Authorization: token } }
        );
        setCallback(!callback);
        navigate('/');
      }
    } catch (error) {
      console.dir(error);
    }
  };

  const handleDestroy = async (id) => {
    try {
      if (!isAdmin) {
        return alert('You are not admin');
      }

      setLoading(true);
      await axios.post(
        'http://localhost:5000/api/destroy',
        {
          public_id: images.public_id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (error) {
      console.dir(error);
    }
  };

  const styleUpload = {
    display: images ? 'block' : 'none',
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />

        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ''} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product_id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
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
