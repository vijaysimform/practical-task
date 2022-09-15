import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Button } from "react-bootstrap";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, quantity, total } = props.item;
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };
  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{price}</td>
      <td>
        <Button variant="primary" onClick={removeItemHandler}>
          -
        </Button>
        <span className="cart-qty">{quantity}</span>
        <Button variant="primary" onClick={addItemHandler}>
          +
        </Button>
      </td>
      <td>{total}</td>
      <td width="35">
        <Button variant="danger" onClick={deleteItemHandler}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
