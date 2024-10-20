'use client';
import React, { useState } from 'react';
import { BsBox2 } from 'react-icons/bs';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';
import FadeUp from '@/components/motion/FadeUp';
import { GiSandsOfTime } from 'react-icons/gi';
import { IoCheckmarkSharp, IoManOutline } from 'react-icons/io5';
import { GrDeliver } from 'react-icons/gr';
import { RiArrowGoBackLine } from 'react-icons/ri';
import OrderTrends from '@/components/orders/OrderTrends';
import CustomerOverview from '@/components/orders/CustomerOverview';
import AverageOrderValue from '@/components/orders/AverageOrderValue';
import { TfiBag } from 'react-icons/tfi';
import Modal from '@/components/common/Modal';
import CustomersPopup from '@/components/orders/CustomersPopup';
import { useQuery } from '@apollo/client';
import {
  GET_ALL_ORDERS,
  GET_COMPLETED_ORDERS,
  GET_PAYMENT_STATUS,
  GET_PENDING_ORDERS,
  GET_RETURNED_ORDERS,
  GET_SHIPPED_ORDERS,
  GET_TOTAL_ORDERS,
} from '@/queries/orderQueries';
import OrderOverviewCard2 from '@/components/orders/OrderOverviewCard2';
import PaymentStatus2 from '@/components/orders/PaymentStatus2';
import RecentOrders2 from '@/components/orders/RecentOrders2';
import { tempToken } from '@/middleware';

const Orders: React.FC = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const { data: totalOrdersData, loading: totalOrdersDataLoading } =
    useQuery(GET_TOTAL_ORDERS);
  const { data: pendingOrdersData, loading: pendingOrdersDataLoading } =
    useQuery(GET_PENDING_ORDERS);
  const { data: completedOrdersData, loading: completedOrdersDataLoading } =
    useQuery(GET_COMPLETED_ORDERS);
  const { data: shippedOrdersData, loading: shippedOrdersDataLoading } =
    useQuery(GET_SHIPPED_ORDERS);
  const { data: returnedOrdersData, loading: returnedOrdersDataLoading } =
    useQuery(GET_RETURNED_ORDERS);
  const { data: paymentStatusData, loading: paymentStatusDataLoading } =
    useQuery(GET_PAYMENT_STATUS);
  const { data: allOrdersData, loading: allOrdersDataLoading } = useQuery(
    GET_ALL_ORDERS,
    {
      context: {
        headers: {
          Authorization: tempToken,
        },
      },
    },
  );

  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  const closeCustomerModal = () => {
    setIsCustomerModalOpen(false);
  };

  if (
    totalOrdersDataLoading ||
    pendingOrdersDataLoading ||
    completedOrdersDataLoading ||
    shippedOrdersDataLoading ||
    returnedOrdersDataLoading ||
    paymentStatusDataLoading ||
    allOrdersDataLoading
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {isCustomerModalOpen && (
        <Modal closeModal={closeCustomerModal}>
          <CustomersPopup />
        </Modal>
      )}
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
          <ButtonWithIcon
            iconClassName="text-xl"
            icon={<IoManOutline />}
            text="Customers"
            onClick={openCustomerModal}
          />
          <ButtonWithIcon
            icon={<TfiBag />}
            text="Manage Orders"
            href="/manage-orders"
          />
        </div>
      </header>
      <main className="mt-5 grid grid-cols-12 gap-5">
        <section className="col-span-12 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {/* Total Orders Card */}
            <FadeUp delay={0.1} duration={1}>
              <OrderOverviewCard2
                title="Total Orders"
                orderData={totalOrdersData.getTotalOrdersByMonth}
                icon={<BsBox2 size={40} />}
              />
            </FadeUp>

            {/* Pending Orders Card */}
            <FadeUp delay={0.2} duration={1}>
              <OrderOverviewCard2
                title="Pending Orders"
                orderData={pendingOrdersData.getPendingOrdersByMonth}
                icon={<GiSandsOfTime size={40} />}
              />
            </FadeUp>

            {/* Completed Orders Card */}
            <FadeUp delay={0.3} duration={1}>
              <OrderOverviewCard2
                title="Completed Orders"
                orderData={completedOrdersData.getCompletedOrdersByMonth}
                icon={<IoCheckmarkSharp size={40} />}
              />
            </FadeUp>

            {/* Shipped Orders Card */}
            <FadeUp delay={0.4} duration={1}>
              <OrderOverviewCard2
                title="Shipped Orders"
                orderData={shippedOrdersData.getShippedOrdersByMonth}
                icon={<GrDeliver size={40} />}
              />
            </FadeUp>

            {/* Returned Orders Card */}
            <FadeUp delay={0.5} duration={1}>
              <OrderOverviewCard2
                title="Returned Orders"
                orderData={returnedOrdersData.getReturnedOrdersByMonth}
                icon={<RiArrowGoBackLine size={40} />}
              />
            </FadeUp>
          </div>

          {/* Recent Orders Tables */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 xl:col-span-6 2xl:col-span-8">
              <FadeUp delay={0.6} duration={1}>
                <RecentOrders2 orders={allOrdersData?.getAllOrders?.items} />
              </FadeUp>
            </div>
            <div className="col-span-12 xl:col-span-6 2xl:col-span-4">
              <FadeUp delay={0.7} duration={1}>
                <PaymentStatus2
                  paymentData={paymentStatusData.getPaymentStatusByMonth}
                />
              </FadeUp>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
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
