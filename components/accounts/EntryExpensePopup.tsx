import React from 'react';
import FormSelect from '../form/FormSelect';
import Form from './../form/Form';
import FormInput from '../form/FormInput';
import { useQuery, useMutation } from '@apollo/client';
import {
  CREATE_EXPENSE,
  GET_ALL_EXPENSE_CATEGORIES,
} from '@/queries/accountQueries';
import { tempToken } from '@/middleware';

const EntryExpensePopup: React.FC = () => {
  const { data: expenseCategories, loading: expenseCategoriesLoading } =
    useQuery(GET_ALL_EXPENSE_CATEGORIES);

  const [createExpense, { loading: creatingExpense, error: createError }] =
    useMutation(CREATE_EXPENSE, {
      context: {
        headers: {
          Authorization: tempToken,
        },
      },
    }); // Initialize the mutation

  const categoryOptions = expenseCategories?.getAllExpenseCategories.map(
    (category: any) => ({
      value: category.id,
      label: category.name,
    }),
  );

  if (expenseCategoriesLoading) {
    return <div>Loading...</div>;
  }

  const submitHandler = async (data: any) => {
    try {
      const { expenseCategory, expenseValue } = data;

      // Call the mutation to create an expense
      const response = await createExpense({
        variables: {
          categoryId: expenseCategory,
          value: expenseValue, // Ensure value is passed as a number
        },
      });

      // Handle the response if needed (e.g., show a success message)
      console.log('Expense created:', response.data.createExpense);
    } catch (error) {
      console.error('Error creating expense:', error);
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
          Error creating expense: {createError.message}
        </div>
      )}
    </Form>
  );
};

export default EntryExpensePopup;
