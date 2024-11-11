'use client';
import React, { useEffect, useState } from 'react';
import FormPhoneInput from '../form/FormPhoneInput';
import { instance } from '@/axios/axiosInstance';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ContactNumber = () => {
  const [websiteInfo, setWebsiteInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      try {
        const response = await instance.post('', {
          query: `
          query {
            getAllWebsiteInfo {
              id
              contactNumber
            }
          }
        `,
        });

        setWebsiteInfo(response.data.data.getAllWebsiteInfo[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching website info:', error);
        setLoading(false);
      }
    };

    fetchWebsiteInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('contact', websiteInfo.contactNumber);

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
                value={websiteInfo.contactNumber || ''}
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
