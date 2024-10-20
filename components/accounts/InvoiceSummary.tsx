'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { IoChevronDownSharp } from 'react-icons/io5';

const InvoiceSummary = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Invoice Summary</span>
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

      <div className="flex flex-col">
        <div className="relative flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Total Invoice:</span>
          <div>
            <span>50</span>
          </div>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>

        <div className="relative flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Total Amount Due:</span>
          <div>
            <span>5200</span>
          </div>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>

        <div className="relative flex flex-col justify-between px-5 py-5">
          <span className="font-semibold">Paid Invoices:</span>
          <div>
            <span>45</span>
          </div>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;
