import React, { useState } from 'react';
import Vibrant from 'node-vibrant';

function ImageColorExtractor() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
      extractColors(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const extractColors = async (imageUrl) => {
    const vibrant = new Vibrant(imageUrl);
    const swatches = await vibrant.getPalette();

    const extractedColors = Object.keys(swatches).map((key) => {
      const swatch = swatches[key];
      return swatch.getHex();
    });

    setColors(extractedColors);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />}
      <div>
        <h2>Extracted Colors:</h2>
        <div style={{ display: 'flex' }}>
          {colors.map((color, index) => (
            <div key={index} style={{ backgroundColor: color, width: 50, height: 50, margin: 5 }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageColorExtractor;
