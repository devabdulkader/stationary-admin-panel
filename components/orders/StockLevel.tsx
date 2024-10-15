import Link from 'next/link';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoMdArrowDown } from 'react-icons/io';

interface ProductData {
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  stockStatus: string;
  action: string;
}

interface StockLevelProps {
  data: {
    title: string;
    products: ProductData[];
  };
  linkHref: string;
}

const StockLevel: React.FC<StockLevelProps> = ({ data, linkHref }) => {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{data.title}</span>
        <Link href={linkHref}>
          <button className="py-2 text-blue-500">View</button>
        </Link>
      </div>
      <div className="">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="px-4 py-3 text-left">
                <span># Number</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>Product Name</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>SKU</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>Category</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>Quantity</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>Stock Status</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span>Action</span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 text-center">
                  {(index + 1).toString().padStart(2, '0')}
                </td>
                <td className="px-4 py-3 text-center">{product.productName}</td>
                <td className="px-4 py-3 text-center">{product.sku}</td>
                <td className="px-4 py-3 text-center">{product.category}</td>
                <td className="px-4 py-3 text-center">{product.quantity}</td>
                <td className={`px-4 py-3 text-center`}>
                  <span
                    className={`inline-flex h-7 w-full items-center justify-center rounded-full ${
                      product.stockStatus === 'In Stock'
                        ? 'bg-[#E1E5FF] text-blue-600'
                        : product.stockStatus === 'Low Stock'
                          ? 'bg-[#FFCCCC] text-red-500'
                          : 'bg-[#F2F4F7] text-gray-600'
                    }`}
                  >
                    {product.stockStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-500 hover:underline">
                    <BiDotsVerticalRounded size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockLevel;
