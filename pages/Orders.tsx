'use client';
import React, { useState } from 'react';
import { BsBox2, BsPlusLg } from 'react-icons/bs';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';
import FadeUp from '@/components/motion/FadeUp';
import OrderOverviewCard from '@/components/orders/OrderOverviewCard';
import { GiSandsOfTime } from 'react-icons/gi';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { GrDeliver } from 'react-icons/gr';
import { RiArrowGoBackLine } from 'react-icons/ri';
import Table from '@/components/common/Table';
import PaymentStatus from '@/components/orders/PaymentStatus';
import OrderTrends from '@/components/orders/OrderTrends';
import CustomerOverview from '@/components/orders/CustomerOverview';
import AverageOrderValue from '@/components/orders/AverageOrderValue';

interface OrderData {
  totalOrders?: number;
  revenue?: number;
  pending?: number;
  completed?: number;
  shipped?: number;
  returned?: number;
  value?: number;
  percentageChange: number;
}

const Orders: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const totalOrdersData: OrderData = {
    totalOrders: 200,
    revenue: 5200,
    percentageChange: 21.01,
  };

  const pendingOrdersData: OrderData = {
    pending: 213,
    value: 434,
    percentageChange: 0.8,
  };

  const completedOrdersData: OrderData = {
    completed: 200,
    value: 5200,
    percentageChange: 21.01,
  };

  const shippedOrdersData: OrderData = {
    shipped: 213,
    value: 434,
    percentageChange: 0.8,
  };

  const returnedOrdersData: OrderData = {
    returned: 213,
    value: 434,
    percentageChange: 0.8,
  };
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
    <div className="min-h-screen bg-gray-100 p-5 sm:px-10 2xl:px-20">
      <header className="flex items-center gap-4">
        <h1 className="pr-10 text-4xl text-blue-600">Orders</h1>

        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border bg-white px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            <RiSearchLine className="text-gray-600" />
          </span>
        </div>

        {/* Button Section */}
        <div className="flex gap-4">
          <ButtonWithIcon icon={<BsPlusLg />} text="Customers" />
          <ButtonWithIcon icon={<BsPlusLg />} text="Manage Customers" />
        </div>
      </header>
      <main className="mt-5 grid grid-cols-12 gap-5">
        <section className="col-span-12 space-y-5">
          <div className="grid grid-cols-5 gap-5">
            {/* Total Orders Card */}
            <FadeUp delay={0.1} duration={1}>
              <OrderOverviewCard
                title="Total Orders"
                data={totalOrdersData}
                icon={<BsBox2 size={40} />}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>

            {/* Pending Orders Card */}
            <FadeUp delay={0.2} duration={1}>
              <OrderOverviewCard
                title="Pending Orders"
                data={pendingOrdersData}
                icon={<GiSandsOfTime size={40} />}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>

            {/* Completed Orders Card */}
            <FadeUp delay={0.3} duration={1}>
              <OrderOverviewCard
                title="Completed Orders"
                data={completedOrdersData}
                icon={<IoCheckmarkSharp size={40} />}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>

            {/* Shipped Orders Card */}
            <FadeUp delay={0.4} duration={1}>
              <OrderOverviewCard
                title="Shipped Orders"
                data={shippedOrdersData}
                icon={<GrDeliver size={40} />}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>

            {/* Returned Orders Card */}
            <FadeUp delay={0.5} duration={1}>
              <OrderOverviewCard
                title="Returned Orders"
                data={returnedOrdersData}
                icon={<RiArrowGoBackLine size={40} />}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
          </div>

          {/* Stock Level Tables */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-8">
              <FadeUp delay={0.6} duration={1}>
                <Table
                  title="Stock Level"
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
              </FadeUp>
            </div>
            <div className="col-span-4">
              <FadeUp delay={0.7} duration={1}>
                <PaymentStatus />
              </FadeUp>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <FadeUp delay={0.8} duration={1}>
              <OrderTrends />
            </FadeUp>
            <FadeUp delay={0.9} duration={1}>
              <CustomerOverview />
            </FadeUp>
            <FadeUp delay={1.0} duration={1}>
              <AverageOrderValue />
            </FadeUp>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Orders;
