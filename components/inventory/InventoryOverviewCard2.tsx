import Image from 'next/image';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import React, { useState } from 'react';

interface CardData {
  month: string;
  value: number;
  change: number | null;
}

interface CardProps {
  title: string;
  data: CardData[];
}

const InventoryOverviewCard: React.FC<CardProps> = ({ title, data }) => {
  // State for tracking the selected month data
  const [selectedMonth, setSelectedMonth] = useState<CardData | null>(data[0]);

  const isPositive =
    selectedMonth !== null &&
    selectedMonth?.change !== null &&
    selectedMonth?.change !== undefined &&
    selectedMonth?.change >= 0;
  const imageUrl = isPositive ? '/positive-chart.png' : '/negative-chart.png';
  const sign = isPositive ? '+' : '';
  const textColor = isPositive ? 'text-blue-500' : 'text-red-500';

  // Format the month for the dropdown as "MMM YY"
  const formatMonth = (monthString: string) => {
    const monthAbbreviation = monthString.slice(0, 3);
    const yearAbbreviation = monthString.slice(-2);
    return `${monthAbbreviation} '${yearAbbreviation}`;
  };

  // Handle month selection from dropdown
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = data?.find((item) => item.month === event.target.value);
    setSelectedMonth(selected || null);
  };

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between text-nowrap border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
        <div className="relative">
          {/* Month Dropdown */}
          <select
            value={selectedMonth?.month || ''}
            onChange={handleMonthChange}
            className="flex items-center justify-between bg-white py-2 font-semibold text-gray-700"
          >
            {data?.map((item) => (
              <option key={item.month} value={item.month}>
                {formatMonth(item.month)}
              </option>
            ))}
          </select>
          {/* <IoChevronDownSharp className="absolute right-3 top-1/2 -translate-y-1/2 transform" /> */}
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 p-5">
        <Image
          src={imageUrl}
          alt="Chart Image"
          height={200}
          width={200}
          className="h-16 w-24"
        />
        <div>
          <div className="flex items-center">
            {title === 'Inventory Value' || title === 'Revenue' ? (
              <Image
                alt=""
                src="/symbol.svg"
                width={300}
                height={300}
                className="h-4 w-6"
              />
            ) : (
              ''
            )}
            <h3>{selectedMonth?.value.toLocaleString()}</h3>
          </div>

          <p className={`${textColor}`}>
            {sign}
            {selectedMonth && selectedMonth?.change !== null
              ? Math.abs(selectedMonth?.change).toFixed(2)
              : 'N/A'}
            %
            {selectedMonth?.change !== null ? (
              isPositive ? (
                <FaArrowTrendUp className="inline" />
              ) : (
                <FaArrowTrendDown className="inline" />
              )
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverviewCard;
