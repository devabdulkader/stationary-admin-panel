'use client';
import React, { useEffect, useState } from 'react';
import FormInput from '../form/FormInput';
import { instance } from '@/axios/axiosInstance';

const CopyrightText = () => {
  const [websiteInfo, setWebsiteInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWebsiteInfo = async () => {
      try {
        const response = await instance.post('', {
          query: `
          query {
            getAllWebsiteInfo {
              id
              copyrightText
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
  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Cooyright Text</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <FormInput
            name="copyrightText"
            placeholder={
              websiteInfo.copyrightText ||
              '© Copyright Reliability Maldives Pvt Ltd 2024'
            }
            type="text"
            className="input-bg flex-grow rounded-md p-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CopyrightText;
