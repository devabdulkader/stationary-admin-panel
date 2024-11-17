'use client';
import React, { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FormInput from '../form/FormInput';
import { IoToggleSharp } from 'react-icons/io5';
import { instance } from '@/axios/axiosInstance';
import FormDateTimePicker from '../form/FormDateTimePicker';

const ProductDiscount = () => {
  const [loading, setLoading] = useState(true);

  const [discountData, setDiscountData] = useState<any>(null); // Add discount data state
  const [isDiscountDisabled, setIsDiscountDisabled] = useState(false);

  const handleToggleClick = () => {
    setIsDiscountDisabled((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchProductDiscount = async () => {
      try {
        // Fetch the product discount data
        const discountResponse = await instance.post('', {
          query: `
                query {
                  productDiscounts {
                    discountedPrice
                    startsAt
                    endsAt
                    isActive
                    product {
                      title
                    }
                  }
                }
              `,
        });

        console.log(
          'Discount Data:',
          discountResponse.data.data.productDiscounts,
        ); // Log the discount data here
        setDiscountData(discountResponse.data.data.productDiscounts); // Set the discount data state
      } catch (error) {
        console.error('Error fetching product detail or discount data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDiscount();
  },[]);
  console.log(discountData);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative flex w-[40%] flex-col gap-5 rounded-lg bg-white p-5">
      <div
        className={`absolute right-5 top-3 z-20 size-10 cursor-pointer ${isDiscountDisabled ? 'text-gray-400' : 'text-blue-600'}`}
        onClick={handleToggleClick}
      >
        <IoToggleSharp size={32} />
      </div>

      {/* Discount Price */}
      <div className="relative flex flex-col gap-2">
        <label
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          Discount Price
        </label>
        <div className="relative w-full">
          <FormInput
            name="discountPrice"
            type="number"
            className="input-bg w-full rounded-md p-3 pr-10 outline-none"
          />
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
            <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
            <RiDeleteBin6Line
              className="cursor-pointer text-red-600"
              size={24}
            />
          </div>
        </div>
      </div>

      {/* Discount Percentage */}
      <div className="relative flex flex-col gap-2">
        <label
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          Discount Percentage
        </label>
        <div className="relative">
          <FormInput
            name="discountPercentage"
            type="number"
            className="input-bg w-full rounded-md p-3 pr-10 outline-none"
          />
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
            <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
            <RiDeleteBin6Line
              className="cursor-pointer text-red-600"
              size={24}
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-2">
        <p
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          Discount Date
        </p>
        <label
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          From
        </label>
        <div className="relative w-full">
          <FormDateTimePicker
            name="discountDateFrom"
            className="input-bg w-full rounded-md p-2 pr-10"
          />

          <RiDeleteBin6Line
            className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
            size={24}
          />
        </div>
        <label
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          To
        </label>
        <div className="relative w-full">
          <FormDateTimePicker
            name="discountDateTo"
            className="input-bg w-full rounded-md p-2 pr-10"
          />

          <RiDeleteBin6Line
            className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
            size={24}
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-2">
        <label
          className={`text-lg font-medium ${isDiscountDisabled ? 'text-gray-400' : ''}`}
        >
          Discount Duration
        </label>
        <div className="relative w-full">
          <FormInput
            name="discountDuration"
            type="number"
            placeholder="Days"
            className="input-bg w-full rounded-md p-3 pr-10 outline-none"
          />
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
            <FiEdit2 className="cursor-pointer text-gray-600" size={24} />
            <RiDeleteBin6Line
              className="cursor-pointer text-red-600"
              size={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscount;
