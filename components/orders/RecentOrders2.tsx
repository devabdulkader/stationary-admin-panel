import React from 'react';
import Table from '../common/Table';

interface Order {
  id: string;
  trackingId: string;
  totalAmount: string;
  status: string;
  shippingMethod: string;
  user: {
    fullName: string;
  };
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders2: React.FC<RecentOrdersProps> = ({ orders }) => {
  // Transform the order data to the format required by the table
  const orderData = orders.map((order, index) => ({
    id: index + 1,
    customerName: order.user.fullName, // Customer Name
    trackingId: order.trackingId, // Tracking ID
    amount: order.totalAmount, // Amount
    deliveryMethod: order.shippingMethod, // Delivery Method
    status: order.status, // Status
  }));

  return (
    <Table
      title="Recent Orders"
      headings={[
        'Customer Name',
        'Tracking ID',
        'Amount',
        'Delivery Method',
        'Status',
      ]}
      data={orderData}
      href="/"
    />
  );
};

export default RecentOrders2;
