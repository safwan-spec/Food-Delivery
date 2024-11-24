import React, { createContext } from "react";
import { host } from "../../../Config/configure";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
export const CustomerContext = createContext();
export default function Context({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [relatedMenus, setRelatedMenus] = useState([]);
  const [singleMenu, setSingleMenu] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const getProfile = () => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .get(`${host}/customer/getProfile`, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data.success) {
          setCustomer(res.data.customer);
        } else {
          setCustomer(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("customerToken") != null) {
      getProfile();
    } else {
      setCustomer(null);
    }
  }, [pathname]);

  const getCategoriesAndProducts = () => {
    axios
      .get(`${host}/customer/getCategoriesAndProducts`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories);
        setMenus(res.data.menus);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSingleMenu = (id) => {
    axios
      .get(`${host}/customer/getSingleMenu/${id}`)
      .then((res) => {
        setSingleMenu(res.data.singleMenu);
        setRelatedMenus(res.data.relatedMenus);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addMenuIntoCart = (id) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .post(
        `${host}/customer/addMenuIntoCart/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewCart = () => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .get(`${host}/customer/viewCart`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCart(res.data.cartData);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeMenuFromCart = (id) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .delete(`${host}/customer/removeMenuFromCart/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          viewCart();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCartQuantity = (id, quantity) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .put(
        `${host}/customer/updateCartQuantity/${id}`,
        { quantity },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          viewCart();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const placeOrder = (data) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .post(`${host}/customer/placeOrder`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/Orders");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sendFeedback = (data) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .post(`${host}/customer/sendFeedback`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitFeedback = (id, data) => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .put(`${host}/customer/submitFeedback/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          getOrders();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOrders = () => {
    let token = JSON.parse(localStorage.getItem("customerToken"));
    axios
      .get(`${host}/customer/getOrders`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <CustomerContext.Provider
      value={{
        navigate,
        customer,
        setCustomer,
        categories,
        menus,
        getCategoriesAndProducts,
        host,
        getSingleMenu,
        relatedMenus,
        singleMenu,
        addMenuIntoCart,
        viewCart,
        removeMenuFromCart,
        updateCartQuantity,
        cart,
        placeOrder,
        orders,
        getOrders,
        sendFeedback,
        submitFeedback,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
