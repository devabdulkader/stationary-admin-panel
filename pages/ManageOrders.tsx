'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { RiMenuUnfold2Line } from 'react-icons/ri';
import { VscZoomIn } from 'react-icons/vsc';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import ViewOrderPopup from '@/components/orders/ViewOrderPopup';
import { instance } from '@/axios/axiosInstance';
import { formatUTCDateTime } from '@/utils/formateDate';

const ManageOrders = () => {
  const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationData, setPaginationData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await instance.post('', {
        query: `
          query GetAllOrders($pagination: PaginationInput) {
            getAllOrders(pagination: $pagination) {
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
                createdAt
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
                  email
                  phoneNumber
                  address
                }
              }
            }
          }
        `,
        variables: {
          pagination: {
            page: currentPage.toString(),
            pageSize: itemsPerPage.toString(),
          },
        },
      });

      const { getAllOrders } = response.data.data;
      setOrderData(getAllOrders.items);
      setPaginationData(getAllOrders.items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openViewOrderModal = () => {
    setIsViewOrderModalOpen(true);
  };

  const closeViewOrderModal = () => {
    setIsViewOrderModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter orders based on search term
  const filteredData = searchTerm
    ? orderData.filter((item: any) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    : orderData;

  return (
    <div className="min-h-screen pt-5">
      {isViewOrderModalOpen && (
        <Modal closeModal={closeViewOrderModal}>
          <ViewOrderPopup orderData={selectedOrder} />{' '}
          {/* Add actual data to the popup */}
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
              <th className="px-4 py-3 text-center">Customer Name</th>
              <th className="px-4 py-3 text-center">Tracking ID</th>
              <th className="px-4 py-3 text-center">Order Date</th>
              <th className="px-4 py-3 text-center">Order Status</th>
              <th className="px-4 py-3 text-center">Total Amount</th>
              <th className="px-4 py-3 text-center">Payment Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{order.user.fullName}</td>
                <td className="px-4 py-3">{order.trackingId}</td>
                <td className="px-4 py-3">
                  {formatUTCDateTime(order.createdAt)}
                </td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">{order.totalAmount}</td>
                <td className="px-4 py-3">{order.payment.status}</td>
                <td className="flex items-center py-3 pl-7">
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      openViewOrderModal();
                      setSelectedOrder(order);
                    }}
                  >
                    <VscZoomIn size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex w-full items-center justify-center py-5">
          {paginationData && (
            <Pagination
              data={paginationData}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageOrders;
