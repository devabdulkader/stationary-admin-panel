import ContactNumber from '@/components/settings/ContactNumber';
import CopyrightText from '@/components/settings/CopyrightText';
import EditExpenseCategory from '@/components/settings/EditExpnseCategory';
import EditProductCategory from '@/components/settings/EditProductCategory';
import HeroCarousel from '@/components/settings/HeroCarousel';
import ManageSocials from '@/components/settings/ManageSocials';
import React from 'react';

const Settings = () => {
  return (
    <div className="p-5">
      <h1 className="text-blue mb-5 flex items-center gap-2 pr-10 text-3xl font-medium">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-5">
        <HeroCarousel />
        <ManageSocials />
        <ContactNumber />
        <EditProductCategory />
        <EditExpenseCategory />
        <CopyrightText />
      </div>
    </div>
  );
};

export default Settings;
