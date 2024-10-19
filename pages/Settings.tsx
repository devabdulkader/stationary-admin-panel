import HeroCarousel from '@/components/settings/HeroCarousel';
import React from 'react';

const Settings = () => {
  return (
    <div className="p-5">
      <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
        <span>Settings</span>
      </h1>
      <HeroCarousel />
    </div>
  );
};

export default Settings;
