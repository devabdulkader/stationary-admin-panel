import Link from 'next/link';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoMdArrowDown } from 'react-icons/io';

interface TableProps<T> {
  title: string;
  headings: string[];
  data: T[];
  href: string;
}

const Table = <T extends Record<string, any>>({
  title,
  headings,
  data,
  href,
}: TableProps<T>) => {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
        <Link href={href}>
          <button className="py-2 text-blue-500">View</button>
        </Link>
      </div>
      <div>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b text-gray-400">
              <th className="px-4 py-3 text-left">#Number</th>{' '}
              {headings.map((heading) => (
                <th key={heading} className="px-4 py-3 text-center">
                  <span>
                    {heading.charAt(0).toUpperCase() + heading.slice(1)}
                  </span>
                  <IoMdArrowDown className="inline text-gray-400" size={24} />
                </th>
              ))}
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-3 text-left">
                  {(index + 1).toString().padStart(2, '0')}{' '}
                </td>
                {Object.values(product).map((value, idx) => (
                  <td key={idx} className="px-4 py-3 text-center">
                    {' '}
                    {value}
                  </td>
                ))}
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

export default Table;
