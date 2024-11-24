import { Box, Typography } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import Counts from "../Components/Counts";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import OrdersTable from "../Components/OrdersTable";

export default function Dashboard() {
  const { getCounts, counts, getOrders, orders } = useContext(AdminContext);
  useEffect(() => {
    getCounts();
    getOrders();
  }, []);

  return (
    <Box>
      <Box>
        <AdminBreadCrumbs />
      </Box>
      <Box sx={{ p: 2 }}>
        <Counts counts={counts} />
      </Box>
      <Typography color="text.secondary">Recent orders</Typography>
      <Box sx={{ p: 2 }}>
        <OrdersTable dashboard={true} orders={orders?.slice(0, 5)} />
      </Box>
    </Box>
  );
}
