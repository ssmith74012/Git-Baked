import React, { useState } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carousel">
      <button onClick={handlePrev}>Previous</button>
      <img src={images[currentIndex]} alt="carousel-image" />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageCarousel;
