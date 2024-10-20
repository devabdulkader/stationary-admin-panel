import React from 'react';
import FormPhoneInput from '../form/FormPhoneInput';

const ContactNumber = () => {
  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Contact Number</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <FormPhoneInput
            name="contactNumber"
            className="input-bg w-full flex-grow rounded-md p-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactNumber;
