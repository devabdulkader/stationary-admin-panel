'use client';
import { instance } from '@/axios/axiosInstance';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Cookie from 'js-cookie';

const ProfileDetails = () => {
  const [user, setUser] = React.useState<any>(null);
  const [userInfo, setUserInfo] = React.useState<any>(null);
  useEffect(() => {
    try {
      const userData = Cookie.get('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchUserInfo = async (userId: string) => {
    try {
      const userInfoResponse = await instance.post('', {
        query: `
          query GetMe($id: String!) {
            getMe(id: $id) {
              id
              fullName
              email
              phoneNumber
            }
          }
        `,
        variables: {
          id: userId,
        },
      })
      setUserInfo(userInfoResponse.data.data.getMe);
      // setUserInfo(userInfoResponse.data.data.getMe);
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserInfo(user.id);
    }
  }, [user]);

  return (
    <div className="relative mt-20 rounded-lg bg-white p-5">
      <Image
        src="/profile.jpeg"
        alt="user profile photo"
        height={300}
        width={300}
        className="absolute -top-20 left-1/2 z-10 size-60 translate-x-[-50%] rounded-full object-cover"
      />
      <h1 className="mt-32 p-5 text-2xl font-medium">Personal Details</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <p className="w-40">Full Name</p>
          <input
            className="input-bg flex-grow rounded-md p-3"
            value={userInfo?.fullName || ''}
            disabled
          />
        </div>
        <div className="flex items-center gap-5">
          <p className="w-40">Email Address</p>
          <input
            className="input-bg flex-grow rounded-md p-3"
            value={userInfo?.email || ''}
            disabled
          />
        </div>
        <div className="flex items-center gap-5">
          <p className="w-40">Contact No.</p>
          <input
            className="input-bg flex-grow rounded-md p-3"
            value={userInfo?.phoneNumber || ''}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
