'use client';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IoChevronDownSharp } from 'react-icons/io5';

interface Summary {
  month: string;
  profit: number;
  loss: number;
}

interface YearlyData {
  year: number;
  summary: Summary[];
}

interface ProfitLossProps {
  data: YearlyData[];
}

const ProfitLoss2: React.FC<ProfitLossProps> = ({ data }) => {
  // Set the initial year to the first year in the data array
  const [selectedYear, setSelectedYear] = useState<number>(data[0].year);

  // Find the data for the selected year
  const currentYearData = data.find(
    (yearData) => yearData.year === selectedYear,
  );

  // Transform the summary data for the selected year to match the Recharts data format
  const chartData =
    currentYearData?.summary.map((item) => ({
      name: item.month,
      profit: item.profit,
      loss: item.loss,
    })) || [];

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Profit & Loss Summary</span>
        <div className="relative">
          {/* Dropdown to select year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="flex items-center bg-white py-2 font-semibold text-gray-700"
          >
            {data.map((yearData) => (
              <option key={yearData.year} value={yearData.year}>
                {yearData.year}
              </option>
            ))}
          </select>
          <IoChevronDownSharp className="ml-2 inline-block" />
        </div>
      </div>

      <div className="relative h-[440px] flex-1 overflow-x-auto p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
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
            <Legend />
            <Bar
              dataKey="profit"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
            <Bar
              dataKey="loss"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLoss2;
