import React, { useState } from "react";

const PixelAnalyzer = () => {
  const [frequentPixels, setFrequentPixels] = useState([]);
  const [pixelCountMap, setPixelCountMap] = useState({});
  const [numberOfPixelsPerImage, setNumberOfPixelsPerImage] = useState(0);

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const pixels = imageData.data;
        setNumberOfPixelsPerImage(pixels.length / 4);

        const countMap = {};

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i + 0];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          const pixelValue = `${r},${g},${b},${a}`;

          if (countMap[pixelValue]) {
            countMap[pixelValue] += 1;
          } else {
            countMap[pixelValue] = 1;
          }
        }

        const sortedPixels = Object.keys(countMap).sort(
          (a, b) => countMap[b] - countMap[a]
        );

        const top7Pixels = sortedPixels.slice(0, 7);
        setFrequentPixels(top7Pixels);
        setPixelCountMap(countMap);
      };

      image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        border: "2px dashed gray",
        padding: "20px",
        textAlign: "center",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>Drag and Drop an Image</h2>
      {frequentPixels.length > 0 && (
        <div>
          <h3>Most Frequent Pixels</h3>
          {frequentPixels.map((pixelValue, index) => (
            <div key={index}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: `rgba(${pixelValue})`,
                  margin: "0 auto",
                }}
              />
              <p>Pixel Value: {pixelValue}</p>
              <p>Frequency Count: {pixelCountMap[pixelValue]}</p>
              <p>
                Percentage relative to total pixels:{" "}
                {(
                  (100 * pixelCountMap[pixelValue]) /
                  numberOfPixelsPerImage
                ).toFixed(3)}
                %
              </p>
              <p>Total Pixels: {numberOfPixelsPerImage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PixelAnalyzer;
