import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import {
  Stack,
  InputBase,
  styled,
  CircularProgress,
  Paper,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const SearchInput = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  padding: theme.spacing(1),
  flex: 1,
  marginRight: theme.spacing(1),
  border: "1px solid #ced4da",
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
  },
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(0),
  padding: theme.spacing(1),
}));

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    axios
      .get("http://localhost:3003/organization")
      .then((res) => {
        setRows(res.data);
        setFilteredRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function handleFilter(event) {
    const newData = rows.filter((row) => {
      return row.orgName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredRows(newData);
  }

  const handleDisable = (orgId, currentActiveStatus) => {
    console.log(
      `Toggling active status for user ID: ${orgId}, current status: ${currentActiveStatus}`
    );
    axios
      .patch(`http://localhost:3003/organization/${orgId}/active`, {
        active: !currentActiveStatus, // Toggle the active status
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.orgId === orgId ? { ...row, active: !row.active } : row
          )
        );
        setFilteredRows((prevRows) =>
          prevRows.map((row) =>
            row.orgId === orgId ? { ...row, active: !row.active } : row
          )
        );
        setSnackbarMessage(
          `Plazer Admin ${!currentActiveStatus ? "Enabled" : "Disabled"} the Item`
        );
        setSnackbarSeverity(!currentActiveStatus ? "success" : "error");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const columns = [
    {
      field: "orgId",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orgName",
      headerName: "Organization Name",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          component={Link} // Use Link from React Router
          to={`/organization/${params.row.orgId}`} // Navigate to the organization's API endpoint
          color="primary"
          variant="outlined" // Use outlined variant
          sx={{ width: "100%", textAlign: "left" }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "orgEmail",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "active",
      headerName: "Status",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.active ? "success" : "error"}
          onClick={() => handleDisable(params.row.orgId, params.row.active)}
        >
          {params.row.active ? "Active" : "Inactive"}
        </Button>
      ),
    },
  ];

  return (
    <TableContainer>
      {loading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack direction="row" alignItems="center" marginBottom={2}>
            <SearchIcon sx={{ color: "#063970", marginRight: "8px" }} />
            <SearchInput
              placeholder="Search Organization"
              onChange={handleFilter}
            />
          </Stack>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            getRowId={(row) => row.orgId}
            key="orgId"
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
          />
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
       
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}
