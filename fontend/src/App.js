import './App.css';
import React, { useState } from 'react';
function App() {

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.map((image, i) => {
      formData.append('photos', image);
    })

    try {
      const response = await fetch('http://localhost:9999/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" multiple onChange={handleChange} accept="image/*" />
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="Uploaded Image" />
        ))}
        <br />
        <br />
        <button onClick={handleUpload}><h3>UPLOAD FILE</h3></button>
      </header>
    </div>
  );
}

export default App;
