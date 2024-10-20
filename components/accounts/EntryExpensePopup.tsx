import React, { useState } from 'react';

const EntryExpensePopup: React.FC = () => {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState<number | ''>('');

  return (
    <div>
      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Select Expense Category:
        </label>
        <select
          className="input-bg w-full rounded-md p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Supplies">Supplies</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold text-gray-700">
          Value:
        </label>
        <input
          type="number"
          className="input-bg w-full rounded-md p-3"
          placeholder="MVR"
          value={value}
          onChange={(e) =>
            setValue(e.target.value === '' ? '' : Number(e.target.value))
          }
        />
      </div>

      <button className="bg-blue w-full rounded-md px-4 py-3 text-center text-white">
        Save
      </button>
    </div>
  );
};

export default EntryExpensePopup;
