'use client';
import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import FormInput from '../form/FormInput';

interface Category {
  id: number;
  name: string;
  isEditable: boolean;
}

const EditProductCategory: React.FC = () => {
  // Initially show one empty editable category field
  const [categories, setCategories] = useState<Category[]>([]);

  const handleDelete = (id: number) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id),
    );
  };

  const handleAddCategory = () => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: prevCategories.length + 1, name: '', isEditable: true },
    ]);
  };

  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Edit Product Category</h1>

      <div className="flex flex-col gap-5 p-5">
        {categories.map((category) => (
          <div key={category.id} className="relative flex items-center gap-5">
            <FormInput
              name={`product_category.${category.id}`}
              className="input-bg flex-grow rounded-md p-3 pr-12"
            />
            <RiDeleteBin6Line
              className="absolute right-5 cursor-pointer text-red-600"
              size={24}
              onClick={() => handleDelete(category.id)}
            />
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddCategory();
          }}
          className="input-bg text-blue flex items-center justify-center gap-3 rounded-md p-2"
        >
          <GoPlus size={24} className="text-blue" /> Add New Category
        </button>
      </div>
    </div>
  );
};

export default EditProductCategory;
