'use client';
import ChangePassword from '@/components/admin-profile/ChangePassword';
import ProfileDetails from '@/components/admin-profile/ProfileDetails';
import Role from '@/components/admin-profile/Role';
// import Form from '@/components/form/Form';
import React from 'react';

const AdminProfile = () => {
  // const submitHandler = async (data: any) => {
  //   console.log(data);
  // };
  return (
    <div className="flex flex-col gap-5">
      {/* <Form submitHandler={submitHandler}> */}
      <ProfileDetails />
      <Role />
      <ChangePassword />
      <button className="bg-blue rounded-lg p-3 text-center text-lg text-white">
        Save changes
      </button>
      {/* </Form> */}
    </div>
  );
};

export default AdminProfile;
