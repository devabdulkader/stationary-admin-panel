import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { IoChevronDownSharp } from 'react-icons/io5';

interface CardData {
  value: number;
  percentageChange: number;
}

interface CardProps {
  title: string;
  data: CardData;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const InventoryOverviewCard: React.FC<CardProps> = ({
  title,
  data,
  startDate,
  setStartDate,
}) => {
  const isPositive = data.percentageChange >= 0;
  const imageUrl = isPositive ? '/positive-chart.png' : '/negative-chart.png';
  const sign = isPositive ? '+' : '-';
  const textColor = isPositive ? 'text-blue-500' : 'text-red-500';

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
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
            <h3>{data.value.toLocaleString()}</h3>
          </div>

          <p className={`${textColor}`}>
            {sign}
            {Math.abs(data.percentageChange)}%{' '}
            {isPositive ? (
              <FaArrowTrendUp className="inline" />
            ) : (
              <FaArrowTrendDown className="inline" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverviewCard;
