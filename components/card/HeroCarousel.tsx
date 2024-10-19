// import Image from 'next/image';
import React from 'react';
// import { RiDeleteBin6Line } from 'react-icons/ri';

// type HeroImageProps = {
//   src: string;
//   onDelete: () => void;
// };

const HeroImage: React.FC = () => {
  return (
    <div className="relative h-full min-h-[280px]">
      {/* <Image
        src={src}
        alt="Hero Image"
        layout="fill"
        quality={100}
        className="h-full w-full object-cover"
      />

      <RiDeleteBin6Line
        size={32}
        className="absolute right-5 top-5 block cursor-pointer rounded-full bg-red-500 p-2 text-white"
        onClick={onDelete}
      /> */}
    </div>
  );
};

export default HeroImage;
