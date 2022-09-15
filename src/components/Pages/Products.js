import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "../Layouts/ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  if (!products.length) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
  const productsData = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <Container className="main-sec">
      <h3 className="pg-title">Products</h3>
      <div className="row products-list">{productsData}</div>
    </Container>
  );
};

export default Products;
