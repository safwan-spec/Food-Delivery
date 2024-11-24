import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import PageBanner from "../Components/PageBanner";
import { CustomerContext } from "../Context/Context";
import OrdersTable from "../Components/OrdersTable";

export default function Orders() {
  const { orders, getOrders } = useContext(CustomerContext);
  useEffect(() => {
    getOrders();
  }, []);
  console.log(orders);
  return (
    <Box>
      <Box>
        <PageBanner title="Orders" />
      </Box>
      <Box sx={{ p: 2 }}>
        <OrdersTable orders={orders} />
      </Box>
    </Box>
  );
}
