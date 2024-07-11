import React, { useEffect } from "react";

import { DataGrid } from '@mui/x-data-grid';
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLeaves, reset } from "../Features/Leave/leaveSlice";

function Payments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student } = useSelector((state) => state.auth);
  const { leaves, isLoading, isError, message } = useSelector((state) => state.leave);
  const { messInfo } = useSelector((state) => state.mess);

  const [isMobile] = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    
    dispatch(getLeaves());
    return () => {
      dispatch(reset());
    };
  }, [student, navigate, dispatch, isError, message]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
      }
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
  ]
  console.log(leaves)
  return (
    <Box>
      <Box height={'60rem'}>
        <DataGrid
          loading={isLoading || !leaves}
          getRowId={(row) => row._id}
          rows={leaves || []}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Payments;