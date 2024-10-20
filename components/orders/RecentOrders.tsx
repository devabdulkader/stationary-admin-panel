import React from 'react';
import Table from '../common/Table';

interface Order {
  id: number;
  customerName: string;
  orderNumber: string;
  amount: number;
  deliveredVia: string;
  status: string;
}

const RecentOrders: React.FC = () => {
  const orderData: Order[] = [
    {
      id: 1,
      customerName: 'John Doe',
      orderNumber: 'ORD001',
      amount: 250.0,
      deliveredVia: 'Courier',
      status: 'Completed',
    },
    {
      id: 2,

      customerName: 'Jane Smith',
      orderNumber: 'ORD002',
      amount: 100.5,
      deliveredVia: 'Email',
      status: 'Pending',
    },
    {
      id: 3,

      customerName: 'Alice Johnson',
      orderNumber: 'ORD003',
      amount: 150.75,
      deliveredVia: 'Courier',
      status: 'Shipped',
    },
    {
      id: 4,

      customerName: 'Bob Brown',
      orderNumber: 'ORD004',
      amount: 200.0,
      deliveredVia: 'In-Person',
      status: 'Returned',
    },
    {
      id: 5,

      customerName: 'Charlie White',
      orderNumber: 'ORD005',
      amount: 300.25,
      deliveredVia: 'Courier',
      status: 'Completed',
    },
    {
      id: 5,

      customerName: 'Eve Black',
      orderNumber: 'ORD006',
      amount: 120.99,
      deliveredVia: 'Email',
      status: 'Pending',
    },
    {
      id: 6,

      customerName: 'Frank Green',
      orderNumber: 'ORD007',
      amount: 99.99,
      deliveredVia: 'In-Person',
      status: 'Shipped',
    },
    {
      id: 7,

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
