import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import Title from "./Title";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function PieChartComponent({ orderData }) {
  const theme = useTheme();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Filter orders for the selected month
  const ordersForMonth = orderData.filter((order) => new Date(order.timeCreate).getMonth() === selectedMonth.getMonth());

  // Calculate revenue by status for the selected month
  const revenueByStatus = ordersForMonth.reduce((acc, order) => {
    const status = order.status;
    const revenue = order.totalAmount;
    acc[status] = (acc[status] || 0) + revenue;
    return acc;
  }, {});

  const data = Object.keys(revenueByStatus).map((status) => ({
    status,
    revenue: revenueByStatus[status],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4040"];

  const legendData = data.map((entry, index) => ({
    value: entry.status,
    color: COLORS[index % COLORS.length],
  }));

  // Calculate total revenue for the selected month
  const totalRevenue = ordersForMonth.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title>Revenue by Status ({selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })})</Title>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h4">{(totalRevenue/10).toFixed(3)}đ</Typography>
        </Paper>
      </div>
      <div style={{ marginBottom: 20 }}>
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend payload={legendData} verticalAlign="bottom" align="center" iconSize={10} wrapperStyle={{ textAlign: "center" }} position="left" />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
