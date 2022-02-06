const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image only admin can use
//  auth, authAdmin, - add admin check to the requerst below
router.post('/upload', auth, authAdmin, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'No files were uploaded.' });

    const file = req.files.file;

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Size too large' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File format is incorrect.' });
    }

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'full_mern',
    });

    removeTmp(file.tempFilePath);

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    return res.status(500).json({ msg: err.message, error: err });
  }
});

router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: 'Deleted Image' });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;

//   File Object
//   {
//   name: 'pobrane.jfif',
//   data: <Buffer >,
//   size: 7694,
//   encoding: '7bit',
//   tempFilePath: 'D:\\BIURO\\ASIDE\\PRJ\\FULL_ECOM_MERN\\server\\tmp\\tmp-1-1639467319096',
//   truncated: false,
//   mimetype: 'image/jpeg',
//   md5: '90a2efd47e590a807cff31379dd1a6e2',
//   mv: [Function: mv]
// }

// Result object afer uploading file to cloadinary
//     {
//   asset_id: '9f17ba49c16fce68d17672f4b362277f',
//   public_id: 'full_mern/riiw5qc0jxxpapigiiym',
//   version: 1639467633,
//   version_id: '66a2a5466ee9eb4f6010e6db82d5c1a7',
//   signature: '04e46c0b7cffdad6c782afdcc386325e3b29307a',
//   width: 234,
//   height: 215,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2021-12-14T07:40:33Z',
//   tags: [],
//   bytes: 7694,
//   type: 'upload',
//   etag: '90a2efd47e590a807cff31379dd1a6e2',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dy6ktjcsb/image/upload/v1639467633/full_mern/riiw5qc0jxxpapigiiym.jpg',
//   secure_url: 'https://res.cloudinary.com/dy6ktjcsb/image/upload/v1639467633/full_mern/riiw5qc0jxxpapigiiym.jpg',
//   original_filename: 'tmp-1-1639467632750',
//   api_key: '762421744854226'
// }
