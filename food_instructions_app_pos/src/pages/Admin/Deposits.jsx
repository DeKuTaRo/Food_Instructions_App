import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

export default function Deposits({ orderData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Kiểm tra xem orderData có tồn tại và là một mảng trước khi sử dụng filter và reduce
  const filteredOrders = Array.isArray(orderData)
    ? orderData.filter((order) => new Date(order.timeCreate).toDateString() === selectedDate.toDateString())
    : [];

  // Tính tổng thu nhập trong ngày
  const totalIncome = filteredOrders.reduce((total, order) => total + order.totalAmount, 0);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const preventDefault = (event) => {
    event.preventDefault();
    // Xử lý khi click vào "View balance"
  };

  return (
    <React.Fragment>
      <Typography component="div" variant="h6">
        Recent Deposits
      </Typography>
      <Typography component="p" variant="h4">
        {(totalIncome / 10).toFixed(3)}đ
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {formatDate(selectedDate)}
      </Typography>

      <div>
        <DatePicker // DatePicker component để chọn ngày hiển thị
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </div>
    </React.Fragment>
  );
}
