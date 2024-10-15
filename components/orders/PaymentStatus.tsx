'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { IoChevronDownSharp } from 'react-icons/io5';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

const PaymentStatus = () => {
  const data = [
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
    {
      name: 'unknow',
      uv: 6.67,
      pv: 4800,
      fill: '#ffc658',
    },
  ];

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>Payment Status</span>
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM yyyy"
            showPopperArrow={false}
            showMonthYearPicker
            customInput={
              <button className="flex items-center justify-between bg-white font-semibold text-gray-700">
                {startDate?.toLocaleString('default', {
                  month: 'short',
                  year: 'numeric',
                })}
                <IoChevronDownSharp className="ml-2" />
              </button>
            }
            popperClassName="custom-datepicker"
          />
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
            data={data}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              dataKey="uv"
            />
            {/* Custom Legend */}
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
          className="absolute right-0 top-1/2 -translate-y-1/2 transform"
        />{' '}
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
              <span>45500</span>
            </div>
          </div>
          <p>
            Total Order Transacted : <span>5880</span>
          </p>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>
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
              <span>45500</span>
            </div>
          </div>
          <p>
            Total Order Transacted : <span>5880</span>
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

export default PaymentStatus;
