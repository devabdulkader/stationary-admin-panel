import React from 'react';
import FormInput from '../form/FormInput';

const CopyrightText = () => {
  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Cooyright Text</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <FormInput
            name="copyrightText"
            placeholder="© Copyright Reliability Maldives Pvt Ltd 2024"
            type="text"
            className="input-bg flex-grow rounded-md p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default CopyrightText;
