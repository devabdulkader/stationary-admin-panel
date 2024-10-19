'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';

import Pagination from '@/components/common/Pagination';
import { RiMenuUnfold2Line } from 'react-icons/ri';
import { VscZoomIn } from 'react-icons/vsc';
import Modal from '@/components/common/Modal';
import ViewOrderPopup from '@/components/orders/ViewOrderPopup';

const ManageOrders = () => {
  const orderData = [
    {
      id: 1,
      customerName: 'John Doe',
      orderId: 'ORD001',
      orderDate: '20 Sep, 24',
      orderStatus: 'Shipped',
      totalAmount: '120.00',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderId: 'ORD002',
      orderDate: '18 Sep, 24',
      orderStatus: 'Pending',
      totalAmount: '90.50',
      paymentStatus: 'Unpaid',
    },
    {
      id: 3,
      customerName: 'Michael Brown',
      orderId: 'ORD003',
      orderDate: '15 Sep, 24',
      orderStatus: 'Completed',
      totalAmount: '250.75',
      paymentStatus: 'Paid',
    },
    {
      id: 4,
      customerName: 'Emily Davis',
      orderId: 'ORD004',
      orderDate: '12 Sep, 24',
      orderStatus: 'Returned',
      totalAmount: '65.00',
      paymentStatus: 'Refunded',
    },
    {
      id: 5,
      customerName: 'David Johnson',
      orderId: 'ORD005',
      orderDate: '10 Sep, 24',
      orderStatus: 'Shipped',
      totalAmount: '145.25',
      paymentStatus: 'Paid',
    },
    {
      id: 6,
      customerName: 'Sarah Williams',
      orderId: 'ORD006',
      orderDate: '08 Sep, 24',
      orderStatus: 'Completed',
      totalAmount: '200.00',
      paymentStatus: 'Paid',
    },
    {
      id: 7,
      customerName: 'Chris Evans',
      orderId: 'ORD007',
      orderDate: '05 Sep, 24',
      orderStatus: 'Pending',
      totalAmount: '75.00',
      paymentStatus: 'Unpaid',
    },
    {
      id: 8,
      customerName: 'Anna Taylor',
      orderId: 'ORD008',
      orderDate: '03 Sep, 24',
      orderStatus: 'Shipped',
      totalAmount: '110.00',
      paymentStatus: 'Paid',
    },
    {
      id: 9,
      customerName: 'James Wilson',
      orderId: 'ORD009',
      orderDate: '01 Sep, 24',
      orderStatus: 'Returned',
      totalAmount: '80.50',
      paymentStatus: 'Refunded',
    },
    {
      id: 10,
      customerName: 'Sophia Martinez',
      orderId: 'ORD010',
      orderDate: '28 Aug, 24',
      orderStatus: 'Completed',
      totalAmount: '225.00',
      paymentStatus: 'Paid',
    },
    {
      id: 11,
      customerName: 'Oliver Thomas',
      orderId: 'ORD011',
      orderDate: '26 Aug, 24',
      orderStatus: 'Shipped',
      totalAmount: '95.75',
      paymentStatus: 'Paid',
    },
    {
      id: 12,
      customerName: 'Isabella White',
      orderId: 'ORD012',
      orderDate: '24 Aug, 24',
      orderStatus: 'Pending',
      totalAmount: '60.00',
      paymentStatus: 'Unpaid',
    },
    {
      id: 13,
      customerName: 'Liam Harris',
      orderId: 'ORD013',
      orderDate: '22 Aug, 24',
      orderStatus: 'Completed',
      totalAmount: '185.50',
      paymentStatus: 'Paid',
    },
    {
      id: 14,
      customerName: 'Mia Lewis',
      orderId: 'ORD014',
      orderDate: '20 Aug, 24',
      orderStatus: 'Returned',
      totalAmount: '50.25',
      paymentStatus: 'Refunded',
    },
    {
      id: 15,
      customerName: 'Ethan Clark',
      orderId: 'ORD015',
      orderDate: '18 Aug, 24',
      orderStatus: 'Shipped',
      totalAmount: '140.00',
      paymentStatus: 'Paid',
    },
  ];

  const headings = [
    'Customer Name',
    'Order ID',
    'Order Date',
    'Order Status',
    'Total Amount',
    'Payment Status',
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filteredData = orderData;

  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);

  const openViewOrderModal = () => {
    setIsViewOrderModalOpen(true);
  };

  const closeViewOrderModal = () => {
    setIsViewOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-5">
      {isViewOrderModalOpen && (
        <Modal closeModal={closeViewOrderModal}>
          <ViewOrderPopup />{' '}
        </Modal>
      )}
      <div className="flex flex-col gap-5 pb-10 lg:flex-row">
        <Link href="/">
          <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
            <BsArrowLeft className="" />
            <span>Manage Orders</span>
          </h1>
        </Link>
        <div className="flex flex-grow flex-col gap-5 sm:flex-row">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3">
            <RiMenuUnfold2Line size={15} /> <span>All Products</span>
          </button>
        </div>
      </div>

      <section className="overflow-x-auto rounded-lg bg-white">
        <table className="min-w-full table-auto border-collapse text-nowrap">
          <thead className="">
            <tr className="border-b text-gray-400">
              <th className="px-4 py-3 text-center">#Number</th>
              {headings.map((heading) => (
                <th key={heading} className="px-4 py-3 text-center">
                  <span>
                    {heading.charAt(0).toUpperCase() + heading.slice(1)}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index} className="border-b">
                {Object.entries(product).map(([, value], idx) => (
                  <td key={idx} className="px-4 py-3">
                    <span
                      className={`inline-block w-full rounded-full text-center`}
                    >
                      {value}
                    </span>
                  </td>
                ))}

                <td className="flex items-center py-3 pl-7">
                  <button
                    className="text-blue-500"
                    onClick={openViewOrderModal}
                  >
                    <VscZoomIn size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full items-center justify-center py-5">
          <Pagination
            data={filteredData}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default ManageOrders;
