import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { host } from "../../../Config/configure";
import { toast } from "react-toastify";
export const AdminContext = createContext();
export default function Context({ children }) {
  let navigate = useNavigate();
  const [activePath, setActivePath] = useState(null);
  const { pathname } = useLocation();
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [singleMenu, setSingleMenu] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [counts, setCounts] = useState([]);
  const getProfile = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getProfile`, { headers: { "auth-token": token } })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAdmin(res.data.admin);
        } else {
          setAdmin(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setActivePath(pathname);
    if (pathname == "/Admin/MenuForm") {
      setActivePath("/Admin/Menus");
    }
    if (pathname == `/Admin/updateMenu/${singleMenu?._id}`) {
      setActivePath("/Admin/Menus");
    }
    if (localStorage.getItem("adminToken") == null) {
      navigate("/Admin/");
    } else {
      getProfile();
    }
  }, [pathname, singleMenu]);

  const adminLogin = (formInfo) => {
    axios
      .post(`${host}/admin/login`, formInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("adminToken", JSON.stringify(res.data.token));
          toast.success(res.data.message);
          navigate("/Admin/Dashboard");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    toast.error("Logged out successfully!");
    navigate("/Admin/");
  };

  const getCategories = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getCategories`, { headers: { "auth-token": token } })
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const insertCategory = (data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .post(`${host}/admin/insertCategory`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          getCategories();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateCategory = (id, data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateCategory/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          getCategories();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenus = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getMenus`, { headers: { "auth-token": token } })
      .then((res) => {
        setCategories(res.data.categories);
        setMenus(res.data.menus);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getSingleMenu = (id) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getSingleMenu/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setSingleMenu(res.data.menu);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const insertMenu = (data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .post(`${host}/admin/insertMenu`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          // getMenus();
          navigate("/Admin/Menus");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMenu = (id, data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateMenu/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          // getMenus();
          navigate("/Admin/Menus");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrders = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getOrders`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCustomers = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getCustomers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCustomers(res.data.customers);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFeedbacks = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getFeedbacks`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setFeedbacks(res.data.feedbacks);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCounts = () => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .get(`${host}/admin/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCounts({
            customers: res.data.customers,
            categories: res.data.categories,
            menus: res.data.menus,
            orders: res.data.orders,
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateOrderStatus = (id, data) => {
    let token = JSON.parse(localStorage.getItem("adminToken"));
    axios
      .put(`${host}/admin/updateOrderStatus/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          getOrders();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AdminContext.Provider
      value={{
        activePath,
        adminLogin,
        adminLogout,
        admin,
        getCategories,
        insertCategory,
        updateCategory,
        categories,
        host,
        getMenus,
        insertMenu,
        updateMenu,
        menus,
        getSingleMenu,
        singleMenu,
        setSingleMenu,
        getOrders,
        orders,
        updateOrderStatus,
        getCustomers,
        customers,
        getFeedbacks,
        feedbacks,
        getCounts,
        counts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
