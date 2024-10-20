import React from 'react';

const ManageSocials = () => {
  // Static array of social media data
  const socials = [
    { id: 1, name: 'Facebook', value: 'facebook.com/yourprofile' },
    { id: 2, name: 'Instagram', value: 'instagram.com/yourprofile' },
    { id: 3, name: 'WhatsApp', value: 'whatsapp.com/yourprofile' },
    { id: 4, name: 'Viber', value: 'viber.com/yourprofile' },
  ];

  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Manage Socials</h1>

      <div className="flex flex-col gap-5 p-5">
        {socials.map(({ id, name, value }) => (
          <div key={id} className="flex items-center gap-5">
            <p className="w-40">{name}</p>
            <input
              className="input-bg flex-grow rounded-md p-3"
              value={value}
              disabled
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSocials;
