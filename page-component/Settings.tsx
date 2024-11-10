'use client';

import Form from '@/components/form/Form';
import ContactNumber from '@/components/settings/ContactNumber';
import CopyrightText from '@/components/settings/CopyrightText';
import EditExpenseCategory from '@/components/settings/EditExpnseCategory';
import EditProductCategory from '@/components/settings/EditProductCategory';
import HeroCarousel from '@/components/settings/HeroCarousel';
import ManageSocials from '@/components/settings/ManageSocials';
import React from 'react';

const Settings = () => {
  const submitHandler = async (data: any) => {
    console.log(data);
  };
  return (
    <div className="p-5">
      <h1 className="text-blue mb-5 flex items-center gap-2 pr-10 text-3xl font-medium">
        <span>Settings</span>
      </h1>

      <Form submitHandler={submitHandler} className="flex flex-col gap-5">
        <HeroCarousel />
        <ManageSocials />
        <ContactNumber />
        <EditProductCategory />
        <EditExpenseCategory />
        <CopyrightText />
        <button
          type="submit"
          className={`w-full rounded-lg border border-[#00359E] bg-[#00359E] py-2.5 text-white transition-all active:scale-[0.96]`}
        >
          Save changes
        </button>
      </Form>
    </div>
  );
};

export default Settings;
