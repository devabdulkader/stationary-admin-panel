'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoChevronDownSharp } from 'react-icons/io5';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LuPen } from 'react-icons/lu';

const data = [
  { name: 'Group A', value: 400, percentage: '34.56%' },
  { name: 'Group B', value: 300, percentage: '25.92%' },
  { name: 'Group C', value: 300, percentage: '25.92%' },
  { name: 'Group D', value: 200, percentage: '17.60%' },
];

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

const ExpenseBreakdown = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>Expense Breakdown</span>
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
      <div className="flex items-center">
        <div className="relative h-full w-1/3 flex-grow">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
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
              {data.map((entry, index) => (
                <tr key={index} className="h-10">
                  <td className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-semibold text-gray-700">
                      {entry.name}
                    </span>
                  </td>
                  <td>{entry.value}</td>
                  <td>{entry.percentage}</td>
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

export default ExpenseBreakdown;
