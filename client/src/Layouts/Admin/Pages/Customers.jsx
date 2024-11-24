import { Box } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import { AdminContext } from "../Context/Context";
import { useContext } from "react";
import CustomersTable from "../Components/CustomersTable";
import { useEffect } from "react";

export default function Customers() {
  const { getCustomers, customers } = useContext(AdminContext);
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <Box>
      <Box>
        <AdminBreadCrumbs isThird={true} thirdTitle={"Customers"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <CustomersTable customers={customers} />
      </Box>
    </Box>
  );
}
