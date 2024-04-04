import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

export default function Orders() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_URL_ORDER_SERVICE}/order/allOrder`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Lọc chỉ những đơn hàng đã thanh toán thành công
        const successfulOrders = res.data.data.data.filter(
          (order) => order.status === "Completed" || order.status === "PaymentSuccess" || order.status === "Delivered"
        );
        if (successfulOrders) {
          setOrderData(successfulOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.timeCreate}</TableCell>
              <TableCell>{row.customerName}</TableCell>
              {/* Thay đổi cách truy cập thông tin sản phẩm */}
              <TableCell>{row.orders[0].productName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{`${(row.totalAmount / 10).toFixed(3)}đ`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/a-order" sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
