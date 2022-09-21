import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../Layouts/ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const { status, products } = useSelector((state) => state.product);
  if (status === null || status === "loading") {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  let productsData = "";
  if (products.length > 0) {
    productsData = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  } else {
    productsData = <div>No Products Found.</div>;
  }
  return (
    <Container className="main-sec">
      <h3 className="pg-title">Products</h3>
      <div className="row products-list">{productsData}</div>
    </Container>
  );
};

export default Products;
