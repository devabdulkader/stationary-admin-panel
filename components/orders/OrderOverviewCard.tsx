import Image from 'next/image';
import DatePicker from 'react-datepicker';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { IoChevronDownSharp } from 'react-icons/io5';

interface OrderData {
  totalOrders?: number;
  pending?: number;
  completed?: number;
  shipped?: number;
  returned?: number;
  revenue?: number;
  value?: number;
  percentageChange: number;
}

interface OrderOverviewCardProps {
  title: string;
  data: OrderData;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  icon: React.ReactNode;
}

const OrderOverviewCard: React.FC<OrderOverviewCardProps> = ({
  title,
  data,
  startDate,
  setStartDate,
  icon,
}) => {
  const isPositive = data.percentageChange >= 0;
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

      <div className="flex justify-between gap-5 p-5">
        <section>
          <p>
            {title === 'Total Orders'
              ? 'Total Orders'
              : title === 'Pending Orders'
                ? 'Pending'
                : title === 'Completed Orders'
                  ? 'Completed'
                  : title === 'Shipped Orders'
                    ? 'Shipped'
                    : title === 'Returned Orders'
                      ? 'Returned'
                      : ''}
          </p>
          <h3 className="mb-2 text-xl font-medium">
            {title === 'Total Orders' && data.totalOrders}
            {title === 'Pending Orders' && data.pending}
            {title === 'Completed Orders' && data.completed}
            {title === 'Shipped Orders' && data.shipped}
            {title === 'Returned Orders' && data.returned}
          </h3>

          <p>{title === 'Total Orders' ? 'Revenue' : 'Value'}</p>

          <div className="flex items-center">
            <Image
              alt=""
              src="/symbol.svg"
              width={300}
              height={300}
              className="inline h-4 w-6"
            />
            <h3 className="text-xl font-medium">
              {title === 'Total Orders' ? data.revenue : data.value}
            </h3>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-3">
          {icon}

          <p className={`${textColor} `}>
            {sign}
            {Math.abs(data.percentageChange)}%{' '}
            {isPositive ? (
              <FaArrowTrendUp className="inline" />
            ) : (
              <FaArrowTrendDown className="inline" />
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default OrderOverviewCard;
