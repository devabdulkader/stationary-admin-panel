import { instance } from '@/axios/axiosInstance';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const ViewOrderPopup = ({ orderData }: { orderData: any }) => {
  const [orderStatus, setOrderStatus] = useState(orderData.status || '');
  const [paymentStatus, setPaymentStatus] = useState(
    orderData.payment.status || '',
  );
  const [shippingMethod, setShippingMethod] = useState(
    orderData.shippingMethod || '',
  );

  const handleSave = async () => {
    try {
      const input = {
        status: orderStatus,
        shippingMethod,
        paymentStatus,
      };

      console.log('mutation', input);

      const response = await instance.post('', {
        query: `
          mutation($id: String!, $input: UpdateOrderInput!){
            updateOrder(id: $id, input: $input){
                message
                success
            }
        }
        `,
        variables: {
          id: orderData.id,
          input,
        },
      });

      if (response?.data?.success) {
        console.log('Order updated successfully!');
      } else {
        console.error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      console.error('An error occurred while updating the order.');
    }
  };

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
            <label className="mb-1 block">Tracking ID:</label>
            <input
              type="text"
              value={orderData.trackingId}
              disabled
              className="input-bg flex-grow rounded p-2"
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Total Amount:</label>
            <input
              type="text"
              value={`MVR ${orderData.totalAmount}`}
              disabled
              className="input-bg flex-grow rounded p-2"
            />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Order Status:</label>
            <select
              className="input-bg flex-grow rounded p-2"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="PENDING">Pending</option>
              <option value="SHIPPED">Shipped</option>
              <option value="COMPLETED">Completed</option>
              <option value="RETURNED">Returned</option>
            </select>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Payment Status:</label>
            <select
              className="input-bg flex-grow rounded p-2"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <label className="mb-1 block">Shipping Method:</label>
            <select
              className="input-bg flex-grow rounded p-2"
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <option value="FedEx">FedEx</option>
              <option value="UPS">UPS</option>
              <option value="DHL">DHL</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <h2 className="mb-2 text-lg font-semibold">Customer Details:</h2>
          <div className="input-bg flex flex-1 flex-col gap-2 rounded-lg p-3">
            <p>Name: {orderData.user.fullName}</p>
            <p>Email: {orderData.user.email}</p>
            <p>Contact: {orderData.user.phoneNumber}</p>
            <p>Address: {orderData.user.address}</p>
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
            {orderData.orderedItems.map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-2 pr-4">{item.product.title}</td>
                <td className="py-2 pr-4">{`MVR ${item.price}`}</td>
                <td className="py-2 pr-4">{item.quantity}</td>
                <td className="py-2 pr-4">{`MVR ${item.quantity * item.price}`}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-semibold">
                Subtotal
              </td>
              <td className="py-2 pr-4">{`MVR ${orderData.totalAmount}`}</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-semibold">
                VAT ({orderData.vat}%)
              </td>
              <td className="py-2 pr-4">{`MVR ${orderData.totalAmount * (+orderData.vat / 100)}`}</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-2 pr-4 font-bold">
                Invoice Total
              </td>
              <td className="py-2 pr-4 font-bold">
                {`MVR ${orderData.totalAmount + +orderData.totalAmount * (+orderData.vat / 100)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue mt-6 w-full rounded py-2 text-white hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default ViewOrderPopup;
