'use client';

import React, { useState } from 'react';
import FormInput from '../form/FormInput';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import FormTextarea from '../form/FormTextarea';

interface ProductInformationProps {
  productDetail: {
    title: string;
    category: { name: string };
    price: any;
    stockQuantity: any;
    sku: string;
    description: string;
  };
  setProductDetail: (details: any) => void;
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  productDetail,
  setProductDetail,
}) => {
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({
    title: false,
    category: false,
    price: false,
    stockQuantity: false,
    description: false,
  });

  const toggleEditable = (field: string) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (field: string, value: any) => {
    setProductDetail((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-[60%]">
      <div className="flex flex-col gap-5 rounded-lg bg-white p-5">
        {/* Product Title */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Title</label>
          <div className="relative">
            <FormInput
              name="productTitle"
              value={productDetail.title}
              disabled={!editableFields.title}
              className={`input-bg w-full rounded-md p-3 outline-none ${
                editableFields.title ? 'bg-yellow-100 border border-yellow-500' : 'bg-gray-100'
              }`}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
              <FiEdit2
                className="cursor-pointer text-gray-600"
                size={24}
                onClick={() => toggleEditable('title')}
              />
              <RiDeleteBin6Line className="cursor-pointer text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Product Category */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Category</label>
          <div className="relative">
            <FormInput
              name="productCategory"
              value={productDetail.category?.name}
              disabled={!editableFields.category}
              className={`input-bg w-full rounded-md p-3 outline-none ${
                editableFields.category ? 'bg-yellow-100 border border-yellow-500' : 'bg-gray-100'
              }`}
              onChange={(e) =>
                handleChange('category', { ...productDetail.category, name: e.target.value })
              }
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
              <FiEdit2
                className="cursor-pointer text-gray-600"
                size={24}
                onClick={() => toggleEditable('category')}
              />
              <RiDeleteBin6Line className="cursor-pointer text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Price</label>
          <div className="relative">
            <FormInput
              name="productPrice"
              type="number"
              value={productDetail.price}
              disabled={!editableFields.price}
              className={`input-bg w-full rounded-md p-3 outline-none ${
                editableFields.price ? 'bg-yellow-100 border border-yellow-500' : 'bg-gray-100'
              }`}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
              <FiEdit2
                className="cursor-pointer text-gray-600"
                size={24}
                onClick={() => toggleEditable('price')}
              />
              <RiDeleteBin6Line className="cursor-pointer text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Product Quantity */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Quantity</label>
          <div className="relative">
            <FormInput
              name="productQuantity"
              type="number"
              value={productDetail.stockQuantity}
              disabled={!editableFields.stockQuantity}
              className={`input-bg w-full rounded-md p-3 outline-none ${
                editableFields.stockQuantity ? 'bg-yellow-100 border border-yellow-500' : 'bg-gray-100'
              }`}
              onChange={(e) => handleChange('stockQuantity', parseInt(e.target.value))}
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center gap-3">
              <FiEdit2
                className="cursor-pointer text-gray-600"
                size={24}
                onClick={() => toggleEditable('stockQuantity')}
              />
              <RiDeleteBin6Line className="cursor-pointer text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Product SKU (Read-only) */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product SKU</label>
          <input
            name="productSku"
            className="input-bg w-full rounded-md p-3"
            value={productDetail.sku}
            disabled
          />
        </div>
      </div>

      {/* Product Description */}
      <div className="rounded-lg bg-white p-5 mt-5">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Product Description</label>
          <FormTextarea
            name="productDescription"
            value={productDetail.description}
            disabled={!editableFields.description}
            className={`min-h-40 w-full rounded-md p-3 outline-none ${
              editableFields.description ? 'bg-yellow-100 border border-yellow-500' : 'bg-gray-100'
            }`}
            rows={4}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <div className="flex -translate-y-1/2 transform items-center gap-3">
            <FiEdit2
              className="cursor-pointer text-gray-600"
              size={24}
              onClick={() => toggleEditable('description')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
