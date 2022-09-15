import React from "react";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import CartItem from "../Layouts/CartItem";

const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const { items, total, totalQuantity } = cartData;
  let tbodyData = "";
  if (items.length <= 0) {
    tbodyData = (
      <tr key="no-items">
        <td colSpan="5">No Items Avaialable</td>
      </tr>
    );
  } else {
    tbodyData = items.map((item) => <CartItem key={item.id} item={item} />);
  }
  return (
    <Container className="main-sec">
      <h3 className="pg-title">Cart</h3>
      <p>You have {totalQuantity} item(s) in your cart.</p>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th width="10%">Price</th>
            <th width="12%">Qty</th>
            <th width="10%">Row Price</th>
            <th width="35"></th>
          </tr>
        </thead>
        <tbody>{tbodyData}</tbody>
        {items.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan="3" align="right">
                Amount to be paid:
              </td>
              <td colSpan="2">{total}</td>
            </tr>
          </tfoot>
        )}
      </Table>
    </Container>
  );
};

export default Cart;
