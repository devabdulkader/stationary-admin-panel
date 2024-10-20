import Link from 'next/link';
import React, { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoMdArrowDown } from 'react-icons/io';
import Pagination from './Pagination';

interface Item {
  id: number;
}

interface TableProps<T extends Item> {
  title?: string;
  topHeading?: string;
  headings: string[];
  data: T[];
  href: string;
  pagination?: boolean;
  action?: boolean;
  view?: boolean;
  search?: boolean;
  sort?: boolean;
  arrowDown?: boolean;
}

const Table = <T extends Item>({
  title,
  topHeading,
  headings,
  data,
  href,
  pagination = false,
  action = false,
  view = false,
  search = false,
  sort = false,
  arrowDown = true,
}: TableProps<T>) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'In Stock':
        return 'bg-[#E1E5FF] text-[#00359E]';
      case 'Low Stock':
      case 'Returned':
      case 'Refunded':
        return 'bg-[#FFCCCC] text-[#B12704]';
      case 'Pending':
        return 'bg-[#F6F7FF] text-[#0709F7]';
      case 'Failed':
        return 'bg-[#F6F7FF] text-gray-600';
      case 'Shipped':
        return 'bg-[#F6F7FF] text-[#0709F7]';
      default:
        return '';
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  let filteredData = data;

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
    <>
      {topHeading && (
        <h1 className="mb-5 text-3xl font-medium">{topHeading}</h1>
      )}

      {search || sort ? (
        <div className="flex items-center gap-3">
          {search && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          )}
          {sort && (
            <select className="mb-4 rounded-lg border border-gray-300 px-4 py-2">
              <option value="">Sort by</option>
              {headings.map((heading) => (
                <option key={heading} value={heading}>
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : null}

      <div className="rounded-lg bg-white shadow">
        {view && title && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
            <span>{title}</span>
            <Link href={href}>
              <button className="py-2 text-blue-500">View</button>
            </Link>
          </div>
        )}

        {/* Table */}
        <div className="min-w-full overflow-x-auto">
          <table className="table-auto border-collapse text-nowrap">
            <thead>
              <tr className="border-b text-gray-400">
                <th className="px-4 py-3 text-center">#Number</th>
                {headings.map((heading) => (
                  <th key={heading} className="px-4 py-3 text-center">
                    <span>
                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                    </span>
                    {arrowDown && (
                      <IoMdArrowDown
                        className="inline text-gray-400"
                        size={24}
                      />
                    )}
                  </th>
                ))}
                {action && <th className="px-4 py-3 text-left">Action</th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 text-center">
                    {(index + 1 + (currentPage - 1) * itemsPerPage)
                      .toString()
                      .padStart(2, '0')}{' '}
                  </td>
                  {Object.entries(product).map(
                    ([key, value], idx) =>
                      key !== 'id' &&
                      key !== '_id' && ( // Ignore rendering 'id' or '_id'
                        <td key={idx} className="px-4 py-3">
                          <span
                            className={`inline-block w-full rounded-full text-center ${
                              key === 'status'
                                ? getStatusClass(value as string)
                                : ''
                            }`}
                          >
                            {value}
                          </span>
                        </td>
                      ),
                  )}
                  {action && (
                    <td className="px-4 py-3 text-center">
                      <button className="text-blue-500 hover:underline">
                        <BiDotsVerticalRounded size={24} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          data={filteredData}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Table;
