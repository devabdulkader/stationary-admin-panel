import ChangePassword from '@/components/admin-profile/ChangePassword';
import ProfileDetails from '@/components/admin-profile/ProfileDetails';
import Role from '@/components/admin-profile/Role';
import React from 'react';

const AdminProfile = () => {
  return (
    <div className="flex flex-col gap-5">
      <ProfileDetails />
      <Role />
      <ChangePassword />
      <button className="bg-blue rounded-lg p-3 text-center text-lg text-white">
        Save changes
      </button>
    </div>
  );
};

export default AdminProfile;
