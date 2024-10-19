import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { GoPlus } from 'react-icons/go';

const EditExpenseCategory = () => {
  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Edit Expense Category</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="relative flex items-center gap-5">
          <input
            className="input-bg flex-grow rounded-md p-3 pr-12"
            value="2302u32"
            disabled
          />
          <FiEdit2
            className="absolute right-14 cursor-pointer text-gray-600"
            size={24}
          />
          <RiDeleteBin6Line
            className="absolute right-5 cursor-pointer text-red-600"
            size={24}
          />
        </div>
        <button className="input-bg text-blue flex flex-grow items-center justify-center gap-3 rounded-md p-3 text-center">
          <GoPlus size={24} className="text-blue" /> Add New Category
        </button>
      </div>
    </div>
  );
};

export default EditExpenseCategory;
