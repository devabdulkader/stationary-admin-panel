'use client';

import FormInput from '../form/FormInput';

const ManageSocials = ({ data }: any) => {
  return (
    <div className="rounded-lg bg-white p-5">
      <h1 className="p-5 text-2xl font-medium">Manage Socials</h1>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex w-full items-center gap-5">
          <p className="w-40">facebook</p>
          <FormInput
            name="facebook"
            placeholder={data.facebookLink || 'facebook.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">instagram</p>
          <FormInput
            name="instagram"
            placeholder={data.instagramLink || 'instagram.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">whatsApp</p>
          <FormInput
            name="whatsApp"
            placeholder={data.whatsAppLink || 'whatsapp.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-5">
          <p className="w-40">viber</p>
          <FormInput
            name="viber"
            placeholder={data.viberLink || 'viber.com/yourprofile'}
            className="input-bg w-full flex-grow rounded-md p-3 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSocials;
