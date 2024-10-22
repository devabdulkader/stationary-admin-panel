'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendarDate } from 'react-icons/ci';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HorizontalProductCard from '@/components/card/HorizontalProductCard';
// import { useSelectedProducts } from '@/context/SelectedProductsContext';
import SelectedProducts from '@/components/deals-day/SelectedProducts';
import Pagination from '@/components/common/Pagination';
interface Product {
  id: number;
  name: string;
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.';
  currentPrice: number;
  originalPrice?: number;
  discountedPrice?: number;
  image: string;
  imageVariants?: string[];
  colorOptions?: string[];
  stockQuantity: number;
}
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

  const productData: Product[] = [
    {
      id: 1,
      name: 'Elegant Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 15,
      originalPrice: 20,
      discountedPrice: 15,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Blue', 'Red'],
      stockQuantity: 50,
    },
    {
      id: 2,
      name: 'Classic Fountain Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 45,
      originalPrice: 50,
      discountedPrice: 45,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Gold', 'Silver'],
      stockQuantity: 30,
    },
    {
      id: 3,
      name: 'Ballpoint Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 8,
      originalPrice: 10,
      discountedPrice: 8,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Green'],
      stockQuantity: 100,
    },
    {
      id: 4,
      name: 'Gel Ink Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 12,
      originalPrice: 15,
      discountedPrice: 12,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Pink', 'Purple'],
      stockQuantity: 75,
    },
    {
      id: 5,
      name: 'Rollerball Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 25,
      originalPrice: 30,
      discountedPrice: 25,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Burgundy'],
      stockQuantity: 40,
    },
    {
      id: 6,
      name: 'Calligraphy Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 30,
      originalPrice: 35,
      discountedPrice: 30,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Brown'],
      stockQuantity: 20,
    },
    {
      id: 7,
      name: 'Executive Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 60,
      originalPrice: 70,
      discountedPrice: 60,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Silver'],
      stockQuantity: 15,
    },
    {
      id: 8,
      name: 'Colored Gel Pen Set',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 20,
      originalPrice: 25,
      discountedPrice: 20,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Assorted'],
      stockQuantity: 60,
    },
    {
      id: 9,
      name: 'Mechanical Pencil',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 10,
      originalPrice: 12,
      discountedPrice: 10,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Yellow'],
      stockQuantity: 90,
    },
    {
      id: 10,
      name: 'Stylus Pen',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.',
      currentPrice: 18,
      originalPrice: 22,
      discountedPrice: 18,
      image: '/product.webp',
      imageVariants: [
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
        '/product.webp',
      ],
      colorOptions: ['Black', 'Silver'],
      stockQuantity: 55,
    },
  ];

  // const { message } = useSelectedProducts();

  // useEffect(() => {
  //   if (message) {
  //     toast(message);
  //   }
  // }, [message]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  let filteredData = productData;

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
      <SelectedProducts />

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
            <HorizontalProductCard key={product.id} product={product} />
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
