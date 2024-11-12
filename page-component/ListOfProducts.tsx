'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import HorizontalProductCard from '@/components/card/HorizontalProductCard';
import Pagination from '@/components/common/Pagination';
import { RiMenuUnfold2Line } from 'react-icons/ri';
import { instance } from '@/axios/axiosInstance';

const ListOfProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const itemsPerPage = 4;

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
      setProducts(response.data?.data?.products || []);
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

  let filteredData = products;
  const [searchTerm, setSearchTerm] = useState('');

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
      <div className="flex flex-col gap-5 pb-10 lg:flex-row">
        <Link href="/">
          <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
            <BsArrowLeft className="" />
            <span>My Products</span>
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
