import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState('');
  const [url, setUrl] = useState('');

  // const deleteProd = async () => {
  //   const img = await axios.delete(
  //     "http://localhost:5000/api/products/61c07a3a8421e2de3b7b27a3"
  //   );

  //   console.log(img);
  // };

  const upload = async () => {
    console.log(file);

    try {
      // let formData = new FormData();
      // formData.append('file', file);
      // const img = await axios.post(
      //   'http://localhost:5000/api/upload',
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // );
      // console.log('resultIMG', img);

      const res = await axios.post('http://localhost:5000/api/products', {
        product_id: 'prod10',
        title: 'Blue skarf',
        price: 1475,
        description: 'Szalik',
        content: 'content',
        images: {
          public_id: 'full_mern/t4jbl2mcmtsedmm43iyj',
          url: 'https://res.cloudinary.com/dy6ktjcsb/image/upload/v1640175766/full_mern/t4jbl2mcmtsedmm43iyj.jpg',
        },
        category: 'Women',
      });
      console.log('resultProdu', res);
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};
export default App;
