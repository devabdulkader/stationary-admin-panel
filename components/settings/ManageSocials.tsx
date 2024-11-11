'use client';
import React, { useEffect, useState } from 'react';
import FormInput from '../form/FormInput';
import { instance } from '@/axios/axiosInstance';

const ManageSocials = () => {
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
              facebookLink
              instagramLink
              whatsAppLink
              viberLink
            }
          }
        `,
        });

        console.log('Website Info:', response.data.data.getAllWebsiteInfo[0]);
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
      <h1 className="p-5 text-2xl font-medium">Manage Socials</h1>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex w-full items-center gap-5">
          <p className="w-40">facebook</p>
          <FormInput
            name="facebook"
            placeholder={websiteInfo.facebookLink || 'facebook.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">instagram</p>
          <FormInput
            name="instagram"
            placeholder={
              websiteInfo.instagramLink || 'instagram.com/yourprofile'
            }
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">whatsApp</p>
          <FormInput
            name="whatsApp"
            placeholder={websiteInfo.whatsAppLink || 'whatsapp.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">viber</p>
          <FormInput
            name="viber"
            placeholder={websiteInfo.viberLink || 'viber.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSocials;
