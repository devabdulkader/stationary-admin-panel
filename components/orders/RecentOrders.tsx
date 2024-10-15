import React from 'react';
import Table from '../common/Table';

const RecentOrders = () => {
  const orderData = [
    {
      customerName: 'John Doe',
      orderNumber: 'ORD001',
      amount: 250.0,
      deliveredVia: 'Courier',
      status: 'Completed',
    },
    {
      customerName: 'Jane Smith',
      orderNumber: 'ORD002',
      amount: 100.5,
      deliveredVia: 'Email',
      status: 'Pending',
    },
    {
      customerName: 'Alice Johnson',
      orderNumber: 'ORD003',
      amount: 150.75,
      deliveredVia: 'Courier',
      status: 'Shipped',
    },
    {
      customerName: 'Bob Brown',
      orderNumber: 'ORD004',
      amount: 200.0,
      deliveredVia: 'In-Person',
      status: 'Returned',
    },
    {
      customerName: 'Charlie White',
      orderNumber: 'ORD005',
      amount: 300.25,
      deliveredVia: 'Courier',
      status: 'Completed',
    },
    {
      customerName: 'Eve Black',
      orderNumber: 'ORD006',
      amount: 120.99,
      deliveredVia: 'Email',
      status: 'Pending',
    },
    {
      customerName: 'Frank Green',
      orderNumber: 'ORD007',
      amount: 99.99,
      deliveredVia: 'In-Person',
      status: 'Shipped',
    },
    {
      customerName: 'Grace Blue',
      orderNumber: 'ORD008',
      amount: 175.5,
      deliveredVia: 'Courier',
      status: 'Returned',
    },
  ];
  return (
    <Table
      title="Recent Orders"
      headings={[
        'Customer Name',
        'Order Number',
        'Amount',
        'Delivered Via',
        'Status',
      ]}
      data={orderData}
      href="/"
    />
  );
};

export default RecentOrders;
