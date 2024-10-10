import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div>
      <Image
        src="/logo.png"
        alt=""
        width={300}
        height={300}
        className="h-[45px] w-[150px] object-cover"
      />
    </div>
  );
};

export default Logo;
