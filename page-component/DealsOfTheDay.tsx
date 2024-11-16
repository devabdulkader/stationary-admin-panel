'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendarDate } from 'react-icons/ci';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import HorizontalProductCard from '@/components/card/HorizontalProductCard';
// import { useSelectedProducts } from '@/context/SelectedProductsContext';
import SelectedProducts from '@/components/deals-day/SelectedProducts';
import Pagination from '@/components/common/Pagination';
import { instance } from '@/axios/axiosInstance';

const DealsOfTheDay = () => {
  // const { message } = useSelectedProducts();

  // useEffect(() => {
  //   if (message) {
  //     toast(message);
  //   }
  // }, [message]);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [fromTime, setFromTime] = useState<string>('');
  const [toDate, setToDate] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [update, setUpdate] = useState(false);

  const fetchProducts = async (pagination: any, sort: any) => {
    try {
      const response = await instance.post('', {
        query: `
          query GetProducts($pagination: PaginationInput, $sort: SortInput) {
            products(pagination: $pagination, sort: $sort) {
              items {
                id
                title
                description
                price
                buyPrice
                stockQuantity
                images {
                  url
                  alt
                }
                category {
                  name
                }
                variants {
                  id
                  name
                  value
                }
              }
              totalItems
              totalPages
              currentPage
            }
          }
        `,
        variables: {
          pagination,
          sort,
        },
      });
      console.log('Products:', response.data.data.products);
      setProducts(response.data?.data?.products?.items || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch initial products when the component mounts
    const pagination = {
      page: currentPage.toString(),
      pageSize: itemsPerPage.toString(),
    };
    const sort = { field: 'createdAt', order: 'DESC' };

    fetchProducts(pagination, sort);
  }, [currentPage]);

  // Apply search filter after fetching products
  const filteredData = products.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  // Calculate current items to display based on current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  // const handleUpdateProducts = (updated: boolean) => {
  //   setUpdate(updated);
  // }

  return (
    <div className="pt-5">
      {/* <ToastContainer /> */}
      <Link href="/">
        <h1 className="text-blue mb-10 flex items-center gap-2 text-3xl font-medium">
          <BsArrowLeft className="" />
          <span>Deals of the Day</span>
        </h1>
      </Link>
      <section>
        <p className="text-2xl">Date and Time</p>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative w-full rounded-lg border bg-white p-5">
            <p className="mb-2">From</p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="relative w-full rounded-lg border bg-white">
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="w-full px-4 py-2"
                  placeholderText="Select Date"
                />
                <CiCalendarDate size={20} className="absolute right-2 top-2" />
              </div>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div className="relative w-full rounded-lg border bg-white p-5">
            <p className="mb-2">To</p>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="relative w-full rounded-lg border bg-white">
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="w-full px-4 py-2"
                  placeholderText="Select Date"
                />
                <CiCalendarDate size={20} className="absolute right-2 top-2" />
              </div>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          </div>
        </div>
      </section>
      <SelectedProducts update={update} setUpdate={setUpdate} />

      <div className="mt-5 flex justify-end py-5">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 md:w-2/3"
        />
      </div>

      <div className="rounded-md bg-white pb-5">
        <p className="pl-5 pt-5 text-2xl">List of Products</p>

        <div className="flex flex-col px-5 py-5">
          {currentItems.map((product) => (
            <HorizontalProductCard
              key={product.id}
              product={product}
              //  onUpdate={handleUpdateProducts}
            />
          ))}
        </div>
        <Pagination
          data={filteredData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DealsOfTheDay;
