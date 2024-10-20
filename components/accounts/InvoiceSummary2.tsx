'use client';
import React, { useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';

interface InvoiceData {
  month: string;
  data: {
    totalInvoice: number;
    amountDue: number;
    paidInvoice: number;
  };
}

interface InvoiceSummaryProps {
  invoiceData: InvoiceData[];
}

const InvoiceSummary2: React.FC<InvoiceSummaryProps> = ({ invoiceData }) => {
  const [selectedMonth, setSelectedMonth] = useState(invoiceData[0].month);

  // Find the data for the selected month
  const selectedData = invoiceData.find(
    (item) => item.month === selectedMonth,
  )?.data;

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Invoice Summary</span>
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex cursor-pointer items-center justify-between bg-white py-2 font-semibold text-gray-700"
          >
            {invoiceData.map((item, index) => (
              <option key={index} value={item.month}>
                {item.month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Total Invoice Section */}
        <div className="relative flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Total Invoice:</span>
          <div>
            <span>{selectedData?.totalInvoice ?? 0}</span>
          </div>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>

        {/* Total Amount Due Section */}
        <div className="relative flex flex-col justify-between border-b border-gray-300 px-5 py-5">
          <span className="font-semibold">Total Amount Due:</span>
          <div>
            <span>{selectedData?.amountDue ?? 0}</span>
          </div>
          <HiOutlineChevronRight
            size={30}
            className="absolute right-5 top-1/2 -translate-y-1/2 transform"
          />
        </div>

        {/* Paid Invoices Section */}
        <div className="relative flex flex-col justify-between px-5 py-5">
          <span className="font-semibold">Paid Invoices:</span>
          <div>
            <span>{selectedData?.paidInvoice ?? 0}</span>
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

export default InvoiceSummary2;
