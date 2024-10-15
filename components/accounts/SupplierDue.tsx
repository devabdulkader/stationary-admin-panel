'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { IoChevronDownSharp } from 'react-icons/io5';

const SupplierDue = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Supplier Due</span>
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
        <div className="flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Total Unpaid Amount:</span>
          <div>
            <span>5200</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Aging Breakdown:</span>
          <div>
            <span>0-30 Days: 1200 (45%)</span>
          </div>
        </div>

        <div className="flex flex-col justify-between px-5 py-5">
          <span className="font-semibold">Unpaid Purchase Order:</span>
          <div>
            <span>15</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDue;
