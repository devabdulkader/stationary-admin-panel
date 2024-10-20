import React from 'react';
import FormInput from '../form/FormInput';

const ManageSocials = () => {
  // Static array of social media data
  const socials = [
    { id: 1, name: 'facebook', placeholder: 'facebook.com/yourprofile' },
    { id: 2, name: 'instagram', placeholder: 'instagram.com/yourprofile' },
    { id: 3, name: 'whatsApp', placeholder: 'whatsapp.com/yourprofile' },
    { id: 4, name: 'viber', placeholder: 'viber.com/yourprofile' },
  ];

  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Manage Socials</h1>

      <div className="flex flex-col gap-5 p-5">
        {socials.map(({ id, name, placeholder }) => (
          <div key={id} className="flex w-full items-center gap-5">
            <p className="w-40">{name}</p>
            <FormInput
              name={name}
              className="input-bg w-full flex-grow rounded-md p-3"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSocials;
