import React from "react";
import Carousel from "react-bootstrap/Carousel";

const ProductCarousel = (props) => {
  const images = props.images;
  if (images.length <= 0) {
    return "";
  }
  return (
    <Carousel variant="dark">
      {images.map((image) => (
        <Carousel.Item key={image}>
          <img
            className="d-block w-100"
            src={image}
            alt=""
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
