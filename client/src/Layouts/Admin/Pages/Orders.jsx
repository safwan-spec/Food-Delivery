import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import { AdminContext } from "../Context/Context";
import OrdersTable from "../Components/OrdersTable";

export default function Orders() {
  const { getOrders, orders } = useContext(AdminContext);
  useEffect(() => {
    getOrders();
  }, []);
  // console.log(orders);
  return (
    <Box>
      <Box>
        <AdminBreadCrumbs isThird={true} thirdTitle={"Orders"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <OrdersTable orders={orders} />
      </Box>
    </Box>
  );
}
