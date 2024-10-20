import React from 'react';
import FormSelect from '../form/FormSelect';
import Form from './../form/Form';
import FormInput from '../form/FormInput';

const EntryExpensePopup: React.FC = () => {
  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' },
  ];
  const submitHandler = async (data: any) => {
    console.log(data);
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
          type="number"
          className="input-bg w-full rounded-md p-3"
          placeholder="MVR"
        />
      </div>

      <button
        type="submit"
        className="bg-blue w-full rounded-md px-4 py-3 text-center text-white"
      >
        Save
      </button>
    </Form>
  );
};

export default EntryExpensePopup;
