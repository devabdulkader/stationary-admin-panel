import React from 'react';
// import { AiFillPlusCircle } from 'react-icons/ai';
// import HeroImage from '../card/HeroCarousel';

const HeroCarousel = () => {
  // const carouselData = [
  //   { id: 1, image: '/product-1.png' },
  //   { id: 2, image: '/product-2.png' },
  // ];

  // const totalSlots = 4;

  return (
    <div className="grid grid-cols-4 gap-5">
      {/* {Array.from({ length: totalSlots }).map((_, index) => {
        const data = carouselData[index];
        return data ? (
          <HeroImage key={data.id} src={data.image} />
        ) : (
          <div
            key={index} 
            className="border-blue-dashed flex h-full min-h-[280px] cursor-pointer items-center justify-center rounded-lg border hover:bg-gray-100"
          >
            <AiFillPlusCircle className="text-blue" size={40} />
          </div>
        );
      })} */}
    </div>
  );
};

export default HeroCarousel;
