import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import ProductCarousel from "../Layouts/ProductCarousel";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductDetails = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((productData) => setProduct(productData));
  }, [productId]);
  if (!product) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  const { id, title, price, images, description, brand } = product;

  const removeItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };

  const cartHasItem = cart.items.find((item) => item.id === id);
  let actionBtn = "";
  if (cartHasItem) {
    actionBtn = (
      <Button variant="danger" onClick={removeItemHandler}>
        Remove from Cart
      </Button>
    );
  } else {
    actionBtn = (
      <Button variant="primary" onClick={addItemHandler}>
        Add to Cart
      </Button>
    );
  }

  return (
    <Container className="main-sec">
      <h3 className="pg-title">{title}</h3>
      <div className="row products-list">
        <div className="col-xl-6 col-lg-6 col-md-12">
          <ProductCarousel images={images} />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12">
          <div>
            <p>
              <strong>Description</strong>
            </p>
            <p>{description}</p>
          </div>
          <div>
            <p>
              <strong>Brand</strong>
            </p>
            <p>{brand}</p>
          </div>
          <div>
            <p>
              <strong>Price:</strong> {price}
            </p>
          </div>
          <div>{actionBtn}</div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
