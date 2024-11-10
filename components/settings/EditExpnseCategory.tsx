'use client';
import React, { useState } from 'react';
// import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import FormInput from '../form/FormInput';

interface Category {
  id: number;
  name: string;
  isEditable: boolean;
}

const EditExpenseCategory: React.FC = () => {
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);

  const handleExpenseDelete = (id: number) => {
    setExpenseCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id),
    );
  };

  const handleAddExpenseCategory = () => {
    setExpenseCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, name: '', isEditable: true },
    ]);
  };

  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Edit Expense Category</h1>

      <div className="flex flex-col gap-5 p-5">
        {expenseCategories.map((category) => (
          <div key={category.id} className="relative flex items-center gap-5">
            <FormInput
              name={`expense_category.${category.id}`}
              className="input-bg flex-grow rounded-md p-3 pr-12"
            />
            <RiDeleteBin6Line
              className="absolute right-5 cursor-pointer text-red-600"
              size={24}
              onClick={() => handleExpenseDelete(category.id)}
            />
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddExpenseCategory();
          }}
          className="input-bg text-blue flex items-center justify-center gap-3 rounded-md p-2"
        >
          <GoPlus size={24} className="text-blue" /> Add New Category
        </button>
      </div>
    </div>
  );
};

export default EditExpenseCategory;
