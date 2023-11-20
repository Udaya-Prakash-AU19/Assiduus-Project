import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

const headCells = [
  {
    id: "account",
    numeric: false,
    disablePadding: true,
    label: "Account",
  },
  {
    id: "this_month",
    numeric: true,
    disablePadding: true,
    label: "This Month",
    render: (rowData) => <div>{rowData.label}</div>,
  },
  {
    id: "ytd",
    numeric: true,
    disablePadding: true,
    label: "YTD",
  },
];

const createRowData = (id, name, this_month, ytd) => ({
  id,
  name,
  this_month,
  ytd,
});

const tableData = [
  createRowData(1, "Sales", 1194.58, 11418, 29),
  createRowData(2, "Advertising", 6879.02, 9271, 36),
  createRowData(3, "Inventory", 4692.26, 9768.09),
  createRowData(4, "Entertainment", 0.0, 0.0),
  createRowData(5, "Product", 4652.1, 2529.9),
];

export default function AccountWatchList() {
  const MyTableCell = styled(TableCell)({
    borderBottom: 0,
    fontSize: "12px",
    fontWeight: "600",
  });

  return (
    <Box
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          py: 2.5,
          pl: 2,
          height: "20%",
        }}
      >
        Account watchlist
      </Typography>
      <Divider />
      <TableContainer
        sx={{
          py: 1,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <MyTableCell
                  key={headCell.id}
                  sx={{
                    color: "info.light",
                    fontWeight: 600,
                    fontSize: "10px",
                  }}
                >
                  {headCell.label}
                </MyTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <MyTableCell>{data.name}</MyTableCell>
                <MyTableCell>{data.this_month}</MyTableCell>
                <MyTableCell>{data.ytd}</MyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
