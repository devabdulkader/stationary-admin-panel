'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface GrowthProgressionProps {
  data: {
    month: string;
    data: { week: string; current: number; last: number }[];
  }[];
}

const GrowthProgression2: React.FC<GrowthProgressionProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(data[0].month);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const selectedData =
    data.find((item) => item.month === selectedMonth)?.data || [];

  // Find the index of the selected month and the previous month
  const selectedMonthIndex = data.findIndex(
    (item) => item.month === selectedMonth,
  );
  const previousMonthData =
    selectedMonthIndex > 0 ? data[selectedMonthIndex - 1].data : null;

  // Get total "current" values of the selected month and previous month for comparison
  const selectedMonthTotal = selectedData.reduce(
    (sum, entry) => sum + entry.current,
    0,
  );
  const previousMonthTotal = previousMonthData
    ? previousMonthData.reduce((sum, entry) => sum + entry.current, 0)
    : 0;

  // Calculate the growth percentage compared to the previous month
  let growthPercentage = 0;
  if (previousMonthTotal === 0) {
    growthPercentage = 100; // If there's no previous data, consider it 100% growth
  } else {
    growthPercentage =
      ((selectedMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
  }

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Growth Progression</span>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="flex items-center justify-between bg-white py-2 font-semibold text-gray-700"
          >
            {data.map((item, index) => (
              <option key={index} value={item.month}>
                {item.month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between p-5">
        {/* Chart Section */}
        <div className="h-[400px] flex-1 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={selectedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
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
          <span className="text-lg font-semibold">Growth Progression</span>
          <span className="text-sm text-gray-600">
            {growthPercentage > 0
              ? `Increased ${growthPercentage.toFixed(2)}%`
              : `Decreased ${Math.abs(growthPercentage).toFixed(2)}%`}{' '}
            <br />
            than last month
          </span>
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

export default GrowthProgression2;
