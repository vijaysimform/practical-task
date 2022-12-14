import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Pages/Cart";
import Products from "./components/Pages/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Custom.css";
import Header from "./components/Layouts/Header";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./components/Pages/ProductDetails";
import Notification from "./components/Layouts/Notification";
import { Container } from "react-bootstrap";
import { notificationActions } from "./store/notification-slice";
import { updateCart } from "./store/cart-slice";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.notification.notification);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notification !== null) {
        dispatch(notificationActions.clearNotification());
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch, notification]);

  useEffect(() => {
    if (cart.changed) {
      const products = [];
      for (let i = 0; i < cart.items.length; i++) {
        console.log();
        const tmpData = {
          id: cart.items[i].id,
          quantity: cart.items[i].quantity,
        };
        products.push(tmpData);
      }
      dispatch(updateCart({ products }));
    }

    if (cart.notification !== null) {
      dispatch(
        notificationActions.showNotification({
          status: "success",
          message: cart.notification,
        })
      );
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Header />
      <Container>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </Container>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <footer>
        <div>Practicle task @ 2022</div>
      </footer>
    </Fragment>
  );
}

export default App;
