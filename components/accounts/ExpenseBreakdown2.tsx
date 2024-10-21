'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LuPen } from 'react-icons/lu';

interface ExpenseBreakdownProps {
  data:
    | {
        month: string;
        data: { categoryName: string; value: number; percentage: number }[];
      }[]
    | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpenseBreakdown2: React.FC<ExpenseBreakdownProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState(data?.[0]?.month);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const selectedData =
    data?.find((item) => item.month === selectedMonth)?.data || [];

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>Expense Breakdown</span>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="flex items-center justify-between bg-white font-semibold text-gray-700"
          >
            {data?.map((item, index) => (
              <option key={index} value={item.month}>
                {item.month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative h-full w-1/3 flex-grow">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                data={selectedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {selectedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex h-full w-2/3 flex-col items-start justify-center space-y-4 text-nowrap pl-5">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-normal">Label</th>
                <th className="pb-2 text-left font-normal">Value</th>
                <th className="pb-2 text-left font-normal">%</th>
                <th className="pb-2 text-left font-normal">Action</th>
              </tr>
            </thead>

            <tbody>
              {selectedData.map((entry, index) => (
                <tr key={index} className="h-10">
                  <td className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="font-semibold text-gray-700">
                      {entry.categoryName}
                    </span>
                  </td>
                  <td>{(+entry.value).toFixed(2)}</td>
                  <td>{(+entry.percentage).toFixed(2)}%</td>
                  <td className="flex items-center justify-center pt-3">
                    <LuPen className="cursor-pointer text-blue-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown2;
