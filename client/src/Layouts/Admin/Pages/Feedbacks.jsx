import { Box } from "@mui/material";
import React from "react";
import AdminBreadCrumbs from "../Components/AdminBreadCrumbs";
import { AdminContext } from "../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import FeedbacksTable from "../Components/FeedbacksTable";

export default function Feedbacks() {
  const { getFeedbacks, feedbacks } = useContext(AdminContext);
  useEffect(() => {
    getFeedbacks();
  }, []);
  return (
    <Box>
      <Box>
        <AdminBreadCrumbs isThird={true} thirdTitle={"Feedbacks"} />
      </Box>
      <Box sx={{ p: 2 }}>
        <FeedbacksTable feedbacks={feedbacks} />
      </Box>
    </Box>
  );
}
