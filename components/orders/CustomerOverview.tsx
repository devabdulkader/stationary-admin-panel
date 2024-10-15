'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { GoDotFill } from 'react-icons/go';
import { IoChevronDownSharp } from 'react-icons/io5';

const CustomerOverview = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="h-full rounded-lg bg-white shadow">
      {' '}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>Customer Overview</span>
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
      <div className="flex h-[250px] items-center p-3">
        {' '}
        <div className="relative h-full flex-grow">
          <div className="absolute left-5 top-16 flex h-32 w-32 items-center justify-center rounded-full bg-[#0709F7] font-semibold text-white">
            70%
          </div>

          <div className="absolute left-32 top-10 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-[#00359E] font-semibold text-white">
            30%
          </div>

          <div className="absolute left-32 top-32 flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-white bg-[#A90601] font-semibold text-white">
            10%
          </div>
        </div>
        <div className="flex h-full flex-col items-start justify-center space-y-4">
          <div className="font-semibold text-gray-700">
            <GoDotFill size={24} className="mr-2 inline text-[#0709F7]" />
            New Customer <span className="font-normal">(1,089)</span>
          </div>
          <div className="font-semibold text-gray-700">
            <GoDotFill size={24} className="mr-2 inline text-[#00359E]" />
            Last Month Customer <span className="font-normal">(238)</span>
          </div>
          <div className="font-semibold text-gray-700">
            <GoDotFill size={24} className="mr-2 inline text-[#A90601]" />
            Churned Customer <span className="font-normal">(109)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
