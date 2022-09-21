import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

const ProductCard = (props) => {
  const { id, title, thumbnail, price } = props.product;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-20">
      <Card>
        <Card.Img variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${id}`}>{title}</Link>
          </Card.Title>
          <Card.Text>Price: {price}</Card.Text>
          <Link className="btn btn-primary mr-15" to={`/product/${id}`}>
            View
          </Link>
          {actionBtn}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
