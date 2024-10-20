'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoChevronDownSharp } from 'react-icons/io5';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const GrowthProgression = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const data = [
    { name: 'Page A', current: 4000, last: 2400, amt: 2400 },
    { name: 'Page B', current: 3000, last: 1398, amt: 2210 },
    { name: 'Page C', current: 2000, last: 9800, amt: 2290 },
    { name: 'Page D', current: 2780, last: 3908, amt: 2000 },
  ];

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Growth Progression</span>
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM yyyy"
            showPopperArrow={false}
            showMonthYearPicker
            customInput={
              <button className="flex items-center justify-between bg-white py-2 font-semibold text-gray-700">
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

      <div className="flex justify-between p-5">
        {/* Chart Section */}
        <div className="h-[400px] flex-1 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="last"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="current" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center pl-4">
          <span className="text-lg font-semibold">Growth Increased</span>
          <span className="text-sm text-gray-600">15% than past 30 days</span>
          <div className="mt-4 flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[#8884d8]"></div>
            <span className="text-sm">Last Month</span>
          </div>
          <div className="mt-1 flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[#82ca9d]"></div>
            <span className="text-sm">This Month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthProgression;
