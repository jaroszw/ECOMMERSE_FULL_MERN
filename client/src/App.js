import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append('public_id', 'full_mern/iqbtmmydbxtvfaiah8ni.jpg');
    // formData.append('file', image);

    const res = await axios.post(
      'http://localhost:5000/api/destroy',
      // formData,
      // {
      //   headers: {
      //     'content-type': 'multipart/form-data',
      //   },
      // },
      {
        public_id: 'full_mern/j7dhn9ygvsgbd7r12tbs',
      }
    );

    console.log('RESPOSNE', res);

    setUrl(res.data.url);
  };

  return (
    <div>
      {console.log(url)}
      <div>
        <input
          name="foo"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} alt="test file" />
      </div>
    </div>
  );
};
export default App;
