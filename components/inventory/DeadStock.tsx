import Link from 'next/link';
import React from 'react';
import { IoMdArrowDown } from 'react-icons/io';

interface ProductData {
  productName: string;
  daysUnsold: number;
}

interface DeadStockProps {
  title: string;

  data: ProductData[];

  linkHref: string;
}

const DeadStock: React.FC<DeadStockProps> = ({ title, data, linkHref }) => {
  const totalDaysInYear = 365;

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
        <Link href={linkHref}>
          <button className="py-2 text-blue-500">View</button>{' '}
        </Link>
      </div>
      <div className="">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="px-4 py-3 text-left">
                <span> #Number </span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span> Product Name </span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
              <th className="px-4 py-3 text-left">
                <span> Days Unsold </span>
                <IoMdArrowDown className="inline text-gray-400" size={24} />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => {
              const progressPercentage =
                (product.daysUnsold / totalDaysInYear) * 100;

              return (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 text-center">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.productName}
                  </td>
                  <td className="px-4 py-3 text-start">
                    {product.daysUnsold}{' '}
                    <div className="relative h-2 w-full rounded bg-[#F2F4F7]">
                      <div
                        className="absolute h-full rounded bg-[#D4D4D4]"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeadStock;
