import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  fetchAllProducts,
  fetchSingleProduct,
  productsSelector,
  singleProductSelector,
  statusSelector,
} from "../../redux/features/productReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Backdrop, CircularProgress } from "@mui/material";

const columns: any = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 170, align: "right" },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

const ProductTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedProductId, setSelectedProductId] = React.useState<
    string | null
  >(null);

  const products = useAppSelector(productsSelector);
  const singleProduct = useAppSelector(singleProductSelector);
  const status = useAppSelector(statusSelector);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewClick = (productId: string) => {
    setSelectedProductId(productId);
    dispatch(fetchSingleProduct(productId));
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Paper sx={{ overflow: "hidden", margin: "5rem" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product: any) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.title}
                  >
                    {columns.map((column: any) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "image" ? (
                          <img
                            src={product[column.id]}
                            alt={product.title}
                            style={{ width: "100%", height: "100px" }}
                          />
                        ) : column.format &&
                          typeof product[column.id] === "number" ? (
                          column.format(product[column.id])
                        ) : column.id === "actions" ? (
                          <Button onClick={() => handleViewClick(product.id)}>
                            View
                          </Button>
                        ) : (
                          product[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying product details */}
      <Modal
        open={!!selectedProductId}
        onClose={handleCloseModal}
        aria-labelledby="product-details-modal"
        aria-describedby="product-details-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Product Details
          </Typography>
          {singleProduct && (
            <React.Fragment>
              <Typography variant="subtitle1" gutterBottom>
                Title: {singleProduct.title}
              </Typography>
              <Typography
                style={{ display: "flex", alignItems: "center" }}
                variant="subtitle1"
                gutterBottom
              >
                Image:{" "}
                <img
                  src={singleProduct.image}
                  alt={singleProduct.title}
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                />
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Price: {singleProduct.price}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Description: {singleProduct.description}
              </Typography>
            </React.Fragment>
          )}
        </div>
      </Modal>
      <Backdrop sx={{ color: "#fff", zIndex: 11111 }} open={status === "loading"}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default ProductTable;
