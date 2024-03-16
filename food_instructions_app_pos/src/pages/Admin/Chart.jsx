import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from "recharts";
import Title from "./Title";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

export default function Chart({ orderData }) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Lọc dữ liệu đơn hàng theo ngày được chọn
  const filteredOrders = orderData.filter(
    (order) =>
      new Date(order.timeCreate).toDateString() === selectedDate.toDateString()
  );

  // Chuyển đổi dữ liệu đơn hàng thành dữ liệu biểu đồ
  const chartData = filteredOrders.map((order) => ({
    time: new Date(order.timeCreate), // Sử dụng thời gian đặt hàng làm trục x
    amount: order.totalAmount, // Sử dụng tổng tiền của đơn hàng làm giá trị
  }));

  return (
    <React.Fragment>
      <Title><DatePicker // DatePicker component để chọn ngày hiển thị
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      /></Title>
      
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
        <XAxis
  dataKey="time"
  stroke={theme.palette.text.secondary}
  tick={{ fontSize: 12 }} // Set font size for ticks on the X-axis
  tickFormatter={(time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Format to display only time
/>
          <YAxis
            stroke={theme.palette.text.secondary}
            tick={{ fontSize: 12 }} // Đặt kích thước font cho tick trên trục Y
            domain={[0, "dataMax"]}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                fontSize: 12,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
