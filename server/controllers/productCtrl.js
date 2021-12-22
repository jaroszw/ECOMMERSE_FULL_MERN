const Products = require('../models/productModel');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit'];
    console.log(queryObj);
    excludedFields.forEach((el) => console.log(queryObj[el]));

    //queryString = req.query

    return this;
  }
  sorting() {}
  paginating() {}
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering();

      // res.status(200).json(products);
    } catch (error) {
      return rea.status(500).json({ msg: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) {
        return res.status(400).json({ msg: 'No image uploaded' });
      }

      const product = await Products.findOne({ product_id });

      if (product) {
        return res.status(400).json({ msg: 'Products already exists' });
      }

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const results = await Products.findByIdAndDelete(req.params.id);
      console.log(results);
      if (results) {
        return res.json({ msg: 'Product deleted' });
      } else {
        return res.json({ msg: 'Product not found' });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) {
        return res.status(400).json({ msg: 'No image uploaded' });
      }

      Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      return res.status(200).json({ msg: 'Products updated' });
    } catch (error) {
      return rea.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
