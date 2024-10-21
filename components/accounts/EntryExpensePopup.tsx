'use client';

import React, { useEffect, useState } from 'react';
import FormSelect from '../form/FormSelect';
import Form from './../form/Form';
import FormInput from '../form/FormInput';
import { instance } from '@/axios/axiosInstance';

const EntryExpensePopup: React.FC = () => {
  const [expenseCategories, setExpenseCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingExpense, setCreatingExpense] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Fetch expense categories using axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.post('', {
          query: `
            query {
              getAllExpenseCategories {
                id
                name
              }
            }
          `,
        });
        setExpenseCategories(response.data.data.getAllExpenseCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expense categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryOptions = expenseCategories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  const submitHandler = async (data: any) => {
    const { expenseCategory, expenseValue } = data;

    setCreatingExpense(true);
    setCreateError(null);

    try {
      // Call the createExpense mutation using axios
      const response = await instance.post('', {
        query: `
          mutation CREATE_EXPENSE($categoryId: ID!, $value: String!) {
            createExpense(categoryId: $categoryId, value: $value) {
              id
            }
          }
        `,
        variables: {
          categoryId: expenseCategory,
          value: expenseValue,
        },
      });

      // Handle the response if needed (e.g., show a success message)
      console.log('Expense created:', response.data.data.createExpense);
    } catch (error: any) {
      console.error('Error creating expense:', error);
      setCreateError(error.message);
    } finally {
      setCreatingExpense(false);
    }
  };

  return (
    <Form submitHandler={submitHandler}>
      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Select Expense Category:
        </label>

        <FormSelect
          name="expenseCategory"
          options={categoryOptions}
          required={true}
          className="input-bg w-full rounded-md p-3"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Value:
        </label>
        <FormInput
          name="expenseValue"
          className="input-bg w-full rounded-md p-3"
          placeholder="MVR"
          required={true}
        />
      </div>

      <button
        type="submit"
        className="bg-blue w-full rounded-md px-4 py-3 text-center text-white"
        disabled={creatingExpense} // Disable the button while creating the expense
      >
        {creatingExpense ? 'Saving...' : 'Save'}
      </button>

      {createError && (
        <div className="mt-4 text-red-500">
          Error creating expense: {createError}
        </div>
      )}
    </Form>
  );
};

export default EntryExpensePopup;
