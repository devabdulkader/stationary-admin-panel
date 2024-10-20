import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import Form from '../form/Form';
import { CgDanger } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';

const AddNewProduct = () => {
  const handleSubmit = () => {};
  return (
    <Form
      submitHandler={handleSubmit}
      className="relative flex h-auto w-full flex-col gap-4"
    >
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <h3 className="text-md font-semibold">Add Product Image</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="border-blue-dashed flex h-40 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100">
          <BsFillPlusCircleFill className="text-blue" size={30} />
        </div>
        <div className="border-blue-dashed flex h-40 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100">
          <BsFillPlusCircleFill className="text-blue" size={30} />
        </div>
        <div className="border-blue-dashed flex h-40 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100">
          <BsFillPlusCircleFill className="text-blue" size={30} />
        </div>
        <div className="border-blue-dashed flex h-40 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100">
          <BsFillPlusCircleFill className="text-blue" size={30} />
        </div>
      </div>
      <p className="flex items-center gap-1 text-sm text-gray-500">
        <CgDanger className="text-gray-500" />
        First image will be the thumbnail
      </p>
      <div>
        <p className="text-md mb-2 font-semibold">Product SKU: 232323</p>
        <label className="text-md mb-2 block font-semibold">
          Product Title
        </label>
        <input type="text" className="input-bg w-full rounded-md p-2" />
      </div>
      {/* Product Category and Price */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Product Category
          </label>
          <select className="input-bg w-full rounded-md p-2">
            <option></option>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Product Price
          </label>
          <input
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="MVR"
          />
        </div>
      </div>
      {/* Quantity and Buying Price */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Add Quantity
          </label>
          <input
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="Unit"
          />
        </div>
        <div className="flex-1">
          <label className="text-md mb-2 block font-semibold">
            Buying Price
          </label>
          <input
            type="number"
            className="input-bg w-full rounded-md p-2"
            placeholder="MVR"
          />
        </div>
      </div>
      {/* Product Description */}
      <div>
        <label className="text-md mb-2 block font-semibold">
          Product Description
        </label>
        <textarea
          className="input-bg w-full rounded-md p-2"
          placeholder="0/300"
          rows={4}
        />
      </div>
      {/* Variants Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            className="input-bg w-full rounded-md p-2"
            placeholder="Variant 1"
          />
        </div>
        <div>
          <input
            type="text"
            className="input-bg w-full rounded-md p-2"
            placeholder="Variant 2"
          />
        </div>
        <div>
          <input
            type="text"
            className="input-bg w-full rounded-md p-2"
            placeholder="Variant 3"
          />
        </div>
        <div>
          <button className="input-bg text-blue w-full rounded-md p-2">
            <GoPlus size={24} className="text-blue mr-2 inline" /> Add New
            Variant
          </button>
        </div>
      </div>
      {/* Save Button */}
      <div className="">
        <button className="bg-blue w-full rounded-md px-4 py-2 text-white">
          Save
        </button>
      </div>
    </Form>
  );
};

export default AddNewProduct;
