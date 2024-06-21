import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputBase,
  styled,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    console.log("Fetching user data...");
    axios
      .get("http://localhost:3003/plazer-user")
      .then((res) => {
        console.log("Data fetched successfully:", res.data);
        // Fetch image URLs for each user
        Promise.all(
          res.data.map(
            (user) =>
              axios
                .get(`http://localhost:3003/plazer-user/${user.userId}/image`)
                .then((response) => ({ ...user, image: response.data.image }))
                .catch(() => ({ ...user, image: "" })) // Handle failed requests
          )
        )
          .then((updatedUsers) => {
            setRows(updatedUsers);
            setFilteredRows(updatedUsers);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error fetching image URLs:", err);
            setRows(res.data);
            setFilteredRows(res.data);
            setLoading(false);
          });
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const handleFilter = useCallback(
    (event) => {
      const query = event.target.value.toLowerCase();
      console.log("Filtering data with query:", query);
      const newData = rows.filter((row) =>
        row.userName.toLowerCase().includes(query)
      );
      setFilteredRows(newData);
    },
    [rows]
  );

  const handleDisable = (userId, currentActiveStatus) => {
    console.log(
      `Toggling active status for user ID: ${userId}, current status: ${currentActiveStatus}`
    );
    axios
      .patch(`http://localhost:3003/plazer-user/${userId}/active`, {
        active: !currentActiveStatus, // Toggle the active status
      })
      .then((res) => {
        console.log("API Response:", res.data);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.userId === userId ? { ...row, active: !row.active } : row
          )
        );
        setFilteredRows((prevRows) =>
          prevRows.map((row) =>
            row.userId === userId ? { ...row, active: !row.active } : row
          )
        );
        setSnackbarMessage(
          `Plazer Admin ${
            !currentActiveStatus ? "Enabled" : "Disabled"
          } the User`
        );
        setSnackbarSeverity(!currentActiveStatus ? "success" : "error");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 70, headerAlign: "center", align: "center" },
    {
      field: "image",
      headerName: "Profile Image",
      width: 160, headerAlign: "center", align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Avatar alt="" src={params.row.image} />
        </Stack>
      ),
    },
    { field: "userName", headerName: "Name", width: 130, headerAlign: "center", align: "center" },
    { field: "role", headerName: "Role", width: 130, headerAlign: "center", align: "center" },
    { field: "Email", headerName: "Email", width: 200, headerAlign: "center", align: "center" },
    {
      field: "active",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.active ? "success" : "error"}
          onClick={() => handleDisable(params.row.userId, params.row.active)}
        >
          {params.row.active ? "Active" : "Inactive"}
        </Button>
      ),
    },
  ];

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
            getRowId={(row) => row.userId}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </TableContainer>
  );
}
