import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  const upload = async () => {
    console.log(file);
    let formData = new FormData();
    formData.append("file", file);
    const img = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("resultIMG", img);

    const res = await axios.post("http://localhost:5000/api/products", {
      product_id: "prod01",
      title: "Green t-shirt",
      price: 300,
      description: "Jakis product do wyjabania",
      content: "content",
      images: {
        public_id: img.data.public_id,
        url: img.data.url,
      },
      category: "Summer",
    });

    console.log("resultProdu", res);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
};
export default App;
