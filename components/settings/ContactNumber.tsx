'use client';
import React, { useState } from 'react';
import FormPhoneInput from '../form/FormPhoneInput';

import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ContactNumber = ({ contactNumber }: any) => {
  const [editable, setEditable] = useState(false);

  // console.log('contact', websiteInfo.contactNumber);

  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Contact Number</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          {editable ? (
            <div className="relative w-full">
              <FormPhoneInput
                name="contactNumber"
                className="input-bg w-full flex-grow rounded-md p-3 outline-none"
              />
              <RiDeleteBin6Line
                className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer text-red-600"
                size={24}
                onClick={() => setEditable(false)}
              />
            </div>
          ) : (
            <div className="relative w-full">
              <input
                value={contactNumber || ''}
                className="input-bg w-full flex-grow rounded-md p-2 outline-none"
              />
              <GoPencil
                className="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer text-blue-500"
                size={24}
                onClick={() => setEditable(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactNumber;
