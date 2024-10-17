import Link from 'next/link';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const ViewOrderPopup = () => {
  return (
    <div className="">
      <Link href="/orders">
        <h1 className="flex items-center gap-2 pb-5 pr-10 text-2xl font-semibold">
          <BsArrowLeft className="" />
          <span>View Order</span>
        </h1>
      </Link>
      <div className="">
        <div className="grid grid-cols-2 gap-5 rounded-lg py-4">
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Order ID:</label>
            <input
              type="text"
              value="232323232"
              disabled
              className="input-bg flex-grow rounded p-2"
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Value:</label>
            <input
              type="text"
              value="MVR 500"
              disabled
              className="input-bg flex-grow rounded p-2"
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Order Date:</label>
            <input
              type="text"
              value="20 Sep, 24"
              disabled
              className="input-bg flex-grow rounded p-2"
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Order Status:</label>
            <select className="input-bg flex-grow rounded p-2">
              <option value="">Select type</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Payment Status:</label>
            <select className="input-bg flex-grow rounded p-2">
              <option value="">Select type</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Shipping Method:</label>
            <select className="input-bg flex-grow rounded p-2">
              <option value="">Select type</option>
              <option value="standard">Standard</option>
              <option value="express">Express</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <h2 className="mb-2 text-lg font-semibold">Customer Details:</h2>
          <div className="input-bg flex flex-1 flex-col gap-2 rounded-lg p-3">
            <p>Name: kalid</p>
            <p>Email: kalid@gmail.com</p>
            <p>Contact: 340333</p>
            <p>Address: something</p>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-2 text-lg font-semibold">Customer Note:</h2>
          <div className="input-bg flex flex-1 rounded-lg p-3">
            <p>N/A</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-lg font-semibold">Order Details:</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 text-left">Item</th>
              <th className="py-2 pr-4 text-left">Cost</th>
              <th className="py-2 pr-4 text-left">Qty</th>
              <th className="py-2 pr-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat rows as needed */}
            {['Nataraj Pencil', 'Nataraj Pencil', 'Nataraj Pencil'].map(
              (item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 pr-4">{item}</td>
                  <td className="py-2 pr-4">MVR 50</td>
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">MVR 50</td>
                </tr>
              ),
            )}
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-semibold">
                Subtotal
              </td>
              <td className="py-2 pr-4">MVR 150</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-semibold">
                Discount (0%)
              </td>
              <td className="py-2 pr-4">MVR 0</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-semibold">
                VAT (10%)
              </td>
              <td className="py-2 pr-4">MVR 15</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-bold">
                Invoice Total
              </td>
              <td className="py-2 pr-4 font-bold">MVR 165</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="bg-blue mt-6 w-full rounded py-2 text-white hover:bg-blue-600">
        Save
      </button>
    </div>
  );
};

export default ViewOrderPopup;
