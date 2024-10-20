'use client';
import Form from '@/components/form/Form';
import FormInput from '@/components/form/FormInput';
import ProductImages from '@/components/ProductDetails.tsx/ProductImages';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { IoToggleSharp } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FormTextarea from './../components/form/FormTextarea';
import FormDateTimePicker from '@/components/form/FormDateTimePicker';

const ProductDetails = () => {
  const [isDiscountDisabled, setIsDiscountDisabled] = useState(false);

  const handleToggleClick = () => {
    setIsDiscountDisabled((prevState) => !prevState);
  };

  const submitHandler = async (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <div className="p-5">
        <div className="flex flex-col gap-5 pb-10 lg:flex-row">
          <Link href="/list-of-products">
            <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
              <BsArrowLeft />
              <span>Product Details</span>
            </h1>
          </Link>
          <div className="flex flex-grow flex-col gap-5 sm:flex-row">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>
          </div>
        </div>

        <Form submitHandler={submitHandler}>
          <ProductImages />
          <section className="mt-5 grid grid-cols-12 gap-5">
            <div className="col-span-12 flex flex-col gap-5 xl:col-span-8">
              <div className="flex flex-col gap-5 rounded-lg bg-white p-5">
                {/* First Input Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium">Product Title</label>
                  <div className="relative">
                    <FormInput
                      name="productTitle"
                      className="input-bg w-full rounded-md p-3 pr-10"
                    />
                    <FiEdit2
                      className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                      size={24}
                    />
                    <RiDeleteBin6Line
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                      size={24}
                    />
                  </div>
                </div>

                {/* Second Input Field */}
                <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium">
                      Product Category
                    </label>
                    <div className="relative">
                      <FormInput
                        name="productCategory"
                        className="input-bg w-full rounded-md p-3 pr-10"
                      />
                      <FiEdit2
                        className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                        size={24}
                      />
                      <RiDeleteBin6Line
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                        size={24}
                      />
                    </div>
                  </div>

                  {/* Third Input Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium">Product Price</label>
                    <div className="relative">
                      <FormInput
                        name="productPrice"
                        type="number"
                        className="input-bg w-full rounded-md p-3 pr-10"
                      />
                      <FiEdit2
                        className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                        size={24}
                      />
                      <RiDeleteBin6Line
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                        size={24}
                      />
                    </div>
                  </div>

                  {/* Fourth Input Field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium">
                      Product Quantity
                    </label>
                    <div className="relative">
                      <FormInput
                        name="productQuantity"
                        className="input-bg w-full rounded-md p-3 pr-10"
                      />
                      <FiEdit2
                        className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                        size={24}
                      />
                      <RiDeleteBin6Line
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                        size={24}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-medium">Product SKU</label>
                    <div className="relative">
                      <input
                        className="input-bg w-full rounded-md p-2 pr-10"
                        value="2302u32"
                        disabled
                      />
                    </div>
                  </div>
                </section>
              </div>

              <div className="rounded-lg bg-white p-5">
                <div className="relative flex flex-col gap-2">
                  <label className="text-lg font-medium">
                    Product Description
                  </label>
                  <FormTextarea
                    name="productDescription"
                    className="min-h-40"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="relative col-span-12 flex flex-col gap-5 rounded-lg bg-white p-5 xl:col-span-4">
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
                <div className="relative">
                  <FormInput
                    name="discountPrice"
                    type="number"
                    className="input-bg w-full rounded-md p-3 pr-10"
                    disabled={isDiscountDisabled}
                  />
                  <FiEdit2
                    className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                    size={24}
                  />
                  <RiDeleteBin6Line
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                    size={24}
                  />
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
                    name="discountPrice"
                    type="number"
                    className="input-bg w-full rounded-md p-3 pr-10"
                    disabled={isDiscountDisabled}
                  />
                  <FiEdit2
                    className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                    size={24}
                  />
                  <RiDeleteBin6Line
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                    size={24}
                  />
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
                <div className="relative">
                  <FormDateTimePicker
                    name="discountDateFrom"
                    className="input-bg w-full rounded-md p-2 pr-10"
                    disabled={isDiscountDisabled}
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
                <div className="relative">
                  <FormDateTimePicker
                    name="discountDateTo"
                    className="input-bg w-full rounded-md p-2 pr-10"
                    disabled={isDiscountDisabled}
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
                <div className="relative">
                  <FormInput
                    name="discountDuration"
                    type="number"
                    placeholder="Days"
                    className="input-bg w-full rounded-md p-3 pr-10"
                    disabled={isDiscountDisabled}
                  />
                  <FiEdit2
                    className="absolute right-12 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
                    size={24}
                  />
                  <RiDeleteBin6Line
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="bg-blue my-5 w-full rounded-lg p-3 text-center text-white"
          >
            Save
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ProductDetails;
