import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt=""
        width={300}
        height={300}
        className="h-[45px] w-[150px] object-cover"
      />
    </Link>
  );
};

export default Logo;
