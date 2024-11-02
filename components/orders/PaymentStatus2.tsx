'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { IoChevronDownSharp } from 'react-icons/io5';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PaymentData {
  month: string;
  totalPaid: number;
  totalPending: number;
  totalRefund: number;
  total: number;
  noOfOrders: number;
}

interface PaymentStatusProps {
  paymentData: PaymentData[];
}

const CustomLegend = (props: any) => {
  const { payload } = props;

  return (
    <ul className="flex flex-col justify-center space-y-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center space-x-2">
          <span
            style={{ backgroundColor: entry.color }}
            className="inline-block h-4 w-4 rounded-full"
          ></span>
          <span className="text-gray-700">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const PaymentStatus2: React.FC<PaymentStatusProps> = ({ paymentData }) => {
  // Initialize the selected month as the first one from the props
  const [selectedMonth, setSelectedMonth] = useState(paymentData?.[0]?.month);

  // Find the data for the selected month
  const selectedData = paymentData.find(
    (data) => data?.month === selectedMonth,
  );

  // Prepare chart data based on the selected month
  const chartData = [
    {
      name: 'Paid',
      uv: selectedData?.totalPaid || 0,
      fill: '#a4de6c',
    },
    {
      name: 'Pending',
      uv: selectedData?.totalPending || 0,
      fill: '#d0ed57',
    },
    {
      name: 'Refund',
      uv: selectedData?.totalRefund || 0,
      fill: '#ffc658',
    },
  ];

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>Payment Status</span>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex cursor-pointer items-center justify-between bg-white font-semibold text-gray-700"
          >
            {paymentData.map((data, index) => (
              <option key={index} value={data.month}>
                {data.month}
              </option>
            ))}
          </select>
          <IoChevronDownSharp className="absolute right-2 top-1/2 ml-2 -translate-y-1/2 transform" />
        </div>
      </div>

      <div style={{ height: '300px', width: '100%' }} className="relative px-5">
        <ResponsiveContainer width="80%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="80%"
            barSize={10}
            data={chartData}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              dataKey="uv"
            />
            <Legend
              content={<CustomLegend />}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={{ right: '10px' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <HiOutlineChevronRight
          size={30}
          className="absolute right-5 top-1/2 -translate-y-1/2 transform"
        />
      </div>

      <section>
        <div className="relative border-t border-gray-300 px-6 py-2">
          <div className="flex">
            <p>Total Payment Processed :</p>
            <div className="flex items-center gap-1">
              <Image
                alt=""
                src="/symbol.svg"
                width={300}
                height={300}
                className="h-4 w-6"
              />
              <span>{selectedData?.total.toFixed(2)}</span>
            </div>
          </div>
          <p>
            Total Order Transacted : <span>{selectedData?.noOfOrders}</span>
          </p>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>
      </section>
    </div>
  );
};

export default PaymentStatus2;
