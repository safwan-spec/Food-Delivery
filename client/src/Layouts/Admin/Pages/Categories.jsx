import { Box, Button } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import InsertForm from "../Components/Categories/InsertForm";
import TableView from "../Components/Categories/TableView";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import { useState } from "react";

export default function Categories() {
  const { getCategories, categories, host } = useContext(AdminContext);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <AdminBreadCrumbs isThird={true} thirdTitle={"Categories"} />
        </Box>
        <Box>
          <Button
            onClick={() => {
              setShow(!show);
              setSelectedCategory(null);
            }}
            color={show ? "error" : "primary"}
            variant="contained"
          >
            {show ? "Close" : "Insert New"}
          </Button>
        </Box>
      </Box>
      {show && (
        <Box sx={{ py: 2 }}>
          <InsertForm
            show={show}
            selectedCategory={selectedCategory}
            setShow={setShow}
          />
        </Box>
      )}
      <Box>
        <TableView
          categories={categories}
          host={host}
          setShow={setShow}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
    </Box>
  );
}
