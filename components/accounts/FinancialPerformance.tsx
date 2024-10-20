'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoChevronDownSharp } from 'react-icons/io5';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const FinancialPerformance = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const data = [
    { name: '2024', uv: 4000, pv: 2400, amt: 2400 },
    { name: '2023', uv: 3000, pv: 1398, amt: 2210 },
    { name: '2022', uv: 2000, pv: 9800, amt: 2290 },
    { name: '2021', uv: 2780, pv: 3908, amt: 2000 },
    { name: '2020', uv: 1890, pv: 4800, amt: 2181 },
    { name: '2019', uv: 2390, pv: 3800, amt: 2500 },
  ];

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Financial Performance</span>
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

      <div className="flex p-5">
        <div className="h-[250px] flex-1 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="pv"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend Section */}
        <div className="flex flex-col justify-center px-5">
          <div className="mb-2 flex items-center">
            <span className="mr-1 h-3 w-3 rounded-full bg-[#8884d8]"></span>
            <span className="text-sm">Revenue</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-full bg-[#82ca9d]"></span>
            <span className="text-sm">Expense</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPerformance;
