'use client';

import React, { useState, useEffect } from 'react';
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
import OrderOverviewCard2 from '@/components/orders/OrderOverviewCard2';
import PaymentStatus2 from '@/components/orders/PaymentStatus2';
import RecentOrders2 from '@/components/orders/RecentOrders2';
import { instance } from '@/axios/axiosInstance';

const Orders = () => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [pendingOrdersData, setPendingOrdersData] = useState([]);
  const [completedOrdersData, setCompletedOrdersData] = useState([]);
  const [shippedOrdersData, setShippedOrdersData] = useState([]);
  const [returnedOrdersData, setReturnedOrdersData] = useState([]);
  const [paymentStatusData, setPaymentStatusData] = useState([]);
  const [allOrdersData, setAllOrdersData] = useState({
    items: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalOrders,
          pendingOrders,
          completedOrders,
          shippedOrders,
          returnedOrders,
          paymentStatus,
          allOrders,
        ] = await Promise.all([
          instance.post('', {
            query: `
            query {
              getTotalOrdersByMonth {
                month
                totalOrders
                totalRevenue
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getPendingOrdersByMonth {
                month
                totalOrders
                totalRevenue
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getCompletedOrdersByMonth {
                month
                totalOrders
                totalRevenue
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getShippedOrdersByMonth {
                month
                totalOrders
                totalRevenue
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getReturnedOrdersByMonth {
                month
                totalOrders
                totalRevenue
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getPaymentStatusByMonth {
                month
                totalPaid
                totalPending
                totalRefund
                total
                noOfOrders
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getAllOrders {
                totalItems
                totalPages
                currentPage
                items {
                  id
                  vat
                  trackingId
                  shippingAndHandlingFee
                  totalAmount
                  status
                  shippingMethod
                  payment {
                    id
                    amount
                    paymentMethod
                    trxId
                    status
                  }
                  orderedItems {
                    variant
                    quantity
                    price
                    product {
                      id
                      title
                    }
                  }
                  user {
                    fullName
                  }
                }
              }
            }
          `,
          }),
        ]);

        setTotalOrdersData(totalOrders.data.data.getTotalOrdersByMonth);
        setPendingOrdersData(pendingOrders.data.data.getPendingOrdersByMonth);
        setCompletedOrdersData(
          completedOrders.data.data.getCompletedOrdersByMonth,
        );
        setShippedOrdersData(shippedOrders.data.data.getShippedOrdersByMonth);
        setReturnedOrdersData(
          returnedOrders.data.data.getReturnedOrdersByMonth,
        );
        setPaymentStatusData(paymentStatus.data.data.getPaymentStatusByMonth);
        setAllOrdersData(allOrders.data.data.getAllOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  const closeCustomerModal = () => {
    setIsCustomerModalOpen(false);
  };

  if (loading) {
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
                orderData={totalOrdersData}
                icon={<BsBox2 size={40} />}
              />
            </FadeUp>

            {/* Pending Orders Card */}
            <FadeUp delay={0.2} duration={1}>
              <OrderOverviewCard2
                title="Pending Orders"
                orderData={pendingOrdersData}
                icon={<GiSandsOfTime size={40} />}
              />
            </FadeUp>

            {/* Completed Orders Card */}
            <FadeUp delay={0.3} duration={1}>
              <OrderOverviewCard2
                title="Completed Orders"
                orderData={completedOrdersData}
                icon={<IoCheckmarkSharp size={40} />}
              />
            </FadeUp>

            {/* Shipped Orders Card */}
            <FadeUp delay={0.4} duration={1}>
              <OrderOverviewCard2
                title="Shipped Orders"
                orderData={shippedOrdersData}
                icon={<GrDeliver size={40} />}
              />
            </FadeUp>

            {/* Returned Orders Card */}
            <FadeUp delay={0.5} duration={1}>
              <OrderOverviewCard2
                title="Returned Orders"
                orderData={returnedOrdersData}
                icon={<RiArrowGoBackLine size={40} />}
              />
            </FadeUp>
          </div>

          {/* Recent Orders Tables */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 xl:col-span-6 2xl:col-span-8">
              <FadeUp delay={0.6} duration={1}>
                <RecentOrders2 orders={allOrdersData?.items} />
              </FadeUp>
            </div>
            <div className="col-span-12 xl:col-span-6 2xl:col-span-4">
              <FadeUp delay={0.7} duration={1}>
                <PaymentStatus2 paymentData={paymentStatusData} />
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
