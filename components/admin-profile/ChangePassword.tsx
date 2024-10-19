import React from 'react';

const ChangePassword = () => {
  return (
    <div className="relative rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Change Password</h1>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-5">
          <p className="w-60">Current Password</p>
          <input
            type="password"
            className="input-bg flex-grow rounded-md p-3"
            value="currentpassword"
            disabled
          />
        </div>
        <div className="flex items-center gap-5">
          <p className="w-60">New Password</p>
          <input
            type="password"
            className="input-bg flex-grow rounded-md p-3"
            value="newpassword"
            disabled
          />
        </div>
        <div className="flex items-center gap-5">
          <p className="w-60">Re-enter New Password</p>
          <input
            type="password"
            className="input-bg flex-grow rounded-md p-3"
            value="newpassword"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
