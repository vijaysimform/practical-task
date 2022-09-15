import { cartActions } from "./cart-slice";
import { notificationActions } from "./notification-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://dummyjson.com/carts/1"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.products || [],
          totalQuantity: cartData.totalQuantity,
          total: cartData.total
        })
      );
    } catch (error) {
      notificationActions.showNotification({
        status: "error",
        title: "Error",
        message: "Fetching cart data failed.",
      });
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://dummyjson.com/carts/1",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    
    try {
      await sendRequest();
    } catch (error) {
      notificationActions.showNotification({
        status: "error",
        message: "Sending cart data failed.",
      });
    }
  };
};
