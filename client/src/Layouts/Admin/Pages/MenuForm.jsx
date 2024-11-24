import { Box } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import Form from "../Components/Menus/Form";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MenuForm() {
  const { id } = useParams();
  // console.log(id);
  const {
    getCategories,
    categories,
    getSingleMenu,
    singleMenu,
    setSingleMenu,
    host,
  } = useContext(AdminContext);
  useEffect(() => {
    getCategories();
    if (id) {
      getSingleMenu(id);
    } else {
      setSingleMenu(null);
    }
  }, [id]);
  // console.log(singleMenu);
  return (
    <Box>
      <Box>
        <AdminBreadCrumbs
          isSecond={true}
          secondTitle={"Menus"}
          secondPath={"/Admin/Menus"}
          isThird={true}
          thirdTitle={id ? "Update Menu" : "Insert New Menu"}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Form host={host} singleMenu={singleMenu} categories={categories} />
      </Box>
    </Box>
  );
}
