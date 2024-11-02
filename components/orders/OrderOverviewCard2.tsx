'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

interface OrderOverviewCardProps {
  title: string;
  orderData: {
    month: string;
    totalOrders: number;
    totalRevenue: number;
    change: number | null;
  }[];
  icon: React.ReactNode;
}

const OrderOverviewCard2: React.FC<OrderOverviewCardProps> = ({
  title,
  orderData,
  icon,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(
    orderData.length > 0 ? orderData?.[0]?.month : null,
  );

  // Find data for the selected month
  const selectedData = orderData?.find((data) => data.month === selectedMonth);

  // Percentage change handling
  const isPositive = (selectedData?.change ?? 0) >= 0;
  const sign = isPositive ? '+' : '-';
  const textColor = isPositive ? 'text-blue-500' : 'text-red-500';

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
        <div className="relative">
          <select
            value={selectedMonth ?? ''}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex cursor-pointer items-center justify-between bg-white py-2 font-semibold text-gray-700"
          >
            {orderData?.map((data, index) => (
              <option key={index} value={data.month}>
                {data.month ?? ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between gap-5 p-5">
        <section>
          <p>{title}</p>
          <h3 className="mb-2 text-xl font-medium">
            {selectedData?.totalOrders ?? 0}
          </h3>

          <p>Revenue</p>

          <div className="flex items-center">
            <Image
              alt=""
              src="/symbol.svg"
              width={300}
              height={300}
              className="inline h-4 w-6"
            />
            <h3 className="text-xl font-medium">
              {selectedData?.totalRevenue ?? 0}
            </h3>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-3">
          {icon}

          <p className={`${textColor}`}>
            {selectedData?.change !== null ? (
              <>
                {sign}
                {Math.abs(selectedData?.change ?? 0)}%{' '}
                {isPositive ? (
                  <FaArrowTrendUp className="inline" />
                ) : (
                  <FaArrowTrendDown className="inline" />
                )}
              </>
            ) : (
              'N/A'
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default OrderOverviewCard2;
