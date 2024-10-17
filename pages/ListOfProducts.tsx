'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import HorizontalProductCard from '@/components/card/HorizontalProductCard';
import Pagination from '@/components/common/Pagination';
import { RiMenuUnfold2Line } from 'react-icons/ri';
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
const ListOfProducts = () => {
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

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  let filteredData = productData;

  // Apply search filter
  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }

  // Calculate current items to display based on current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  return (
    <div className="p-5">
      <div className="flex items-center gap-5 pb-10">
        <Link href="/">
          <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
            <BsArrowLeft className="" />
            <span>My Products</span>
          </h1>
        </Link>
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

      <div className="rounded-md bg-white pb-5">
        <p className="pl-5 pt-5 text-2xl">List of Products</p>

        <div className="flex flex-col px-5 py-5">
          {currentItems.map((product) => (
            <HorizontalProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex items-center justify-center pb-2">
          <Pagination
            data={filteredData}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListOfProducts;
